import express from 'express';
import {
  createSale,
  confirmSale,
  cancelSale,
  updateSaleItems,
  getSaleDetails,
  getAllSales,
} from '../controllers/SaleController.js';

const router = express.Router();

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/:id', getSaleDetails);
router.put('/:id/confirm', confirmSale);
router.put('/:id/cancel', cancelSale);
router.put('/:id/items', updateSaleItems);

export default router;