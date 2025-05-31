import pool from '../config/bb.js';

class Invoice {
  static async create({ sale_id, invoice_number, total_amount, file_path }) {
    const query = `
      INSERT INTO invoices (sale_id, invoice_number, total_amount, file_path)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [sale_id, invoice_number, total_amount, file_path];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findBySaleId(sale_id) {
    const { rows } = await pool.query('SELECT * FROM invoices WHERE sale_id = $1', [sale_id]);
    return rows[0];
  }
}

export default Invoice;