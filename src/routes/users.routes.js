import { Router } from "express";
import User from "../dao/Service/users.service.js";
import Carts from "../dao/Service/carts.service.js";

const US = new User();
const CS = new Carts();
const router = Router();

router.get("/", async (req, res) => {
  let users = await US.getAll();
  if (!users)
    return res.status(500).send({
      status: "error",
      error: "Couldn't get users due to internal error",
    });
  res.send({ status: "success", payload: users });
});

router.post("/", async (req, res) => {
  let { first_name, last_name, email, age, role, password } = req.body;
  if (!first_name || !last_name || !email || !age || !role)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  let result = await usersManager.saveUser({
    first_name,
    last_name,
    email,
    age,
    role,
    gender,
    password,
  });
  if (!result)
    return res.status(500).send({ status: "success", payload: result });
  res.send({ status: "success", payload: result });
});
router.post("/:uid/courses/:cid", async (req, res) => {
  const { uid, cid } = req.params;
  const cart = await CS.getCartById(cid);
  if (!cart)
    return res.status(404).send({ status: "error", error: "course not found" });
  const user = await US.getBy({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", error: "user not found" });
  let cartsExits = user.cid.some((c) => c._id.toString() === cid);
  if (cartsExits)
    return res
      .status(400)
      .send({ status: "error", error: "user is ready course register" });
  user.cid.push(cart._id);
  course.product.push(user._id);
  await US.updateUser(uid, user);
  await CS.createCart(cid, cart);
  res.send({ status: "sucess", message: "User add course" });
});

export default router;
