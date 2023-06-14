import { Router } from "express";
import CartManager from "../cartManager.js";

const router = Router();

const CM = new CartManager(`../src/carritos`);

// get(id)
router.get("/:cid", async (req, res) => {
  const Cart = await CM.getCartById(Number(req.params.cid));
  if (!Cart) return res.send({ error: "Carrito no encontardo" });
  res.send(Cart);
});

//POST--{id:123,products:[]}
router.post("/", async (req, res) => {});

// post/:cid/product/:pid --deberia anadir{id:pid,quantity:1}
router.post("/:cid/product/:pid", async (req, res) => {});

export default router;
