import express from "express";
import router from "./router";
import cors from "cors";
import pino from "pino-http";
import bodyParser from "body-parser";

import "@envConfig";

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

// TODO: Update pino better
app.use(pino());

app.use(router);

// TODO: Error handling

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
