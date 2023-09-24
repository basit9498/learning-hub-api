import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  addAnswerQuestion,
  addQuestion,
  addReplayToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controller/course.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-course", getAllCourse);

courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", isAuthenticated, addQuestion);

courseRouter.put("/add-answer", isAuthenticated, addAnswerQuestion);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);

courseRouter.put("/add-replay", isAuthenticated, addReplayToReview);

courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRole("admin"),
  getAllCourses
);

courseRouter.delete(
  "/delete-courses/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
