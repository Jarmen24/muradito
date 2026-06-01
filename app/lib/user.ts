import { prismaUserRepo } from "./prismaRepo/prismaUserRepo";

const repo = prismaUserRepo;

export const getUser = repo.getUser;
