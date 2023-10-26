// v

export function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}
// verifica si es admin
export function checkAdmin(req, res, next) {
  if (req.session.user.role == "admin") {
    return next();
  } else {
    return res.render("error");
  }
}
// verifica que el usuario tenga el mismo carrito al que desea agregar un producto
export function checkUser(req, res, next) {
  if (req.session.user.cid == req.params.cid) {
    return next();
  } else {
    return res.send({ message: "No correspode al carrito del usuario" });
  }
}
// agregar productos admin y premium
export function PublishCredentials(req, res, next) {
  if (req.session.user.role == "admin" || req.session.user.role == "premium") {
    return next();
  } else {
    return res.render("error");
  }
}
