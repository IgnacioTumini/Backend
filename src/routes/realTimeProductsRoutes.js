import express from "express";
import ProductManager from "../ProductManager.js";

const router = express.Router();

const PM = new ProductManager("../src/Productos");

router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
