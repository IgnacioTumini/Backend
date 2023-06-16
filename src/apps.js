import express from "express";
import http from "http";
import productRouter from "../src/routes/productRoutes.js";
import cartRouter from "../src/routes/cartRoutes.js";

const app = express();

//app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// LEVANTAR EL SERVIDOR
app.listen(8080, () => console.log("Server up"));
