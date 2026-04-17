import prisma from "./db";
import { ListingRepo } from "./interfaces/ListingRepo";

export const prismaListingRepo: ListingRepo = {
  getAllListings: async () => {
    return await prisma.listing.findMany();
  },
  getFirstFive: async () => {
    return await prisma.listing.findMany({
      take: 5,
    });
  },
};
