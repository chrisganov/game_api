import type { Config } from "drizzle-kit";
import "@envConfig";

// TODO
export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    password: "12345",
    database: "game-api",
    user: "admin",
    host: "localhost",
    port: 5432,
  },
  strict: true,
  verbose: true,
} satisfies Config;
