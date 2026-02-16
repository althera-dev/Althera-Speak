import { Elysia } from "elysia";
import { db } from "../db";
import { sql } from "drizzle-orm";

export const healthRoutes = new Elysia({ prefix: "/api" }).get(
  "/health",
  async () => {
    try {
      await db.execute(sql`SELECT 1`);
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: "connected",
      };
    } catch {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
      };
    }
  }
);
