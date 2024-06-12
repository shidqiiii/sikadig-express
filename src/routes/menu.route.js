import { Router } from "express";
import menuController from "../controller/menu.controller.js";

const router = Router();

router.get("/list", menuController.list);
router.get("/:menu_id", menuController.read);
router.post("/", menuController.create);
router.put("/:menu_id", menuController.update);
router.delete("/:menu_id", menuController.remove);

export default router;
