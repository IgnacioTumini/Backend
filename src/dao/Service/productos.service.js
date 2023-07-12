import productsModel from "../Models/products.models.js";

export default class Products {
  constructor() {
    console.log("Entro a service Product");
  }
  getAll = async () => {
    let products = await productsModel.find().lean();
    return products;
  };
  saveProducts = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };
  getProductById = async (id) => {
    const findProduct = await productsModel.findById(id).exec();
    return { message: "Producto encontrado", product: findProduct };
  };
  updateProduct = async (id, product) => {
    await productsModel.findByIdAndUpdate(id, product);
    return { message: "Producto actualizado" };
  };
  removeProduct = async (id) => {
    await productsModel.findByIdAndRemove(id);
    return {message : "Producto eliminado"}
  };
}
