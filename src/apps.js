import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./config.js";
import handlebars from "express-handlebars";
import homeRouter from "./routes/homeRoutes.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import sessionRouter from "./routes/sessions.routes.js";
import cookierRouter from "./routes/cookies.routes.js";
import userRouter from "./routes/users.routes.js";
import { authenticate, checkAdmin } from "./Middlewares/Authenticate.js";
import initializedPassport from "./config/passport.config.js";
import passport from "passport";
import { connectMongo } from "./utils/dbConection.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import env from "./config/enviroment.config.js";
import nodemailer from "nodemailer";
import { connectSocketServer } from "./utils/socket-server.js";
import { logger } from "./utils/logs/logger.js";
import { recoverPassRoutes } from "./routes/recover-pass.routes.js";

const app = express();
const PORT = env.port;

// LEVANTAR EL SERVIDOR
const httpServer = app.listen(PORT, () =>
  logger.http(`Server up http://localhost:${PORT}`)
);

connectSocketServer(httpServer);
// CONECCION CON LA BASE DE DATOS
connectMongo();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESION CON BASE DE DATOS
app.use(
  session({
    secret: "12345abcd",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
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
app.use("/api/users", userRouter);

//ROUTES RENDERS
app.use("/realtimeproducts", authenticate, checkAdmin, realTimeProductsRoutes);
app.use("/", homeRouter);
app.use("/", viewsRouter);
app.use("/cookie", cookierRouter);
app.use("/recover-pass", recoverPassRoutes);

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

// DOCUMENTACION SWAGGER //

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Documentacion de las APIs",
      description: " Informacion de Productos y de el Carrito",
      version: "1.0.0",
      contact: {
        name: "Ignacio Tumini",
        url: "https://www.linkedin.com/in/ignacio-tumini-949506233/",
      },
    },
  },

  apis: [`${process.cwd()}/src/docs/*.yaml`],
};
const spec = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

// FIN DOCUMENTACION SWAGGER //

// EN CASO DE QUE LA RUTA NO EXISTA
app.use("*", (req, res) => {
  res.send("No existe esta direccion");
});
