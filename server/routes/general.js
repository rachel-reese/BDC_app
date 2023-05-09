import express from 'express';
import { getDeviceStatus } from '../controllers/general.js';

const router = express.Router();
router.get("/getDeviceStatus", getDeviceStatus)

export default router;
