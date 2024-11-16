import { PrismaClient } from "@prisma/client";

export const db: PrismaClient = globalThis?.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
