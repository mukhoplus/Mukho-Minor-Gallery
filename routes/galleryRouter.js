const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.redirectToGallery);
router.get("/:page", galleryController.renderGallery);

module.exports = router;
