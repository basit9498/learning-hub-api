import { Response } from "express";
import CourseModel from "../models/course.model";
import CatchAsyncError from "../middleware/catchAsyncError";

// create course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

export const getAllCourseService = async (res: Response) => {
  const users = await CourseModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
};
