import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();
if (!global.prisma) global.prisma = prisma;
