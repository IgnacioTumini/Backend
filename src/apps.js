// LIBRERIAS //
import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./config.js";
import handlebars from "express-handlebars";
import passport from "passport";
import swaggerUiExpress from "swagger-ui-express";
// FIN LIBRERIAS //

import { connectMongo } from "./utils/dbConection.js";
import realTimeProductsRoutes from "./routes/realTimeProductsRoutes.js";
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import sessionRouter from "./routes/sessions.routes.js";
import cookierRouter from "./routes/cookies.routes.js";
import userRouter from "./routes/users.routes.js";
import { authenticate, checkAdmin } from "./Middlewares/Authenticate.js";
import initializedPassport from "./config/passport.config.js";
import homeRouter from "./routes/homeRoutes.js";
import env from "./config/enviroment.config.js";
import { connectSocketServer } from "./utils/socket-server.js";
import { logger } from "./utils/logs/logger.js";
import { recoverPassRoutes } from "./routes/recover-pass.routes.js";
import { spec } from "./utils/swagger.js";

const app = express();
const PORT = env.port;

// LEVANTAR EL SERVIDOR
const httpServer = app.listen(PORT, () =>
  logger.http(`Server up http://localhost:${PORT}`)
);
// SERVER EN TIEMPO REAL
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
// PASSPORT //
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());
// FIN PASSPORT //

// API ROUTES //
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/users", userRouter);
// FIN API ROUTES //

// ROUTES RENDERS //
app.use("/realtimeproducts", authenticate, checkAdmin, realTimeProductsRoutes);
app.use("/", homeRouter);
app.use("/", viewsRouter);
app.use("/cookie", cookierRouter);
app.use("/recover-pass", recoverPassRoutes);
// FIN ROUTES RENDERS //

// HANDLEBARS //
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
// FIN HANDLEBARS //

// DOCUMENTACION SWAGGER //
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
// FIN SWAGGER //

// EN CASO DE QUE LA RUTA NO EXISTA
app.use("*", (req, res) => {
  res.send("No existe esta direccion");
});
