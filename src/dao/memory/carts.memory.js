export default class CartsMemory {
  constructor() {
    this.carts = [];
  }

  async getAll() {
    return this.carts;
  }
  async createCart() {
    const cartCreated = {
      id: Date(),
      products: [],
    };
    this.carts.push(cartCreated);
    return cartCreated;
  }
  getCartById(idSearch) {
    const carts = this.getAll();
    let searchedCart = carts.find((cart) => cart.id == idSearch);
    if (searchedCart === undefined) {
      return { message: "cart not found", payload: [] };
    } else {
      return searchedCart;
    }
  }
  async addProductToCart(cid, pid, quantityParams) {
    const carts = this.getCarts();
    const cartSearched = carts.find((cart) => cart.id == cid);
    if (!cartSearched) {
      throw new Error(`Carrito con el ID ${cid} no encontrado`);
    }
    const existProduct = cartSearched.products.find(
      (product) => product.id == pid
    );
    if (existProduct) {
      if (quantityParams) {
        existProduct.quantity += quantityParams;
      } else {
        existProduct.quantity += 1;
      }
    } else {
      if (quantityParams) {
        cartSearched.products.push({ id: productId, quantity: quantityParams });
      } else {
        cartSearched.products.push({ id: productId, quantity: 1 });
      }
    }
  }
  async deleteProductInCart(cid, pid) {
    const carts = this.getCarts();
    const cartSearched = carts.find((cart) => cart.id == cid);
    if (!cartSearched) {
      throw new Error(`Carrito con el ID ${cartId} no encontrado`);
    }
    const existProduct = cartSearched.products.find(
      (product) => product.id == pid
    );
    if (existProduct == false) {
      return "El producto no existe en su carrito";
    } else {
      existProduct.quantity -= 1;
    }
    let cartFilter = [];

    if (existProduct.quantity === 0) {
      cartFilter = carts.cartId.products.filter((p) => p.id != pid);
    } else {
      cartFilter = this.carts;
    }

    return cartFilter;
  }
}

export const cartsMemory = new CartsMemory();
