import express from "express";
import { PServices } from "../dao/Service/productos.service.js";
import { productController } from "../controller/productsController.js";

const router = express.Router();

router.get("/products", productController.getAllRender);

export default router;
