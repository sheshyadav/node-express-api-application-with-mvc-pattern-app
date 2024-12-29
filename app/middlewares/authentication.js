import jwt from "jsonwebtoken";
import message from "../../lang/messages.js";
import { ApiError } from "./ApiError.js";
import jwtSecret from "../../config/jwtconfig.js";

export function userAccess(request, response, next) {
  if (1) {
    throw new ApiError(403, message("403"));
  }
  next();
}

export function validateToken(request, response, next) {
  try {
    if (!request.headers.authorization) {
      throw new ApiError(401, message("401"));
    }
    const token = request.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, jwtSecret);
      request.user = decoded;
    } catch (error) {
      throw new ApiError(401, message("401"));
    }
  } catch (error) {
    throw new ApiError(error.status, error.message);
  }
  next();
}
