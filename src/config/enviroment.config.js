import dotenv from "dotenv";
import { Command } from "commander";
import { logger } from "../utils/logs/logger.js";

const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
  path:
    program.opts().mode === "DEVELOPMENT"
      ? "./.env.development"
      : "./.env.production",
});

console.log("Options => ", program.opts());

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  persistence: process.env.PERSISTENCE,
  gmail: process.env.GOOGLE_EMAIL,
  pass: process.env.GOOGLE_PASS,
  loggerLevel: process.env.LOGGER_LEVEL,
};
