import { Router } from "express";
import CartManager from "../dao/fileManagers/cartManager.js";

const router = Router();

const CM = new CartManager(`../src/carritos`);

// GET TRAE TODOS LOS CARRITOS
router.get("/", async (req, res) => {
  const carritos = await CM.getCart();
  res.send(carritos);
});

// GET TRAE UN CARRITO POR SU ID
router.get("/:cid", async (req, res) => {
  const Cart = await CM.getCartById(Number(req.params.cid));
  if (!Cart) return res.send({ error: "Carrito no encontardo" });
  res.send(Cart);
});

//POST CREA UN CARRITTO CON UN ID ALEATORIO Y UN ARRAY PRODUCTS
router.post("/", async (req, res) => {
  const newCart = await CM.createCart();
  res.send(newCart);
});

// POST AÑADE UN PRODUCTO A UN CARRITO, EN CASO DE QUE EXISTA, LE SUMA 1 A QUANTITY
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = Number(req.params.cid);
  let productId = Number(req.params.pid);
  const addProduct = await CM.addProductCart(cartId, productId);
  res.send(addProduct);
});

export default router;
