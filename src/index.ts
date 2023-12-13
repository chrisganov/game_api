import express from "express";
import router from "./router";
import cors from "cors";
import pino from "pino-http";
import bodyParser from "body-parser";
import { ENV } from "@envConfig";

const app = express();

app.use(cors());

app.use(bodyParser.json());

// TODO: Update pino better
app.use(pino());

// TODO: add jsonwebtoken to create a token for authentication. Verify it using middleware to get the user.
app.use(router);

app.listen(ENV.port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${ENV.port}`);
});
