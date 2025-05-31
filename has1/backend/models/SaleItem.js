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
}

export default SaleItem;