// import Reservation from "../models/reservation.js";
// import { broadcast } from "../server.js";

// const reservationController = {
//   async getAll(req, res) {
//     try {
//       const reservations = await Reservation.getAll();
//       res.json(reservations);
//     } catch (err) {
//       res.status(500).json({ message: "Erreur récupération réservations", error: err.message });
//     }
//   },

//   async getById(req, res) {
//     try {
//       const reservation = await Reservation.getById(req.params.id);
//       if (!reservation) {
//         return res.status(404).json({ message: "Réservation non trouvée" });
//       }
//       res.json(reservation);
//     } catch (err) {
//       res.status(500).json({ message: "Erreur récupération réservation", error: err.message });
//     }
//   },

//   async create(req, res) {
//     try {
//       const { client_id, chambre_id, date_debut, date_fin, statut, montant_total } = req.body;
//       const { reservation, facture } = await Reservation.create({ 
//         client_id, chambre_id, date_debut, date_fin, statut, montant_total 
//       });

//       broadcast('reservation', {
//         type: 'creation',
//         chambre_id: reservation.chambre_id,
//         montant_total: reservation.montant_total,
//         timestamp: Date.now()
//       });

//       res.status(201).json({ reservation, facture });
//     } catch (err) {
//       console.error("Erreur création réservation:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async update(req, res) {
//     try {
//       const { client_id, chambre_id, date_debut, date_fin, statut, montant_total } = req.body;
//       const updatedReservation = await Reservation.update(req.params.id, { 
//         client_id, chambre_id, date_debut, date_fin, statut, montant_total 
//       });

//       if (!updatedReservation) {
//         return res.status(404).json({ message: "Réservation non trouvée" });
//       }

//       broadcastUpdate('reservation', {
//         type: 'modification',
//         chambre_id: updatedReservation.chambre_id,
//         statut: updatedReservation.statut
//       });

//       res.json(updatedReservation);
//     } catch (err) {
//       console.error("Erreur modification réservation:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async delete(req, res) {
//     try {
//       await Reservation.delete(req.params.id);
//       broadcastUpdate('reservation', {
//         type: 'suppression',
//         reservation_id: req.params.id
//       });
//       res.status(204).send();
//     } catch (err) {
//       console.error("Erreur suppression réservation:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async checkAndUpdateChambreStatus(req, res) {
//     try {
//       await Reservation.checkAndUpdateChambreStatus();
//       res.status(200).json({ message: "Statut chambres mis à jour" });
//     } catch (err) {
//       console.error("Erreur mise à jour statut chambres:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async getTodayReservations(req, res) {
//     try {
//       const today = new Date().toISOString().split('T')[0];
//       const reservations = await Reservation.getAll();
//       const todayReservations = reservations.filter(r => 
//         new Date(r.date_debut).toISOString().split('T')[0] === today && 
//         r.statut === 'confirmée'
//       );
      
//       res.status(200).json({
//         count: todayReservations.length,
//         revenue: todayReservations.reduce((sum, r) => sum + r.montant_total, 0),
//         reservations: todayReservations
//       });
//     } catch (err) {
//       console.error("Erreur réservations du jour:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async getReservationStats(req, res) {
//     try {
//       const { period = 'day' } = req.query;
//       const today = new Date().toISOString().split('T')[0];
//       const reservations = await Reservation.getAll();
      
//       const filteredReservations = period === 'day'
//         ? reservations.filter(r => 
//             new Date(r.date_debut).toISOString().split('T')[0] === today &&
//             r.statut === 'confirmée'
//           )
//         : reservations.filter(r => r.statut === 'confirmée');

//       res.status(200).json({
//         count: filteredReservations.length,
//         revenue: filteredReservations.reduce((sum, r) => sum + r.montant_total, 0),
//         average: filteredReservations.length > 0
//           ? (filteredReservations.reduce((sum, r) => sum + r.montant_total, 0) / filteredReservations.length).toFixed(2)
//           : 0
//       });
//     } catch (err) {
//       console.error("Erreur statistiques réservations:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },
//   async getDailyRevenue(req, res) {
//     try {
//       const { date } = req.params;
//       const stats = await Reservation.getDailyRevenue(date);
//       res.json({
//         date,
//         total_revenue: stats.total || 0,
//         reservations_count: stats.count || 0
//       });
//     } catch (err) {
//       console.error("Erreur revenu journalier:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },
  
//   async getMonthlyRevenue(req, res) {
//     try {
//       const { year, month } = req.params;
//       const stats = await Reservation.getMonthlyRevenue(year, month);
//       res.json({
//         year,
//         month,
//         total_revenue: stats.total || 0,
//         reservations_count: stats.count || 0
//       });
//     } catch (err) {
//       console.error("Erreur revenu mensuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },
  
//   async getYearlyRevenue(req, res) {
//     try {
//       const { year } = req.params;
//       const stats = await Reservation.getYearlyRevenue(year);
//       res.json({
//         year,
//         total_revenue: stats.total || 0,
//         reservations_count: stats.count || 0
//       });
//     } catch (err) {
//       console.error("Erreur revenu annuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },
  
//   async getMonthlyEvolution(req, res) {
//     try {
//       const { year } = req.params;
//       const evolution = await Reservation.getMonthlyEvolution(year);
      
//       // Formatage des données pour inclure tous les mois même sans réservations
//       const monthlyData = Array.from({ length: 12 }, (_, i) => {
//         const monthData = evolution.find(e => e.month === i+1);
//         return {
//           month: i+1,
//           total_revenue: monthData?.total || 0,
//           reservations_count: monthData?.count || 0
//         };
//       });
  
//       res.json(monthlyData);
//     } catch (err) {
//       console.error("Erreur évolution mensuelle:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },
//   async getMostBookedRoomTypes (req, res) {
//     try {
//       const { period, year, month } = req.params;
  
//       // Validation des paramètres
//       if (!['day', 'month', 'year'].includes(period)) {
//         return res.status(400).json({
//           error: 'Période invalide',
//           message: "La période doit être 'day', 'month' ou 'year'"
//         });
//       }
  
//       const result = await Reservation.getMostBookedRoomTypes(period, year, month || null);
      
//       res.json(result);
//     } catch (error) {
//       console.error('Erreur contrôleur:', error.message);
//       res.status(500).json({
//         error: 'Erreur serveur',
//         message: error.message
//       });
//     }
//   }
// };

// export const { 
//   getAll, 
//   getById, 
//   create, 
//   update, 
//   delete: deleteReservation,
//   checkAndUpdateChambreStatus,
//   getTodayReservations,
//   getReservationStats , getDailyRevenue , getMonthlyRevenue , getYearlyRevenue , getMonthlyEvolution , getMostBookedRoomTypes
// } = reservationController;



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


