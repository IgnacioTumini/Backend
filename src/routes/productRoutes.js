import { Router } from "express";
import Products from "../dao/Service/productos.service.js";


const router = Router();
const PS = new Products();

// GET PRODUCTS (traer todos los productos)
router.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await PServives.getAll(queryParams);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.render("error");
  }
});

//GET PRODUCT BY ID(traer un producto por id)
router.get("/:pid", async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await PS.getProductById(id);

    if (productFound) {
      return res.status(201).json({
        status: "success",
        msg: "Product found",
        payload: productFound,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "The indicated product was not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  }
});
// POST PRODUCT(SUBIR NUEVO PRODUCTO)
router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;

    const productCreated = await PS.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    return res.status(201).json({
      status: "success",
      msg: "product created",
      payload: {
        id: productCreated._id,
        title: productCreated.title,
        description: productCreated.description,
        price: productCreated.price,
        thumbnail: productCreated.thumbnail,
        code: productCreated.code,
        stock: productCreated.stock,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});
// PUT PRODUCT(ACTUALIZAR)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
      const productUptaded = await PS.update(
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );
      if (productUptaded.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "product update",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "product not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "db server error while updating product",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

// DELETE PRODUCT BY ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PS.delete(id);
    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "product deleted",
        payload: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "product not found",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

export default router;
