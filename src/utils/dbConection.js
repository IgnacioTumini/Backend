import { connect } from "mongoose";
import env from "../config/enviroment.config.js";

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "ecommerce",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Mongo connected!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
