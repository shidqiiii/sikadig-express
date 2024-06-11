import { Router } from "express";
import menutypeController from "../controller/menutype.controller.js";

const router = Router();

router.get("/list", menutypeController.list);
router.get("/:menu_type_id", menutypeController.read);
router.post("/", menutypeController.create);
router.put("/:menu_type_id", menutypeController.update);
router.delete("/:menu_type_id", menutypeController.remove);

export default router;
