import express from "express";
import Products from "../dao/Service/productos.service.js";

const router = express.Router();
const PS = new Products();

router.get("/", async (req, res) => {
  try {
    let title = "Listado de productos en tiempo real";
    const response = await PS.getProductRealTime();

    const products = response.map((product) => {
      return {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
    });
    return res.status(200).render("realTimeProducts", { title, products });
  } catch (error) {
    return res.render("error");
  }
});

export default router;
