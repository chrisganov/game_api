import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import "@envConfig";

const migrationClient = postgres(process.env.DB_CONNECTION_STRING, { max: 1 });

migrate(drizzle(migrationClient), { migrationsFolder: "./src/db/migrations" })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error("Migrations failed!", err);
    process.exit(1);
  });
