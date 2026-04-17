import { Listing } from "@prisma/client";

export interface ListingRepo {
  getAllListings(): Promise<Listing[]>;
  getFirstFive(): Promise<Listing[]>;
}
