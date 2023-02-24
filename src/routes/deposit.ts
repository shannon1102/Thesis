import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import depositController from "../modules/deposit/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/deposits", asyncMiddleware(depositController.createDeposit));
// router.put("/deposits/:id", asyncMiddleware(depositController.getDepositById));
router.get("/deposits", asyncMiddleware(depositController.getAllDeposits));
router.get("/deposits/:id", asyncMiddleware(depositController.getDepositById));
router.delete("/deposits/:id", asyncMiddleware(depositController.deleteDeposit));

export default router;
