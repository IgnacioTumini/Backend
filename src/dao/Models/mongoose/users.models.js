import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const usersCollection = "users";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  cid: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
