import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model(usersCollection, userSchema);
export default usersModel;
