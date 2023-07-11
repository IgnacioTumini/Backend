import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = mongoose.Schema({
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

const productsModel = mongoose.model(productsCollection, productSchema);
export default productsModel;
