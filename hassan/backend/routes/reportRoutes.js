import express from 'express';
import { getDailyReport, getStockReport  , getDayReport ,  downloadMonthlyReport  , getMonthlySalesReport,downloadDailyReport,} from '../controllers/reportController.js';

const router = express.Router();

router.get('/daily', getDailyReport);
router.get('/stock', getStockReport);
router.get('/day', getDayReport);

router.get('/monthly', getMonthlySalesReport);
router.get('/daily/download', downloadDailyReport);
router.get('/monthly/download', downloadMonthlyReport);

export default router;