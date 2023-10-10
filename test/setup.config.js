import mongoose from "mongoose";
import productsModel from "../src/dao/Models/mongoose/products.models.js";
import cartsModel from "../src/dao/Models/mongoose/carts.models.js";
import userModel from "../src/dao/Models/mongoose/users.models.js";

before(async () => {
  await mongoose.connect(
    "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority"
  );
});

after(async () => {
  mongoose.connection.close();
});

export const dropProducts = async () => {
  await productsModel.collection.drop();
};

export const dropCarts = async () => {
  await cartsModel.collection.drop();
};

export const dropUser = async () => {
  await userModel.collection.drop();
};
