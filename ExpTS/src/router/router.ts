import { Router } from "express";
import mainController from "../controllers/main";
import produtoController from "../controllers/produtos";
import majorController from "../controllers/major";
import authController from "../controllers/auth";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/create-cookie", mainController.createCookie);
router.get("/clear-cookie", mainController.clearCookie);

router.get("/uuid", mainController.uuid);

router.get("/", mainController.index);
router.get("/sobre", mainController.sobre);
router.get("/lorem/:count", mainController.lorem);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);

//Controlador Produto
router.get("/produto", produtoController.index);
router.get("/produto/create", produtoController.create);
router.post("/produto/create", produtoController.create);
router.get("/produto/update/:id", produtoController.update);
router.post("/produto/update/:id", produtoController.update);
router.get("/produto/:id", produtoController.read);
router.post("/produto/:id", produtoController.remove);

//Controlador Major
router.get("/major", majorController.index);
router.get("/major/create", checkAuth, majorController.create);
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/update/:id", majorController.update);
router.post("/major/update/:id", majorController.update);
router.get("/major/remove/:id", majorController.remove);

//Controlador Auth
router.get("/auth/signup", authController.signup);
router.post("/auth/signup", authController.signup);
router.get("/auth/login", authController.login);
router.post("/auth/login", authController.login);
router.get("/auth/logout", authController.logout);

export default router;
