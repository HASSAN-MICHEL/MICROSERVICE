import express from "express";
import {
  connecterUtilisateur,
  deconnexionUtilisateur,
  getUtilisateurConnecte,
  creerUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
  listerUtilisateurs
} from "../controllers/userControllers.js";
import { pool } from "../config/bibi.js";

import { requireLogin, onlyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", connecterUtilisateur);
router.get("/logout", requireLogin, deconnexionUtilisateur);
router.get("/me", requireLogin, getUtilisateurConnecte);

router.post("/utilisateurs", requireLogin, onlyAdmin, creerUtilisateur);
router.get("/utilisateurs", requireLogin, onlyAdmin, listerUtilisateurs);
router.put("/utilisateurs/:id", requireLogin, onlyAdmin, modifierUtilisateur);
router.delete("/utilisateurs/:id", requireLogin, onlyAdmin, supprimerUtilisateur);
router.post("/user-check", async (req, res) => {
  const { nom, email } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM utilisateurs u JOIN roles r ON u.id_role = r.id_role WHERE u.nom = $1 AND u.email = $2`,
      [nom, email]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Utilisateur introuvable" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
