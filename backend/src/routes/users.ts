import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/api/users" })
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, params.id))
        .limit(1);

      if (user.length === 0) {
        set.status = 404;
        return { error: "User not found" };
      }

      return user[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const newUser = await db
        .insert(users)
        .values({
          name: body.name,
          email: body.email,
        })
        .returning();

      set.status = 201;
      return newUser[0];
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const deleted = await db
        .delete(users)
        .where(eq(users.id, params.id))
        .returning();

      if (deleted.length === 0) {
        set.status = 404;
        return { error: "User not found" };
      }

      return { message: "User deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
