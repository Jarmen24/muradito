import { prismaListingRepo } from "./prismaRepo/prismaListingRepo";

const repo = prismaListingRepo;

export const getAllListings = repo.getAllListings;
export const getFirstFiveListing = repo.getFirstFiveListing;
export const getFirstTenListing = repo.getFirstTenListing;
export const getListingBySlug = repo.getListingBySlug;
