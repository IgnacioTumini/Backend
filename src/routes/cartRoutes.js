import { Router } from "express";
import Carts from "../dao/Service/carts.service.js";

const router = Router();
const CS = new Carts();

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
  const addProduct = await CS.addProductCart(cartId, productId);
  res.send(addProduct);
});

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/api/carts/:cid", async (req, res) => {});
// ELIMINAR DEL CARRITO EL PRODUCTO SELECCIONADO
router.delete("/api/carts/:cid/products/:pid", async (req, res) => {});
// ACTUALIZAR EL CARRITO
router.put("/api/carts/:cid", async (req, res) => {});
// ACTUALIZAR LA CANTIDAD DE EJEMPLARES DEL PRODUCTO
router.put("/api/carts/:cid/products/:pid", async (req, res) => {});

export default router;
