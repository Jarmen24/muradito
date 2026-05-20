import { City } from "@prisma/client";
import { ListingWithCity } from "@/app/types/listing";

export interface ListingRepo {
  getAllListings(): Promise<ListingWithCity[]>;
  getFirstFiveListing(): Promise<ListingWithCity[]>;
  getFirstTenListing(city?: string): Promise<ListingWithCity[]>;
  getListingBySlug(slug: string): Promise<ListingWithCity | null>;
}

export interface CityRepo {
  getAllCities(): Promise<City[]>;
}
