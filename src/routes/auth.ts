import express from "express";
import auth from "../modules/auth/controllers";
import asyncMiddleware from "../middlewares/async";

const router = express.Router();

router.post("/auth/register", asyncMiddleware(auth.register));
router.post("/auth/register-by-device", asyncMiddleware(auth.createUserByDevice));
router.post("/auth/login", asyncMiddleware(auth.login));
router.get("/me", asyncMiddleware(auth.me));
router.get("/profile/:userId", asyncMiddleware(auth.getUserInfo));
router.put("/me/password", asyncMiddleware(auth.updatePassword));
router.put("/me", asyncMiddleware(auth.updateInfo));
router.get("/users", asyncMiddleware(auth.getAllUsers));
router.delete("/users/:userId", asyncMiddleware(auth.deleteUser));
export default router;
