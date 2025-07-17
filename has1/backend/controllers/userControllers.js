import { pool } from "../config/bibi.js";
import bcrypt from "bcrypt";

// Connexion utilisateur
export const connecterUtilisateur = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const result = await pool.query(`
      SELECT u.*, r.nom_role FROM utilisateurs u
      JOIN roles r ON u.id_role = r.id_role
      WHERE email = $1
    `, [email]);

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Utilisateur introuvable" });

    const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });

    req.session.user = {
      id_utilisateur: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      id_role: user.id_role,
      nom_role: user.nom_role
    };

    res.json({ message: "Connexion réussie", utilisateur: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Déconnexion
export const deconnexionUtilisateur = (req, res) => {
  req.session.destroy();
  res.json({ message: "Déconnecté" });
};

// Utilisateur connecté
export const getUtilisateurConnecte = (req, res) => {
  res.json(req.session.user);
};

// Créer un utilisateur
export const creerUtilisateur = async (req, res) => {
  const { nom, prenom, email, mot_de_passe, id_role } = req.body;
  const hash = await bcrypt.hash(mot_de_passe, 10);
  try {
    const result = await pool.query(`
      INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, id_role)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [nom, prenom, email, hash, id_role]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier
export const modifierUtilisateur = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, mot_de_passe, id_role, actif } = req.body;
  const hash = mot_de_passe ? await bcrypt.hash(mot_de_passe, 10) : null;
  try {
    await pool.query(`
      UPDATE utilisateurs
      SET nom = $1, prenom = $2, email = $3,
          mot_de_passe = COALESCE($4, mot_de_passe),
          id_role = $5, actif = $6
      WHERE id_utilisateur = $7
    `, [nom, prenom, email, hash, id_role, actif, id]);
    res.json({ message: "Modifié avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer
export const supprimerUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM utilisateurs WHERE id_utilisateur = $1`, [id]);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Liste des utilisateurs
export const listerUtilisateurs = async (req, res) => {
  try {
    console.log("Requête reçue: /api/utilisateurs");
    const result = await pool.query(`
      SELECT u.id_utilisateur, u.nom, u.prenom, u.email, u.id_role, r.nom_role, u.actif
      FROM utilisateurs u
      JOIN roles r ON u.id_role = r.id_role
      ORDER BY u.id_utilisateur
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur SQL :", err); // log utile
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour le mot de passe d'un utilisateur
export const modifierMotDePasse = async (req, res) => {
  const { id } = req.params;
  const { mot_de_passe } = req.body;
  try {
    const hash = await bcrypt.hash(mot_de_passe, 10);
    await pool.query(`UPDATE utilisateurs SET mot_de_passe = $1 WHERE id_utilisateur = $2`, [hash, id]);
    res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};