import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Context, Next } from "hono";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("Database URL not found");
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function withPrisma(c: Context, next: Next) {
    c.set('prisma', prisma);
    await next();
}