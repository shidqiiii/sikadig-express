import { Router } from "express";
import userController from "../controller/user.controller.js";

const router = Router();

router.get("/list", userController.list);
router.get("/:user_id", userController.read);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/:user_id", userController.update);

export default router;
