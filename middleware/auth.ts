import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../utils/redis";
import UserModel from "../models/user.model";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return next(new ErrorHandler("Please login ", 400));
    }

    const decode = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as Secret
    ) as JwtPayload;

    if (!decode) {
      return next(new ErrorHandler("Token is not valid  ", 400));
    }

    // const user = redis.get(decode.id);
    const user = await UserModel.findById(decode.id);
    if (!user) {
      return next(new ErrorHandler("Token is not valid  ", 400));
    }
    // req.user=JSON.parse(user)
    req.user = user;
    next();
  }
);

export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(new ErrorHandler("Not Access this recourse", 403));
    }

    next();
  };
};
