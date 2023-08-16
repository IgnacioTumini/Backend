import express from "express";
import { productController } from "../controller/productsController.js";

const router = express.Router();

router.get("/products", productController.getAllRender);

export default router;
