import { connect } from "mongoose";
import env from "../config/enviroment.config.js";
import { logger } from "./logs/logger.js";

export async function connectMongo() {
  try {
    await connect(env.mongoUrl, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Mongo connected!");
  } catch (e) {
    logger.info(e);
    throw "can not connect to the db";
  }
}
