import { Router } from "express";
import CartManager from "../dao/fileManagers/cartManager.js";
import Carts from "../dao/Service/carts.service.js";

const router = Router();

const CS = new Carts();
const CM = new CartManager(`../src/carritos`);

// GET TRAE TODOS LOS CARRITOS
router.get("/", async (req, res) => {
  let carts = await CS.getAll();
  res.render({ status: "success", payload: carts });
  /*
  const carritos = await CM.getCart();
  res.send(carritos); 
  */
});

// GET TRAE UN CARRITO POR SU ID
router.get("/:cid", async (req, res) => {
  const Cart = await CM.getCartById(Number(req.params.cid));
  if (!Cart) return res.send({ error: "Carrito no encontardo" });
  res.send(Cart);
});

//POST CREA UN CARRITTO CON UN ID ALEATORIO Y UN ARRAY PRODUCTS
router.post("/", async (req, res) => {
  const newCart = await CS.createCart();
  res.send(newCart);
});

// POST AÑADE UN PRODUCTO A UN CARRITO, EN CASO DE QUE EXISTA, LE SUMA 1 A QUANTITY
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  const addProduct = await CS.addProductCart(cartId, productId);
  res.send(addProduct);
});

export default router;
