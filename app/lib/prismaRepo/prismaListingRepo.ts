import prisma from "../db";
import { ListingRepo } from "../interfaces/AllRepo";

export const prismaListingRepo: ListingRepo = {
  getAllListings: async () => {
    return await prisma.listing.findMany({
      include: { city: true },
    });
  },
  getFirstFiveListing: async () => {
    return await prisma.listing.findMany({
      take: 5,
      include: { city: true },
    });
  },
  getFirstTenListing: async (city?: string) => {
    return await prisma.listing.findMany({
      take: 10,
      where: city
        ? { city: { name: { equals: city, mode: "insensitive" } } }
        : undefined,
      include: { city: true },
    });
  },
  getListingBySlug: async (slug: string) => {
    const decoded = decodeURIComponent(slug);
    return await prisma.listing.findFirst({
      where: {
        url: {
          contains: `agoda.com/${decoded}/`,
          mode: "insensitive",
        },
      },
      include: { city: true },
    });
  },
};
