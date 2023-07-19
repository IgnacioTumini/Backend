import { Router } from "express";
import Carts from "../dao/Service/carts.service.js";
import Products from "../dao/Service/productos.service.js";

const CS = new Carts();
const PS = new Products();
const router = Router();

//chatbox
router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const findProduct = await PS.getProductById(pid);
    res.render("product", { findProduct });
  } catch (error) {
    res.render("error");
  }
});

router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const foundcart = await CS.getCartById(cid);
    console.log(foundcart);
    const plainCart = foundcart.products.map((doc) => doc.toObject());
    console.log(plainCart);
    return res.render("cart", { plainCart });
  } catch (error) {
    res.render("error");
  }
});

/*
router.get("/students", async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productsModel.paginate({}, { limit: 10, page, lean: true });
  const students = docs;
  res.render("students", {
    students,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  });
});
*/
export default router;
