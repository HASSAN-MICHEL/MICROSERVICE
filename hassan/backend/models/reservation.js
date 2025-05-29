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

async getMostBookedRoomTypes(period, year, month = null) {
  // Validation renforcée
  if (!['day', 'month', 'year'].includes(period)) {
    throw new Error(`Période invalide: ${period}. Doit être 'day', 'month' ou 'year'`);
  }

  if (!year || isNaN(year)) {
    throw new Error(`Année invalide: ${year}`);
  }

  // Construction de la requête SQL
  let query;
  const params = [year];

  if (period === 'month') {
    if (!month || month < 1 || month > 12) {
      throw new Error(`Mois invalide: ${month}. Doit être entre 1 et 12`);
    }
    query = `
      SELECT 
        c.type,
        COUNT(*) as reservations_count, 
        SUM(r.montant_total) as total_revenue
      FROM reservations r
      JOIN chambres c ON r.chambre_id = c.id
      WHERE EXTRACT(YEAR FROM r.date_debut) = $1
        AND EXTRACT(MONTH FROM r.date_debut) = $2
        AND r.statut = 'confirmée'
      GROUP BY c.type
      ORDER BY reservations_count DESC
      LIMIT 5`;
    params.push(month);
  } else {
    query = `
      SELECT 
        c.type,
        COUNT(*) as reservations_count, 
        SUM(r.montant_total) as total_revenue
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
    console.error('Erreur SQL:', {
      query,
      params,
      error: error.message
    });
    throw new Error('Erreur lors de la récupération des données');
  }
}
};

export default Reservation;