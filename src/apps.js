import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import ProductManager from "./dao/fileManagers/ProductManager.js";

import mongoose from "mongoose";

import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
const PM = new ProductManager("Productos");

// LEVANTAR EL SERVIDOR
const httpServer = app.listen(8080, () => console.log("Server up"));

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", homeRouter);
app.use("/realtimeproducts", realTimeProductsRoutes);
app.use("/chat", chatRoutes);

app.use("/", viewsRouter);
app.use("/api/courses", cartRouter);
app.use("/api/users", productRouter);

// HANDLEBARS
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

// Sockets
socketServer.on("connection", (socket) => {
  console.log("Cliente conectado: " + socket.id);
  socket.on("new-product", async (newProduct) => {
    try {
      await PM.addProduct(newProduct);
      const newProductList = await PM.getProducts();
      socketServer.emit("products", newProductList);
    } catch (error) {
      console.log(error);
    }
  });
});

//chatbox
/*let messages = [];
socketServer.on("connection", (socket) => {
  socketServer.on("messages", (data) => {
    messages.push(data);
    socketServer.emit("messageLogs", messages);
    console.log("data");
  });
});
*/
// BASE DE DATOS

mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority"
);
