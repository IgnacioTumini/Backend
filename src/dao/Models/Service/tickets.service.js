import ticketModel from "../mongoose/tickets.models.js";
import { CServices } from "./carts.service.js";
import { PServices } from "./productos.service.js";

class TicketService {
  async getTicketById(tid) {
    try {
      const ticket = await ticketModel.findById(tid);
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
    let amount = 0;

    for (let i = 0; i < plainCart.length; i++) {
      if (plainCart[i].product.stock < plainCart[i].quantity) {
        cartFilterOutStock.push(plainCart[i]);
      } else {
        cartFilter.push(plainCart[i]);
        amount += plainCart[i].product.price * plainCart[i].quantity;
        PServices.updateProduct({
          id: plainCart[i].product._id,
          stock: plainCart[i].product.stock - plainCart[i].quantity,
        });
      }
    }

    //generar el ticket (usar dto al finalizar)
    let code = Date.now().toString();
    const datePurchase = new Date();
    const purchase_datetime = format(datePurchase, "dd/MM/yyyy HH:mm:ss");
    const email = user.email;

    /*no se si va DTO
    const newTicket = new TicketsDTO({
      cid,
      code,
      purchase_datetime,
      amount,
      email,
      products: plainCart,
    });
    */
    // cuando se genera la compra, filtrar entre los que se compraron y los que no
    //en caso de que no hay stock devolver los productos que no se pudieron comprar
    const ticketCreated = await ticketModel.create({
      code,
      purchase_datetime,
      amount,
      purchaser: email,
    });

    return ticketCreated;
  }
  async verifyCart(cid, user) {
    const cart = await CServices.getCartById(cid);
    if (cart._id == user.cid) {
      return cart;
    }
  }
}

export const TServices = new TicketService();
