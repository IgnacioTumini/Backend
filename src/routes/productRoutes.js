import { Router } from "express";
//import { uploader } from "../utils.js";
import Products from "../dao/Service/productos.service.js";

const router = Router();
const PS = new Products();

// GET PRODUCTS (traer todos los productos)
router.get("/", async (req, res) => {
  let products = await PS.getAll();
  if (!products)
    return res
      .status(500)
      .send({ status: "error", error: "No pudo obtener datos" });

  res.send({ status: "success", payload: products });
});
//GET PRODUCT BY ID(traer un producto por id)
router.get("/:pid", async (req, res) => {
  const idProduct = req.params.pid;
  const products = await PS.getProductById(idProduct);
  res.status(200).send(products);
});
// POST PRODUCT(SUBIR NUEVO PRODUCTO)
router.post("/", async (req, res) => {
  let { title, description, price, thumbnail, code, stock } = req.body;

  let result = await PS.saveProducts({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  });
  res.send({ status: "success", payload: result });
});
// PUT PRODUCT(ACTUALIZAR)
router.put("/:pid", async (req, res) => {
  const product = req.body;
  const idProduct = req.params.pid;
  const productUpdate = await PS.updateProduct(idProduct, product);
  res.status(200).send(productUpdate);
});

// DELETE PRODUCT BY ID
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productDelete = await PS.removeProduct(id);
  res.status(200).send(productDelete);
});

export default router;
