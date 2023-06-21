import express from "express";
import http from "http";
import productRouter from "../src/routes/productRoutes.js";
import cartRouter from "../src/routes/cartRoutes.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import { Server } from "socket.io";

const app = express();

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

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

// Sockets
socketServer.on("connection", (socket) => {
  console.log("Nuevo Cliente");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit("evento_para_socket", "mensaje para que reciba el socket");
});
