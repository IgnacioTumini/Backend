import cartsModel from "../Models/carts.models.js";
import Products from "./productos.service.js";

const PS = new Products();

export default class Carts {
  constructor() {
    console.log("Entro a service cart ");
  }

  getAll = async () => {
    let carts = await cartsModel.find().lean();
    return carts;
  };
  createCart = async () => {
    const cart = new cartsModel();
    await cart.save();
    return { message: "Carrito creado correctamente", cart: cart };
  };

  addProductCart = async (cid, pid) => {
    const findProduct = await PS.getProductById(pid);
    if (findProduct) {
      const update = await this.getCartById(cid);
      console.log(update);
      const findProductInCart = update.products.find((prod) => prod.id == pid);
      if (findProductInCart) {
        const newProductsInCart = update.products.map((prod) => {
          if (prod.id == pid) {
            prod.quantity += 1;
          }
          return prod;
        });
        update.products = newProductsInCart;
      } else {
        update.products.push({ id: pid, quantity: 1 });
      }
      await cartsModel.findByIdAndUpdate(cid, { products: update.products });
      return { message: "Producto agregado al carrito" };
    }
  };
  getCartById = async (cid) => {
    const findCart = await cartsModel.findById(cid).exec();
    return { message: "Carrito encontrado", cart: findCart };
  };

  removeCart = async (cid) => {
    await cartsModel.findByIdAndRemove(cid);
    return { message: "Carrito eliminado" };
  };
}
