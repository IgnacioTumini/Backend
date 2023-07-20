import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true },
      _id: false,
    },
    { _id: false },
  ],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
export default cartsModel;
