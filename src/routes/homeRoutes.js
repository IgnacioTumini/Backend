import express from "express";
import Products from "../dao/Service/productos.service.js";

const router = express.Router();
const PS = new Products();

router.get("/products", async (req, res) => {
  const title = "Listado de productos";
  try {
    const queryParams = req.query;
    const { limit, category, sort, stock } = req.query;

    const response = await PS.getAll(queryParams);
    const products = response.payload.products.map((product) => {
      return {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
    });
    return res.status(200).render("home", {
      title,
      products,
      response,
      limit,
      category,
      sort,
      stock,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }

  /*
  let products = ProductM.getProducts();
  const query = req.query;

  if (!!query.limit) {
    let limit = parseInt(query.limit);
    let prodLimits = [];
    for (let i = 0; i < limit; i++) {
      prodLimits.push(products[i]);
      return res.status(200).render("home", { title, prodLimits });
    }
  } else {
    return res.status(200).render("home", { title, products });
  }
*/
});

export default router;
