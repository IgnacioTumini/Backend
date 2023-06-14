import { Router } from "express";
//import { uploader } from "../utils.js";
import ProductManager from "../ProductManager.js";

const router = Router();

const PM = new ProductManager(`../src/Productos`);

// GET PRODUCTS (traer todos los productos)
router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  let limit = req.query.limit;
  if (!limit) return res.send({ products });
  let productsLimit = products.slice(0, limit);
  res.send({ productsLimit });
});
//GET PRODUCT BY ID(traer un producto por id)
router.get("/:pid", async (req, res) => {
  const products = await PM.getProductById(Number(req.params.pid));
  if (!products) return res.send({ error: "Producto no encontrado" });
  res.send(products);
});
// POST PRODUCT(SUBIR NUEVO PRODUCTO)
router.post("/", async (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  const addProduct = await PM.addProduct(newProduct);
  res.send(addProduct);
});
// PUT PRODUCT(ACTUALIZAR)
router.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = req.body;
  const updateProduct = await PM.updateProduct(id, product);
  res.send(updateProduct);
});

// delete
router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const productDelete = await PM.removeProduct(id);
  res.send(productDelete);
});

export default router;
