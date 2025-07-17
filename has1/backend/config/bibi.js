import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ANGE1', // Nom de la base de données original : "PPE"
  password: 'HASSAN237',
  port: 5432,
});
