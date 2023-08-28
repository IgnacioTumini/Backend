import { Router } from "express";

import { authenticate } from "../Middlewares/Authenticate.js";
import { PServices } from "../dao/Models/Service/productos.service.js";
import { CServices } from "../dao/Models/Service/carts.service.js";
import { userController } from "../controller/usersController.js";

const router = Router();

//RENDER DE REGISTRO
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/resetPassword", (req, res) => {
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
    delete cleanProduct._id;
    console.log(cleanProduct);
    res.render("productDetail", { findProduct: cleanProduct });
  } catch (error) {
    res.render("error");
  }
});
// RENDER DEL CARRITO
router.get("/cart-user", async (req, res) => {
  try {
    console.log(req.session.user);
    let { _id } = req.session.user;

    let userFound = await userController.getUserById(_id);
    const cartFound = await CServices.getCartById(userFound.cid);
    const plainCart = cartFound.products.map((doc) => doc.toObject());
    return res.render("cart", { plainCart });
  } catch (e) {
    return res.render("error");
  }
});

export default router;
