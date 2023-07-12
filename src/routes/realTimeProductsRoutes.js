import express from "express";
import Products from "../dao/Service/productos.service.js";

const router = express.Router();
const PS = new Products();


router.get("/", async (req, res) => {
  const products = await PS.getAll();

  const cleanProducts = products.map((prod) => {
    return { ...prod, id: prod._id.toString() };
  });

  res.render("realTimeProducts", { cleanProducts });
});

export default router;
