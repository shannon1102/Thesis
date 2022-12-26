import express from "express";
import asyncMiddleware from "../middlewares/async";
import vendorControllers from "../modules/vendor/controllers";
const router = express.Router();

router.post("/admin/vendors", asyncMiddleware(vendorControllers.createVendor));
router.get("/vendors", asyncMiddleware(vendorControllers.getVendors));
router.get("/vendors/:id", asyncMiddleware(vendorControllers.getVendorById));
router.put("/admin/vendors/:id", asyncMiddleware(vendorControllers.updateVendor));
router.delete("/admin/vendors/:id", asyncMiddleware(vendorControllers.deleteVendor));

export default router;
