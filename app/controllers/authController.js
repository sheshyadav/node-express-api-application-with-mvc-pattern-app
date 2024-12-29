import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import db from "../models/index.js";
import message from "../../lang/messages.js";
import { getErrors } from "../helpers/helpers.js";
import { generateToken } from "../../config/jwtconfig.js";

export default class AuthController {
  /**----- user login function -----**/
  static async login(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          status: "error",
          data: getErrors(errors),
          message: message("400"),
        });
      }

      const { email, password } = request.body;
      const user = await db.User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        return response.status(200).json({
          status: "success",
          message: message("login", {name:user.name}),
          token: generateToken(user),
        });
      }

      return response.status(400).json({
        status: "error",
        message: message("loginError"),
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /**----- user register function -----**/
  static async register(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          status: "error",
          data: getErrors(errors),
          message: message("400"),
        });
      }

      let hashedPassword = await bcrypt.hash(request.body.password, 8);
      let { name, email } = request.body;
      const user = await db.User.create({
        name,
        email,
        password: hashedPassword,
        role: "1",
        status: 1,
      });
      
      return response.status(200).json({
        status: "success",
        message: message("register", {name}),
        token: generateToken(user)
      });

    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
