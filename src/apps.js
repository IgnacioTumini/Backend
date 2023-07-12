import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";

import { Server } from "socket.io";
import chatService from "./dao/Service/chats.service.js";
import ProductManager from "./dao/fileManagers/ProductManager.js";

import mongoose from "mongoose";

import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import messageModel from "./dao/Models/chat.models.js";
import Products from "./dao/Service/productos.service.js";

const app = express();
const CS = new chatService();
const PS = new Products();
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

app.use("/", viewsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);

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
      await PS.saveProducts(newProduct);
      const newProductList = await PS.getAll();
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

// BASE DE DATOS

mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority"
);

app.use("*", (req, res) => {
  res.send("No existe esta direccion");
});
