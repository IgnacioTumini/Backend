import fs from "fs";
import ProductManager from "./ProductManager.js";

const PM = new ProductManager(`../src/Productos`);

export default class CartManager {
  constructor() {
    (this.file = file + ".JSON"), (this.carts = []);
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
      } else {
        return { error: "base de datos no encontrada" };
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async addProductCart(cid, pid) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.carts = JSON.parse(data);
          const cart = await this.carts.find((c) => c.id == cid);
          if (cart) {
            const productExist = PM.getProductById(pid);
            if (productExist) {
              const productRepit = await cart.products.find((p) => p.id == pid);
              if (productRepit) {
                productExist.quantity += 1;
              } else {
                cart.products.push({ id: pid, quantity: 1 });
              }
            }
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.carts, null, "\t")
            );
          } else {
            return {
              status: 400,
              error: `Error: Producto con el id "${cid}" no fue encontrado`,
            };
          }
        }
      }
    } catch (error) {
      console.log("Error: ", error);
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
            console.log("Producto eliminado correctamente");
          }
        } else {
          console.log("Producto no encontrado");
        }
      } else {
        console.log("No existe el archivo, por favor cree uno");
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }
}
