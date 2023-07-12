import { Router } from "express";
//import { uploader } from "../utils.js";
import ProductManager from "../dao/fileManagers/ProductManager.js";
import Products from "../dao/Service/productos.service.js";

const router = Router();
const PS = new Products();
const PM = new ProductManager(`../src/Productos`);

// GET PRODUCTS (traer todos los productos)
router.get("/", async (req, res) => {
  let products = await PS.getAll();
  if (!products)
    return res
      .status(500)
      .send({ status: "error", error: "No pudo obtener datos" });

  res.send({ status: "success", payload: products });
  /*
  const products = await PM.getProducts();
  let limit = req.query.limit;
  if (!limit) return res.send({ products });
  let productsLimit = products.slice(0, limit);
  res.send({ productsLimit });*/
});
//GET PRODUCT BY ID(traer un producto por id)
router.get("/:pid", async (req, res) => {
  const idProduct = req.params.pid;
  const products = await PS.getProductById(idProduct);
  res.status(200).send(products);

  /*const products = await PM.getProductById(Number(req.params.pid));
  if (!products) return res.send({ error: "Producto no encontrado" });
  res.send(products);*/
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

  /*
  console.log(req.body);
  const newProduct = req.body;
  const addProduct = await PM.addProduct(newProduct);
  res.send(addProduct);
  */
});
// PUT PRODUCT(ACTUALIZAR)
router.put("/:pid", async (req, res) => {
  const product = req.body;
  const idProduct = req.params.pid;
  const productUpdate = await PS.updateProduct(idProduct, product);
  res.status(200).send(productUpdate);

  /*const id = Number(req.params.pid);
  const product = req.body;
  const updateProduct = await PM.updateProduct(id, product);
  res.send(updateProduct);*/
});

// DELETE PRODUCT BY ID
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productDelete = await PS.removeProduct(id);
  res.send(productDelete);
});

export default router;
