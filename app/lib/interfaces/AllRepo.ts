import { City, User } from "@prisma/client";
import {
  ListingWithCity,
  ListingWithCityWithDetails,
} from "@/app/types/listing";
import { DateRange } from "react-day-picker";

export interface ListingRepo {
  getAllListings(): Promise<ListingWithCity[]>;
  getFirstFiveListing(): Promise<ListingWithCity[]>;
  getFirstTenListing(city?: string): Promise<ListingWithCity[]>;
  getListingBySlug(slug: string): Promise<ListingWithCityWithDetails | null>;
  getSearchListing(
    city: string,
    dateRange: DateRange,
    adults: number,
    children: number,
  ): Promise<ListingWithCityWithDetails[] | null>;
}

export interface CityRepo {
  getAllCities(): Promise<City[]>;
}

export interface UserRepo {
  getUser(email?: string): Promise<User | null>;
}
