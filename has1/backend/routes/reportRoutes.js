import express from 'express';
import { getDailyReport, getStockReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/daily', getDailyReport);
router.get('/stock', getStockReport);

export default router;