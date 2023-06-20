import express from "express";

const router = express.Router();

let food = [
  {
    name: "pera",
    price: "10",
  },
  {
    name: "manzana",
    price: "15",
  },
  {
    name: "banana",
    price: "20",
  },
];

router.get("/", (req, res) => {
  let usuario = {
    name: "Veronica",
    rol: "user",
  };
  res.render("index", {
    user: usuario,
    style: "index.css",
    isAdmin: usuario.rol === "admin",
    food,
  });
});

export default router;
