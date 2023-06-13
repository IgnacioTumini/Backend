import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from "../ProductManager.js";

const router = Router();
//const products = [];
const PM = new ProductManager(`../src/Productos`);

// GET PRODUCTS
router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  let limit = req.query.limit;
  if (!limit) return res.send({ products });
  let productsLimit = products.slice(0, limit);
  res.send({ productsLimit });
});
//GET PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  const products = await PM.getProductById(Number(req.params.pid));
  if (!products) return res.send({ error: "Producto no encontrado" });
  res.send(products);
});

/*
router.post("/", uploader.single("file"), function (req, res) {
  console.log(req.file);

  if (!req.file) {
    return res
      .status(400)
      .send({ status: "error", error: "No se guardo la imagen" });
  }

  let product = req.body;
  product.profile = req.file.path;
  products.push(product);

  res.send({ status: "Ok", message: "Usuario Creado" });
});

/*router.post("/", (req, res) => {
  const userBody = req.body;
  users.push(userBody);
  res.send({ Status: "ok" });
});*/

export default router;
