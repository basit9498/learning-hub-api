import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controller/analytics.controller";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-user-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/get-course-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getCoursesAnalytics
);

analyticsRouter.get(
  "/get-order-analytics",
  isAuthenticated,
  authorizeRole("admin"),
  getOrderAnalytics
);

export default analyticsRouter;
