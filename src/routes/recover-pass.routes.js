import express from "express";
import { recoverPassController } from "../controller/recover-pass.controller.js";

export const recoverPassRoutes = express.Router();

recoverPassRoutes.post("/", recoverPassController.recoveryPass);
recoverPassRoutes.get("/reset-pass", recoverPassController.checkCode);
recoverPassRoutes.post("/new-password", recoverPassController.updatePassword);
