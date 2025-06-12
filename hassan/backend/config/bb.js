import pkg from "pg"; // ✅ Importe `pg` en tant que module entier
const { Pool } = pkg; // ✅ Déstructure `Pool` à partir de `pg`

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "drink_manager",
  password: "EMJ",
  port: 5432,
});

export default pool; // ✅ Utilisation de `export default`
