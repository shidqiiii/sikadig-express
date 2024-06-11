import { Router } from "express";
import roleController from "../controller/role.controller.js";

const router = Router();

router.get("/list", roleController.list);
router.get("/:role_id", roleController.read);
router.post("/", roleController.create);
router.put("/:role_id", roleController.update);
router.delete("/:role_id", roleController.remove);

export default router;
