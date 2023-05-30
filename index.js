const fs = require("fs");

function validarCampos(title, description, price, thumbnail, code, stock) {
  let flagError = false;

  if (!title || !description || !price || !thumbnail || !code || !stock) {
    flagError = true;
  } else if (isNaN(price) || isNaN(stock)) {
    flagError = true;
  }
  return flagError;
}

class ProductManager {
  constructor(file) {
    this.products = [];
    this.file = file + ".JSON";
  }
  async getProduct() {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.products = JSON.parse(data);
          return console.log(this.products);
        }
      } else {
        console.log("No existe el archivo, por favor cree uno");
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        let product = { title, description, price, thumbnail, code, stock };
        if (data) {
          console.log(data);
          this.products = JSON.parse(data);
          console.log(this.products);

          let flag = validarCampos(
            title,
            description,
            price,
            thumbnail,
            code,
            stock
          );

          if (flag) {
            console.log("Verifique que los campos sean correctos");
            return;
          }
          console.log(typeof this.products);
          let codeSerch = this.products.findIndex((e) => {
            return e.code == code;
          });
          if (codeSerch == -1) {
            if (this.products.length === 0) {
              product.id = 1;
            } else {
              product.id = this.products[this.products.length - 1].id + 1;
            }

            this.products.push(product);
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.products, null, "\t")
            );
            console.log("el producto se agrego correctamente");
          } else {
            console.log("El code del producto se repite");
          }
        } else {
          await fs.promises.writeFile(
            this.file,
            JSON.stringify({ product }, null, "\t")
          );
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async getProductById(id) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.products = JSON.parse(data);
          let product = await this.products.findIndex((pro) => {
            return pro.id == id;
          });
          if (product == -1) {
            console.log("not found");
          } else return console.table(this.products[product]);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async updateProduct(id, product) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.products = JSON.parse(data);
          const index = this.products.findIndex((pro) => pro.id === id);
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...product };
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.products, null, "\t")
            );
            console.log("Has actualizado correctamente el producto");
          } else {
            console.log("Producto no encontrado");
          }
        } else {
          console.log("Este archivo no existe");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  async deleteProduct(id) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.products = JSON.parse(data);
          const index = this.products.findIndex((pro) => pro.id === id);
          if (index !== -1) {
            this.products.splice(index, 1);
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.products, null, "\t")
            );
            console.log("Producto eliminado correctamente");
          }
        } else {
          console.log("Producto no encontrado");
        }
      } else {
        console.log("Este archivo no existe");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}

const manager = new ProductManager("Nacho");

manager.addProduct(
  "Producto 2",
  "Descripción del producto 2",
  10.99,
  "path/imagen1.jpg",
  "NACHO124",
  5
);
