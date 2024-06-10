import express from "express";
import { loginUser, logoutUser, resetNewPassword, resetPassword, signupUser } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/reset", resetPassword);
router.post("/newpassword", resetNewPassword);

export default router;