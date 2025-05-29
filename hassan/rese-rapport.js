// models

import pool from "../config/db.js";

const Reservation = {
  async getAll() {
    const result = await pool.query("SELECT * FROM reservations");
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query("SELECT * FROM reservations WHERE id = $1", [id]);
    return result.rows[0];
  },

  async getConfirmedReservationsStats(period = 'day') {
    let query;
    if (period === 'day') {
      query = `
        SELECT 
          DATE(date_debut) as date,
          COUNT(*) as count
        FROM reservations
        WHERE statut = 'confirmée'
        GROUP BY DATE(date_debut)
        ORDER BY DATE(date_debut)
      `;
    } else {
      query = `
        SELECT 
          DATE_TRUNC('month', date_debut) as month,
          COUNT(*) as count
        FROM reservations
        WHERE statut = 'confirmée'
        GROUP BY DATE_TRUNC('month', date_debut)
        ORDER BY DATE_TRUNC('month', date_debut)
      `;
    }
    const result = await pool.query(query);
    return result.rows;
  },

  async create({ client_id, chambre_id, date_debut, date_fin, statut, montant_total }) {
    try {
      // Vérifier si la chambre est disponible
      const chambreResult = await pool.query(
        "SELECT statut FROM chambres WHERE id = $1",
        [chambre_id]
      );

      if (chambreResult.rows.length === 0) {
        throw new Error("La chambre spécifiée n'existe pas.");
      }

      const chambreStatut = chambreResult.rows[0].statut;

      if (chambreStatut !== 'disponible') {
        throw new Error("La chambre n'est pas disponible pour une réservation.");
      }

      // Démarrer une transaction
      await pool.query("BEGIN");

      // Insérer la réservation
      const reservationResult = await pool.query(
        "INSERT INTO reservations (client_id, chambre_id, date_debut, date_fin, statut, montant_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [client_id, chambre_id, date_debut, date_fin, statut, montant_total]
      );

      const reservation = reservationResult.rows[0];

      // Mettre à jour le statut de la chambre à 'occupée'
      await pool.query(
        "UPDATE chambres SET statut = 'occupée' WHERE id = $1",
        [chambre_id]
      );

      // Insérer automatiquement la facture associée
      const factureResult = await pool.query(
        "INSERT INTO factures (client_id, reservation_id, montant_total) VALUES ($1, $2, $3) RETURNING *",
        [client_id, reservation.id, montant_total]
      );

      // Valider la transaction
      await pool.query("COMMIT");

      return { reservation, facture: factureResult.rows[0] };
    } catch (error) {
      // Annuler la transaction en cas d'erreur
      await pool.query("ROLLBACK");
      console.error("Erreur lors de la création de la réservation et de la facture :", error);
      throw error;
    }
  },

  async update(id, { client_id, chambre_id, date_debut, date_fin, statut, montant_total }) {
    const result = await pool.query(
      "UPDATE reservations SET client_id = $1, chambre_id = $2, date_debut = $3, date_fin = $4, statut = $5, montant_total = $6 WHERE id = $7 RETURNING *",
      [client_id, chambre_id, date_debut, date_fin, statut, montant_total, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM reservations WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },

  async checkAndUpdateChambreStatus() {
    try {
      // Récupérer les réservations terminées
      const currentDate = new Date().toISOString().split('T')[0]; // Date du jour au format YYYY-MM-DD
      const reservationsResult = await pool.query(
        "SELECT id, chambre_id FROM reservations WHERE date_fin < $1 AND statut = 'active'",
        [currentDate]
      );

      // Mettre à jour le statut des chambres associées
      for (const reservation of reservationsResult.rows) {
        await pool.query(
          "UPDATE chambres SET statut = 'disponible' WHERE id = $1",
          [reservation.chambre_id]
        );

        // Mettre à jour le statut de la réservation à 'terminée'
        await pool.query(
          "UPDATE reservations SET statut = 'terminée' WHERE id = $1",
          [reservation.id]
        );
      }

      console.log("Statut des chambres et réservations mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut des chambres :", error);
      throw error;
    }
  },
  async getDailyRevenue(date) {
    const result = await pool.query(
      `SELECT 
         SUM(montant_total) as total,
         COUNT(*) as count
       FROM reservations
       WHERE DATE(date_debut) = $1
       AND statut = 'confirmée'`,
      [date]
    );
    return result.rows[0];
  },
  
async getMonthlyRevenue(year, month) {
  const result = await pool.query(
    `SELECT 
       SUM(montant_total) as total,
       COUNT(*) as count
     FROM reservations
     WHERE EXTRACT(YEAR FROM date_debut) = $1
     AND EXTRACT(MONTH FROM date_debut) = $2
     AND statut = 'confirmée'`,
    [year, month]
  );
  return result.rows[0];
},

async getYearlyRevenue(year) {
  const result = await pool.query(
    `SELECT 
       SUM(montant_total) as total,
       COUNT(*) as count
     FROM reservations
     WHERE EXTRACT(YEAR FROM date_debut) = $1
     AND statut = 'confirmée'`,
    [year]
  );
  return result.rows[0];
},

async getMonthlyEvolution(year) {
  const result = await pool.query(
    `SELECT 
       EXTRACT(MONTH FROM date_debut) as month,
       SUM(montant_total) as total,
       COUNT(*) as count
     FROM reservations
     WHERE EXTRACT(YEAR FROM date_debut) = $1
     AND statut = 'confirmée'
     GROUP BY EXTRACT(MONTH FROM date_debut)
     ORDER BY month`,
    [year]
  );
  return result.rows;
},

// Dans votre modèle (reservation.js)
async getMostBookedRoomTypes(period, year, month = null) {
  let query;
  const params = [year];
  
  if (period === 'month' && month) {
    query = `
      SELECT c.type, COUNT(*) as reservations_count, SUM(r.montant_total) as total_revenue
      FROM reservations r
      JOIN chambres c ON r.chambre_id = c.id
      WHERE EXTRACT(YEAR FROM r.date_debut) = $1
      AND EXTRACT(MONTH FROM r.date_debut) = $2
      AND r.statut = 'confirmée'
      GROUP BY c.type
      ORDER BY reservations_count DESC
      LIMIT 5`;
    params.push(month);
  } else if (period === 'year') {
    query = `
      SELECT c.type, COUNT(*) as reservations_count, SUM(r.montant_total) as total_revenue
      FROM reservations r
      JOIN chambres c ON r.chambre_id = c.id
      WHERE EXTRACT(YEAR FROM r.date_debut) = $1
      AND r.statut = 'confirmée'
      GROUP BY c.type
      ORDER BY reservations_count DESC
      LIMIT 5`;
  }

  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Erreur SQL:', error);
    throw error;
  }
}
};

export default Reservation;

// controller

import Reservation from "../models/reservation.js";
import { broadcast } from "../server.js";

const reservationController = {
  async getAll(req, res) {
    try {
      const reservations = await Reservation.getAll();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: "Erreur récupération réservations", error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const reservation = await Reservation.getById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      res.json(reservation);
    } catch (err) {
      res.status(500).json({ message: "Erreur récupération réservation", error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { client_id, chambre_id, date_debut, date_fin, statut, montant_total } = req.body;
      const { reservation, facture } = await Reservation.create({ 
        client_id, chambre_id, date_debut, date_fin, statut, montant_total 
      });

      broadcast('reservation', {
        type: 'creation',
        chambre_id: reservation.chambre_id,
        montant_total: reservation.montant_total,
        timestamp: Date.now()
      });

      res.status(201).json({ reservation, facture });
    } catch (err) {
      console.error("Erreur création réservation:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { client_id, chambre_id, date_debut, date_fin, statut, montant_total } = req.body;
      const updatedReservation = await Reservation.update(req.params.id, { 
        client_id, chambre_id, date_debut, date_fin, statut, montant_total 
      });

      if (!updatedReservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }

      broadcastUpdate('reservation', {
        type: 'modification',
        chambre_id: updatedReservation.chambre_id,
        statut: updatedReservation.statut
      });

      res.json(updatedReservation);
    } catch (err) {
      console.error("Erreur modification réservation:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Reservation.delete(req.params.id);
      broadcastUpdate('reservation', {
        type: 'suppression',
        reservation_id: req.params.id
      });
      res.status(204).send();
    } catch (err) {
      console.error("Erreur suppression réservation:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async checkAndUpdateChambreStatus(req, res) {
    try {
      await Reservation.checkAndUpdateChambreStatus();
      res.status(200).json({ message: "Statut chambres mis à jour" });
    } catch (err) {
      console.error("Erreur mise à jour statut chambres:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getTodayReservations(req, res) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const reservations = await Reservation.getAll();
      const todayReservations = reservations.filter(r => 
        new Date(r.date_debut).toISOString().split('T')[0] === today && 
        r.statut === 'confirmée'
      );
      
      res.status(200).json({
        count: todayReservations.length,
        revenue: todayReservations.reduce((sum, r) => sum + r.montant_total, 0),
        reservations: todayReservations
      });
    } catch (err) {
      console.error("Erreur réservations du jour:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getReservationStats(req, res) {
    try {
      const { period = 'day' } = req.query;
      const today = new Date().toISOString().split('T')[0];
      const reservations = await Reservation.getAll();
      
      const filteredReservations = period === 'day'
        ? reservations.filter(r => 
            new Date(r.date_debut).toISOString().split('T')[0] === today &&
            r.statut === 'confirmée'
          )
        : reservations.filter(r => r.statut === 'confirmée');

      res.status(200).json({
        count: filteredReservations.length,
        revenue: filteredReservations.reduce((sum, r) => sum + r.montant_total, 0),
        average: filteredReservations.length > 0
          ? (filteredReservations.reduce((sum, r) => sum + r.montant_total, 0) / filteredReservations.length).toFixed(2)
          : 0
      });
    } catch (err) {
      console.error("Erreur statistiques réservations:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },
  async getDailyRevenue(req, res) {
    try {
      const { date } = req.params;
      const stats = await Reservation.getDailyRevenue(date);
      res.json({
        date,
        total_revenue: stats.total || 0,
        reservations_count: stats.count || 0
      });
    } catch (err) {
      console.error("Erreur revenu journalier:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },
  
  async getMonthlyRevenue(req, res) {
    try {
      const { year, month } = req.params;
      const stats = await Reservation.getMonthlyRevenue(year, month);
      res.json({
        year,
        month,
        total_revenue: stats.total || 0,
        reservations_count: stats.count || 0
      });
    } catch (err) {
      console.error("Erreur revenu mensuel:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },
  
  async getYearlyRevenue(req, res) {
    try {
      const { year } = req.params;
      const stats = await Reservation.getYearlyRevenue(year);
      res.json({
        year,
        total_revenue: stats.total || 0,
        reservations_count: stats.count || 0
      });
    } catch (err) {
      console.error("Erreur revenu annuel:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },
  
  async getMonthlyEvolution(req, res) {
    try {
      const { year } = req.params;
      const evolution = await Reservation.getMonthlyEvolution(year);
      
      // Formatage des données pour inclure tous les mois même sans réservations
      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const monthData = evolution.find(e => e.month === i+1);
        return {
          month: i+1,
          total_revenue: monthData?.total || 0,
          reservations_count: monthData?.count || 0
        };
      });
  
      res.json(monthlyData);
    } catch (err) {
      console.error("Erreur évolution mensuelle:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },
  
  async getMostBookedRoomTypes(req, res) {
    try {
      const { period, year, month } = req.params;
      const result = await Reservation.getMostBookedRoomTypes(period, year, month || null);
      res.json(result);
    } catch (err) {
      console.error("Erreur types de chambre les plus réservés:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }
};

export const { 
  getAll, 
  getById, 
  create, 
  update, 
  delete: deleteReservation,
  checkAndUpdateChambreStatus,
  getTodayReservations,
  getReservationStats , getDailyRevenue , getMonthlyRevenue , getYearlyRevenue , getMonthlyEvolution , getMostBookedRoomTypes
} = reservationController;

// routes 

import express from "express";
import { getAll, getById, create, update, deleteReservation, checkAndUpdateChambreStatus , 
    getDailyRevenue , getMonthlyRevenue , getYearlyRevenue , getMonthlyEvolution , getMostBookedRoomTypes
 } from "../controllers/reservationController.js";  

const router = express.Router();

// Récupérer toutes les réservations
router.get("/", getAll);

// Récupérer une réservation par son ID
router.get("/:id", getById);

// Créer une nouvelle réservation
router.post("/", create);

// Mettre à jour une réservation existante
router.put("/:id", update);

// Supprimer une réservation
router.delete("/:id", deleteReservation);

// Vérifier et mettre à jour le statut des chambres et des réservations
router.post("/check-status", checkAndUpdateChambreStatus);
// Ajoutez ces nouvelles routes
router.get("/rapports/revenu-journalier/:date", getDailyRevenue);
router.get("/rapports/revenu-mensuel/:year/:month", getMonthlyRevenue);
router.get("/rapports/revenu-annuel/:year", getYearlyRevenue);
router.get("/rapports/evolution-mensuelle/:year", getMonthlyEvolution);
router.get("/statistiques/chambres-plus-reservees/:period/:year/:month?", getMostBookedRoomTypes);

export default router;

getMostBookedRoomTypes