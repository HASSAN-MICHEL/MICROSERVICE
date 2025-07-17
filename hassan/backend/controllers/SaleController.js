


// import Sale from '../models/Sale.js';
// import SaleItem from '../models/SaleItem.js';
// import Product from '../models/Product.js';
// import Invoice from '../models/Invoice.js';
// import fs from 'fs';

// import { generateInvoice } from '../services/pdfService.js';

// export const createSale = async (req, res) => {
//   try {
//     const { client_name, items, packaging_included } = req.body;
    
//     // Calculate total amount
//     let total_amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product_id);
//       total_amount += product.price * item.quantity;
//     }

//     // Create sale
//     const sale = await Sale.create({ client_name, total_amount, packaging_included });

//     // Create sale items
//     for (const item of items) {
//       const product = await Product.findById(item.product_id);
//       await SaleItem.create({
//         sale_id: sale.id,
//         product_id: item.product_id,
//         quantity: item.quantity,
//         unit_price: product.price,
//       });
      
//       // Update stock (temporarily reserved)
//       await Product.updateStock(item.product_id, -item.quantity);
//     }

//     res.status(201).json(sale);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };




// // Dans saleController.js
// export const updateSaleItems = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { items } = req.body;

//     // Supprimez les anciens items
//     await SaleItem.deleteBySaleId(id);

//     // Ajoutez les nouveaux items
//     for (const item of items) {
//       const product = await Product.findById(item.product_id);
//       await SaleItem.create({
//         sale_id: id,
//         product_id: item.product_id,
//         quantity: item.quantity,
//         unit_price: product.price,
//       });
      
//       // Mettez à jour le stock
//       await Product.updateStock(item.product_id, -item.quantity);
//     }

//     // Recalculez le total
//     const updatedItems = await SaleItem.findBySaleId(id);
//     const total_amount = updatedItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
//     await Sale.updateTotal(id, total_amount);

//     const sale = await Sale.findById(id);
//     res.json(sale);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const updatedeSale = async (req, res) => {
//   try {
//     const sale_id = req.params.id;
//     const { items } = req.body;

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: 'Aucun article fourni.' });
//     }

//     // Obtenir les anciens items de la vente
//     const existingItems = await SaleItem.findBySaleId(sale_id);

//     // Supprimer les produits qui ne sont plus dans la nouvelle liste
//     const incomingProductIds = items.map(item => item.product_id);
//     for (const oldItem of existingItems) {
//       if (!incomingProductIds.includes(oldItem.product_id)) {
//         await SaleItem.deleteItem(sale_id, oldItem.product_id);
//         await Product.updateStock(oldItem.product_id, oldItem.quantity); // retour en stock
//       }
//     }

//     const updatedItems = [];

//     for (const item of items) {
//       const existing = existingItems.find(i => i.product_id === item.product_id);
//       const product = await Product.findById(item.product_id);
//       const newQty = item.quantity;
//       const unitPrice = product.price;

//       if (existing) {
//         const qtyDiff = newQty - existing.quantity;
//         await SaleItem.updatesale(sale_id, item.product_id, newQty);
//         await Product.updateStock(item.product_id, -qtyDiff);
//         updatedItems.push({ ...existing, quantity: newQty });
//       } else {
//         await SaleItem.create({
//           sale_id,
//           product_id: item.product_id,
//           quantity: newQty,
//           unit_price: unitPrice,
//         });
//         await Product.updateStock(item.product_id, -newQty);
//         updatedItems.push({ product_id: item.product_id, quantity: newQty });
//       }
//     }

//     // Recalcul du montant total
//     let total_amount = 0;
//     for (const item of updatedItems) {
//       const product = await Product.findById(item.product_id);
//       total_amount += product.price * item.quantity;
//     }

//     // Mettre à jour le total_amount de la vente
//     await Sale.updateAmount(sale_id, total_amount);

//     res.json({
//       message: 'Vente mise à jour avec succès.',
//       total_amount,
//       items: updatedItems
//     });

//   } catch (error) {
//     console.error('Erreur mise à jour vente :', error);
//     res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la vente.' });
//   }
// };


// export const confirmSale = async (req, res) => {
//   try {
//     const sale = await Sale.confirmSale(req.params.id);
    
//     // Generate invoice
//     const invoice_number = `FCT${String(sale.id).padStart(6, '0')}`;
//     const invoicePath = await generateInvoice(sale.id);
    
//     await Invoice.create({
//       sale_id: sale.id,
//       invoice_number,
//       total_amount: sale.total_amount,
//       file_path: invoicePath,
//     });

//     res.json(sale);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const cancelSale = async (req, res) => {
//   try {
//     const sale = await Sale.cancelSale(req.params.id);
    
//     // Return products to stock
//     const items = await SaleItem.findBySaleId(sale.id);
//     for (const item of items) {
//       if (item.status !== 'cancelled') {
//         await Product.updateStock(item.product_id, item.quantity);
//         await SaleItem.cancelItem(item.id);
//       }
//     }

//     res.json(sale);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };



// export const getSaleDetails = async (req, res) => {
//   try {
//     const sale = await Sale.findById(req.params.id);
//     if (!sale) {
//       return res.status(404).json({ error: 'Sale not found' });
//     }

//     const items = await SaleItem.findBySaleId(sale.id);
//     res.json({ sale, items });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.findAll();
//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const downloadInvoice = async (req, res) => {
//   try {
//     const saleId = req.params.id;
//     const invoicePath = await generateInvoice(saleId);

//     // Extraire juste le nom du fichier
//     const fileName = path.basename(invoicePath);

//     // ✅ Rediriger le navigateur vers le lien HTTP public
//     res.redirect(`/invoices/${fileName}`);
//   } catch (error) {
//     console.error('Erreur génération de la facture:', error);
//     res.status(500).json({ error: error.message });
//   }
// };



import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';
import Invoice from '../models/Invoice.js';
import { generateInvoice } from '../services/pdfService.js';
import fs from 'fs';
import path from 'path';

export const createSale = async (req, res) => {
  try {
    const { client_name, items, packaging_included = false } = req.body;

    let total_amount = 0;
    let packaging_count = 0;
    const packaging_price = 3500;

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      total_amount += product.price * item.quantity;

      if (packaging_included && ['casier-12', 'casier-24'].includes(product.unit)) {
        packaging_count += item.quantity;
      }
    }

    if (packaging_included) {
      total_amount += packaging_count * packaging_price;
    }

    const sale = await Sale.create({
      client_name,
      total_amount,
      packaging_included,
      packaging_count,
      packaging_price
    });

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      await SaleItem.create({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
      });
      await Product.updateStock(item.product_id, -item.quantity);
    }

    res.status(201).json(sale);
  } catch (error) {
    console.error('Erreur createSale :', error);
    res.status(400).json({ error: error.message });
  }
};

export const updateSaleItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    await SaleItem.deleteBySaleId(id);

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      await SaleItem.create({
        sale_id: id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
      });
      await Product.updateStock(item.product_id, -item.quantity);
    }

    const updatedItems = await SaleItem.findBySaleId(id);
    const total_amount = updatedItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    await Sale.updateTotal(id, total_amount);

    const sale = await Sale.findById(id);
    res.json(sale);
  } catch (error) {
    console.error('Erreur updateSaleItems :', error);
    res.status(400).json({ error: error.message });
  }
};

export const updatedeSale = async (req, res) => {
  try {
    const sale_id = req.params.id;
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Aucun article fourni.' });
    }

    const existingItems = await SaleItem.findBySaleId(sale_id);
    const incomingProductIds = items.map(item => item.product_id);

    for (const oldItem of existingItems) {
      if (!incomingProductIds.includes(oldItem.product_id)) {
        await SaleItem.deleteItem(sale_id, oldItem.product_id);
        await Product.updateStock(oldItem.product_id, oldItem.quantity);
      }
    }

    let packaging_count = 0;
    const packaging_price = 3500;
    let total_amount = 0;

    const updatedItems = [];

    for (const item of items) {
      const existing = existingItems.find(i => i.product_id === item.product_id);
      const product = await Product.findById(item.product_id);
      const newQty = item.quantity;
      const unitPrice = product.price;

      if (['casier-12', 'casier-24'].includes(product.unit)) {
        packaging_count += newQty;
      }

      if (existing) {
        const qtyDiff = newQty - existing.quantity;
        await SaleItem.updateQuantity(sale_id, item.product_id, newQty);
        await Product.updateStock(item.product_id, -qtyDiff);
      } else {
        await SaleItem.create({
          sale_id,
          product_id: item.product_id,
          quantity: newQty,
          unit_price: unitPrice,
        });
        await Product.updateStock(item.product_id, -newQty);
      }

      updatedItems.push({ product_id: item.product_id, quantity: newQty });
      total_amount += unitPrice * newQty;
    }

    const sale = await Sale.findById(sale_id);

    if (sale.packaging_included) {
      total_amount += packaging_count * packaging_price;
      await Sale.updatePackaging(sale_id, packaging_count, packaging_price, true);
    }

    await Sale.updateAmount(sale_id, total_amount);

    res.json({
      message: 'Vente mise à jour avec succès.',
      total_amount,
      items: updatedItems
    });

  } catch (error) {
    console.error('Erreur mise à jour vente :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la vente.' });
  }
};

export const confirmSale = async (req, res) => {
  try {
    const sale = await Sale.confirmSale(req.params.id);
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
    console.error('Erreur confirmSale :', error);
    res.status(400).json({ error: error.message });
  }
};

export const cancelSale = async (req, res) => {
  try {
    const sale = await Sale.cancelSale(req.params.id);
    const items = await SaleItem.findBySaleId(sale.id);

    for (const item of items) {
      if (item.status !== 'cancelled') {
        await Product.updateStock(item.product_id, item.quantity);
        await SaleItem.cancelItem(item.id);
      }
    }

    res.json(sale);
  } catch (error) {
    console.error('Erreur cancelSale :', error);
    res.status(400).json({ error: error.message });
  }
};

export const getSaleDetails = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Vente introuvable' });
    }

    const items = await SaleItem.findBySaleId(sale.id);
    res.json({ sale, items });
  } catch (error) {
    console.error('Erreur getSaleDetails :', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    console.error('Erreur getAllSales :', error);
    res.status(500).json({ error: error.message });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const saleId = req.params.id;
    const invoicePath = await generateInvoice(saleId);
    const fileName = path.basename(invoicePath);
    res.redirect(`/invoices/${fileName}`);
  } catch (error) {
    console.error('Erreur downloadInvoice :', error);
    res.status(500).json({ error: error.message });
  }
};
