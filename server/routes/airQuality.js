import express from "express";
import { getDeviceID, getAirQualityData } from "../controllers/airQuality.js";

const router = express.Router();

router.get("/getDeviceID", getDeviceID);
router.get("/getAirQualityData", getAirQualityData);

export default router;
