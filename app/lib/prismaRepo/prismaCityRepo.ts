import prisma from "../db";
import { CityRepo } from "../interfaces/AllRepo";

export const prismaCityRepo: CityRepo = {
  getAllCities: async () => {
    return await prisma.city.findMany();
  },
};
