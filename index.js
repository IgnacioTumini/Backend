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
  constructor() {
    this.products = [];
  }
  getProduct = () => {
    return console.log(this.products);
  };
  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = { title, description, price, thumbnail, code, stock };
    let flag = validarCampos(title, description, price, thumbnail, code, stock);

    if (flag) {
      console.log("Verifique que los campos sean correctos");
      return;
    }

    let codeSerch = this.products.findIndex((e) => e.code == code);
    if (codeSerch == -1) {
      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(product);
      console.log("el producto se agrego correctamente");
    } else {
      console.log("El code del producto se repite");
    }
  };
  getProductById = (id) => {
    let product = this.products.findIndex((pro) => {
      return pro.id == id;
    });
    if (product == -1) {
      console.log("not found");
    } else return console.table(this.products[product]);
  };
}

let manager = new ProductManager();
manager.getProduct();

manager.addProduct("libreta", "Libreta roja", 3000, "sin imagen", "abc123", 4);
manager.getProduct();
manager.addProduct("libreta", "Libreta roja", 3000, "sin imagen", "abc123", 4);
manager.getProductById(3);
