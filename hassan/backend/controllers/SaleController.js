// // import Sale from '../models/Sale.js';
// // import SaleItem from '../models/SaleItem.js';
// // import Product from '../models/Product.js';
// // import Invoice from '../models/Invoice.js';
// // //import { generateInvoice } from '../services/pdfService.js';

// // export const createSale = async (req, res) => {
// //   try {
// //     const { client_name, items, packaging_included } = req.body;
    
// //     // Calculate total amount
// //     let total_amount = 0;
// //     for (const item of items) {
// //       const product = await Product.findById(item.product_id);
// //       total_amount += product.price * item.quantity;
// //     }

// //     // Create sale
// //     const sale = await Sale.create({ client_name, total_amount, packaging_included });

// //     // Create sale items
// //     for (const item of items) {
// //       const product = await Product.findById(item.product_id);
// //       await SaleItem.create({
// //         sale_id: sale.id,
// //         product_id: item.product_id,
// //         quantity: item.quantity,
// //         unit_price: product.price,
// //       });
      
// //       // Update stock (temporarily reserved)
// //       await Product.updateStock(item.product_id, -item.quantity);
// //     }

// //     res.status(201).json(sale);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const confirmSale = async (req, res) => {
// //   try {
// //     const sale = await Sale.confirmSale(req.params.id);
    
// //     // Generate invoice
// //     const invoice_number = `FCT${String(sale.id).padStart(6, '0')}`;
// //     const invoicePath = await generateInvoice(sale.id);
    
// //     await Invoice.create({
// //       sale_id: sale.id,
// //       invoice_number,
// //       total_amount: sale.total_amount,
// //       file_path: invoicePath,
// //     });

// //     res.json(sale);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const cancelSale = async (req, res) => {
// //   try {
// //     const sale = await Sale.cancelSale(req.params.id);
    
// //     // Return products to stock
// //     const items = await SaleItem.findBySaleId(sale.id);
// //     for (const item of items) {
// //       if (item.status !== 'cancelled') {
// //         await Product.updateStock(item.product_id, item.quantity);
// //         await SaleItem.cancelItem(item.id);
// //       }
// //     }

// //     res.json(sale);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const updateSaleItems = async (req, res) => {
// //   try {
// //     const { addedItems, removedItems } = req.body;
// //     const saleId = req.params.id;
    
// //     const sale = await Sale.findById(saleId);
// //     if (sale.status === 'confirmed') {
// //       return res.status(400).json({ error: 'Cannot modify confirmed sale' });
// //     }

// //     // Add new items
// //     let total_amount = sale.total_amount;
// //     for (const item of addedItems) {
// //       const product = await Product.findById(item.product_id);
// //       const saleItem = await SaleItem.create({
// //         sale_id: saleId,
// //         product_id: item.product_id,
// //         quantity: item.quantity,
// //         unit_price: product.price,
// //       });
// //       total_amount += product.price * item.quantity;
      
// //       // Update stock
// //       await Product.updateStock(item.product_id, -item.quantity);
// //     }

// //     // Remove items
// //     for (const itemId of removedItems) {
// //       const item = await SaleItem.cancelItem(itemId);
// //       total_amount -= item.unit_price * item.quantity;
      
// //       // Return to stock
// //       await Product.updateStock(item.product_id, item.quantity);
// //     }

// //     // Update sale total
// //     await Sale.updateTotal(saleId, total_amount);

// //     const updatedSale = await Sale.findById(saleId);
// //     res.json(updatedSale);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const getSaleDetails = async (req, res) => {
// //   try {
// //     const sale = await Sale.findById(req.params.id);
// //     if (!sale) {
// //       return res.status(404).json({ error: 'Sale not found' });
// //     }

// //     const items = await SaleItem.findBySaleId(sale.id);
// //     res.json({ sale, items });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const getAllSales = async (req, res) => {
// //   try {
// //     const sales = await Sale.findAll();
// //     res.json(sales);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// import Sale from '../models/Sale.js';
// import { generateInvoice } from '../services/invoiceService.js';

// export const createSale = async (req, res) => {
//   try {
//     const saleData = req.body;
    
//     // Valider les données
//     if (!saleData.items || saleData.items.length === 0) {
//       return res.status(400).json({ error: 'Aucun produit dans la vente' });
//     }
    
//     // Créer la vente
//     const sale = await Sale.create(saleData);
    
//     // Générer la facture
//     const invoicePath = await generateInvoice(sale);
    
//     res.status(201).json({
//       success: true,
//       sale,
//       invoiceUrl: `/invoices/${invoicePath}`
//     });
    
//   } catch (error) {
//     console.error('Erreur création vente:', error);
//     res.status(500).json({ 
//       error: error.message || 'Erreur lors de la création de la vente' 
//     });
//   }
// };

// export const getSaleDetails = async (req, res) => {
//   try {
//     const sale = await Sale.findById(req.params.id);
    
//     if (!sale) {
//       return res.status(404).json({ error: 'Vente non trouvée' });
//     }
    
//     res.json(sale);
//   } catch (error) {
//     console.error('Erreur récupération vente:', error);
//     res.status(500).json({ error: 'Erreur serveur' });
//   }
// };


import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';
import Invoice from '../models/Invoice.js';
import { generateInvoice } from '../services/pdfService.js';

export const createSale = async (req, res) => {
  try {
    const { client_name, items, packaging_included } = req.body;
    
    // Calculate total amount
    let total_amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      total_amount += product.price * item.quantity;
    }

    // Create sale
    const sale = await Sale.create({ client_name, total_amount, packaging_included });

    // Create sale items
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      await SaleItem.create({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
      });
      
      // Update stock (temporarily reserved)
      await Product.updateStock(item.product_id, -item.quantity);
    }

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmSale = async (req, res) => {
  try {
    const sale = await Sale.confirmSale(req.params.id);
    
    // Generate invoice
    const invoice_number = `FCT${String(sale.id).padStart(6, '0')}`;
    const invoicePath = await generateInvoice(sale.id);
    
    await Invoice.create({
      sale_id: sale.id,
      invoice_number,
      total_amount: sale.total_amount,
      file_path: invoicePath,
    });

    res.json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelSale = async (req, res) => {
  try {
    const sale = await Sale.cancelSale(req.params.id);
    
    // Return products to stock
    const items = await SaleItem.findBySaleId(sale.id);
    for (const item of items) {
      if (item.status !== 'cancelled') {
        await Product.updateStock(item.product_id, item.quantity);
        await SaleItem.cancelItem(item.id);
      }
    }

    res.json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSaleItems = async (req, res) => {
  try {
    const { addedItems, removedItems } = req.body;
    const saleId = req.params.id;
    
    const sale = await Sale.findById(saleId);
    if (sale.status === 'confirmed') {
      return res.status(400).json({ error: 'Cannot modify confirmed sale' });
    }

    // Add new items
    let total_amount = sale.total_amount;
    for (const item of addedItems) {
      const product = await Product.findById(item.product_id);
      const saleItem = await SaleItem.create({
        sale_id: saleId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
      });
      total_amount += product.price * item.quantity;
      
      // Update stock
      await Product.updateStock(item.product_id, -item.quantity);
    }

    // Remove items
    for (const itemId of removedItems) {
      const item = await SaleItem.cancelItem(itemId);
      total_amount -= item.unit_price * item.quantity;
      
      // Return to stock
      await Product.updateStock(item.product_id, item.quantity);
    }

    // Update sale total
    await Sale.updateTotal(saleId, total_amount);

    const updatedSale = await Sale.findById(saleId);
    res.json(updatedSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSaleDetails = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    const items = await SaleItem.findBySaleId(sale.id);
    res.json({ sale, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const saleId = req.params.id;
    const invoicePath = await generateInvoice(saleId);
    
    res.download(invoicePath, `Facture_${saleId}.pdf`, (err) => {
      if (err) {
        console.error('Error sending invoice:', err);
        res.status(500).send('Error downloading invoice');
      }
      
      // Optionally delete the file after download
      fs.unlink(invoicePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting invoice file:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ error: error.message });
  }
};