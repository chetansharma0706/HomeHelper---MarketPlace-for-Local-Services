import express from "express";
import {
  createService,
  getAllServices,
  getService,
  getUserServices,
  deleteService,
} from "../controllers/service.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/create", upload.single("banner"), createService);
router.post("/update", () => {});
router.post("/delete", () => {});
router.post("/getUserServices", getUserServices);
router.get("/getAllServices", getAllServices);
router.post("/getService", getService);
router.delete("/deleteService/:serviceId", deleteService);

export default router;
