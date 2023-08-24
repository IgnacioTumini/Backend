import { CServices } from "../dao/Models/Service/carts.service.js";
import { PServices } from "../dao/Models/Service/productos.service.js";

class CartController {
  getAll = async (req, res) => {
    let carts = await CServices.getAll();
    console.log(carts);
    res.send({ status: "success", payload: carts });
  };

  createCart = async (req, res) => {
    const newCart = await CServices.createCart();
    res.status(200).send(newCart);
  };

  getCartById = async (req, res) => {
    const Cart = await CServices.getCartById(req.params.cid);
    if (!Cart) return res.send({ error: "Carrito no encontardo" });
    res.send(Cart);
  };

  addProductCart = async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    const { Pquantity = 1 } = req.body;
    const addProduct = await CServices.addProductCart(
      cartId,
      productId,
      Pquantity
    );
    res.send(addProduct);
  };

  deleteCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      const cartToEmpty = await CServices.deleteCart({ cid });
      if (cartToEmpty) {
        return res.status(200).json({
          status: "success",
          msg: "cart removed",
          payload: cartToEmpty,
        });
      } else {
        return res
          .status(400)
          .json({ status: "error", msg: "The indicated cart was not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", msg: "Internal Server Error" });
    }
  };

  deleteProductInCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity = 1 } = req.body;

      const productById = await PServices.getProductById(pid);

      if (productById) {
        const deletedProduct = await CServices.deleteProduct(
          cid,
          pid,
          quantity
        );

        if (deletedProduct) {
          return res.status(200).json({
            status: "success",
            msg: "product removed from cart",
            payload: deletedProduct,
          });
        } else {
          return res.status(400).json({
            status: "error",
            msg: "The product was not removed from the cart",
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          msg: "No product found to remove from cart",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "Could not remove product from cart",
        error: error.message,
      });
    }
  };
}

export const cartController = new CartController();
