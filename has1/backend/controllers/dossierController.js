import { pool } from '../config/bibi.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
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
  try {
    const result = await pool.query(
      `INSERT INTO dossiers (nom_dossier, nom_proprietaire, id_nature, id_type)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom_dossier, nom_proprietaire, id_nature, id_type]
    );
    res.status(201).json(result.rows[0]);
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

// Historique
export const historiqueDossier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT e.etape, u.nom || ' ' || u.prenom AS acteur, e.date_action, e.decision, e.commentaire
       FROM etapes_dossier e
       JOIN utilisateurs u ON e.id_utilisateur = u.id_utilisateur
       WHERE id_dossier = $1
       ORDER BY date_action ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

// Passer un dossier à l'étape suivante
export const envoyerADepense = async (req, res) => {
  const { id } = req.params;

  try {
    // On suppose que l'étape 'depense' est une chaîne de caractères
    const result = await pool.query(
      `UPDATE dossiers 
       SET etape_actuelle = 'depense'
       WHERE id_dossier = $1 
       RETURNING *`,
      [id]
    );

    res.json({ message: "Dossier envoyé à la dépense", dossier: result.rows[0] });
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

export const envoyerAProgrammation = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`
      UPDATE dossiers 
      SET etape_actuelle = 'programmation' 
      WHERE id_dossier = $1
    `, [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const envoipaiement = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`
      UPDATE dossiers 
      SET etape_actuelle = 'paiement' 
      WHERE id_dossier = $1
    `, [id]);
    res.json({ message: "Dossier envoyé à Paiement" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
