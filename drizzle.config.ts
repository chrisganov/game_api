import type { Config } from "drizzle-kit";
import { ENV } from "@envConfig";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    password: ENV.dbPassword,
    database: ENV.dbName,
    user: ENV.dbUser,
    host: ENV.dbHost,
    port: Number(ENV.dbPort),
  },
  strict: true,
  verbose: true,
} satisfies Config;
