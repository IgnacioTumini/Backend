//@ts-check

import cartsModel from "../mongoose/carts.models.js";
import productsModel from "../mongoose/products.models.js";
import { PServices } from "./productos.service.js";

class Carts {
  constructor() {}

  getAll = async () => {
    const carts = await cartsModel.find(
      {},
      {
        __v: false,
      }
    );
    return carts;
  };
  createCart = async () => {
    const cart = new cartsModel();
    await cart.save();
    return { message: "Carrito creado correctamente", cart: cart };
  };

  addProductCart = async (cid, pid, Pquantity) => {
    try {
      const cart = await cartsModel.findById(cid);
      const product = await PServices.getProductById(pid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      const findProdInCart = await cartsModel.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": Pquantity } }
        );
      } else {
        cart.products.push({ product: product._id, quantity: Pquantity });
      }
      await cart.save();
      const updatedCart = await cartsModel.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };
  getCartById = async (cid) => {
    const findCart = await cartsModel
      .findById(cid)
      .populate("products.product");

    if (!findCart) {
      throw new Error("Cart not found");
    }

    return findCart;
  };
  async deleteProduct(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      const product = await productsModel.findById(pid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }

      const findProdInCart = await cartsModel.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          {
            $inc: { "products.$.quantity": -1 },
          }
        );
        //no puedo hacer que cuando el producto llegue a 0 se elimine
      }

      await cart.save();
      const updatedCart = await cartsModel.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async cartOutStock(cid, cart) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate(
        { _id: cid },
        { products: cart },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new error();
    }
  }

  async deleteCart(cid) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate(
        { _id: cid },
        { products: [] },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw error;
    }
  }
  async purchase(cid) {
    const userCart = await cartsModel.findById(cid);
    return userCart;
  }
}
export const CServices = new Carts();
