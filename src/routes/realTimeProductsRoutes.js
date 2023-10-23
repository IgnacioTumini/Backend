import express from "express";

import { productController } from "../controller/productsController.js";
import { PublishCredentials } from "../Middlewares/Authenticate.js";

const router = express.Router();

router.get("/", PublishCredentials, productController.getProductRealTime);

export default router;
