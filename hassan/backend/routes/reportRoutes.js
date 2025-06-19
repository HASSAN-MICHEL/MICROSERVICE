import express from 'express';
import { getDailyReport,  validateDailyReport,  validateMonthlyReport ,  getStockReport  ,  getDailySalesReport, getDayReport ,  downloadMonthlyReport  , getMonthlySalesReport,downloadDailyReport,} from '../controllers/reportController.js';

const router = express.Router();

router.get('/daily', getDailyReport);
router.get('/stock', getStockReport);
router.get('/day', getDayReport);

router.get('/monthly', getMonthlySalesReport);
router.get('/daily/download', downloadDailyReport);
router.get('/monthly/download', downloadMonthlyReport);

// Dans votre fichier de routes
router.get('/sales/daily', validateDailyReport, getDailySalesReport);
router.get('/sales/daily/download', validateDailyReport, downloadDailyReport);
router.get('/sales/monthly', validateMonthlyReport, getMonthlySalesReport);
router.get('/sales/monthly/download', validateMonthlyReport, downloadMonthlyReport);

export default router;