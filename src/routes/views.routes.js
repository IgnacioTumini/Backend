import { Router } from "express";
import Courses from "../dao/dbManagers/carts.service.js";
import Users from "../dao/dbManagers/productos.service.js";

const courseManager = new Courses();
const userManager = new Users();
const router = Router();

//chatbox
router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/product", async (req, res) => {
  let users = await userManager.getAll();
  console.log(users);
  res.send("users", { users });
});

router.get("/cart", async (req, res) => {
  let courses = await courseManager.getAll();
  console.log(courses);
  res.render("courses", { courses });
});

export default router;
