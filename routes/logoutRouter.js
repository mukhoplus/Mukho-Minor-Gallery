import { Router } from "express";
const router = Router();
import logoutController from "../controllers/logoutController.js";

router.get("/", logoutController.logout);

export default router;
