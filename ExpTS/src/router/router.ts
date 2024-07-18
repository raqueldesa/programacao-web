import { Router } from "express";
import mainController from "../controllers/main";

const router = Router();

router.get("/", mainController.index);
router.get("/sobre", mainController.sobre);
router.get("/lorem/:count", mainController.lorem);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);

export default router;
