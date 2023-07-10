import express from "express";
import productRouter from "../src/routes/productRoutes.js";
import cartRouter from "../src/routes/cartRoutes.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

import mongoose from "mongoose";

import viewsRouter from "./routes/views.routes.js";
import courseRouter from "./routes/courses.routes.js";
import usersRoutes from "./routes/users.routes.js";

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

//app.use("/api/users", usersRoutes);
app.use("/", viewsRouter);
app.use("/api/courses", courseRouter);
app.use("/api/users", usersRoutes);

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

// BASE DE DATOS

mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority"
);
