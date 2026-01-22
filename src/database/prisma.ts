import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to the database");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
};

export default prisma;
