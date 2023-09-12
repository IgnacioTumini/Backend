import express from "express";

import { productController } from "../controller/productsController.js";
import { checkAdmin } from "../Middlewares/Authenticate.js";

const router = express.Router();

router.get("/", checkAdmin, productController.getProductRealTime);

export default router;
