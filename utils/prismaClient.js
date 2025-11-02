import { execSync } from "child_process";
try {
  execSync("npx prisma generate");
} catch (e) {
  console.log("⚠️ Failed to auto-generate Prisma Client", e);
}

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();