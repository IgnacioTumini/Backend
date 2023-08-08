import { Router } from "express";

const router = Router();

router.get("/set", (req, res) => {
  try {
    return res
      .cookie("cookie-test", "informacion muy poderosa", {
        maxAge: 10000,
        signed: true,
      })
      .send({});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

router.get("/get", async (req, res) => {
  try {
    return res.send(req.signedCookies);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

router.get("/delete", async (req, res) => {
  try {
    return res.clearCookie("cookie-test").send("Cookie Removed");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

router.get("/session", async (req, res) => {
  try {
    if (req.session.cont) {
      req.session.cont++;
      res.send("nos visitaste " + req.session.cont);
    } else {
      req.session.cont = 1;
      res.send("bienvenido");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Error getting the products" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "nacho" || password !== "1234") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success!");
});

router.get("/perfil", (req, res) => {
  if (req.session && req.session.user) {
    return res.send("logueado como admin o usuario");
  } else {
    return res.send("no estas logueado");
  }
});

export default router;
