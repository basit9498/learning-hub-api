import { Response } from "express";
import UserModel from "../models/user.model";

export const getUserById = async (id: string, res: Response) => {
  const user = await UserModel.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
};

export const getAllUsersService = async (res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
};

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const users = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(200).json({
    success: true,
    users,
  });
};
