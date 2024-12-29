import express from "express";
import authController from "../app/controllers/authController.js";
import { loginValidator, registerValidator } from "../app/validator/index.js";
const router = express.Router();

router.route("/login").post(loginValidator, authController.login);
router.route("/register").post(registerValidator, authController.register);


export default router;
