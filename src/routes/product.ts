
import express from "express";
import asyncMiddleware from "../middlewares/async";
import productController from "../modules/product/controllers";
import ROLES from "../constants/roles";
const router = express.Router();
router.post("/products", asyncMiddleware(productController.createProduct));
router.put("/products/:id", asyncMiddleware(productController.updateProduct));
router.get("/products", asyncMiddleware(productController.getProducts));
router.get("/products/:id", asyncMiddleware(productController.getProductById));
router.delete("/products/:id", asyncMiddleware(productController.deleteProduct));

export default router;
