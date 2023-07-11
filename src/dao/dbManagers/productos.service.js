import productsModel from "../Models/products.models.js";

export default class Products {
  constructor() {
    console.log("trabajando con mongo");
  }
  getAll = async () => {
    let products = await productsModel.find().lean();
    return products;
  };
  saveProducts = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };
  getProductById = async (id) => {};
  updateProduct = async (id, product) => {};
  removeProduct = async (id) => {};
}
