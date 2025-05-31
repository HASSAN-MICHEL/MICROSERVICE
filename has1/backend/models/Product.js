import pool from '../config/bb.js';

class Product {
  static async create({ name, category, price, stock, unit }) {
    const query = `
      INSERT INTO products (name, category, price, stock, unit)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, category, price, stock, unit];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    return rows;
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, { name, category, price, stock, unit }) {
    const query = `
      UPDATE products
      SET name = $1, category = $2, price = $3, stock = $4, unit = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const values = [name, category, price, stock, unit, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateStock(id, quantity) {
    const query = `
      UPDATE products
      SET stock = stock + $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [quantity, id]);
    return rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

export default Product;