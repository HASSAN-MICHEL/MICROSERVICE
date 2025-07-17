

// import VenteBoisson from "../models/venteboisson.js";
// import { broadcast } from "../server.js";

// const venteBoissonController = {
//   async getAll(req, res) {
//     try {
//       const ventes = await VenteBoisson.getAll();
//       res.json(ventes);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   async getById(req, res) {
//     try {
//       const vente = await VenteBoisson.getById(req.params.id);
//       if (!vente) {
//         return res.status(404).json({ message: "Vente non trouvée" });
//       }
//       res.json(vente);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   async create(req, res) {
//     try {
//       const { client_id, boisson_id, quantite } = req.body;
//       const result = await VenteBoisson.create({ client_id, boisson_id, quantite });

//       broadcast('vente', {
//         type: 'boisson',
//         montant_total: result.vente.montant_total,
//         timestamp: Date.now()
//       });

//       res.status(201).json(result);
//     } catch (err) {
//       console.error("Erreur création vente:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async delete(req, res) {
//     try {
//       const deletedVente = await VenteBoisson.delete(req.params.id);
//       if (!deletedVente) {
//         return res.status(404).json({ message: "Vente non trouvée" });
//       }
//       res.status(204).send();
//     } catch (err) {
//       console.error("Erreur suppression vente:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async getDailyReport(req, res) {
//     try {
//         const { date } = req.params;
//         const report = await VenteBoisson.getDailyReport(date);
//         res.json(report);
//     } catch (err) {
//         console.error("Erreur rapport journalier:", err);
//         res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
// },

// async getMonthlyReport(req, res) {
//   try {
//       const { year, month } = req.params;
//       const report = await VenteBoisson.getMonthlyReport(year, month);
//       res.json(report);
//   } catch (err) {
//       console.error("Erreur rapport mensuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getYearlyReport(req, res) {
//   try {
//       const { year } = req.params;
//       const report = await VenteBoisson.getYearlyReport(year);
//       res.json(report);
//   } catch (err) {
//       console.error("Erreur rapport annuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getMostSold(req, res) {
//   try {
//       const { period, year, month } = req.params;
//       let result;
      
//       if (period === 'month' && month) {
//           result = await VenteBoisson.getMostSoldByMonth(month, year);
//       } else {
//           result = await VenteBoisson.getMostSoldByYear(year);
//       }
      
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur produits plus vendus:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getSalesEvolution(req, res) {
//   try {
//       const { year } = req.params;
//       const result = await VenteBoisson.getMonthlySalesEvolution(year);
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur évolution ventes:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getSalesByProduct(req, res) {
//   try {
//       const { period, year, month } = req.params;
//       let result;
      
//       if (period === 'month' && month) {
//           result = await VenteBoisson.getSalesByProduct(month, year);
//       } else {
//           result = await VenteBoisson.getSalesByProductForYear(year);
//       }
      
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur ventes par produit:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// }
// };

// export default venteBoissonController;

// controllers/venteBoissonController.js
import VenteBoisson from "../models/venteboisson.js";
import { broadcast } from "../server.js";

const venteBoissonController = {
  async getAll(req, res) {
    try {
      const ventes = await VenteBoisson.getAll();
      res.json(ventes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const vente = await VenteBoisson.getById(req.params.id);
      if (!vente) {
        return res.status(404).json({ message: "Vente non trouvée" });
      }
      res.json(vente);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { client_id, boisson_id, quantite } = req.body;
      const result = await VenteBoisson.create({ client_id, boisson_id, quantite });

      broadcast('vente', {
        type: 'boisson',
        montant_total: result.vente.montant_total,
        timestamp: Date.now()
      });

      res.status(201).json(result);
    } catch (err) {
      console.error("Erreur création vente:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedVente = await VenteBoisson.delete(req.params.id);
      if (!deletedVente) {
        return res.status(404).json({ message: "Vente non trouvée" });
      }
      res.status(204).send();
    } catch (err) {
      console.error("Erreur suppression vente:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedDailyReport(req, res) {
    try {
      const { date } = req.params;
      const report = await VenteBoisson.getDetailedDailyReport(date);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport journalier détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedMonthlyReport(req, res) {
    try {
      const { year, month } = req.params;
      const report = await VenteBoisson.getDetailedMonthlyReport(year, month);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport mensuel détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedYearlyReport(req, res) {
    try {
      const { year } = req.params;
      const report = await VenteBoisson.getDetailedYearlyReport(year);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport annuel détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getMostSold(req, res) {
    try {
      const { period, year, month } = req.params;
      let result;
      
      if (period === 'month' && month) {
        result = await VenteBoisson.getMostSoldByMonth(month, year);
      } else {
        result = await VenteBoisson.getMostSoldByYear(year);
      }
      
      res.json(result);
    } catch (err) {
      console.error("Erreur produits plus vendus:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesEvolution(req, res) {
    try {
      const { year } = req.params;
      const result = await VenteBoisson.getMonthlySalesEvolution(year);
      res.json(result);
    } catch (err) {
      console.error("Erreur évolution ventes:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesByProduct(req, res) {
    try {
      const { period, year, month } = req.params;
      let result;
      
      if (period === 'month' && month) {
        result = await VenteBoisson.getSalesByProduct(month, year);
      } else {
        result = await VenteBoisson.getSalesByProductForYear(year);
      }
      
      res.json(result);
    } catch (err) {
      console.error("Erreur ventes par produit:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesByClient(req, res) {
    try {
      const { year } = req.params;
      const result = await VenteBoisson.getSalesByClient(year);
      res.json(result);
    } catch (err) {
      console.error("Erreur ventes par client:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesTrends(req, res) {
    try {
      const result = await VenteBoisson.getSalesTrends();
      res.json(result);
    } catch (err) {
      console.error("Erreur tendances des ventes:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async downloadReportPDF(req, res) {
    try {
      const { type } = req.params;
      const dateParams = req.query;
      
      const pdfBuffer = await VenteBoisson.generateReportPDF(type, null, dateParams);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=rapport_${type}.pdf`);
      res.send(pdfBuffer);
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }
};

export default venteBoissonController;





// import Sale from '../models/Sale.js';
// import SaleItem from '../models/SaleItem.js';
// import Product from '../models/Product.js';
// import Invoice from '../models/Invoice.js';
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


// export const updatedeSale = async (req, res) => {

//   try {
//     const sale = await SaleItem.updatesale(req.params.id, req.body);
//     res.json(sale);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
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

// export const updateSaleItems = async (req, res) => {
//   try {
//     const { addedItems, removedItems } = req.body;
//     const saleId = req.params.id;
    
//     const sale = await Sale.findById(saleId);
//     if (sale.status === 'confirmed') {
//       return res.status(400).json({ error: 'Cannot modify confirmed sale' });
//     }

//     // Add new items
//     let total_amount = sale.total_amount;
//     for (const item of addedItems) {
//       const product = await Product.findById(item.product_id);
//       const saleItem = await SaleItem.updatesale({
//         sale_id: saleId,
//         product_id: item.product_id,
//         quantity: item.quantity,
//         unit_price: product.price,
//       });
//       total_amount += product.price * item.quantity;
      
//       // Update stock
//       await Product.updateStock(item.product_id, -item.quantity);
//     }

//     // Remove items
//     for (const itemId of removedItems) {
//       const item = await SaleItem.cancelItem(itemId);
//       total_amount -= item.unit_price * item.quantity;
      
//       // Return to stock
//       await Product.updateStock(item.product_id, item.quantity);
//     }

//     // Update sale total
//     await Sale.updateTotal(saleId, total_amount);

//     const updatedSale = await Sale.findById(saleId);
//     res.json(updatedSale);
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
    
//     res.download(invoicePath, `Facture_${saleId}.pdf`, (err) => {
//       if (err) {
//         console.error('Error sending invoice:', err);
//         res.status(500).send('Error downloading invoice');
//       }
      
//       // Optionally delete the file after download
//       fs.unlink(invoicePath, (unlinkErr) => {
//         if (unlinkErr) console.error('Error deleting invoice file:', unlinkErr);
//       });
//     });
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     res.status(500).json({ error: error.message });
//   }
// };