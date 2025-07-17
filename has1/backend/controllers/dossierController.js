

import { pool } from '../config/bibi.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = '../uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
    cb(null, filename);
  },
});
export const upload = multer({ storage });

// Upload de fichier pour un dossier
export const uploadFichierDossier = async (req, res) => {
  const { id_dossier } = req.params;
  const fichierPath = req.file?.path;

  if (!fichierPath) {
    return res.status(400).json({ error: "Aucun fichier reçu." });
  }

  try {
    await pool.query(
      `UPDATE dossiers SET fichier_url = $1 WHERE id_dossier = $2`,
      [fichierPath, id_dossier]
    );
    res.status(200).json({ message: "Fichier enregistré avec succès", fichier_url: fichierPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ... (tes fonctions existantes inchangées)
export const creerDossier = async (req, res) => {
  const { nom_dossier, nom_proprietaire, id_nature, id_type } = req.body;
  const id_utilisateur = req.user.id_utilisateur; 
  try {
    const result = await pool.query(
      `INSERT INTO dossiers (nom_dossier, nom_proprietaire, id_nature, id_type)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom_dossier, nom_proprietaire, id_nature, id_type]
    );
  
    // Enregistrer la création comme première étape
    await pool.query(
      `INSERT INTO etapes_dossier 
       (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [result.rows[0].id_dossier, 'Création', null, 'Secrétariat', id_utilisateur, 'Créé']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Envoi à la dépense
export const envoyerADepense = async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;

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

    // Enregistrer la transition
    await enregistrerTransition(
      id, 
      etape_precedente, 
      'depense', 
      id_utilisateur,
      'Transféré',
      'Envoi au service de dépense'
    );

    res.json({ message: "Dossier envoyé à la dépense" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Rechercher un dossier
export const rechercherDossier = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(
      `SELECT d.*, n.nom_nature, t.nom_type
       FROM dossiers d
       JOIN natures_dossier n ON d.id_nature = n.id_nature
       JOIN types_dossier t ON d.id_type = t.id_type
       WHERE LOWER(nom_dossier) LIKE LOWER($1)
          OR LOWER(nom_proprietaire) LIKE LOWER($1)`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Position actuelle
export const positionDossier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id_dossier, nom_dossier, etape_actuelle, statut FROM dossiers WHERE id_dossier = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Historique
// export const historiqueDossier = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       `SELECT e.etape, u.nom || ' ' || u.prenom AS acteur, e.date_action, e.decision, e.commentaire
//        FROM etapes_dossier e
//        JOIN utilisateurs u ON e.id_utilisateur = u.id_utilisateur
//        WHERE id_dossier = $1
//        ORDER BY date_action ASC`,
//       [id]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Statistiques par étape
export const statistiques = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT etape_actuelle, COUNT(*) AS total FROM dossiers GROUP BY etape_actuelle`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listeDossier =   async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * from dossiers`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listeRejete  =  async (req , res) => {
  try {
    const result = await pool.query( ` SELECT id_dossier, nom_dossier, nom_proprietaire, etape_actuelle, commentaire_rejet, fichier_url
      FROM dossiers
      WHERE LOWER(etape_actuelle) = 'rejeté'
    `);
    res.json(result.rows);
  }catch(err) {
    console.error("Erreur lors de la recuperation de la lis te des dossier rejeté" , err) ;
    res.status(500).json({error:"erreur de recuperations des dossiers rejeté"})
  }
  };

  //voir les dossiers qui sont à la comptabilite

  export const listeComptabilite = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM dossiers WHERE LOWER(etape_actuelle) = 'comptabilite'
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// envoyer les dossiers à la programmations :



//programmations:

 export const programme = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM dossiers WHERE LOWER(etape_actuelle) = 'programmation'
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const envoyerAProgrammation = async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;
  const { commentaire } = req.body;

  try {
    // Vérifier que le dossier est bien en comptabilité
    const dossier = await pool.query(
      `SELECT etape_actuelle FROM dossiers WHERE id_dossier = $1`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    if (dossier.rows[0].etape_actuelle !== 'comptabilite') {
      return res.status(400).json({ 
        error: "Le dossier doit être en comptabilité pour être programmé" 
      });
    }

    // Enregistrer la transition
    await enregistrerTransition(
      id, 
      'comptabilite', 
      'programmation', 
      id_utilisateur,
      'Programmé',
      commentaire || 'Envoi en programmation'
    );

    res.json({ 
      message: "Dossier envoyé à la programmation",
      metadata: {
        transition: {
          from: 'comptabilite',
          to: 'programmation',
          at: new Date().toISOString(),
          by: id_utilisateur
        }
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      context: "Échec de l'envoi à la programmation"
    });
  }
};
export const envoipaiement = async (req, res) => {
  const { id } = req.params;
  const id_utilisateur = req.user.id_utilisateur;
  const { commentaire, montant } = req.body; // Ajout possible d'un montant

  try {
    // Vérifier que le dossier est bien en programmation
    const dossier = await pool.query(
      `SELECT etape_actuelle FROM dossiers WHERE id_dossier = $1`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    if (dossier.rows[0].etape_actuelle !== 'programmation') {
      return res.status(400).json({ 
        error: "Le dossier doit être en programmation pour le paiement" 
      });
    }

    // Enregistrer la transition
    await enregistrerTransition(
      id, 
      'programmation', 
      'paiement', 
      id_utilisateur,
      'À payer',
      commentaire || (montant ? `Envoi au paiement - Montant: ${montant}` : 'Envoi au paiement')
    );

    // Optionnel: enregistrer le montant si fourni
    if (montant) {
      await pool.query(
        `UPDATE dossiers SET montant_paiement = $1 WHERE id_dossier = $2`,
        [montant, id]
      );
    }

    res.json({ 
      message: "Dossier envoyé au paiement",
      transition: {
        from: 'programmation',
        to: 'paiement',
        date: new Date(),
        by: id_utilisateur,
        ...(montant && { montant: parseFloat(montant) })
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// route pour le service de paiement
export const paiement = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM dossiers WHERE LOWER(etape_actuelle) = 'paiement'
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// pour finalisé le paiement de mes dossiers :

export const finaliserPaiement = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`
      UPDATE dossiers 
      SET etape_actuelle = 'confirmé', statut = 'validé'
      WHERE id_dossier = $1
    `, [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const enregistrerTransition = async (
  id_dossier,
  etape_precedente,
  etape_suivante,
  id_utilisateur,
  decision = null,
  commentaire = null
) => {
  try {
    // Mettre à jour la date de modification dans la table dossiers
    await pool.query(
      `UPDATE dossiers 
       SET etape_actuelle = $1, date_modification = CURRENT_TIMESTAMP 
       WHERE id_dossier = $2`,
      [etape_suivante, id_dossier]
    );

    // Enregistrer la transition dans l'historique
    await pool.query(
      `INSERT INTO etapes_dossier 
       (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_dossier, etape_suivante, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire]
    );
  } catch (err) {
    console.error("Erreur lors de l'enregistrement de la transition:", err);
    throw err;
  }
};


export const historiqueDossier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
         e.etape_precedente, e.etape_suivante,
         e.date_action, e.decision, e.commentaire,
         u.nom || ' ' || u.prenom AS acteur,
         EXTRACT(EPOCH FROM (e.date_action - LAG(e.date_action) OVER (ORDER BY e.date_action))/3600 AS delai_heures
       FROM etapes_dossier e
       JOIN utilisateurs u ON e.id_utilisateur = u.id_utilisateur
       WHERE e.id_dossier = $1
       ORDER BY e.date_action ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Bilan complet d'un dossier
export const bilanDossier = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer les informations de base du dossier
    const dossier = await pool.query(
      `SELECT d.*, n.nom_nature, t.nom_type
       FROM dossiers d
       JOIN natures_dossier n ON d.id_nature = n.id_nature
       JOIN types_dossier t ON d.id_type = t.id_type
       WHERE d.id_dossier = $1`,
      [id]
    );

    if (!dossier.rows[0]) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    // Récupérer l'historique complet des transitions
    const historique = await pool.query(
      `SELECT 
         e.etape_precedente, e.etape_suivante, 
         e.date_action, e.decision, e.commentaire,
         u.nom || ' ' || u.prenom AS acteur
       FROM etapes_dossier e
       JOIN utilisateurs u ON e.id_utilisateur = u.id_utilisateur
       WHERE e.id_dossier = $1
       ORDER BY e.date_action ASC`,
      [id]
    );

    res.json({
      dossier: dossier.rows[0],
      historique: historique.rows,
      delai_total: await calculerDelaiTotal(id)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fonction pour calculer le délai total de traitement
async function calculerDelaiTotal(id_dossier) {
  const result = await pool.query(
    `SELECT 
       MIN(date_action) as date_debut,
       MAX(date_action) as date_fin
     FROM etapes_dossier
     WHERE id_dossier = $1`,
    [id_dossier]
  );

  if (result.rows[0].date_debut && result.rows[0].date_fin) {
    const debut = new Date(result.rows[0].date_debut);
    const fin = new Date(result.rows[0].date_fin);
    return (fin - debut) / (1000 * 60 * 60 * 24); // Retourne le nombre de jours
  }
  return 0;
};

// async function enregistrerTransition(id_dossier, etape_precedente, etape_suivante, id_utilisateur, decision = null, commentaire = null) {
//   const client = await pool.connect();
  
//   try {
//     await client.query('BEGIN');

//     // 1. Vérifier que le dossier existe
//     const dossier = await client.query(
//       `SELECT id_dossier, etape_actuelle FROM dossiers WHERE id_dossier = $1 FOR UPDATE`,
//       [id_dossier]
//     );

//     if (dossier.rows.length === 0) {
//       throw new Error(`Dossier ${id_dossier} non trouvé`);
//     }

//     // 2. Vérifier la cohérence de l'étape précédente
//     if (dossier.rows[0].etape_actuelle !== etape_precedente) {
//       throw new Error(`Le dossier n'est pas dans l'état attendu (actuel: ${dossier.rows[0].etape_actuelle}, attendu: ${etape_precedente})`);
//     }

//     // 3. Mettre à jour le dossier
//     await client.query(
//       `UPDATE dossiers 
//        SET etape_actuelle = $1, date_modification = CURRENT_TIMESTAMP 
//        WHERE id_dossier = $2`,
//       [etape_suivante, id_dossier]
//     );

//     // 4. Enregistrer la transition
//     await client.query(
//       `INSERT INTO etapes_dossier 
//        (id_dossier, etape, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire)
//        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//       [id_dossier, etape_suivante, etape_precedente, etape_suivante, id_utilisateur, decision, commentaire]
//     );

//     await client.query('COMMIT');

//     // Retourner les détails de la transition
//     return {
//       id_dossier,
//       ancienne_etape: etape_precedente,
//       nouvelle_etape: etape_suivante,
//       date_transition: new Date(),
//       id_utilisateur,
//       decision,
//       commentaire
//     };
//   } catch (err) {
//     await client.query('ROLLBACK');
//     console.error(`Échec de la transition pour le dossier ${id_dossier}:`, err);
//     throw err; // Propage l'erreur pour la gestion dans le routeur
//   } finally {
//     client.release();
//   }
// }