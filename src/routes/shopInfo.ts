import express from "express";
import asyncMiddleware from "../middlewares/async";
import shopInforController from "../modules/shopInfor/controllers";
import ROLES from "../constants/roles";
import { validateCreateShopInfos } from "../validations/shopInfo";

const router = express.Router();
router.post("/shop-infor", validateCreateShopInfos(ROLES.ADMIN), asyncMiddleware(shopInforController.createOrUpdateShopInfor));
router.get("/shop-infor", asyncMiddleware(shopInforController.getShopInfor));
export default router;
