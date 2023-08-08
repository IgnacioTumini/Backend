import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./config.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import { Server } from "socket.io";
import chatService from "./dao/Service/chats.service.js";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import Products from "./dao/Service/productos.service.js";
import sessionRouter from "./routes/sessions.routes.js";
import cookierRouter from "./routes/cookies.routes.js";
import { checkAdmin } from "./Middlewares/Authenticate.js";
import initializedPassport from "./config/passport.config.js";
import passport from "passport";
import { connectSocketServer } from "./utils/SocketServer.js";

const app = express();
const CS = new chatService();
const PS = new Products();

// LEVANTAR EL SERVIDOR
const httpServer = app.listen(8080, () => console.log("Server up"));
connectSocketServer(httpServer);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// BASE DE DATOS

const connection = mongoose.connect(
  "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// SESION CON BASE DE DATOS
app.use(
  session({
    secret: "12345abcd",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        dbName: "ecommerce",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 3600,
    }),
  })
);
// PASSPORT
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/product", productRouter);

//ROUTES RENDERS
app.use("/realtimeproducts", checkAdmin, realTimeProductsRoutes);
app.use("/", homeRouter);
app.use("/", viewsRouter);
app.use("/cookie", cookierRouter);

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

app.use("*", (req, res) => {
  res.send("No existe esta direccion");
});
