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
  async getMostBookedRoomTypes (req, res) {
    try {
      const { period, year, month } = req.params;
  
      // Validation des paramètres
      if (!['day', 'month', 'year'].includes(period)) {
        return res.status(400).json({
          error: 'Période invalide',
          message: "La période doit être 'day', 'month' ou 'year'"
        });
      }
  
      const result = await Reservation.getMostBookedRoomTypes(period, year, month || null);
      
      res.json(result);
    } catch (error) {
      console.error('Erreur contrôleur:', error.message);
      res.status(500).json({
        error: 'Erreur serveur',
        message: error.message
      });
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