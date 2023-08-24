class TicketService {
  async getTicketById(tid) {
    try {
      const ticket = await ticketsMongoose.findById(tid);
      return ticket;
    } catch (error) {
      throw new error();
    }
  }
  async createTicket(cid, user) {
    //corroborar que el carrito exista y sea del usuario
    const cart = await this.verifyCart(cid, user);
    const plainCart = cart.products.map((prod) => prod.toObject());
    //console.log(plainCart);
    //corroborar stock (model de producto)
    let cartFilter = [];
    let cartFilterOutStock = [];

    for (let i = 0; i < plainCart.length; i++) {
      if (plainCart[i].product.stock < plainCart[i].quantity) {
        cartFilterOutStock.push(plainCart[i]);
      } else {
        cartFilter.push(plainCart[i]);

        productModel.updateProduct({
          id: plainCart[i].product._id,
          stock: plainCart[i].product.stock - plainCart[i].quantity,
        });
      }
    }
    //generar el ticket (usar dto al finalizar)

    // cuando se genera la compra, filtrar entre los que se compraron y los que no
    //en caso de que no hay stock devolver los productos que no se pudieron comprar

    // const ticketCreated = await ticketsMongoose.create(ticketCreated);
    // return ticketCreated;
    return plainCart;
  }
  async verifyCart(cid, user) {
    const cart = await cartsModel.getCartById(cid);
    if (cart._id == user.cid) {
      return cart;
    }
  }
}

export const TServices = new TicketService();
