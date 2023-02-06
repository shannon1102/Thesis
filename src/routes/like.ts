import express from "express";
import asyncMiddleware from "../middlewares/async";
import likeController from "../modules/like/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/like", asyncMiddleware( likeController.likePost));

export default router;
