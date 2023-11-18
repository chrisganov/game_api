import type { Config } from "drizzle-kit";
import "@envConfig";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
  },
  strict: true,
  verbose: true,
} satisfies Config;
