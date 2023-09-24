import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrders
);

export default orderRouter;
