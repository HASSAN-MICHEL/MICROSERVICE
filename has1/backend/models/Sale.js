import pool from '../config/bb.js';

class Sale {
  static async create({ client_name, status = 'pending', total_amount, packaging_included = false }) {
    const query = `
      INSERT INTO sales (client_name, status, total_amount, packaging_included)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [client_name, status, total_amount, packaging_included];
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
}

export default Sale;