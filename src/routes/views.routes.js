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

//Eliminar users por inactividad de 2hs
router.get("/deleteInactive", userController.deleteInactive);

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
    const cid = req.session.user.cid;

    const productFound = await PServices.getProductById(pid);
    const plainProduct = {
      _id: productFound._id.toString(),
      title: productFound.title,
      description: productFound.description,
      price: productFound.price,
      thumbnail: productFound.thumbnail,
      code: productFound.code,
      stock: productFound.stock,
      category: productFound.category,
      cid: cid,
    };
    return res.render("productDetail", { plainProduct });
  } catch (e) {
    let data = {
      title: "Error inesperado",
      text: "intentelo otra vez",
    };
    return res.render("error", data);
  }
});
// RENDER DEL CARRITO
router.get("/cart-user", async (req, res) => {
  try {
    let { _id } = req.session.user;
    let userFound = await userController.getUserById(_id);
    const cartFound = await CServices.getCartById(userFound.cid);
    const plainCart = cartFound.products.map((doc) => doc.toObject());

    return res.render("cart", { plainCart, cid: cartFound._id.toString() });
  } catch (e) {
    let data = {
      title: "Error inesperado",
      text: "intentelo otra vez",
    };
    return res.render("error", data);
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
