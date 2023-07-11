import cartsModel from "../Models/carts.models.js";
import Products from "./productos.service.js";

const PS = new Products();

export default class Carts {
  constructor() {
    console.log("trabajando con base de datos");
  }

  getAll = async () => {
    let carts = await cartsModel.find().lean();
    return carts;
  };
  savecarts = async (cart) => {
    let result = await cartsModel.create(cart);
    return result;
  };
  addProductCart = async (cid, pid) => {};
  getCartById = async (cid) => {};
  removeCart = async (cid) => {};
}
