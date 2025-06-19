
// import express from 'express';
// import { pool } from '../config/bibi.js';
// import multer from 'multer';
// import {
//   creerDossier,
//   rechercherDossier,
//   positionDossier,
//   historiqueDossier,
//   statistiques,
//   listeDossier,
//   uploadFichierDossier,
//   listeRejete
 
// } from '../controllers/dossierController.js';
// import { upload } from '../config/multer.js';
// import {envoyerADepense} from "../controllers/dossierController.js"

// const router = express.Router();

// router.post('/dossiers', creerDossier);
// router.get('/list', listeDossier);
// router.get('/dossiers/recherche', rechercherDossier);
// router.get('/dossiers/:id/position', positionDossier);
// router.get('/dossiers/:id/historique', historiqueDossier);
// router.get('/dossiers/statistiques/etapes', statistiques);
// router.put('/dossiers/:id/envoyer-depense' , envoyerADepense); //route pour envoyer un dossier du secretariat pour la depense
// // 🔽 Nouvelle route d’upload de fichier

// router.post('/dossiers/:id/upload', upload.single('fichier'), async (req, res) => {
//   const { id } = req.params;
//   // Stockez juste le nom du fichier
//   const fichier_nom = req.file.filename; 

//   await pool.query(
//     'UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2',
//     [fichier_nom, id]
//   );

//   res.json({ 
//     message: "Fichier enregistré", 
//     fichier_url: fichier_nom 
//   });
// });

// router.put('/dossiers/:id/envoyer-comptabilite', async (req, res) => { // ici je suis directement passé par la route pour envoyer le dossier à la comptabilité
//   const { id } = req.params;
//   try {
//     await pool.query(
//       `UPDATE dossiers SET etape_actuelle = 'comptabilite' WHERE id_dossier = $1`,
//       [id]
//     );
//     res.json({ message: "Envoyé à la comptabilité" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.put("/dossiers/:id/rejet", async (req, res) => { // route pour rejeté un dossier ici on va precisé la raison en temps que commentaire du rejet
//   const { id } = req.params;
//   const { commentaire } = req.body;
//   try {
//     await pool.query(
//       `UPDATE dossiers SET etape_actuelle = 'rejeté', commentaire_rejet = $1 WHERE id_dossier = $2`,
//       [commentaire, id]
//     );
//     res.json({ message: "Dossier rejeté avec succès" });
//   } catch (err) {
//     console.error("Erreur :", err);
//     res.status(500).json({ error: "Erreur lors du rejet du dossier" });
//   }
// });

// // route pour la liste des dossier rejeté avec les raisons: 

// router.get("/dossiers/rejetes" ,listeRejete );
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

router.put('/dossiers/:id/envoyer-comptabilite', async (req, res) => { // ici je suis directement passé par la route pour envoyer le dossier à la comptabilité
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE dossiers SET etape_actuelle = 'comptabilite' WHERE id_dossier = $1`,
      [id]
    );
    res.json({ message: "Envoyé à la comptabilité" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


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

// route pour la liste des dossier rejeté avec les raisons: 

router.get("/dossiers/rejetes" ,listeRejete );
router.get("/dossiers/a-verifier-comptabilite", listeComptabilite); // route pour voir les dossiers à la comptabilité
router.put("/dossiers/:id/envoyer-programmation", envoyerAProgrammation); // route pour envoyer les dossiers à la programmation
// route pour voir les dossiers à la programmation
router.get("/dossiers/programmation", programme); // route pour voir les dossiers à la programmation
router.put("/dossiers/:id/envoyer-paiement", envoipaiement); // route pour envoyer les dossiers à la comptabilité
router.put("/dossiers/:id/confirmer", finaliserPaiement); // route pour finaliser le paiement
router.get("/dossiers/a-payer", paiement); // route pour voir les dossiers en paiement

export default router;