import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";

const router = Router();

// Create a new order
router.post("/", protectRoute, createOrder);

// Get orders for the logged-in userF
router.get("/", protectRoute, getUserOrders);

export default router;
