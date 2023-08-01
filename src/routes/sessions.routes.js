import { Router } from "express";
import userModel from "../dao/Models/users.models.js";
import cookieParser from "cookie-parser";
import { createHast, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();
router.use(cookieParser());
/*
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email });

  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "Users already exists" });

  if ((email == "adminCoder@coder.com") & (password == "adminCod3r123")) {
    const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHast(password),
      role: "admin",
    };
    await userModel.create(user);
  } else {
    const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHast(password),
    };
    await userModel.create(user);
  }

  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "error", error: "Error user" });
  }

  const user = await userModel.findOne(
    { email: email },
    { email: 1, first_name: 1, last_name: 1, password: 1, age: 1, role: 1 }
  );

  if (!user)
    return res.status(400).send({ status: "error", error: "Error user" });

  if (!isValidPassword(user, password)) {
    return res
      .status(403)
      .send({ status: "error", error: "Incorrect credentials" });
  }
  req.session.user = user;
  res.redirect("/profile");
});
*/
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(400).json({ message: "No se pudo cerrar sesion" });
    }
    return res.redirect("/");
  });
});

router.post("/restartPassword", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete Values" });
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(404).send({ status: "error", error: "Not user found" });
  const newHashedPassword = createHast(password);
  await userModel.updateOne(
    { _id: user._id },
    { $set: { password: newHashedPassword } }
  );

  return res.redirect("/");
  /*res.send({ status: "success", message: "Contraseña restaurada" });*/
});

//estrategia de implementacion con passport

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    return res.redirect("/");
    //res.send({ status: "success", message: "User Register" });
  }
);

router.get("/failregister", async (req, res) => {
  res.send({ error: "failed" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    console.log("Probando el ingreso a la estrategia");

    const { email, password, first_name, last_name, age } = req.body;

    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect Password" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };
    return res.redirect("/profile");
    //res.send({ status: "sucess", payload: req.user });
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Failed Estrategy");
  res.send({ error: "failed" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    req.session.user = req.user;

    res.redirect("/profile");
  }
);

export default router;
