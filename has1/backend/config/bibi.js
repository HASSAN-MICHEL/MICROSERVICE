import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PPE',
  password: 'HASSAN237',
  port: 5432,
});
