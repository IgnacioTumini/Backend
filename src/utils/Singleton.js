import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
import { logger } from "./logs/logger.js";

export default class MongoSingleton {
  static instance;

  constructor() {
    mongoose.connect(env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static getInstance() {
    if (this.instance) {
      logger.info("La coneccion ya existe");
      return this.instance;
    }

    this.instance = new MongoSingleton();
    logger.info("Conectado");

    return this.instance;
  }
}
