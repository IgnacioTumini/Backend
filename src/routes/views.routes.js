import { Router } from "express";
import Courses from "../dao/dbManagers/carts.js";
import Users from "../dao/dbManagers/productos.js";

const courseManager = new Courses();
const userManager = new Users();
const router = Router();

//chatbox
router.get("/", (req, res) => {
  res.render("chat");
});

router.get("/", async (req, res) => {
  let users = await userManager.getAll();
  console.log(users);
  res.send("users", { users });
});

router.get("/courses", async (req, res) => {
  let courses = await courseManager.getAll();
  console.log(courses);
  res.render("courses", { courses });
});

export default router;
