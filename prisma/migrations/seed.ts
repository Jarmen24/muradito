import "dotenv/config";
import { PrismaClient, ListingType } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import bcrypt from "bcrypt";

const cities = [
  // Metro Manila (NCR)
  { name: "Manila", icon: "Building2" },
  { name: "Quezon City", icon: "Building2" },
  { name: "Caloocan", icon: "Building2" },
  { name: "Las Piñas", icon: "Building2" },
  { name: "Makati", icon: "Landmark" },
  { name: "Malabon", icon: "Building2" },
  { name: "Mandaluyong", icon: "Building2" },
  { name: "Marikina", icon: "Building2" },
  { name: "Muntinlupa", icon: "Building2" },
  { name: "Navotas", icon: "Anchor" },
  { name: "Parañaque", icon: "Building2" },
  { name: "Pasay", icon: "Building2" },
  { name: "Pasig", icon: "Building2" },
  { name: "Pateros", icon: "MapPin" },
  { name: "San Juan", icon: "Building2" },
  { name: "Taguig", icon: "Building2" },
  { name: "Valenzuela", icon: "Factory" },

  // Region I – Ilocos Region
  { name: "Laoag", icon: "Landmark" },
  { name: "Batac", icon: "Wheat" },
  { name: "Vigan", icon: "Landmark" },
  { name: "Candon", icon: "Wheat" },
  { name: "San Fernando (La Union)", icon: "Waves" },
  { name: "Dagupan", icon: "Waves" },
  { name: "San Carlos (Pangasinan)", icon: "Wheat" },
  { name: "Urdaneta", icon: "Wheat" },
  { name: "Alaminos", icon: "Waves" },

  // Region II – Cagayan Valley
  { name: "Tuguegarao", icon: "Wind" },
  { name: "Cauayan", icon: "Wheat" },
  { name: "Ilagan", icon: "TreePine" },
  { name: "Santiago", icon: "TreePine" },

  // Region III – Central Luzon
  { name: "Angeles", icon: "PlaneTakeoff" },
  { name: "Malolos", icon: "Landmark" },
  { name: "Meycauayan", icon: "Factory" },
  { name: "San Jose del Monte", icon: "Mountain" },
  { name: "Cabanatuan", icon: "Wheat" },
  { name: "Gapan", icon: "Wheat" },
  { name: "Muñoz", icon: "Wheat" },
  { name: "Palayan", icon: "Wheat" },
  { name: "San Jose (Nueva Ecija)", icon: "Wheat" },
  { name: "Balanga", icon: "TreePalm" },
  { name: "Olongapo", icon: "Anchor" },
  { name: "San Fernando (Pampanga)", icon: "Star" },
  { name: "Tarlac City", icon: "Wheat" },

  // Region IV-A – CALABARZON
  { name: "Antipolo", icon: "Church" },
  { name: "Bacoor", icon: "House" },
  { name: "Biñan", icon: "House" },
  { name: "Calamba", icon: "TreePine" },
  { name: "Cavite City", icon: "Anchor" },
  { name: "Dasmariñas", icon: "House" },
  { name: "General Trias", icon: "House" },
  { name: "Imus", icon: "House" },
  { name: "Lucena", icon: "Waves" },
  { name: "San Pablo", icon: "Mountain" },
  { name: "San Pedro", icon: "House" },
  { name: "Santa Rosa", icon: "Factory" },
  { name: "Tagaytay", icon: "Mountain" },
  { name: "Batangas City", icon: "Anchor" },
  { name: "Lipa", icon: "Coffee" },
  { name: "Tanauan", icon: "TreePine" },
  { name: "Tayabas", icon: "TreePine" },
  { name: "Trece Martires", icon: "House" },

  // Region IV-B – MIMAROPA
  { name: "Puerto Princesa", icon: "TreePalm" },
  { name: "Calapan", icon: "Waves" },
  { name: "Odiongan", icon: "Waves" },

  // Region V – Bicol Region
  { name: "Legazpi", icon: "Mountain" },
  { name: "Ligao", icon: "Mountain" },
  { name: "Tabaco", icon: "Mountain" },
  { name: "Sorsogon City", icon: "Fish" },
  { name: "Naga", icon: "Church" },
  { name: "Iriga", icon: "TreePine" },
  { name: "Masbate City", icon: "Waves" },

  // Region VI – Western Visayas
  { name: "Iloilo City", icon: "Landmark" },
  { name: "Passi", icon: "Wheat" },
  { name: "Roxas City", icon: "Waves" },
  { name: "Bacolod", icon: "Landmark" },
  { name: "Bago", icon: "Wheat" },
  { name: "Cadiz", icon: "Wheat" },
  { name: "Escalante", icon: "Wheat" },
  { name: "Himamaylan", icon: "Wheat" },
  { name: "Kabankalan", icon: "Wheat" },
  { name: "La Carlota", icon: "Wheat" },
  { name: "Sagay", icon: "Waves" },
  { name: "San Carlos (Negros Occidental)", icon: "Wheat" },
  { name: "Silay", icon: "Landmark" },
  { name: "Sipalay", icon: "Waves" },
  { name: "Talisay (Negros Occidental)", icon: "Wheat" },
  { name: "Victorias", icon: "Wheat" },

  // Region VII – Central Visayas
  { name: "Cebu City", icon: "Landmark" },
  { name: "Carcar", icon: "Landmark" },
  { name: "Danao", icon: "Waves" },
  { name: "Lapu-Lapu", icon: "Sword" },
  { name: "Mandaue", icon: "Factory" },
  { name: "Naga (Cebu)", icon: "TreePine" },
  { name: "Talisay (Cebu)", icon: "House" },
  { name: "Toledo", icon: "Pickaxe" },
  { name: "Tagbilaran", icon: "TreePalm" },
  { name: "Bais", icon: "Waves" },
  { name: "Bayawan", icon: "Waves" },
  { name: "Canlaon", icon: "Mountain" },
  { name: "Dumaguete", icon: "GraduationCap" },
  { name: "Guihulngan", icon: "TreePine" },
  { name: "Tanjay", icon: "Waves" },

  // Region VIII – Eastern Visayas
  { name: "Tacloban", icon: "Waves" },
  { name: "Baybay", icon: "Waves" },
  { name: "Ormoc", icon: "Zap" },
  { name: "Borongan", icon: "TreePine" },
  { name: "Catbalogan", icon: "Waves" },
  { name: "Calbayog", icon: "Droplets" },
  { name: "Maasin", icon: "Waves" },
  { name: "Naval", icon: "Anchor" },

  // Region IX – Zamboanga Peninsula
  { name: "Zamboanga City", icon: "Flower2" },
  { name: "Dapitan", icon: "Landmark" },
  { name: "Dipolog", icon: "TreePine" },
  { name: "Isabela City", icon: "TreePalm" },
  { name: "Pagadian", icon: "TreePine" },

  // Region X – Northern Mindanao
  { name: "Cagayan de Oro", icon: "Waves" },
  { name: "El Salvador", icon: "TreePine" },
  { name: "Gingoog", icon: "TreePine" },
  { name: "Iligan", icon: "Zap" },
  { name: "Malaybalay", icon: "Mountain" },
  { name: "Valencia", icon: "TreePine" },
  { name: "Oroquieta", icon: "TreePine" },
  { name: "Ozamiz", icon: "Waves" },
  { name: "Tangub", icon: "TreePine" },

  // Region XI – Davao Region
  { name: "Davao City", icon: "Building2" },
  { name: "Digos", icon: "TreePine" },
  { name: "Mati", icon: "Waves" },
  { name: "Panabo", icon: "Leaf" },
  { name: "Samal", icon: "Palmtree" },
  { name: "Tagum", icon: "Leaf" },

  // Region XII – SOCCSKSARGEN
  { name: "General Santos", icon: "Fish" },
  { name: "Kidapawan", icon: "Mountain" },
  { name: "Koronadal", icon: "TreePine" },
  { name: "Cotabato City", icon: "Landmark" },
  { name: "Tacurong", icon: "Wheat" },

  // Region XIII – Caraga
  { name: "Butuan", icon: "Anchor" },
  { name: "Bayugan", icon: "TreePine" },
  { name: "Bislig", icon: "TreePine" },
  { name: "Cabadbaran", icon: "TreePine" },
  { name: "Surigao City", icon: "Waves" },
  { name: "Tandag", icon: "TreePine" },

  // CAR – Cordillera Administrative Region
  { name: "Baguio", icon: "TreePine" },
  { name: "Tabuk", icon: "TreePine" },
  { name: "La Trinidad", icon: "Flower2" },

  // BARMM – Bangsamoro
  { name: "Marawi", icon: "Landmark" },
  { name: "Lamitan", icon: "TreePalm" },
];
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

console.log("Hello, Prisma!");
const data = JSON.parse(
  fs.readFileSync("prisma/migrations/dataset_fast-agoda-scraper.json", "utf-8"),
);
console.log("Data loaded:", data.length, "items");

async function main() {
  // create dummy user (owner)
  const hashedPassword = await bcrypt.hash("hashedpassword", 10);
  const user = await prisma.user.upsert({
    where: { email: "seed@test.com" },
    update: {
      password: hashedPassword, // 👈 also update password on re-runs
    },
    create: {
      email: "seed@test.com",
      password: hashedPassword,
    },
  });

  console.log("🌱 Seeding cities...");

  const seededCities: { id: string }[] = [];

  for (const city of cities) {
    const seededCity = await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: city,
    });
    seededCities.push(seededCity);
  }

  console.log(`✅ Seeded ${cities.length} cities successfully.`);

  for (const item of data) {
    if (!item.pricePerRoomPerNight) continue;
    const randomCity =
      seededCities[Math.floor(Math.random() * seededCities.length)];
    try {
      const listing = await prisma.listing.upsert({
        where: { url: item.url },
        update: {},
        create: {
          name: item.name,
          url: item.url,
          description: `Stay at ${item.name} located in ${item.address.city}`,
          price: item.pricePerBook || 0,
          price_currency: item.priceCurrency || "USD",
          listing_type: ListingType.RENT,
          property_type: item.propertyType,
          country: item.address.country,
          cityId: randomCity.id,
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
