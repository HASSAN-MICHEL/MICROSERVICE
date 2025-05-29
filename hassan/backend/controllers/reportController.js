import pool from '../config/db.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';

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