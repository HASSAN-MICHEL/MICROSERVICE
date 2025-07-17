// import express from 'express';
// import {
//   createSale,
//   confirmSale,
//   cancelSale,
//   updateSaleItems,
//   getSaleDetails,
//   getAllSales,
// } from '../controllers/SaleController.js';

// const router = express.Router();

// router.post('/', createSale);
// router.get('/', getAllSales);
// router.get('/:id', getSaleDetails);
// router.put('/:id/confirm', confirmSale);
// router.put('/:id/cancel', cancelSale);
// router.put('/:id/items', updateSaleItems);

// export default router;




import express from 'express';
import { pool } from '../config/bibi.js';
import multer from 'multer';
import {
  creerDossier,
  rechercherDossier,
  positionDossier,
  historiqueDossier,
  statistiques,
  listeDossier,
  uploadFichierDossier,
  listeRejete, 
  listeComptabilite,
  envoyerAProgrammation,
   programme , envoipaiement , finaliserPaiement , paiement
} from '../controllers/dossierController.js';
import { upload } from '../config/multer.js';
import {envoyerADepense} from "../controllers/dossierController.js"

import {
  creerUtilisateur,
  connecterUtilisateur,
  deconnexionUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
  getUtilisateurConnecte
} from "../controllers/userControllers.js";
import { requireLogin, onlyAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.post('/dossiers', creerDossier);
router.get('/list', listeDossier);
router.get('/dossiers/recherche', rechercherDossier);
router.get('/dossiers/:id/position', positionDossier);
router.get('/dossiers/:id/historique', historiqueDossier);
router.get('/dossiers/statistiques/etapes', statistiques);
router.put('/dossiers/:id/envoyer-depense' , envoyerADepense); //route pour envoyer un dossier du secretariat pour la depense
// 🔽 Nouvelle route d’upload de fichier

router.post('/dossiers/:id/upload', upload.single('fichier'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier uploadé" });
    }

    const fichier_nom = req.file.filename;
    
    await pool.query(
      'UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2',
      [fichier_nom, id]
    );

    res.json({ 
      message: "Fichier enregistré", 
      fichier_url: `/uploads/${fichier_nom}` // Chemin relatif pour le front
    });
    
  } catch (err) {
    console.error("Erreur upload:", err);
    res.status(500).json({ error: "Erreur serveur lors de l'upload" });
  }
});


router.put('/dossiers/:id/envoyer-comptabilite', async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur; // Supposons que l'utilisateur est authentifié
  const { commentaire } = req.body; // Optionnel: commentaire sur la transition

  try {
    // Récupérer l'étape actuelle
    const dossier = await pool.query(
      `SELECT etape_actuelle FROM dossiers WHERE id_dossier = $1`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    const etape_precedente = dossier.rows[0].etape_actuelle;

    // Enregistrer la transition vers la comptabilité
    await enregistrerTransition(
      id, 
      etape_precedente, 
      'comptabilite', 
      id_utilisateur,
      'Transféré',
      commentaire || 'Envoi au service comptabilité'
    );

    res.json({ 
      message: "Dossier envoyé à la comptabilité",
      details: {
        id_dossier: id,
        ancienne_etape: etape_precedente,
        nouvelle_etape: 'comptabilite',
        date_transition: new Date().toISOString(),
        responsable: id_utilisateur
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: "Échec de l'envoi à la comptabilité"
    });
  }
});


router.get("/dossiers/recherche", async (req, res) => {
  const { query = "", sort = "desc", etape = "" } = req.query;

  try {
    const values = [`%${query.toLowerCase()}%`];
    let sql = `
      SELECT * FROM dossiers
      WHERE (LOWER(nom_dossier) LIKE $1 OR LOWER(nom_proprietaire) LIKE $1)
    `;

    if (etape) {
      sql += ` AND LOWER(etape_actuelle) = $2`;
      values.push(etape.toLowerCase());
    }

    sql += ` ORDER BY  date_depot ${sort.toUpperCase()}`;

    const result = await pool.query(sql, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});




// Route pour le retour du dossier qui a été rejeté au niveaux de la depense :

// Route pour remettre un dossier rejeté dans la phase de dépenses
router.put("/dossiers/:id/retour-depense", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE dossiers 
       SET etape_actuelle = 'depense', commentaire_rejet = NULL 
       WHERE id_dossier = $1 AND etape_actuelle = 'rejeté'`,
      [id]
    );
    res.json({ message: "Dossier renvoyé à la dépense avec succès" });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ error: "Erreur lors du retour à la dépense" });
  }
});


// route pour la liste des dossier rejeté avec les raisons: 

router.get("/dossiers/rejetes" ,listeRejete );
router.get("/dossiers/a-verifier-comptabilite", listeComptabilite); // route pour voir les dossiers à la comptabilité
router.put("/dossiers/:id/envoyer-programmation", envoyerAProgrammation); // route pour envoyer les dossiers à la programmation
// route pour voir les dossiers à la programmation
router.get("/dossiers/programmation", programme); // route pour voir les dossiers à la programmation
router.put("/dossiers/:id/envoyer-paiement", envoipaiement); // route pour envoyer les dossiers à la comptabilité
router.put("/dossiers/:id/confirmer", finaliserPaiement); // route pour finaliser le paiement
router.get("/dossiers/a-payer", paiement); // route pour voir les dossiers en paiement


// Utilisateurs routes:






router.post("/utilisateurs", requireLogin, onlyAdmin, creerUtilisateur);
router.post("/login", connecterUtilisateur);
router.get("/logout", requireLogin, deconnexionUtilisateur);
router.get("/me", requireLogin, getUtilisateurConnecte);

router.put("/utilisateurs/:id", requireLogin, onlyAdmin, modifierUtilisateur);
router.delete("/utilisateurs/:id", requireLogin, onlyAdmin, supprimerUtilisateur);



export default router;




router.put("/dossiers/:id/rejet", async (req, res) => { // route pour rejeté un dossier ici on va precisé la raison en temps que commentaire du rejet
  const { id } = req.params;
  const { commentaire } = req.body;
  try {
    await pool.query(
      `UPDATE dossiers SET etape_actuelle = 'rejeté', commentaire_rejet = $1 WHERE id_dossier = $2`,
      [commentaire, id]
    );
    res.json({ message: "Dossier rejeté avec succès" });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ error: "Erreur lors du rejet du dossier" });
  }
});
