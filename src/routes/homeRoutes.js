import express from "express";
import ProductManager from "../dao/fileManagers/ProductManager.js";

const router = express.Router();

const PM = new ProductManager("../src/Productos");

router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  res.render("home", { products });
});

export default router;
