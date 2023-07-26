import { Router } from "express";
const router = Router();
import galleryController from "../controllers/galleryController.js";

router.get("/", galleryController.redirectToGallery);
router.get("/:page", galleryController.renderGallery);

export default router;
