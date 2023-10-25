import { Server } from "socket.io";

import Chat from "../dao/Models/Service/chats.service.js";
import { PServices } from "../dao/Models/Service/productos.service.js";
import { logger } from "./logs/logger.js";

const CS = new Chat();

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  // Sockets
  socketServer.on("connection", (socket) => {
    logger.info("Cliente conectado: " + socket.id);
    socket.on("new-product", async (newProduct) => {
      try {
        await PServices.createProduct(newProduct);
        const newProductList = await PServices.getProductRealTime();
        socketServer.emit("products", newProductList);
      } catch (error) {
        logger.error(error);
      }
    });
  });

  //CHATBOX
  socketServer.on("connection", (socket) => {
    socket.on("message", async (data) => {
      try {
        CS.saveChat(data);
        const messages = await CS.getAll();
        socketServer.emit("messageLogs", messages);
      } catch (error) {
        logger.error("no se pudo guadar en la BD");
      }
    });
  });
}
