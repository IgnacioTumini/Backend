import fs from "fs";
import ProductManager from "./ProductManager.js";
import { logger } from "../logs/logger.js";

const PM = new ProductManager(`../src/Productos`);

export default class CartManager {
  constructor(file) {
    this.file = file + ".JSON";
    this.carts = [];
  }

  async createCart() {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          const newCart = { id: Date.now(), products: [] };
          this.carts.push(newCart);
          await fs.promises.writeFile(
            this.file,
            JSON.stringify(this.carts, null, "\t")
          );
        }
        return { status: 200, message: "Carrito añadido con exito" };
      } else {
        return { Status: 400, error: "Base de datos no encontrada" };
      }
    } catch (error) {
      logger.error("Error: ", error);
    }
  }

  async addProductCart(cid, pid) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          let cart = await this.carts.find((c) => c.id == cid);
          if (cart) {
            const productExist = await PM.getProductById(pid);
            if (!productExist.status) {
              const findProduct = cart.products.find(
                (product) => product.id == pid
              );
              if (findProduct) {
                const newCart = cart.products.filter((product) => {
                  if (product.id == pid) {
                    product.quantity += 1;
                  }
                  return product;
                });
                cart = newCart;
              } else {
                cart.products.push({ id: pid, quantity: 1 });
              }
              const newCarts = this.carts.filter((c) => {
                if (c.id == cid) {
                  return cart;
                }
                return c;
              });
              await fs.promises.writeFile(
                this.file,
                JSON.stringify(newCarts, "/t")
              );
              return { message: "producto añadido al carrito con exito" };
            }
          } else {
            return {
              status: 400,
              error: `Error: Carrito con el id "${cid}" no fue encontrado`,
            };
          }
        } else {
          return { status: 400, error: "El cart no fue encontrado" };
        }
      }
    } catch (error) {
      logger.error("Error: ", error);
    }
  }

  async getCart() {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          return this.carts;
        }
      } else {
        return {
          status: 404,
          message: "No existe el archivo, por favor cree uno",
        };
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }
  async getCartById(cid) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          const cart = await this.carts.find((c) => c.id === cid);
          if (cart) {
            return cart;
          } else {
            return {
              status: 400,
              error: `Error: Producto con el id "${cid}" no fue encontrado`,
            };
          }
        }
      } else {
        return {
          status: 404,
          message: "No existe el archivo, por favor cree uno",
        };
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }
  async removeCart(cid) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          const index = this.cart.findIndex((c) => c.id === cid);
          if (index !== -1) {
            this.carts.splice(index, 1);
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.carts, null, "\t")
            );
            logger.info("Producto eliminado correctamente");
          }
        } else {
          logger.error("Producto no encontrado");
        }
      } else {
        logger.error("No existe el archivo, por favor cree uno");
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }
}

const CM = new CartManager("carritos");
