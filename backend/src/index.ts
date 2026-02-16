import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

const app = new Elysia()
  .use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    })
  )
  .use(healthRoutes)
  .use(userRoutes)
  .listen(Number(process.env.PORT) || 3000);

console.log(
  `🦊 Elysia server running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
