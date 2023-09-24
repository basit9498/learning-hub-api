import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayout,
} from "../controller/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRole("admin"),
  editLayout
);

layoutRouter.get("/get-layout/:type", getLayout);

export default layoutRouter;
