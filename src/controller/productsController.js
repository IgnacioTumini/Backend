import { PServices } from "../dao/Models/Service/productos.service.js";
import { logger } from "../utils/logs/logger.js";

import ProductsDTO from "./DTO/products.dto.js";

class ProductController {
  getAll = async (req, res) => {
    try {
      const queryParams = req.query;
      const response = await PServices.getAll(queryParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      return res.render("error");
    }
  };
  getAllRender = async (req, res) => {
    const title = "Listado de productos";
    try {
      const queryParams = req.query;
      const { limit, category, sort, stock } = req.query;

      const response = await PServices.getAll(queryParams);
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
          owner: product.owner,
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
      logger.error(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const productFound = await PServices.getProductById(id);

      if (productFound) {
        return res.status(201).json({
          status: "success",
          msg: "Product found",
          payload: productFound,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: "The indicated product was not found",
        });
      }
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json({ status: "error", msg: "Internal Server Error" });
    }
  };
  createProduct = async (req, res) => {
    // ESTE CONTROLLER NO ESTA EN PRODUCCION, YA QUE A LA HORA DE CREAR UN PRODUCTO POR REALTIME(SOCKET)
    // YA QUE ESTE SISTEMA NO ES COMPATIBLE CON FUNCIONALIDAES COMO REQ.SESSION, Y ESTO ME TRAJO PROBLEMAS,
    // YA QUE NO PUEDO HACER LO DE OWNER
    try {
      console.log(req.session.user.role);
      let newProduct = req.body;

      req.session.user.role === "admin"
        ? (newProduct.owner = "admin")
        : (newProduct.owner = req.session.user.email);

      let productsDTO = new ProductsDTO(newProduct);
      console.log(productsDTO);

      const productCreated = await PServices.createProduct(productsDTO);

      return res.status(201).json({
        status: "success",
        msg: "product created",
        payload: productCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnail, code, stock } = req.body;
      try {
        const productUptaded = await PServices.update(
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
      logger.error(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  getProductRealTime = async (req, res) => {
    try {
      let title = "Listado de productos en tiempo real";
      const response = await PServices.getProductRealTime();

      const products = response.map((product) => {
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
      return res.status(200).render("realTimeProducts", { title, products });
    } catch (error) {
      return res.send("error no entro al realtime");
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const userEmail = req.session.user.email;
      const role = req.session.user.role;
      const result = await PServices.delete(id, userEmail, role);
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
      logger.error(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
}

export const productController = new ProductController();
