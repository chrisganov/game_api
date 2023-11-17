export declare global {
  namespace NodeJS {
    interface ProcessEnv extends CustomEnv {
      PORT: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_CONNECTION_STRING: string;
      NODE_ENV: "development" | "production";
    }
  }
}