import { Prisma } from "@prisma/client";

export type ListingWithCity = Prisma.ListingGetPayload<{
  include: { city: true };
}>;

export type ListingWithCityWithDetails = Prisma.ListingGetPayload<{
  include: { city: true; listingDetails: true };
}>;
