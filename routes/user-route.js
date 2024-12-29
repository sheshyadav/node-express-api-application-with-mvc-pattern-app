import express from "express";
import userController from "../app/controllers/userController.js";
import { validateToken } from '../app/middlewares/authentication.js';
import { uidValidate } from "../app/validator/index.js";
const router = express.Router();

router.route("/user/:id").get(validateToken, uidValidate, userController.getUser);


export default router;