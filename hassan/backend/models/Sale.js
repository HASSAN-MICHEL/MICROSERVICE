

// // import pool from '../config/db.js';
// // import Product from './Product.js';

// // class Sale {
// //   static async create(saleData) {
// //     const { customer_name, payment_method, with_packaging, items } = saleData;
    
// //     // Démarrer une transaction
// //     const client = await pool.connect();
    
// //     try {
// //       await client.query('BEGIN');
      
// //       // 1. Créer la vente principale
// //       const saleQuery = `
// //         INSERT INTO sales (customer_name, payment_method, with_packaging, status)
// //         VALUES ($1, $2, $3, 'pending')
// //         RETURNING *`;
      
// //       const saleResult = await client.query(saleQuery, [
// //         customer_name,
// //         payment_method,
// //         with_packaging
// //       ]);
      
// //       const sale = saleResult.rows[0];
      
// //       // 2. Ajouter les produits à la vente et calculer les totaux
// //       let totalProducts = 0;
// //       let totalPackaging = 0;
// //       let totalRemovalFees = 0;
      
// //       for (const item of items) {
// //         // Vérifier le produit et son stock
// //         const product = await Product.findById(item.product_id);
// //         if (!product) {
// //           throw new Error(`Produit ${item.product_id} non trouvé`);
// //         }
        
// //         // Calculer le prix total pour ce produit
// //         const itemTotal = item.quantity * product.price;
// //         totalProducts += itemTotal;
        
// //         // Ajouter l'article à la vente
// //         const saleItemQuery = `
// //           INSERT INTO sale_items 
// //           (sale_id, product_id, quantity, unit_price, total_price)
// //           VALUES ($1, $2, $3, $4, $5)
// //           RETURNING *`;
        
// //         await client.query(saleItemQuery, [
// //           sale.id,
// //           item.product_id,
// //           item.quantity,
// //           product.price,
// //           itemTotal
// //         ]);
        
// //         // Mettre à jour le stock
// //         await Product.updateStock(item.product_id, -item.quantity);
// //       }
      
// //       // 3. Calculer les emballages et frais d'enlèvement
// //       if (with_packaging) {
// //         const packagingResult = calculatePackaging(items);
// //         totalPackaging = packagingResult.totalPackaging;
// //       }
      
// //       const removalFeesResult = calculateRemovalFees(items);
// //       totalRemovalFees = removalFeesResult.totalRemovalFees;
      
// //       // 4. Calculer le total général
// //       const grandTotal = with_packaging 
// //         ? totalProducts + totalPackaging + totalRemovalFees
// //         : totalProducts + totalRemovalFees;
      
// //       // 5. Mettre à jour la vente avec les totaux
// //       const updateSaleQuery = `
// //         UPDATE sales 
// //         SET 
// //           total_products = $1,
// //           total_packaging = $2,
// //           total_removal_fees = $3,
// //           grand_total = $4,
// //           status = 'confirmed'
// //         WHERE id = $5
// //         RETURNING *`;
      
// //       const updatedSale = await client.query(updateSaleQuery, [
// //         totalProducts,
// //         totalPackaging,
// //         totalRemovalFees,
// //         grandTotal,
// //         sale.id
// //       ]);
      
// //       await client.query('COMMIT');
// //       return updatedSale.rows[0];
      
// //     } catch (error) {
// //       await client.query('ROLLBACK');
// //       throw error;
// //     } finally {
// //       client.release();
// //     }
// //   }

// //   static async findById(id) {
// //     const saleQuery = 'SELECT * FROM sales WHERE id = $1';
// //     const itemsQuery = `
// //       SELECT si.*, p.name as product_name, p.category as product_category
// //       FROM sale_items si
// //       JOIN products p ON si.product_id = p.id
// //       WHERE si.sale_id = $1`;
    
// //     const saleResult = await pool.query(saleQuery, [id]);
// //     if (saleResult.rows.length === 0) {
// //       return null;
// //     }
    
// //     const sale = saleResult.rows[0];
// //     const itemsResult = await pool.query(itemsQuery, [id]);
// //     sale.items = itemsResult.rows;
    
// //     return sale;
// //   }
// // }

// // export default Sale;


// import pool from '../config/bb.js';

// class Sale {
//   // static async create({ client_name, status = 'pending', total_amount, packaging_included = false }) {
//   //   const query = `
//   //     INSERT INTO sales (client_name, status, total_amount, packaging_included)
//   //     VALUES ($1, $2, $3, $4)
//   //     RETURNING *;
//   //   `;
//   //   const values = [client_name, status, total_amount, packaging_included];
//   //   const { rows } = await pool.query(query, values);
//   //   return rows[0];
//   // }

//   // AU DESSUS ORIGINAL CODE:

//   static async create({ client_name, total_amount,  status = 'pending', packaging_included, packaging_count = 0, packaging_price = 0 }) {
//   const result = await db.query(`
//     INSERT INTO sales (client_name, total_amount, packaging_included, packaging_count, packaging_price)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *;
//   `, [client_name, total_amount, packaging_included,  status = 'pending', packaging_count, packaging_price]);

//   return result.rows[0];
// }

//   static async findById(id) {
//     const { rows } = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
//     return rows[0];
//   }

//   static async findAll() {
//     const { rows } = await pool.query('SELECT * FROM sales ORDER BY created_at DESC');
//     return rows;
//   }

//   static async updateStatus(id, status) {
//     const query = `
//       UPDATE sales
//       SET status = $1
//       WHERE id = $2
//       RETURNING *;
//     `;
//     const { rows } = await pool.query(query, [status, id]);
//     return rows[0];
//   }


//   // Dans Sale.js
// static async updateTotal(id, total_amount) {
//   const { rows } = await pool.query(
//     'UPDATE sales SET total_amount = $1 WHERE id = $2 RETURNING *',
//     [total_amount, id]
//   );
//   return rows[0];
// }


//   static async confirmSale(id) {
//     const query = `
//       UPDATE sales
//       SET status = 'confirmed', confirmed_at = NOW()
//       WHERE id = $1
//       RETURNING *;
//     `;
//     const { rows } = await pool.query(query, [id]);
//     return rows[0];
//   }

//   static async cancelSale(id) {
//     const query = `
//       UPDATE sales
//       SET status = 'cancelled'
//       WHERE id = $1
//       RETURNING *;
//     `;
//     const { rows } = await pool.query(query, [id]);
//     return rows[0];
//   }

//   static async getDailyTotal(date) {
//   const { rows } = await pool.query(`
//     SELECT SUM(total_amount) as daily_total
//     FROM sales
//     WHERE status = 'confirmed'
//     AND DATE(confirmed_at) = $1
//   `, [date]);

//   return rows[0]?.daily_total || 0;
// }
// static async verifySalesExist(date) {
//   const query = `
//     SELECT 
//       COUNT(s.id) as sales_count,
//       COUNT(si.id) as items_count
//     FROM sales s
//     LEFT JOIN sale_items si ON s.id = si.sale_id AND si.status = 'pending'
//     WHERE s.status = 'confirmed'
//     AND DATE(s.confirmed_at AT TIME ZONE 'UTC') = $1
//   `;
  
//   const { rows } = await pool.query(query, [date]);
//   return {
//     hasSales: rows[0].sales_count > 0,
//     hasItems: rows[0].items_count > 0
//   };
// }



// static async updateAmount(id, total_amount) {
//   const query = `
//     UPDATE sales
//     SET total_amount = $2
//     WHERE id = $1
//     RETURNING *;
//   `;
//   const { rows } = await pool.query(query, [id, total_amount]);
//   return rows[0];
// }


// // Dans Sale.js
// static async updateTotal(id, total_amount) {
//   const { rows } = await pool.query(
//     'UPDATE sales SET total_amount = $1 WHERE id = $2 RETURNING *',
//     [total_amount, id]
//   );
//   return rows[0];
// }



// static async getMonthlyTotal(year, month) {
//   const { rows } = await pool.query(`
//     SELECT SUM(total_amount) as monthly_total
//     FROM sales
//     WHERE status = 'confirmed'
//     AND EXTRACT(YEAR FROM confirmed_at) = $1
//     AND EXTRACT(MONTH FROM confirmed_at) = $2
//   `, [year, month]);

//   return rows[0]?.monthly_total || 0;
// }

// static async getDailySalesCount(date) {
//   const { rows } = await pool.query(`
//     SELECT COUNT(DISTINCT s.id) 
//     FROM sales s
//     JOIN sale_items si ON s.id = si.sale_id
//     WHERE si.status = 'pending'
//     AND DATE(s.confirmed_at) = $1
//   `, [date]);
  
//   return parseInt(rows[0].count);
// }

// static async updatePackaging(id, count, price, included) {
//   await db.query(`
//     UPDATE sales 
//     SET packaging_count = $1, packaging_price = $2, packaging_included = $3
//     WHERE id = $4;
//   `, [count, price, included, id]);
// }

// }

// export default Sale;



import pool from '../config/bb.js';

class Sale {
  static async create({ client_name, total_amount, status = 'pending', packaging_included = false, packaging_count = 0, packaging_price = 0 }) {
    const query = `
      INSERT INTO sales (client_name, total_amount, status, packaging_included, packaging_count, packaging_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [client_name, total_amount, status, packaging_included, packaging_count, packaging_price];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM sales ORDER BY created_at DESC');
    return rows;
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE sales
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [status, id]);
    return rows[0];
  }

  static async updateAmount(id, total_amount) {
    const query = `
      UPDATE sales
      SET total_amount = $2
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, total_amount]);
    return rows[0];
  }

  static async confirmSale(id) {
    const query = `
      UPDATE sales
      SET status = 'confirmed', confirmed_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async cancelSale(id) {
    const query = `
      UPDATE sales
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async getDailyTotal(date) {
    const { rows } = await pool.query(`
      SELECT SUM(total_amount) as daily_total
      FROM sales
      WHERE status = 'confirmed'
      AND DATE(confirmed_at) = $1
    `, [date]);

    return rows[0]?.daily_total || 0;
  }

  static async verifySalesExist(date) {
    const query = `
      SELECT 
        COUNT(s.id) as sales_count,
        COUNT(si.id) as items_count
      FROM sales s
      LEFT JOIN sale_items si ON s.id = si.sale_id AND si.status = 'pending'
      WHERE s.status = 'confirmed'
      AND DATE(s.confirmed_at AT TIME ZONE 'UTC') = $1
    `;
    const { rows } = await pool.query(query, [date]);
    return {
      hasSales: parseInt(rows[0].sales_count) > 0,
      hasItems: parseInt(rows[0].items_count) > 0
    };
  }

  static async getMonthlyTotal(year, month) {
    const { rows } = await pool.query(`
      SELECT SUM(total_amount) as monthly_total
      FROM sales
      WHERE status = 'confirmed'
      AND EXTRACT(YEAR FROM confirmed_at) = $1
      AND EXTRACT(MONTH FROM confirmed_at) = $2
    `, [year, month]);

    return rows[0]?.monthly_total || 0;
  }

  static async getDailySalesCount(date) {
    const { rows } = await pool.query(`
      SELECT COUNT(DISTINCT s.id) 
      FROM sales s
      JOIN sale_items si ON s.id = si.sale_id
      WHERE si.status = 'pending'
      AND DATE(s.confirmed_at) = $1
    `, [date]);

    return parseInt(rows[0].count);
  }

  static async updatePackaging(id, count, price, included) {
    const query = `
      UPDATE sales 
      SET packaging_count = $1, packaging_price = $2, packaging_included = $3
      WHERE id = $4;
    `;
    await pool.query(query, [count, price, included, id]);
  }
}

export default Sale;
