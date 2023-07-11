import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
export default cartsModel;
