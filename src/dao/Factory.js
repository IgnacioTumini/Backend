import mongoose from "mongoose";
import { PServices } from "./Models/Service/productos.service.js";
import { CServices } from "./Models/Service/carts.service.js";
import { UServices } from "./Models/Service/users.service.js";
import productsMemory from "./memory/products.memory.js";
import cartsMemory from "./memory/carts.memory.js";
import usersMemory from "./memory/users.memory.js";
import env from "../config/enviroment.config.js";

async function importModels() {
  let models;

  switch (env.persistence) {
    case "MONGO":
      models = {
        products: PServices,
        carts: CServices,
        users: UServices,
      };
      break;

    case "MEMORY":
      models = {
        products: productsMemory,
        users: usersMemory,
        carts: cartsMemory,
      };
      break;

    default:
      throw new Error("Persistencia no valida");
  }

  return models;
}

export default importModels;
