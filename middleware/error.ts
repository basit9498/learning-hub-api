import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { error } from "console";

const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = "Recourse not founded. Invalid" + err.path;
    err = new ErrorHandler(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate" + Object.keys(err.KeyValues) + "entered";
    err = new ErrorHandler(message, 404);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "JsonWebTokenError . Invalid Please try again";
    err = new ErrorHandler(message, 404);
  }

  if (err.name === "TokenExpiredError") {
    const message = "JsonWebTokenError . Expire Please try again";
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
