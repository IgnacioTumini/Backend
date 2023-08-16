import { Server } from "socket.io";
import { PServices } from "../dao/Service/productos.service.js";
import Chat from "../dao/Service/chats.service.js";

const CS = new Chat();

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  // Sockets
  socketServer.on("connection", (socket) => {
    console.log("Cliente conectado: " + socket.id);
    socket.on("new-product", async (newProduct) => {
      try {
        await PServices.create(newProduct);
        const newProductList = await PServices.getProductRealTime();
        socketServer.emit("products", newProductList);
      } catch (error) {
        console.log(error);
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
        console.log("no se pudo guadar en la BD");
      }
    });
  });
}
