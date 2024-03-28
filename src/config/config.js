import dotenv from "dotenv";
import program from "../utils/process.js"

const environment = program.opts().mode;

dotenv.config({
  path:
    environment === "prod"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});

export const configEnv = {
  URL: process.env.URL,
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_CLUSTER: process.env.CLUSTER_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  USER_MAILER: process.env.USER_MAILER,
  PASS_MAILER: process.env.PASS_MAILER
};
