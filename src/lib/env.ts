import { config } from "dotenv";
import { expand } from "dotenv-expand";

const envConfig = config();

expand(envConfig);
