import { Router } from "express";

import { cartController } from "../controller/cartsController.js";
import { checkUser } from "../Middlewares/Authenticate.js";

const router = Router();

// GET TRAE TODOS LOS CARRITOS
router.get("/", cartController.getAll);

// GET TRAE UN CARRITO POR SU ID
router.get("/:cid", cartController.getCartById);

//POST CREA UN CARRITTO CON UN ID ALEATORIO Y UN ARRAY PRODUCTS
router.post("/", cartController.createCart);

// POST AÑADE UN PRODUCTO A UN CARRITO, EN CASO DE QUE EXISTA, LE SUMA 1 A QUANTITY
router.post("/:cid/product/:pid", checkUser, cartController.addProductCart);

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/:cid", cartController.deleteCart);

// ELIMINAR DEL CARRITO EL PRODUCTO SELECCIONADO
router.delete("/:cid/products/:pid", cartController.deleteProductInCart);

export default router;
