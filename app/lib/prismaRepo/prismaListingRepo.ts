import prisma from "../db";
import { ListingRepo } from "../interfaces/AllRepo";

export const prismaListingRepo: ListingRepo = {
  getAllListings: async () => {
    return await prisma.listing.findMany();
  },
  getFirstFiveListing: async () => {
    return await prisma.listing.findMany({
      take: 5,
    });
  },
  getFirstTenListing: async () => {
    return await prisma.listing.findMany({
      take: 10,
    });
  },
};
