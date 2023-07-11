import cartsModel from "../Models/carts.js";

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
}
