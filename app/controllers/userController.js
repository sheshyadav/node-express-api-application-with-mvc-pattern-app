import { validationResult } from "express-validator";
import message from "../../lang/messages.js";
import { getErrors } from "../helpers/helpers.js";

export default class UserController {
  static async getUser(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          status: "error",
          data: getErrors(errors),
          message: message("400"),
        });
      }

      return response.status(200).json({
        status: "success",
        data: request.user,
        message: message("200"),
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
