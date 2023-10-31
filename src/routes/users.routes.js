import { Router } from "express";
import { userController } from "../controller/usersController.js";
import { checkAdmin } from "../Middlewares/Authenticate.js";

const router = Router();
// traer todos los usuarios
router.get("/", userController.getAll);

//crear usuario
router.post("/", userController.create);
// Actualizar usuario (postman)
router.put("/:id", userController.update);
//eliminiar user
router.delete("/:id", userController.delete);
//cambio de roll
router.get("/premium/:uid", checkAdmin, userController.updateRole);


export default router;
