import mongoose from "mongoose";
import env from "../config/enviroment.config.js";

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
      console.log("La coneccion ya existe");
      return this.instance;
    }

    this.instance = new MongoSingleton();
    console.log("Conectado");

    return this.instance;
  }
}
