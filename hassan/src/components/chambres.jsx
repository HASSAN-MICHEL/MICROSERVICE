import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Card, Badge, Alert, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaEdit, FaTrashAlt, FaBed, FaMoneyBillWave, FaSearch } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:5000";

const Chambres = () => {
  const [showModal, setShowModal] = useState(false);
  const [chambres, setChambres] = useState([]);
  const [formData, setFormData] = useState({ 
    numero: "", 
    type: "", 
    prix: "", 
    statut: "disponible" 
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchChambres();
  }, []);

  const fetchChambres = async () => {
    try {
      const response = await axios.get("/api/chambres");
      setChambres(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des chambres", error);
      setError("Erreur lors du chargement des chambres");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ numero: "", type: "", prix: "", statut: "disponible" });
    setEditIndex(null);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validation simple
      if (!formData.numero || !formData.type || !formData.prix) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      if (editIndex !== null) {
        await axios.put(`/api/chambres/${chambres[editIndex].id}`, formData);
      } else {
        await axios.post("/api/chambres", formData);
      }
      fetchChambres();
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification de la chambre", error);
      setError(error.response?.data?.message || "Erreur lors de l'opération");
    }
  };

  const handleEdit = (index) => {
    setFormData(chambres[index]);
    setEditIndex(index);
    handleShowModal();
  };

  const handleDelete = async (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      try {
        await axios.delete(`/api/chambres/${chambres[index].id}`);
        fetchChambres();
      } catch (error) {
        console.error("Erreur lors de la suppression de la chambre", error);
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Filtrage et pagination
  const filteredChambres = chambres.filter(chambre =>
    chambre.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chambre.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chambre.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChambres = filteredChambres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChambres.length / itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "disponible":
        return <Badge bg="success">Disponible</Badge>;
      case "occupée":
        return <Badge bg="danger">Occupée</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaBed className="me-2" />
              Gestion des Chambres
            </h2>
            <div>
              <Button variant="primary" onClick={handleShowModal} className="me-2">
                <FaPlus className="me-1" /> Ajouter
              </Button>
              <Button variant="info" onClick={() => navigate("/reservation")}>
                Voir les réservations
              </Button>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Rechercher une chambre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Numéro</th>
                  <th>Type</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentChambres.length > 0 ? (
                  currentChambres.map((chambre, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <strong>{chambre.numero}</strong>
                      </td>
                      <td>{chambre.type}</td>
                      <td>
                        <FaMoneyBillWave className="me-1" />
                        {chambre.prix} FCFA
                      </td>
                      <td>{getStatusBadge(chambre.statut)}</td>
                      <td className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(indexOfFirstItem + index)}
                          className="me-2"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(indexOfFirstItem + index)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {searchTerm ? "Aucune chambre ne correspond à votre recherche" : "Aucune chambre disponible"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination améliorée */}
          {filteredChambres.length > itemsPerPage && (
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
          )}
        </Card.Body>
      </Card>

      {/* Modal d'ajout/modification */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Modifier" : "Ajouter"} une chambre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Numéro</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (FCFA)</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select name="statut" value={formData.statut} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="occupée">Occupée</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
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

export default Chambres;