import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: String, required: true, max: 100 },
  category: { type: String, require: true, max: 100 },
  owner: { type: String, require: true, max: 100, default: "admin" },
});
productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);
export default productsModel;
