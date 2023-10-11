import { logger } from "../../utils/logs/logger";

export default class ProductsMemory {
  constructor() {
    this.products = [];
  }

  async getAll() {
    return this.products;
  }
  async createProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const newProduct = {
      _id: Date.now(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  updateProduct(idSearch, updateProduct) {
    const searchedProduct = this.products.find(
      (product) => product.id == idSearch
    );
    if (searchedProduct === undefined) {
      logger.error("No se encontro ningun producto con esas caracteristicas");
    } else {
      Object.assign(searchedProduct, updateProduct);
      return searchedProduct;
    }
  }

  deleteProduct(idSearch) {
    const searchedProduct = this.products.find(
      (product) => product.id == idSearch
    );
    if (searchedProduct === undefined) {
      return false;
    } else {
      this.products = this.products.filter((product) => product.id != idSearch);

      return true;
    }
  }
}

export const productsMemory = new ProductsMemory();
