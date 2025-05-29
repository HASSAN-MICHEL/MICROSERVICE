import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./reservations.css";

const API_URL_RESERVATIONS = "http://localhost:3000/api/reservations";
const API_URL_CLIENTS = "http://localhost:3000/api/clients";
const API_URL_CHAMBRES = "http://localhost:3000/api/chambres";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [chambres, setChambres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    client_id: "",
    chambre_id: "",
    date_debut: "",
    date_fin: "",
    montant_total: 0,
    statut: "En attente",
  });

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page

  const navigate = useNavigate(); // Initialisez useNavigate

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resClients, resChambres, resReservations] = await Promise.all([
        axios.get(API_URL_CLIENTS),
        axios.get(API_URL_CHAMBRES),
        axios.get(API_URL_RESERVATIONS),
      ]);
      setClients(resClients.data);
      setChambres(resChambres.data);
      setReservations(resReservations.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = () => {
    setFormData({
      client_id: "",
      chambre_id: "",
      date_debut: "",
      date_fin: "",
      montant_total: 0,
      statut: "En attente",
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMontantTotal = () => {
    if (formData.date_debut && formData.date_fin && formData.chambre_id) {
      const startDate = new Date(formData.date_debut);
      const endDate = new Date(formData.date_fin);
      if (endDate >= startDate) {
        const diffDays = Math.max(
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
          1
        );
        const chambre = chambres.find(
          (ch) => ch.id.toString() === formData.chambre_id
        );
        const montant = chambre ? diffDays * chambre.prix : 0;
        setFormData((prev) => ({ ...prev, montant_total: montant }));
      }
    }
  };

  useEffect(() => {
    calculateMontantTotal();
  }, [formData.date_debut, formData.date_fin, formData.chambre_id]);

  const handleSubmit = async () => {
    if (!formData.client_id || !formData.chambre_id || !formData.date_debut || !formData.date_fin) {
      alert("Tous les champs doivent être remplis");
      return;
    }
    try {
      await axios.post(API_URL_RESERVATIONS, formData);
      alert("Réservation ajoutée avec succès");
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation", error);
      alert("Erreur lors de l'ajout de la réservation");
    }
  };

  // Calcul des réservations à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2>Réservations</h2>
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={handleShow}>
          Ajouter une réservation
        </Button>
        {/* Bouton pour rediriger vers la page chambres.jsx */}
        <Button variant="info" onClick={() => navigate("/chambres")}>
          Voir les chambres
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Chambre</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Montant (€)</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((res, index) => (
                <tr key={res.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{clients.find((c) => c.id === res.client_id)?.nom || "N/A"}</td>
                  <td>{chambres.find((c) => c.id === res.chambre_id)?.numero || "N/A"}</td>
                  <td>{res.date_debut}</td>
                  <td>{res.date_fin}</td>
                  <td>{res.montant_total} €</td>
                  <td>{res.statut}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <span className="mx-3 align-self-center">
              Page {currentPage} sur {Math.ceil(reservations.length / itemsPerPage)}
            </span>
            <Button
              variant="outline-primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(reservations.length / itemsPerPage)}
            >
              Suivant
            </Button>
          </div>
        </>
      )}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control as="select" name="client_id" onChange={handleChange} value={formData.client_id}>
                <option value="">Sélectionner un client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.nom}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Chambre</Form.Label>
              <Form.Control as="select" name="chambre_id" onChange={handleChange} value={formData.chambre_id}>
                <option value="">Sélectionner une chambre</option>
                {chambres.map((chambre) => (
                  <option key={chambre.id} value={chambre.id}>{chambre.numero}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date de début</Form.Label>
              <Form.Control type="date" name="date_debut" onChange={handleChange} value={formData.date_debut} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date de fin</Form.Label>
              <Form.Control type="date" name="date_fin" onChange={handleChange} value={formData.date_fin} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Montant Total (€)</Form.Label>
              <Form.Control type="text" value={formData.montant_total} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Statut</Form.Label>
              <Form.Control as="select" name="statut" onChange={handleChange} value={formData.statut}>
                <option value="confirmée">Confirmée</option>
                <option value="annulée">Annulée</option>
                <option value="terminée">Terminée</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button variant="primary" onClick={handleSubmit}>Valider</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reservations;

// MODELS RESERVATIONS , 07/04/2025



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

  
  async getByDateRange(startDate, endDate) {
    const result = await pool.query(`
      SELECT r.*, c.nom as client_nom, c.prenom as client_prenom, 
             ch.numero as chambre_numero
      FROM reservations r
      JOIN clients c ON r.client_id = c.id
      JOIN chambres ch ON r.chambre_id = ch.id
      WHERE r.date_debut BETWEEN $1 AND $2
      ORDER BY r.date_debut
    `, [startDate, endDate]);
    return result.rows;
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
};

export default Reservation;