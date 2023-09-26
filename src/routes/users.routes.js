import { Router } from "express";
import { userController } from "../controller/usersController.js";
import { checkAdmin } from "../Middlewares/Authenticate.js";

const router = Router();
// traer todos los usuarios
router.get("/", userController.getAll);

//crear usuario
router.post("/", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

router.get("/premium/:uid", checkAdmin, userController.updateRole);

export default router;
