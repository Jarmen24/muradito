import "dotenv/config";
import { PrismaClient, ListingType } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

console.log("Hello, Prisma!");
const data = JSON.parse(
  fs.readFileSync("prisma/migrations/dataset_fast-agoda-scraper.json", "utf-8"),
);
console.log("Data loaded:", data.length, "items");
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

async function main() {
  // create dummy user (owner)
  const user = await prisma.user.upsert({
    where: { email: "seed@test.com" },
    update: {},
    create: {
      email: "seed@test.com",
      password: "hashedpassword",
    },
  });

  for (const item of data) {
    if (!item.pricePerRoomPerNight) continue;

    try {
      const listing = await prisma.listing.create({
        data: {
          name: item.name,
          url: item.url,
          description: `Stay at ${item.name} located in ${item.city}`,
          price: item.pricePerBook || 0,
          price_currency: item.priceCurrency || "USD",
          listing_type: ListingType.RENT,
          property_type: item.propertyType,

          // Kaya pa ma optimize by creating separate tables for country/city/area and referencing them here
          country: item.address.country,
          city: item.address.city,
          area: item.address.area,

          latitude: item.location.latitude,
          longitude: item.location.longitude,

          userId: user.id,

          images: [item.image],
        },
      });

      // optional: add rating
      if (item.reviewScore) {
        await prisma.rating.create({
          data: {
            listingId: listing.id,
            userId: user.id,
            rating: Math.round(item.reviewScore / 2), // normalize to 1-5
            comment: `${item.reviewCount} reviews`,
          },
        });
      }

      console.log("Inserted:", listing.name);
    } catch (err) {
      console.log("Error:", item.name, err);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
