import mongoose from "mongoose";

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
    default: "user",
  },
});

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
