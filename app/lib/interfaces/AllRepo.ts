import { City, Listing } from "@prisma/client";

export interface ListingRepo {
  getAllListings(): Promise<Listing[]>;
  getFirstFiveListing(): Promise<Listing[]>;
  getFirstTenListing(): Promise<Listing[]>;
}

export interface CityRepo {
  getAllCities(): Promise<City[]>;
}
