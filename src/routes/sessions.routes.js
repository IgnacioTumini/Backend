import { Router } from "express";
import userModel from "../dao/Models/users.models.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email });

  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "Users already exists" });

  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
  };

  await userModel.create(user);
  res.redirect("/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });

  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect credentials" });

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  res.redirect("/products");
});

router.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(400).json({ message: "No se pudo cerrar sesion" });
    }
    return res.redirect("/");
  });
});

export default router;
