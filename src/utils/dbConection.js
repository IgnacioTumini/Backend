import { connect } from "mongoose";
import env from "../config/enviroment.config.js";

export async function connectMongo() {
  try {
    await connect(env.mongoUrl, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connected!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
