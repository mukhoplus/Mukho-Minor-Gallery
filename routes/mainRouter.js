import { Router } from "express";
const router = Router();
import mainController from "../controllers/mainController.js";

router.get("/", mainController.getMainPage);

router.post("/", mainController.login);

export default router;
