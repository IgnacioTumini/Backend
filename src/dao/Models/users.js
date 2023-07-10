import mongoose from "mongoose";

const usersCollection = "users";

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
    type: String,
    required: true,
  },
  dni: Number,
  birthDate: Date,
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  courses: {
    type: Array,
    default: [],
  },
});

const usersModel = mongoose.model(usersCollection, userSchema);
export default usersModel;
