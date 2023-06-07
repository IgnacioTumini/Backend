import express from "express";
import http from "http";
import ProductManager from "../src/ProductManager.js";

const app = express();
const managers = new ProductManager(`../src/Productos`);

let products = await managers.getProducts();

app.get("/products", (req, res) => {
  let query = req.query;

  if (!!query.limit) {
    let limit = parseInt(query.limit);

    let productLimit = [];

    for (let i = 0; i < limit; i++) {
      productLimit.push(products[i]);
    }
    res.send(productLimit);
  } else {
    res.send(products);
  }
});
app.get("/products/:pid", (req, res) => {
  let idUsuarioCapturado = req.params.pid;

  let idUsuarioFiltrado = products.find((u) => u.id == idUsuarioCapturado);

  if (!idUsuarioFiltrado) return res.send({ error: "Usuario no encontrado" });

  res.send({ idUsuarioFiltrado });
});

app.listen(8080, () => console.log("Servidor up"));

/*const servidor = http.createServer((request, response) => {
  response.end("Mi promer hola desde el backend");
});

servidor.listen(8080, () => {
  console.log("Servidor arriba");
});*/
