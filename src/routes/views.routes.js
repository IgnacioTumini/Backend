import { Router } from "express";

import { authenticate, checkAdmin } from "../Middlewares/Authenticate.js";
import { PServices } from "../dao/Models/Service/productos.service.js";
import { CServices } from "../dao/Models/Service/carts.service.js";
import { userController } from "../controller/usersController.js";
import CustomError from "../Errors/custom.errors.js";
import EError from "../Errors/enum.js";
import { productsFaker } from "../utils/productFaker.js";
import { logger } from "../utils/logs/logger.js";

const router = Router();

//RENDER DE REGISTRO
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/recover-pass", (req, res) => {
  res.render("resetPassword");
});

// RENDER PERFIL
router.get("/profile", authenticate, (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

//RENDER DE LOGIN
router.get("/", (req, res) => {
  res.render("login");
});
router.get("/admin", checkAdmin, (req, res) => {
  res.render("admin");
});

//CHATBOX
router.get("/chat", authenticate, (req, res) => {
  res.render("chat");
});
// RENDER DEL DETALLE DEL PRODUCTO
router.get("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const findProduct = await PServices.getProductById(pid);
    const cleanProduct = { id: findProduct._id.toString(), ...findProduct };
    cleanProduct.cid = req.session.user.cid;
    delete cleanProduct._id;
    res.render("productDetail", { findProduct: cleanProduct });
  } catch (error) {
    res.render("error");
  }
});
// RENDER DEL CARRITO
router.get("/cart-user", async (req, res) => {
  try {
    let { _id } = req.session.user;
    let userFound = await userController.getUserById(_id);

    const cartFound = await CServices.getCartById(userFound.cid);
    console.log(cartFound);
    const plainCart = cartFound.products.map((doc) => doc.toObject());
    console.log(plainCart);

    return res.render("cart", { plainCart });
  } catch (e) {
    return res.render("error");
  }
});

router.get("/test-logger", (req, res) => {
  logger.error("soy un error");
  logger.warn("soy un warn");
  logger.info("soy un info");
  logger.http("soy un http");
  logger.verbose("soy un verbose");
  logger.debug("soy un debug");

  res.send("probando loggers");
});

router.get("/mockingproducts", async (req, res) => {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push(productsFaker());
    }
    res.send({ status: "success", payload: products });
  } catch (e) {
    CustomError.createError({
      name: "error-mockingproducts",
      cause: "No se pudieron crear los productos",
      message: "Intentelo otra vez",
      code: EError.ADD_PRODUCT_ERROR,
    });
  }
});

export default router;
