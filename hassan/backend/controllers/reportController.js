import pool from '../config/bb.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
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


export const getDailySalesReport = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const salesData = await SaleItem.getDailySalesReport(date);
    const dailyTotal = await Sale.getDailyTotal(date) || 0;
    
    res.json({ date, salesData, dailyTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMonthlySalesReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month parameters are required' });
    }

    const salesData = await SaleItem.getMonthlySalesReport(year, month) || [];
    const monthlyTotal = await Sale.getMonthlyTotal(year, month) || 0;
    
    res.json({ 
      year, 
      month, 
      salesData, 
      monthlyTotal,
      isEmpty: salesData.length === 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const downloadDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const salesData = await SaleItem.getDailySalesReport(date);
    const dailyTotal = await Sale.getDailyTotal(date) || 0;
    
    const reportPath = await generateDailyReport(date, salesData, dailyTotal);
    
    res.download(reportPath, `rapport_journalier_${date}.pdf`, (err) => {
      if (err) console.error('Error sending report:', err);
      fs.unlink(reportPath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting report file:', unlinkErr);
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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