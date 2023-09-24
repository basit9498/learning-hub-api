import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotificationStatus,
} from "../controller/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-notification",
  isAuthenticated,
  authorizeRole("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateNotificationStatus
);

export default notificationRouter;
