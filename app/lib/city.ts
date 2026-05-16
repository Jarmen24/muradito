import { prismaCityRepo } from "./prismaRepo/prismaCityRepo";

const repo = prismaCityRepo;

export const getAllCities = repo.getAllCities;
