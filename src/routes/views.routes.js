import { Router } from "express";
import Carts from "../dao/Service/carts.service.js";
import Products from "../dao/Service/productos.service.js";

const CS = new Carts();
const PS = new Products();
const router = Router();

//chatbox
router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/product", async (req, res) => {
  let products = await PS.getAll();
  console.log(products);
  res.send("products", { products });
});

router.get("/cart", async (req, res) => {
  let carts = await CS.getAll();
  console.log(carts);
  res.render("carts", { carts });
});

export default router;
