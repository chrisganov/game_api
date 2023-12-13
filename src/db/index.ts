import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import { ENV } from "../lib/env";

const CONNECTION_STRING = ENV.dbConnectionString;

const queryClient = postgres(CONNECTION_STRING);

export const db = drizzle(queryClient, {
  schema,
});
