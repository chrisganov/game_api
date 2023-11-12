import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import { ENV } from "../envConfig";

const CONNECTION_STRING = ENV.connectionString;

const queryClient = postgres(CONNECTION_STRING);

export const db = drizzle(queryClient, { schema });
