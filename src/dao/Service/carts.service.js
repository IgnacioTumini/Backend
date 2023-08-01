//@ts-check
import cartsModel from "../Models/carts.models.js";
import productsModel from "../Models/products.models.js";
import Products from "./productos.service.js";

const PS = new Products();

export default class Carts {
  constructor() {
    console.log("Entro a service cart ");
  }

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

  async deleteCart({ cid }) {
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
}
