import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface iTokenOptions {
  expire: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const accessRefreshExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// option cookies

export const accessTokenOptions: iTokenOptions = {
  expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const accessRefreshOptions: iTokenOptions = {
  expire: new Date(Date.now() + accessRefreshExpire * 24 * 60 * 60 * 1000),
  maxAge: accessRefreshExpire * 24 * 60 * 60,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // upload session to redis
  redis.set(user._id, JSON.stringify(user));
  //token expires

  //   secure
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, accessRefreshOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
