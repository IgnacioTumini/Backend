import { Router } from "express";
import Carts from "../dao/Service/carts.service.js";
import Products from "../dao/Service/productos.service.js";

const router = Router();
const CS = new Carts();
const PS = new Products();

// GET TRAE TODOS LOS CARRITOS
router.get("/", async (req, res) => {
  let carts = await CS.getAll();
  res.render({ status: "success", payload: carts });
});

// GET TRAE UN CARRITO POR SU ID
router.get("/:cid", async (req, res) => {
  const Cart = await CS.getCartById(req.params.cid);
  if (!Cart) return res.send({ error: "Carrito no encontardo" });
  res.send(Cart);
});

//POST CREA UN CARRITTO CON UN ID ALEATORIO Y UN ARRAY PRODUCTS
router.post("/", async (req, res) => {
  const newCart = await CS.createCart();
  res.status(200).send(newCart);
});

// POST AÑADE UN PRODUCTO A UN CARRITO, EN CASO DE QUE EXISTA, LE SUMA 1 A QUANTITY
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  const { Pquantity = 1 } = req.body;
  const addProduct = await CS.addProductCart(cartId, productId, Pquantity);
  res.send(addProduct);
});

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartToEmpty = await CS.deleteCart({ cid });
    if (cartToEmpty) {
      return res
        .status(200)
        .json({ status: "success", msg: "cart removed", payload: cartToEmpty });
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
});
// ELIMINAR DEL CARRITO EL PRODUCTO SELECCIONADO
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity = 1 } = req.body;

    const productById = await PS.getProductById(pid);

    if (productById) {
      const deletedProduct = await CS.deleteProduct(cid, pid, quantity);

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
      return res
        .status(400)
        .json({ status: "error", msg: "No product found to remove from cart" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Could not remove product from cart",
      error: error.message,
    });
  }
});
// ACTUALIZAR EL CARRITO
router.put("/carts/:cid", async (req, res) => {});
// ACTUALIZAR LA CANTIDAD DE EJEMPLARES DEL PRODUCTO
router.put("/carts/:cid/products/:pid", async (req, res) => {});

export default router;
