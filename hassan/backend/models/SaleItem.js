// // import pool from '../config/bb.js';

// // class SaleItem {
// //   static async create({ sale_id, product_id, quantity, unit_price, status = 'pending' }) {
// //     const query = `
// //       INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, status)
// //       VALUES ($1, $2, $3, $4, $5)
// //       RETURNING *;
// //     `;
// //     const values = [sale_id, product_id, quantity, unit_price, status];
// //     const { rows } = await pool.query(query, values);
// //     return rows[0];
// //   }

// //   static async findBySaleId(sale_id) {
// //     const { rows } = await pool.query(`
// //       SELECT si.*, p.name as product_name, p.category as product_category, p.unit as product_unit
// //       FROM sale_items si
// //       JOIN products p ON si.product_id = p.id
// //       WHERE si.sale_id = $1
// //     `, [sale_id]);
// //     return rows;
// //   }

// //   static async updateStatus(id, status) {
// //     const query = `
// //       UPDATE sale_items
// //       SET status = $1
// //       WHERE id = $2
// //       RETURNING *;
// //     `;
// //     const { rows } = await pool.query(query, [status, id]);
// //     return rows[0];
// //   }

// //   static async cancelItem(id) {
// //     const query = `
// //       UPDATE sale_items
// //       SET status = 'cancelled'
// //       WHERE id = $1
// //       RETURNING *;
// //     `;
// //     const { rows } = await pool.query(query, [id]);
// //     return rows[0];
// //   }
// // }

// // export default SaleItem;


// import pool from '../config/bb.js';

// class SaleItem {
//   static async create({ sale_id, product_id, quantity, unit_price, status = 'pending' }) {
//     const query = `
//       INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, status)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *;
//     `;
//     const values = [sale_id, product_id, quantity, unit_price, status];
//     const { rows } = await pool.query(query, values);
//     return rows[0];
//   }

//   static async findBySaleId(sale_id) {
//     const { rows } = await pool.query(`
//       SELECT si.*, p.name as product_name, p.category as product_category, p.unit as product_unit
//       FROM sale_items si
//       JOIN products p ON si.product_id = p.id
//       WHERE si.sale_id = $1
//     `, [sale_id]);
//     return rows;
//   }

//   static async updateStatus(id, status) {
//     const query = `
//       UPDATE sale_items
//       SET status = $1
//       WHERE id = $2
//       RETURNING *;
//     `;
//     const { rows } = await pool.query(query, [status, id]);
//     return rows[0];
//   }

//   static async cancelItem(id) {
//     const query = `
//       UPDATE sale_items
//       SET status = 'cancelled'
//       WHERE id = $1
//       RETURNING *;
//     `;
//     const { rows } = await pool.query(query, [id]);
//     return rows[0];
//   }
// }

// export default SaleItem;

import pool from '../config/bb.js';

class SaleItem {
  static async create({ sale_id, product_id, quantity, unit_price, status = 'pending' }) {
    const query = `
      INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [sale_id, product_id, quantity, unit_price, status];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findBySaleId(sale_id) {
    const { rows } = await pool.query(`
      SELECT si.*, p.name as product_name, p.category as product_category, p.unit as product_unit
      FROM sale_items si
      JOIN products p ON si.product_id = p.id
      WHERE si.sale_id = $1
    `, [sale_id]);
    return rows;
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE sale_items
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [status, id]);
    return rows[0];
  }

  static async cancelItem(id) {
    const query = `
      UPDATE sale_items
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

//   static async getDailySalesReport(date) {
//   const { rows } = await pool.query(`
//     SELECT 
//       p.name as product_name,
//       SUM(si.quantity) as total_quantity,
//       si.unit_price,
//       SUM(si.quantity * si.unit_price) as total_amount
//     FROM sale_items si
//     JOIN products p ON si.product_id = p.id
//     JOIN sales s ON si.sale_id = s.id
//     WHERE si.status = 'confirmed'
//     AND DATE(s.confirmed_at) = $1
//     GROUP BY p.name, si.unit_price
//     ORDER BY total_quantity DESC
//   `, [date]);

//   return rows;
// }

//Original au dessus

static async getDailySalesReport(date) {
  // Version ultra-fiable testée
  const query = `
    WITH confirmed_sales AS (
      SELECT id FROM sales 
      WHERE status = 'confirmed' 
      AND DATE(confirmed_at AT TIME ZONE 'UTC') = $1::date
    )
    SELECT 
      p.id as product_id,
      p.name as product_name,
      p.category,
      p.unit,
      SUM(si.quantity) as total_quantity,
      si.unit_price,
      SUM(si.quantity * si.unit_price) as total_amount,
      COUNT(DISTINCT si.sale_id) as sales_count
    FROM sale_items si
    JOIN products p ON si.product_id = p.id
    JOIN confirmed_sales cs ON si.sale_id = cs.id
    WHERE si.status = 'confirmed'
    GROUP BY p.id, p.name, p.category, p.unit, si.unit_price
    ORDER BY total_amount DESC
  `;

  console.log('Requête exécutée:', query.replace(/\s+/g, ' ').trim());
  console.log('Paramètres:', [date]);

  try {
    const { rows } = await pool.query(query, [date]);
    console.log(`${rows.length} produits trouvés`);
    return rows;
  } catch (error) {
    console.error('Erreur complète:', {
      message: error.message,
      stack: error.stack,
      query: error.query,
      parameters: error.parameters
    });
    throw new Error('Erreur base de données');
  }
}

static async getMonthlySalesReport(year, month) {
  const { rows } = await pool.query(`
    SELECT 
      p.name as product_name,
      SUM(si.quantity) as total_quantity,
      si.unit_price,
      SUM(si.quantity * si.unit_price) as total_amount
    FROM sale_items si
    JOIN products p ON si.product_id = p.id
    JOIN sales s ON si.sale_id = s.id
    WHERE si.status = 'confirmed'
    AND EXTRACT(YEAR FROM s.confirmed_at) = $1
    AND EXTRACT(MONTH FROM s.confirmed_at) = $2
    GROUP BY p.name, si.unit_price
    ORDER BY total_quantity DESC
  `, [year, month]);

  return rows;
}

static async getEnhancedDailyReport(date) {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  // 1. Total des ventes
  const dailyTotal = await this.getDailyTotal(formattedDate);
  
  // 2. Nombre de ventes
  const { rows: countRows } = await pool.query(`
    SELECT COUNT(*) as sales_count
    FROM sales
    WHERE status = 'confirmed'
    AND DATE(confirmed_at) = $1
  `, [formattedDate]);
  
  // 3. Produits vendus
  const productsReport = await SaleItem.getDailySalesReport(formattedDate);
  
  // 4. Catégorie la plus vendue
  const { rows: categoryRows } = await pool.query(`
    SELECT p.category, SUM(si.quantity) as total_quantity
    FROM sale_items si
    JOIN products p ON si.product_id = p.id
    JOIN sales s ON si.sale_id = s.id
    WHERE si.status = 'confirmed'
    AND DATE(s.confirmed_at) = $1
    GROUP BY p.category
    ORDER BY total_quantity DESC
    LIMIT 1
  `, [formattedDate]);
  
  return {
    date: formattedDate,
    daily_total: dailyTotal,
    sales_count: countRows[0]?.sales_count || 0,
    top_category: categoryRows[0]?.category || null,
    products: productsReport
  };
}

}

export default SaleItem;