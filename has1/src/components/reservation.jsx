import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Card, Badge, Spinner, Alert, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaCalendarAlt, FaMoneyBillWave, FaUser, FaBed, FaSearch } from "react-icons/fa";

const API_URL_RESERVATIONS = "http://localhost:5000/api/reservations";
const API_URL_CLIENTS = "http://localhost:5000/api/clients";
const API_URL_CHAMBRES = "http://localhost:5000/api/chambres";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [chambres, setChambres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    client_id: "",
    chambre_id: "",
    date_debut: "",
    date_fin: "",
    montant_total: 0,
    statut: "En attente",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resClients, resChambres, resReservations] = await Promise.all([
        axios.get(API_URL_CLIENTS),
        axios.get(API_URL_CHAMBRES),
        axios.get(API_URL_RESERVATIONS),
      ]);
      setClients(resClients.data);
      setChambres(resChambres.data);
      setReservations(resReservations.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.client_id || !formData.chambre_id || !formData.date_debut || !formData.date_fin) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        date_debut: new Date(formData.date_debut).toISOString(),
        date_fin: new Date(formData.date_fin).toISOString()
      };

      if (formData.id) {
        await axios.put(`${API_URL_RESERVATIONS}/${formData.id}`, dataToSend);
        setSuccess("Réservation modifiée avec succès");
      } else {
        await axios.post(API_URL_RESERVATIONS, dataToSend);
        setSuccess("Réservation créée avec succès");
      }
      
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
      setError(error.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredReservations = reservations.filter(reservation => {
    const client = clients.find(c => c.id === reservation.client_id);
    const chambre = chambres.find(c => c.id === reservation.chambre_id);
    
    return (
      (client?.nom?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (chambre?.numero?.toString().includes(searchTerm)) ||
      reservation.date_debut.includes(searchTerm) ||
      reservation.date_fin.includes(searchTerm) ||
      reservation.statut.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const headerStyle = {
    backgroundColor: '#1976D2',
    color: 'white',
    padding: '12px 15px'
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaCalendarAlt className="me-2" />
              Gestion des Réservations
            </h2>
            <div>
              <Button variant="primary" onClick={() => setShowModal(true)} className="me-2">
                <FaPlus className="me-1" /> Nouvelle réservation
              </Button>
              <Button variant="info" onClick={() => navigate("/chambres")}>
                Voir les chambres
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Chargement des réservations...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={headerStyle}>#</th>
                      <th style={headerStyle}>Client</th>
                      <th style={headerStyle}>Chambre</th>
                      <th style={headerStyle}>Date début</th>
                      <th style={headerStyle}>Date fin</th>
                      <th style={headerStyle}>Montant</th>
                      <th style={headerStyle}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReservations.map((res, index) => {
                      const client = clients.find(c => c.id === res.client_id);
                      const chambre = chambres.find(c => c.id === res.chambre_id);
                      
                      return (
                        <tr key={res.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>
                            <FaUser className="me-2" />
                            {client?.nom || "N/A"}
                          </td>
                          <td>
                            <FaBed className="me-2" />
                            {chambre?.numero || "N/A"}
                          </td>
                          <td>{new Date(res.date_debut).toLocaleDateString()}</td>
                          <td>{new Date(res.date_fin).toLocaleDateString()}</td>
                          <td>{res.montant_total} €</td>
                          <td>
                            <Badge bg={
                              res.statut === "confirmée" ? "success" :
                              res.statut === "annulée" ? "danger" : "warning"
                            }>
                              {res.statut}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select 
                name="client_id" 
                value={formData.client_id} 
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.nom}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chambre</Form.Label>
              <Form.Select 
                name="chambre_id" 
                value={formData.chambre_id} 
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une chambre</option>
                {chambres.map(chambre => (
                  <option key={chambre.id} value={chambre.id}>
                    {chambre.numero} ({chambre.type})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de début</Form.Label>
              <Form.Control 
                type="date" 
                name="date_debut" 
                value={formData.date_debut} 
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control 
                type="date" 
                name="date_fin" 
                value={formData.date_fin} 
                onChange={handleChange}
                required
                min={formData.date_debut}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select 
                name="statut" 
                value={formData.statut} 
                onChange={handleChange}
              >
                <option value="En attente">En attente</option>
                <option value="confirmée">Confirmée</option>
                <option value="annulée">Annulée</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reservations;