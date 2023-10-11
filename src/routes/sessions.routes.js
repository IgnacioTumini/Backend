import { Router } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import userModel from "../dao/Models/mongoose/users.models.js";
import { createHast } from "../config.js";
import UsersDTO from "../controller/DTO/users.dto.js";
import { logger } from "../utils/logs/logger.js";

const router = Router();
router.use(cookieParser());

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
    

    const { email, password, first_name, last_name, age, cid } = req.body;

    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect Password" });

    req.session.user = {
      _id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      password: req.user.password,
      cid: req.user.cid,
    };
    return res.redirect("/profile");
    //res.send({ status: "sucess", payload: req.user });
  }
);
router.get("/current", async (req, res) => {
  let user = req.session.user;
  let userDTO = new UsersDTO(user);
  res.send({ message: "User", payload: userDTO });
});

router.get("/faillogin", async (req, res) => {
  logger.error("Failed Estrategy");
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
