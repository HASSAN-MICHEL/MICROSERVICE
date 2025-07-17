
// // import express from 'express';
// // import { pool } from '../config/bibi.js';
// // import multer from 'multer';
// // import {
// //   creerDossier,
// //   rechercherDossier,
// //   positionDossier,
// //   historiqueDossier,
// //   statistiques,
// //   listeDossier,
// //   uploadFichierDossier,
// //   listeRejete
 
// // } from '../controllers/dossierController.js';
// // import { upload } from '../config/multer.js';
// // import {envoyerADepense} from "../controllers/dossierController.js"

// // const router = express.Router();

// // router.post('/dossiers', creerDossier);
// // router.get('/list', listeDossier);
// // router.get('/dossiers/recherche', rechercherDossier);
// // router.get('/dossiers/:id/position', positionDossier);
// // router.get('/dossiers/:id/historique', historiqueDossier);
// // router.get('/dossiers/statistiques/etapes', statistiques);
// // router.put('/dossiers/:id/envoyer-depense' , envoyerADepense); //route pour envoyer un dossier du secretariat pour la depense
// // // 🔽 Nouvelle route d’upload de fichier

// // router.post('/dossiers/:id/upload', upload.single('fichier'), async (req, res) => {
// //   const { id } = req.params;
// //   // Stockez juste le nom du fichier
// //   const fichier_nom = req.file.filename; 

// //   await pool.query(
// //     'UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2',
// //     [fichier_nom, id]
// //   );

// //   res.json({ 
// //     message: "Fichier enregistré", 
// //     fichier_url: fichier_nom 
// //   });
// // });

// // router.put('/dossiers/:id/envoyer-comptabilite', async (req, res) => { // ici je suis directement passé par la route pour envoyer le dossier à la comptabilité
// //   const { id } = req.params;
// //   try {
// //     await pool.query(
// //       `UPDATE dossiers SET etape_actuelle = 'comptabilite' WHERE id_dossier = $1`,
// //       [id]
// //     );
// //     res.json({ message: "Envoyé à la comptabilité" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });


// // router.put("/dossiers/:id/rejet", async (req, res) => { // route pour rejeté un dossier ici on va precisé la raison en temps que commentaire du rejet
// //   const { id } = req.params;
// //   const { commentaire } = req.body;
// //   try {
// //     await pool.query(
// //       `UPDATE dossiers SET etape_actuelle = 'rejeté', commentaire_rejet = $1 WHERE id_dossier = $2`,
// //       [commentaire, id]
// //     );
// //     res.json({ message: "Dossier rejeté avec succès" });
// //   } catch (err) {
// //     console.error("Erreur :", err);
// //     res.status(500).json({ error: "Erreur lors du rejet du dossier" });
// //   }
// // });

// // // route pour la liste des dossier rejeté avec les raisons: 

// // router.get("/dossiers/rejetes" ,listeRejete );
// // export default router;




import express from 'express';
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
  programme,
  envoipaiement,
  finaliserPaiement,
  paiement,
  envoyerADepense, 
  bilanDossier
} from '../controllers/dossierController.js';

import {
  creerUtilisateur,
  connecterUtilisateur,
  deconnexionUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
  getUtilisateurConnecte
} from "../controllers/userControllers.js";
import { requireLogin, onlyAdmin } from "../middlewares/auth.js";
import { upload } from '../config/multer.js';
import { pool } from '../config/bibi.js';

const router = express.Router();

router.post('/dossiers',  requireLogin ,creerDossier);

router.post('/dossiers/:id/upload', upload.single('fichier'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier uploadé" });
    }

    // On utilise le chemin relatif pour que le front y accède
    const fichier_url = `/uploads/${req.file.filename}`;

    await pool.query(
      'UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2',
      [fichier_url, id]
    );

    res.json({ message: "Fichier enregistré", fichier_url });
  } catch (err) {
    console.error("Erreur upload:", err);
    res.status(500).json({ error: "Erreur serveur lors de l'upload" });
  }
});





router.get('/list', listeDossier);

// Recherche et consultation
router.get('/dossiers/recherche', requireLogin, rechercherDossier);
router.get('/dossiers/:id/position', requireLogin, positionDossier);
router.get('/dossiers/:id/historique', requireLogin, historiqueDossier);
router.get('/dossiers/:id/bilan', requireLogin, bilanDossier);
router.get('/dossiers/statistiques/etapes', requireLogin, statistiques);

// Gestion des fichiers
router.post('/dossiers/:id/upload', upload.single('fichier'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier uploadé" });
    }

    // On utilise le chemin relatif pour que le front y accède
    const fichier_url = `/uploads/${req.file.filename}`;

    await pool.query(
      'UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2',
      [fichier_url, id]
    );

    res.json({ message: "Fichier enregistré", fichier_url });
  } catch (err) {
    console.error("Erreur upload:", err);
    res.status(500).json({ error: "Erreur serveur lors de l'upload" });
  }
});

// Transitions entre étapes
router.put('/dossiers/:id/envoyer-depense', requireLogin, envoyerADepense);


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



router.put('/dossiers/:id/envoyer-comptabilite', requireLogin, async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;
  const { commentaire } = req.body;

  try {
    const dossier = await pool.query(
      `SELECT etape_actuelle FROM dossiers WHERE id_dossier = $1`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    const etape_precedente = dossier.rows[0].etape_actuelle;

    await pool.query(
      `UPDATE dossiers 
       SET etape_actuelle = 'comptabilite', date_modification = CURRENT_TIMESTAMP 
       WHERE id_dossier = $1`,
      [id]
    );

    await pool.query(
      `INSERT INTO etapes_dossier 
       (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, 'comptabilite', etape_precedente, 'comptabilite', id_utilisateur, 'Transféré', commentaire || 'Envoi au service comptabilité']
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

// Gestion des rejets

router.put("/dossiers/:id/rejet", requireLogin, async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;
  const { commentaire } = req.body;  // Plus de motif

  if (!commentaire) {
    return res.status(400).json({ error: "Un commentaire est obligatoire pour rejeter un dossier" });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Vérifier le dossier
    const dossier = await client.query(
      `SELECT etape_actuelle FROM dossiers WHERE id_dossier = $1 FOR UPDATE`,
      [id]
    );

    if (!dossier.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    const etape_precedente = dossier.rows[0].etape_actuelle;

    if (etape_precedente.toLowerCase() === 'rejeté') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: "Le dossier est déjà rejeté" });
    }

    // Mettre à jour uniquement le commentaire de rejet et l'étape
    await client.query(
      `UPDATE dossiers 
       SET etape_actuelle = 'rejeté', 
           date_modification = CURRENT_TIMESTAMP,
           commentaire_rejet = $1
       WHERE id_dossier = $2`,
      [commentaire, id]
    );

    // Enregistrer la transition dans l'historique
    await client.query(
      `INSERT INTO etapes_dossier 
       (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, 'rejeté', etape_precedente, 'rejeté', id_utilisateur, 'Rejeté', commentaire]
    );

    await client.query('COMMIT');

    // Réponse simplifiée
    res.json({ 
      message: "Dossier rejeté avec succès",
      details: {
        id_dossier: id,
        ancienne_etape: etape_precedente,
        nouvelle_etape: 'rejeté',
        date_transition: new Date().toISOString(),
        responsable: id_utilisateur,
        commentaire,
      }
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erreur lors du rejet du dossier:", err);
    res.status(500).json({ 
      error: "Erreur serveur lors du rejet du dossier"
    });
  } finally {
    client.release();
  }
});



router.put("/dossiers/:id/retour-depense", requireLogin, async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;
  const { commentaire } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Vérifier que le dossier existe et est bien rejeté
    const dossier = await client.query(
      `SELECT etape_actuelle, commentaire_rejet FROM dossiers WHERE id_dossier = $1 FOR UPDATE`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    if (dossier.rows[0].etape_actuelle !== 'rejeté') {
      return res.status(400).json({ error: "Seuls les dossiers rejetés peuvent être renvoyés à la dépense" });
    }

    // 2. Mettre à jour le dossier
    await client.query(
      `UPDATE dossiers 
       SET etape_actuelle = 'depense', 
           date_modification = CURRENT_TIMESTAMP,
           commentaire_rejet = NULL,
           motif_rejet = NULL
       WHERE id_dossier = $1`,
      [id]
    );

    // 3. Enregistrer la transition dans l'historique
    await client.query(
      `INSERT INTO etapes_dossier 
       (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, 'depense', 'rejeté', 'depense', id_utilisateur, 'Retour en dépense', 
       commentaire || `Dossier précédemment rejeté: ${dossier.rows[0].commentaire_rejet || 'aucun commentaire'}`]
    );

    await client.query('COMMIT');

    // 4. Retourner la réponse détaillée
    res.json({ 
      message: "Dossier renvoyé à la dépense avec succès",
      details: {
        id_dossier: id,
        ancienne_etape: 'rejeté',
        nouvelle_etape: 'depense',
        date_transition: new Date().toISOString(),
        responsable: id_utilisateur,
        commentaire: commentaire || "Retour après rejet"
      }
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erreur lors du retour à la dépense:", err);
    res.status(500).json({ 
      error: err.message,
      details: "Échec du retour à la dépense"
    });
  } finally {
    client.release();
  }
});



router.get('/dossiers/proprietaire/bilan', requireLogin, async (req, res) => {
  const { nom_proprietaire } = req.query;

  // Validation améliorée
  if (!nom_proprietaire || typeof nom_proprietaire !== 'string' || nom_proprietaire.trim().length < 2) {
    return res.status(400).json({ 
      error: "Paramètre 'nom_proprietaire' invalide (minimum 2 caractères)",
      example: "/api/dossiers/proprietaire/bilan?nom_proprietaire=DUPONT"
    });
  }

  const nomProprietaireClean = nom_proprietaire.trim();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Récupération des IDs avec vérification d'existence
    const { rows } = await client.query(
      `SELECT id_dossier FROM dossiers 
       WHERE nom_proprietaire ILIKE $1
       ORDER BY date_modification DESC
       LIMIT 1000`, // Limite de sécurité
      [`%${nomProprietaireClean}%`]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        error: "Aucun dossier trouvé",
        suggestion: "Vérifiez l'orthographe du nom"
      });
    }

    // Extraction des IDs (vérification de type)
    const ids = rows.map(row => {
      const id = parseInt(row.id_dossier);
      if (isNaN(id)) {
        throw new Error(`ID de dossier invalide: ${row.id_dossier}`);
      }
      return id;
    });

    // 2. Requêtes optimisées en une seule transaction
    const [dossiers, statistiques] = await Promise.all([
      // Dossiers de base
      client.query({
        text: `SELECT 
                d.id_dossier, d.nom_dossier, d.etape_actuelle, d.statut,
                d.date_depot, d.date_modification,
                t.nom_type, n.nom_nature
              FROM dossiers d
              JOIN types_dossier t ON d.id_type = t.id_type
              JOIN natures_dossier n ON d.id_nature = n.id_nature
              WHERE d.id_dossier = ANY($1)
              ORDER BY d.date_modification DESC
              LIMIT 100`,
        values: [ids]
      }),
      
      // Toutes les statistiques en une requête
      client.query({
        text: `WITH stats_base AS (
                SELECT
                  etape_actuelle,
                  id_type,
                  id_nature,
                  EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - date_depot))/86400 AS jours_ouvert
                FROM dossiers
                WHERE id_dossier = ANY($1)
              )
              
              SELECT 
                'etape' as categorie,
                etape_actuelle as nom,
                COUNT(*) as total,
                ROUND(AVG(jours_ouvert)::numeric, 2) as jours_moyen
              FROM stats_base
              GROUP BY etape_actuelle
              
              UNION ALL SELECT 
                'type' as categorie,
                t.nom_type as nom,
                COUNT(*) as total,
                ROUND(AVG(s.jours_ouvert)::numeric, 2) as jours_moyen
              FROM stats_base s
              JOIN types_dossier t ON s.id_type = t.id_type
              GROUP BY t.nom_type
              
              UNION ALL SELECT 
                'nature' as categorie,
                n.nom_nature as nom,
                COUNT(*) as total,
                ROUND(AVG(s.jours_ouvert)::numeric, 2) as jours_moyen
              FROM stats_base s
              JOIN natures_dossier n ON s.id_nature = n.id_nature
              GROUP BY n.nom_nature`,
        values: [ids]
      })
    ]);

    await client.query('COMMIT');

    // Formatage des résultats
    const stats = statistiques.rows.reduce((acc, row) => {
      acc[row.categorie] = acc[row.categorie] || [];
      acc[row.categorie].push(row);
      return acc;
    }, {});

    const response = {
      meta: {
        proprietaire: nomProprietaireClean,
        total_dossiers: ids.length,
        date_generation: new Date().toISOString()
      },
      statistiques: stats,
      dossiers: dossiers.rows,
      alertes: {
        dossiers_inactifs: dossiers.rows.filter(d => {
          const joursInactifs = (new Date() - new Date(d.date_modification)) / (1000 * 60 * 60 * 24);
          return joursInactifs > 30;
        }).length
      }
    };

    res.json(response);

  } catch (err) {
    await client.query('ROLLBACK');
    
    console.error(`Erreur bilan ${nom_proprietaire}:`, {
      error: err.message,
      stack: err.stack
    });

    res.status(500).json({ 
      error: "Erreur lors de la génération du bilan",
      ...(process.env.NODE_ENV === 'development' && {
        details: err.message
      })
    });
  } finally {
    client.release();
  }
});


// router.get('/dossiers/proprietaire/bilan', requireLogin, async (req, res) => {
//   const { nom_proprietaire } = req.query;

//   if (!nom_proprietaire) {
//     return res.status(400).json({ 
//       error: "Le paramètre 'nom_proprietaire' est requis",
//       example: "/api/dossiers/proprietaire/bilan?nom_proprietaire=DUPONT"
//     });
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // 1. D'abord récupérer les IDs des dossiers
//     const idsResult = await client.query(
//       `SELECT id_dossier FROM dossiers WHERE nom_proprietaire ILIKE $1`,
//       [nom_proprietaire]
//     );

//     if (idsResult.rows.length === 0) {
//       return res.status(404).json({ 
//         error: "Aucun dossier trouvé pour ce propriétaire",
//         proprietaire: nom_proprietaire
//       });
//     }

//     // Extraire juste les IDs
//     const ids = idsResult.rows.map(row => row.id_dossier);

//     // 2. Fonction helper pour les requêtes
//     const makeQuery = (sql) => client.query(sql, [ids]);

//     // 3. Exécuter toutes les requêtes en parallèle
//     const [
//       dossiers,
//       statsEtape,
//       statsType,
//       statsNature,
//       recentModifies,
//       tempsParEtape,
//       dossiersBloques
//     ] = await Promise.all([
//       makeQuery(`
//         SELECT d.*, n.nom_nature, t.nom_type 
//         FROM dossiers d
//         JOIN natures_dossier n ON d.id_nature = n.id_nature
//         JOIN types_dossier t ON d.id_type = t.id_type
//         WHERE d.id_dossier = ANY($1)
//       `),
//       makeQuery(`
//         SELECT 
//           etape_actuelle, 
//           COUNT(*) as nombre_dossiers,
//           ROUND(AVG(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - date_depot))/86400)::numeric, 2) as jours_moyen
//         FROM dossiers
//         WHERE id_dossier = ANY($1)
//         GROUP BY etape_actuelle
//       `),
//       makeQuery(`
//         SELECT 
//           t.nom_type, 
//           COUNT(*) as nombre_dossiers,
//           ROUND(AVG(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - d.date_depot))/86400)::numeric, 2) as jours_moyen
//         FROM dossiers d
//         JOIN types_dossier t ON d.id_type = t.id_type
//         WHERE d.id_dossier = ANY($1)
//         GROUP BY t.nom_type
//       `),
//       makeQuery(`
//         SELECT 
//           n.nom_nature, 
//           COUNT(*) as nombre_dossiers,
//           ROUND(AVG(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - d.date_depot))/86400)::numeric, 2) as jours_moyen
//         FROM dossiers d
//         JOIN natures_dossier n ON d.id_nature = n.id_nature
//         WHERE d.id_dossier = ANY($1)
//         GROUP BY n.nom_nature
//       `),
//       makeQuery(`
//         SELECT 
//           id_dossier, 
//           nom_dossier,
//           etape_actuelle,
//           date_modification
//         FROM dossiers
//         WHERE id_dossier = ANY($1)
//         ORDER BY date_modification DESC
//         LIMIT 5
//       `),
//       makeQuery(`
//         WITH etapes AS (
//           SELECT 
//             id_dossier,
//             etape_suivante,
//             date_action,
//             LAG(date_action) OVER (PARTITION BY id_dossier ORDER BY date_action) as date_precedente
//           FROM etapes_dossier
//           WHERE id_dossier = ANY($1)
//         )
//         SELECT 
//           etape_suivante as etape,
//           ROUND(AVG(EXTRACT(EPOCH FROM (date_action - date_precedente))/86400)::numeric, 2) as jours_moyen,
//           COUNT(*) as nombre_transitions
//         FROM etapes
//         WHERE date_precedente IS NOT NULL
//         GROUP BY etape_suivante
//       `),
//       makeQuery(`
//         SELECT 
//           id_dossier,
//           nom_dossier,
//           etape_actuelle,
//           date_modification,
//           ROUND(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - date_modification))/86400)::numeric, 2) as jours_inactifs
//         FROM dossiers
//         WHERE id_dossier = ANY($1)
//         AND date_modification < CURRENT_TIMESTAMP - INTERVAL '30 days'
//         ORDER BY jours_inactifs DESC
//       `)
//     ]);

//     await client.query('COMMIT');

//     // Construction de la réponse
//     const response = {
//       proprietaire: nom_proprietaire,
//       total_dossiers: dossiers.rows.length,
//       statistiques: {
//         par_etape: statsEtape.rows,
//         par_type: statsType.rows,
//         par_nature: statsNature.rows,
//         temps_moyen_par_etape: tempsParEtape.rows
//       },
//       dossiers_recemment_modifies: recentModifies.rows,
//       alertes: {
//         dossiers_bloques: dossiersBloques.rows,
//         nombre_dossiers_bloques: dossiersBloques.rows.length
//       },
//       liste_complete_dossiers: dossiers.rows.map(d => ({
//         id_dossier: d.id_dossier,
//         nom_dossier: d.nom_dossier,
//         etape_actuelle: d.etape_actuelle,
//         statut: d.statut,
//         date_depot: d.date_depot,
//         date_modification: d.date_modification,
//         type: d.nom_type,
//         nature: d.nom_nature
//       }))
//     };

//     res.json(response);

//   } catch (err) {
//     await client.query('ROLLBACK');
//     console.error("Erreur détaillée:", {
//       message: err.message,
//       stack: err.stack,
//       query: req.query,
//       timestamp: new Date().toISOString()
//     });
    
//     res.status(500).json({ 
//       error: "Erreur lors de la génération du bilan",
//       details: process.env.NODE_ENV === 'development' ? {
//         message: err.message,
//         stack: err.stack
//       } : undefined
//     });
//   } finally {
//     client.release();
//   }
// });

// Routes spécifiques par étape
router.get("/dossiers/rejetes", requireLogin, listeRejete);
router.get("/dossiers/a-verifier-comptabilite", requireLogin, listeComptabilite);
router.put("/dossiers/:id/envoyer-programmation", requireLogin, envoyerAProgrammation);
router.get("/dossiers/programmation", requireLogin, programme);
router.put("/dossiers/:id/envoyer-paiement", requireLogin, envoipaiement);
router.put("/dossiers/:id/confirmer", requireLogin, finaliserPaiement);
router.get("/dossiers/a-payer", requireLogin, paiement);

// ==============================================
// Routes pour l'authentification et les utilisateurs
// ==============================================

// Authentification
router.post("/login", connecterUtilisateur);
router.get("/logout", requireLogin, deconnexionUtilisateur);
router.get("/me", requireLogin, getUtilisateurConnecte);

// Gestion des utilisateurs (admin seulement)
router.post("/utilisateurs", requireLogin, onlyAdmin, creerUtilisateur);
router.put("/utilisateurs/:id", requireLogin, onlyAdmin, modifierUtilisateur);
router.delete("/utilisateurs/:id", requireLogin, onlyAdmin, supprimerUtilisateur);

export default router;