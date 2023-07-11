import express from "express";
import Chat from "../dao/dbManagers/chats.js";


const chatManager = new Chat();
const router = express.Router();

router.get("/", (req, res) => {});

export default router;
