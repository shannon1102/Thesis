import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import paymentController from "../modules/payment/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/payments", asyncMiddleware(paymentController.createPayment));
// router.put("/payments/:id", asyncMiddleware(paymentController.getDepositById));
export default router;
