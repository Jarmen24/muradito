import { prismaListingRepo } from "./prismaListingRepo";

const repo = prismaListingRepo;

export const getAllListings = repo.getAllListings;
export const getFirstFive = repo.getFirstFive;
