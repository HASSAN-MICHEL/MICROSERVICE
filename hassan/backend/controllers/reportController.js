import pool from '../config/bb.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import { body, query, validationResult } from 'express-validator';
// import { 
//   generateDailyReportPDF,
//   generateMonthlyReportPDF
// } from '../services/reportService.js';

import { generateDailyReport, generateMonthlyReport } from '../services/reportService.js'



export const getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    
    // Get sales for the day
    const salesQuery = `
      SELECT * FROM sales 
      WHERE DATE(created_at) = $1
      ORDER BY created_at DESC
    `;
    const { rows: sales } = await pool.query(salesQuery, [date]);

    // Get stock movements
    const stockQuery = `
      SELECT 
        p.id as product_id,
        p.name as product_name,
        COALESCE((
          SELECT SUM(si.quantity) 
          FROM sale_items si
          JOIN sales s ON si.sale_id = s.id
          WHERE si.product_id = p.id 
          AND si.status != 'cancelled'
          AND DATE(s.created_at) = $1
        ), 0) as sold_quantity,
        COALESCE((
          SELECT SUM(si.quantity) 
          FROM sale_items si
          JOIN sales s ON si.sale_id = s.id
          WHERE si.product_id = p.id 
          AND si.status = 'cancelled'
          AND DATE(s.created_at) = $1
        ), 0) as returned_quantity
      FROM products p
    `;
    const { rows: stockMovements } = await pool.query(stockQuery, [date]);

    res.json({ sales, stockMovements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const validateDailyReport = [
  query('date').isISO8601().withMessage('La date doit être au format YYYY-MM-DD')
];
export const validateMonthlyReport = [
  query('year').isInt({ min: 2000, max: 2100 }).withMessage('L\'année doit être entre 2000 et 2100'),
  query('month').isInt({ min: 1, max: 12 }).withMessage('Le mois doit être entre 1 et 12')
];


export const getStockReport = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getDayReport = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'La date est requise' });
    }
    
    // Option 1: Retourner les données JSON
    if (req.query.format === 'json') {
      const reportData = await getDailyReportData(date);
      return res.json(reportData);
    }
    
    // Option 2: Générer et retourner le PDF
    const report = await generateDailyReportPDF(date);
    
    res.json({
      success: true,
      downloadUrl: report.path,
      fileName: report.name
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ error: 'L\'année et le mois sont requis' });
    }
    
    // Option 1: Retourner les données JSON
    if (req.query.format === 'json') {
      const reportData = await getMonthlyReportData(year, month);
      return res.json(reportData);
    }
    
    // Option 2: Générer et retourner le PDF
    const report = await generateMonthlyReportPDF(parseInt(year), parseInt(month));
    
    res.json({
      success: true,
      downloadUrl: report.path,
      fileName: report.name
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadReport = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../public/reports', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Rapport non trouvé' });
    }
    
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Erreur lors du téléchargement:', err);
        res.status(500).json({ error: 'Erreur lors du téléchargement' });
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const getDailySalesReport = async (req, res) => {
//   try {
//     const { date } = req.query;
    
//     if (!date) {
//       return res.status(400).json({ error: 'Date parameter is required' });
//     }

//     const salesData = await SaleItem.getDailySalesReport(date);
//     const dailyTotal = await Sale.getDailyTotal(date) || 0;
    
//     res.json({ date, salesData, dailyTotal });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//AU DESSUS ORIGINAL


export const getDailySalesReport = async (req, res) => {
  try {
    const { date } = req.query;

    // Validation manuelle supplémentaire
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        error: "Format de date invalide. Utilisez YYYY-MM-DD"
      });
    }

    const [salesData, dailyTotal] = await Promise.all([
      SaleItem.getDailySalesReport(date),
      Sale.getDailyTotal(date)
    ]);

    res.json({
      success: true,
      date,
      daily_total: dailyTotal || 0,
      sales_count: salesData.reduce((sum, item) => sum + item.quantity, 0),
      products: salesData
    });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Erreur serveur"
    });
  }
};
// export const getMonthlySalesReport = async (req, res) => {
//   try {
//     const { year, month } = req.query;
    
//     if (!year || !month) {
//       return res.status(400).json({ error: 'Year and month parameters are required' });
//     }

//     const salesData = await SaleItem.getMonthlySalesReport(year, month) || [];
//     const monthlyTotal = await Sale.getMonthlyTotal(year, month) || 0;
    
//     res.json({ 
//       year, 
//       month, 
//       salesData, 
//       monthlyTotal,
//       isEmpty: salesData.length === 0
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// AU DESSUS ORIGINAL
export const getMonthlySalesReport = async (req, res) => {
  try {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { year, month } = req.query;
    
    // Nouvelle méthode pour un rapport mensuel complet
    const salesData = await SaleItem.getMonthlySalesReport(year, month);
    const monthlyTotal = await Sale.getMonthlyTotal(year, month) || 0;
    
    // Calculer les statistiques supplémentaires
    const topProduct = salesData.reduce((max, item) => 
      item.total_quantity > max.total_quantity ? item : max, 
      { total_quantity: 0 }
    );
    
    res.json({ 
      success: true,
      year, 
      month, 
      monthly_total: monthlyTotal,
      sales_count: salesData.reduce((sum, item) => sum + item.total_quantity, 0),
      top_product: topProduct.total_quantity > 0 ? {
        name: topProduct.product_name,
        quantity: topProduct.total_quantity
      } : null,
      products: salesData.map(item => ({
        name: item.product_name,
        quantity: item.total_quantity,
        unit_price: item.unit_price,
        total: item.total_amount
      })),
      isEmpty: salesData.length === 0
    });
    
  } catch (error) {
    console.error('Error in getMonthlySalesReport:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la génération du rapport mensuel',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// export const downloadDailyReport = async (req, res) => {
//   try {
//     const { date } = req.query;
    
//     if (!date) {
//       return res.status(400).json({ error: 'Date parameter is required' });
//     }

//     const salesData = await SaleItem.getDailySalesReport(date);
//     const dailyTotal = await Sale.getDailyTotal(date) || 0;
    
//     const reportPath = await generateDailyReport(date, salesData, dailyTotal);
    
//     res.download(reportPath, `rapport_journalier_${date}.pdf`, (err) => {
//       if (err) console.error('Error sending report:', err);
//       fs.unlink(reportPath, (unlinkErr) => {
//         if (unlinkErr) console.error('Error deleting report file:', unlinkErr);
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
//ORIGINAL AU DESSUS

export const downloadDailyReport = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date } = req.query;
    
    // Récupérer les données
    const report = await Sale.getEnhancedDailyReport(date);
    
    // Générer le PDF
    const reportPath = await generateDailyReport({
      date,
      dailyTotal: report.daily_total,
      salesCount: report.sales_count,
      topCategory: report.top_category,
      products: report.products
    });
    
    // Envoyer le fichier
    res.download(reportPath, `rapport_journalier_${date}.pdf`, (err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi du rapport:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Erreur lors de l\'envoi du fichier'
        });
      }
      
      // Nettoyer le fichier temporaire
      fs.unlink(reportPath, (unlinkErr) => {
        if (unlinkErr) console.error('Erreur lors de la suppression du fichier:', unlinkErr);
      });
    });
    
  } catch (error) {
    console.error('Error in downloadDailyReport:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la génération du PDF',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const downloadMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month parameters are required' });
    }

    const salesData = await SaleItem.getMonthlySalesReport(year, month);
    const monthlyTotal = await Sale.getMonthlyTotal(year, month) || 0;
    
    const reportPath = await generateMonthlyReport(year, month, salesData, monthlyTotal);
    
    res.download(reportPath, `rapport_mensuel_${year}_${month}.pdf`, (err) => {
      if (err) console.error('Error sending report:', err);
      fs.unlink(reportPath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting report file:', unlinkErr);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// AU DESSUS , c'est le fichier original

// import pool from '../config/bb.js';
// import Product from '../models/Product.js';
// import Sale from '../models/Sale.js';
// import SaleItem from '../models/SaleItem.js';
// import fs from 'fs';
// import path from 'path';
// import { generateDailyReport, generateMonthlyReport } from '../services/reportService.js';

// export const getDailyReport = async (req, res) => {
//   try {
//     const { date } = req.query;
    
//     if (!date) {
//       return res.status(400).json({ error: 'La date est requise' });
//     }

//     // 1. Récupérer les ventes du jour
//     const salesQuery = `
//       SELECT s.*, 
//              SUM(si.quantity * si.unit_price) as total_amount,
//              COUNT(si.id) as items_count
//       FROM sales s
//       LEFT JOIN sale_items si ON s.id = si.sale_id
//       WHERE DATE(s.created_at) = $1
//       GROUP BY s.id
//       ORDER BY s.created_at DESC
//     `;
//     const { rows: sales } = await pool.query(salesQuery, [date]);

//     // 2. Récupérer les mouvements de stock complets
//     const stockQuery = `
//       SELECT 
//         p.id as product_id,
//         p.name as product_name,
//         p.quantity as current_stock,
//         COALESCE((
//           SELECT SUM(quantity_change) 
//           FROM stock_movements 
//           WHERE product_id = p.id 
//           AND movement_type = 'entry'
//           AND DATE(created_at) = $1
//         ), 0) as entry_quantity,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'completed'
//           AND DATE(s.created_at) = $1
//         ), 0) as sold_quantity,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'cancelled'
//           AND DATE(s.created_at) = $1
//         ), 0) as returned_quantity,
//         (
//           SELECT quantity 
//           FROM product_stock_history 
//           WHERE product_id = p.id 
//           AND DATE(record_date) < $1
//           ORDER BY record_date DESC 
//           LIMIT 1
//         ) as initial_stock
//       FROM products p
//       GROUP BY p.id
//     `;
//     const { rows: stockMovements } = await pool.query(stockQuery, [date]);

//     // 3. Calculer le stock final théorique
//     const movementsWithCalculations = stockMovements.map(movement => ({
//       ...movement,
//       final_stock: (movement.initial_stock || 0) + 
//                   movement.entry_quantity - 
//                   movement.sold_quantity + 
//                   movement.returned_quantity,
//       discrepancy: (movement.initial_stock || 0) + 
//                    movement.entry_quantity - 
//                    movement.sold_quantity + 
//                    movement.returned_quantity - 
//                    movement.current_stock
//     }));

//     // 4. Récupérer le total des ventes
//     const totalQuery = `
//       SELECT SUM(total_amount) as daily_total
//       FROM sales
//       WHERE DATE(created_at) = $1
//       AND status = 'completed'
//     `;
//     const { rows: [{ daily_total }] } = await pool.query(totalQuery, [date]);

//     res.json({ 
//       success: true,
//       date,
//       sales,
//       stockMovements: movementsWithCalculations,
//       dailyTotal: daily_total || 0,
//       generatedAt: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error('Error in getDailyReport:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erreur lors de la génération du rapport',
//       details: error.message
//     });
//   }
// };

// export const getMonthlyReport = async (req, res) => {
//   try {
//     const { year, month } = req.query;
    
//     if (!year || !month) {
//       return res.status(400).json({ error: 'L\'année et le mois sont requis' });
//     }

//     const startDate = `${year}-${month.padStart(2, '0')}-01`;
//     const endDate = new Date(year, month, 0).toISOString().split('T')[0];

//     // 1. Récupérer les ventes du mois
//     const salesQuery = `
//       SELECT s.*, 
//              SUM(si.quantity * si.unit_price) as total_amount,
//              COUNT(si.id) as items_count
//       FROM sales s
//       LEFT JOIN sale_items si ON s.id = si.sale_id
//       WHERE DATE(s.created_at) BETWEEN $1 AND $2
//       GROUP BY s.id
//       ORDER BY s.created_at DESC
//     `;
//     const { rows: sales } = await pool.query(salesQuery, [startDate, endDate]);

//     // 2. Récupérer les mouvements de stock du mois
//     const stockQuery = `
//       SELECT 
//         p.id as product_id,
//         p.name as product_name,
//         p.quantity as current_stock,
//         COALESCE((
//           SELECT SUM(quantity_change) 
//           FROM stock_movements 
//           WHERE product_id = p.id 
//           AND movement_type = 'entry'
//           AND DATE(created_at) BETWEEN $1 AND $2
//         ), 0) as entry_quantity,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'completed'
//           AND DATE(s.created_at) BETWEEN $1 AND $2
//         ), 0) as sold_quantity,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'cancelled'
//           AND DATE(s.created_at) BETWEEN $1 AND $2
//         ), 0) as returned_quantity,
//         (
//           SELECT quantity 
//           FROM product_stock_history 
//           WHERE product_id = p.id 
//           AND DATE(record_date) < $1
//           ORDER BY record_date DESC 
//           LIMIT 1
//         ) as initial_stock
//       FROM products p
//       GROUP BY p.id
//     `;
//     const { rows: stockMovements } = await pool.query(stockQuery, [startDate, endDate]);

//     // 3. Calculer les totaux
//     const monthlyTotalQuery = `
//       SELECT SUM(total_amount) as monthly_total
//       FROM sales
//       WHERE DATE(created_at) BETWEEN $1 AND $2
//       AND status = 'completed'
//     `;
//     const { rows: [{ monthly_total }] } = await pool.query(monthlyTotalQuery, [startDate, endDate]);

//     res.json({ 
//       success: true,
//       year,
//       month,
//       startDate,
//       endDate,
//       sales,
//       stockMovements,
//       monthlyTotal: monthly_total || 0,
//       generatedAt: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error('Error in getMonthlyReport:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erreur lors de la génération du rapport mensuel',
//       details: error.message
//     });
//   }
// };

// export const downloadDailyReport = async (req, res) => {
//   try {
//     const { date } = req.query;
    
//     if (!date) {
//       return res.status(400).json({ error: 'La date est requise' });
//     }

//     // Générer le rapport PDF
//     const reportPath = await generateDailyReport(date);
    
//     // Envoyer le fichier
//     res.download(reportPath, `rapport_journalier_${date}.pdf`, (err) => {
//       if (err) {
//         console.error('Erreur lors de l\'envoi du rapport:', err);
//       }
//       // Nettoyer le fichier temporaire
//       fs.unlink(reportPath, (unlinkErr) => {
//         if (unlinkErr) console.error('Erreur suppression fichier temporaire:', unlinkErr);
//       });
//     });

//   } catch (error) {
//     console.error('Error in downloadDailyReport:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erreur lors de la génération du PDF',
//       details: error.message
//     });
//   }
// };

// export const downloadMonthlyReport = async (req, res) => {
//   try {
//     const { year, month } = req.query;
    
//     if (!year || !month) {
//       return res.status(400).json({ error: 'L\'année et le mois sont requis' });
//     }

//     // Générer le rapport PDF
//     const reportPath = await generateMonthlyReport(year, month);
    
//     // Envoyer le fichier
//     res.download(reportPath, `rapport_mensuel_${year}_${month}.pdf`, (err) => {
//       if (err) {
//         console.error('Erreur lors de l\'envoi du rapport:', err);
//       }
//       // Nettoyer le fichier temporaire
//       fs.unlink(reportPath, (unlinkErr) => {
//         if (unlinkErr) console.error('Erreur suppression fichier temporaire:', unlinkErr);
//       });
//     });

//   } catch (error) {
//     console.error('Error in downloadMonthlyReport:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erreur lors de la génération du PDF',
//       details: error.message
//     });
//   }
// };

// export const getStockReport = async (req, res) => {
//   try {
//     const { date } = req.query;
    
//     const query = date ? `
//       SELECT 
//         p.*,
//         COALESCE((
//           SELECT SUM(quantity_change) 
//           FROM stock_movements 
//           WHERE product_id = p.id 
//           AND movement_type = 'entry'
//           AND DATE(created_at) <= $1
//         ), 0) as total_entries,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'completed'
//           AND DATE(s.created_at) <= $1
//         ), 0) as total_sales,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'cancelled'
//           AND DATE(s.created_at) <= $1
//         ), 0) as total_returns
//       FROM products p
//     ` : `
//       SELECT 
//         p.*,
//         COALESCE((
//           SELECT SUM(quantity_change) 
//           FROM stock_movements 
//           WHERE product_id = p.id 
//           AND movement_type = 'entry'
//         ), 0) as total_entries,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'completed'
//         ), 0) as total_sales,
//         COALESCE((
//           SELECT SUM(si.quantity) 
//           FROM sale_items si
//           JOIN sales s ON si.sale_id = s.id
//           WHERE si.product_id = p.id 
//           AND si.status = 'cancelled'
//         ), 0) as total_returns
//       FROM products p
//     `;

//     const { rows } = await pool.query(query, date ? [date] : []);
    
//     const stockReport = rows.map(product => ({
//       ...product,
//       calculated_stock: product.quantity + product.total_entries - product.total_sales + product.total_returns,
//       discrepancy: product.quantity - (product.quantity + product.total_entries - product.total_sales + product.total_returns)
//     }));

//     res.json({
//       success: true,
//       date: date || 'current',
//       products: stockReport,
//       generatedAt: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error('Error in getStockReport:', error);
//     res.status(500).json({ 
//       success: false,
//       error: 'Erreur lors de la génération du rapport de stock',
//       details: error.message
//     });
//   }
// };