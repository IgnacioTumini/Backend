import nodemailer from "nodemailer";
import env from "../config/enviroment.config.js";

export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: env.gmail,
    pass: env.pass,
  },
});
