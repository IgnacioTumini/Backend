import { Router } from "express";

import { authenticate } from "../Middlewares/Authenticate.js";
import { PServices } from "../dao/Models/Service/productos.service.js";
import { CServices } from "../dao/Models/Service/carts.service.js";

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
router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const foundcart = await CServices.getCartById(cid);
    console.log(foundcart);
    const plainCart = foundcart.products.map((doc) => doc.toObject());
    console.log(plainCart);
    return res.render("cart", { plainCart });
  } catch (error) {
    res.render("error");
  }
});

export default router;
