import { Router } from "express";
const router = Router();
import signupController from "../controllers/signupController.js";
import passport from "passport";

router.get("/", signupController.getSignupPage);

router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/gallery",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

export default router;
