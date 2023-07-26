export function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

export function checkAdmin(req, res, next) {
  if (req.session?.user && req.session.user.role == "admin") {
    return next();
  } else {
    return res.render("error");
  }
}
