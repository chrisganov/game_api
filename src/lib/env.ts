import { config as dotConfig } from "dotenv";
import { expand } from "dotenv-expand";

const envConfig = dotConfig();

expand(envConfig);

export const ENV = {
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbConnectionString: process.env.DB_CONNECTION_STRING!,
  secretToken: process.env.SECRET_TOKEN,
  jsonToken: process.env.JSON_TOKEN,
};
