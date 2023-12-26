import "dotenv/config";

const dbName = process.env.DB_NAME;
const port = process.env.PORT;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbConnectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const secretToken = process.env.SECRET_TOKEN;
const jsonToken = process.env.JSON_TOKEN;

export const ENV = {
  port,
  dbName,
  dbPort,
  dbUser,
  dbPassword,
  dbHost,
  dbConnectionString,
  secretToken,
  jsonToken,
};
