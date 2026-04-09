import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // 1. Create the connection pool using your env variable
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // 2. Wrap it in the Prisma adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass the adapter to the client
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
