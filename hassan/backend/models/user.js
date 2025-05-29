
import pool from "../config/db.js";
import bcrypt from "bcrypt"; // Pour le hachage des mots de passe

const User = {
  // Créer un nouvel utilisateur
  async create({ nom, email, mot_de_passe, role }) {
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // 10 est le coût du hachage

    const result = await pool.query(
      `INSERT INTO users (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom, email, hashedPassword, role]
    );
    return result.rows[0];
  },

  // Récupérer tous les utilisateurs
  async getAll() {
    const result = await pool.query("SELECT id, nom, email, role, date_creation FROM users");
    return result.rows;
  },

  // Récupérer un utilisateur par son ID
  async getById(id) {
    const result = await pool.query(
      "SELECT id, nom, email, role, date_creation FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  // Récupérer un utilisateur par son email (pour l'authentification)
  async getByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  // Mettre à jour un utilisateur
  async update(id, { nom, email, role }) {
    const result = await pool.query(
      `UPDATE users
       SET nom = $1, email = $2, role = $3
       WHERE id = $4 RETURNING *`,
      [nom, email, role, id]
    );
    return result.rows[0];
  },

  // Mettre à jour le mot de passe d'un utilisateur
  async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      `UPDATE users
       SET mot_de_passe = $1
       WHERE id = $2 RETURNING *`,
      [hashedPassword, id]
    );
    return result.rows[0];
  },

  // Supprimer un utilisateur
  async delete(id) {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },

  // Vérifier le mot de passe (pour l'authentification)
  async verifyPassword(email, password) {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const isMatch = await bcrypt.compare(password, user.mot_de_passe);
    if (!isMatch) {
      throw new Error("Mot de passe incorrect");
    }
    return user;
  },
};

export default User; 
