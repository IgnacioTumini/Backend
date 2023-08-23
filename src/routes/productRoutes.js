import { Router } from "express";
import { authenticate, checkAdmin } from "../Middlewares/Authenticate.js";
import { productController } from "../controller/productsController.js";

const router = Router();

// GET PRODUCTS (traer todos los productos)
router.get("/", productController.getAll);
//GET PRODUCT BY ID(traer un producto por id)
router.get("/:pid", productController.getById);
// POST PRODUCT(SUBIR NUEVO PRODUCTO)
router.post("/", checkAdmin, productController.create);
// PUT PRODUCT(ACTUALIZAR)
router.put("/:id", checkAdmin, productController.update);
// DELETE PRODUCT BY ID
router.delete("/:id", checkAdmin, productController.delete);

export default router;
