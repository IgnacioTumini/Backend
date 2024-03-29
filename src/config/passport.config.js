import passport from "passport";
import local from "passport-local";
import userModel from "../dao/Models/mongoose/users.models.js";
import { createHast, isValidPassword } from "../config.js";
import GitHubStrategy from "passport-github2";
import { UServices } from "../dao/Models/Service/users.service.js";
import { CServices } from "../dao/Models/Service/carts.service.js";
import { logger } from "../utils/logs/logger.js";
import env from "./enviroment.config.js";

const LocalStrategy = local.Strategy;

const initializedPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age, role } = req.body;
        try {
          let user = await UServices.getBy({ email: email });
          if (user) {
            logger.info("User already exists");
            return done(null, false);
          }
          let userCart = await CServices.createCart();

          if (!userCart) {
            logger.error("Error en crear  un carrito para el usuario");
            return done(null, false);
          }
          if (
            (email == "adminCoder@coder.com") &
            (password == "adminCod3r123")
          ) {
            const newUser = {
              first_name,
              last_name,
              email,
              age,
              role,
              password: createHast(password),
              role: "admin",
              cid: userCart.cart._id.toString(),
            };
            let result = await UServices.create(newUser);
            return done(null, result);
          } else {
            const newUser = {
              first_name,
              last_name,
              email,
              age,
              role,
              password: createHast(password),
              cid: userCart.cart._id.toString(),
            };
            let result = await UServices.create(newUser);
            return done(null, result);
          }
        } catch (error) {
          return done("Error de usuaio" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          let user = await UServices.getBy({ email: email });
          if (!user) {
            logger.error("User already No exits");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          await UServices.update_connection(user._id);
          return done(null, user);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: env.clientID,
        clientSecret: env.clientSecret,
        callbackURL: env.callbackURL,
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);
          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;
          let user = await userModel.findOne({ email: profile.email });
          if (!user) {
            let userCart = await CServices.createCart();
            if (!userCart) {
              logger.error("Error en crear un carrito para el usuario");
              return done(null, false);
            }
            const newUser = {
              email: profile.email,
              first_name: profile._json.name || profile._json.login || "",
              last_name: "",
              isAdmin: false,
              password: "nopass",
              cid: userCart.cart._id.toString(),
            };
            let userCreated = await userModel.create(newUser);

            await UServices.update_connection(user._id);

            return done(null, userCreated);
          } else {
            logger.info("User already exists");

            await UServices.update_connection(user._id);

            return done(null, user);
          }
        } catch (e) {
          logger.error("Error en auth github");

          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let result = await UServices.getBy({ _id: id });
    done(null, result);
  });
};

export default initializedPassport;
