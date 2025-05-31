// // // import express from 'express';
// // // import {
// // //   createSale,
// // //   confirmSale,
// // //   cancelSale,
// // //   updateSaleItems,
// // //   getSaleDetails,
// // //   getAllSales,
// // // } from '../controllers/SaleController.js';

// // // const router = express.Router();

// // // router.post('/', createSale);
// // // router.get('/', getAllSales);
// // // router.get('/:id', getSaleDetails);
// // // router.put('/:id/confirm', confirmSale);
// // // router.put('/:id/cancel', cancelSale);
// // // router.put('/:id/items', updateSaleItems);

// // // export default router;


// // import express from 'express';
// // import {
// //   createSale,
// //   updateSaleItems,
// //   getSaleDetails,
// //   getAllSales,
// // } from '../controllers/SaleController.js';

// // const router = express.Router();

// // router.post('/', createSale);
// // // router.get('/', getAllSales);
// // router.get('/:id', getSaleDetails);
// // // router.put('/:id/confirm', confirmSale);
// // // router.put('/:id/cancel', cancelSale);
// // // router.put('/:id/items', updateSaleItems);

// // export default router;


// import express from 'express';
// import {
//   createSale,
//   confirmSale,
//   cancelSale,
//   updateSaleItems,
//   getSaleDetails,
//   getAllSales,downloadInvoice,
// }  from '../controllers/SaleController.js';


// const router = express.Router();

// router.post('/', createSale);
// router.get('/', getAllSales);
// router.get('/:id', getSaleDetails);
// router.put('/:id/confirm', confirmSale);
// router.put('/:id/cancel', cancelSale);
// router.put('/:id/items', updateSaleItems);



// router.get('/:id/invoice', downloadInvoice);
// export default router;


import express from 'express';
import {
  createSale,
  confirmSale,
  cancelSale,
  updateSaleItems,
  getSaleDetails,
  getAllSales,
  downloadInvoice
} from '../controllers/saleController.js';

const router = express.Router();

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/:id', getSaleDetails);
router.get('/:id/invoice', downloadInvoice); // Nouvelle route pour le téléchargement
router.put('/:id/confirm', confirmSale);
router.put('/:id/cancel', cancelSale);
router.put('/:id/items', updateSaleItems);

export default router;