import { DateRange } from "react-day-picker";
import prisma from "../db";
import { ListingRepo } from "../interfaces/AllRepo";
import { City } from "@prisma/client";

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
      include: { city: true, listingDetails: true },
    });
  },

  getSearchListing: async (
    city: string,
    dateRange: DateRange,
    adults: number,
    children: number,
  ) => {
    const totalGuests = adults + children; // ← combine since you only have `guests`

    return await prisma.listing.findMany({
      where: {
        city: {
          name: { contains: city, mode: "insensitive" },
        },

        listingDetails: {
          guests: { gte: totalGuests }, // ← use `guests` not maxAdults/maxChildren
        },
      },
      include: {
        city: true,
        listingDetails: true,
      },
    });
  },
};
