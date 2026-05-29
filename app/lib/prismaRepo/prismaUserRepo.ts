import prisma from "../db";
import { UserRepo } from "../interfaces/AllRepo";

export const prismaUserRepo: UserRepo = {
  getUser: async (email?: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        listings: true,
        bookings: true,
        ratings: true,
      },
    });
  },
};
