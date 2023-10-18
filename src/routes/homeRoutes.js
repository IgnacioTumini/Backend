import express from "express";
import { productController } from "../controller/productsController.js";
import { userController } from "../controller/usersController.js";

const router = express.Router();

router.get("/products", productController.getAllRender);

router.get("/users", userController.getAllRender);

export default router;
