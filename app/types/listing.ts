import { Prisma } from "@prisma/client";

export type ListingWithCity = Prisma.ListingGetPayload<{
  include: { city: true };
}>;
