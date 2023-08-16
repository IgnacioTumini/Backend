import { Router } from "express";
import { UServices } from "../dao/Service/users.service.js";
import { CServices } from "../dao/Service/carts.service.js";
import { userController } from "../controller/usersController.js";

const router = Router();
// traer todos los usuarios
router.get("/", userController.getAll);

//crear usuario
router.post("/", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

export default router;
