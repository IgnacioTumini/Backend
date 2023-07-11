import mongoose from "mongoose";

const cartsCollection = "carts";

const prodCartSchema = mongoose.Schema(
  {
    pid: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);
const cartsSchema = mongoose.Schema({
  products: { type: [prodCartSchema], required: true },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
export default cartsModel;
