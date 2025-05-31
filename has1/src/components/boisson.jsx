import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Card, Badge, Spinner, Alert, Pagination, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaEdit, FaTrash, FaWineGlassAlt, FaSearch, FaShoppingCart } from "react-icons/fa";

// Configuration dynamique de l'URL de base

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://192.168.52.216:4000' 
  : `http://${window.location.hostname}:4000`;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Intercepteurs pour le débogage
axios.interceptors.request.use(config => {
  console.log(`Requête envoyée à: ${config.baseURL}${config.url}`);
  return config;
}, error => {
  console.error('Erreur de requête:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('Réponse reçue:', response.config.url, response.status);
  return response;
}, error => {
  console.error('Erreur de réponse:', error);
  return Promise.reject(error);
});

const Boissons = () => {
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prix: "", stock: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBoissons();
  }, []);

  const fetchBoissons = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/boissons", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      setBoissons(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des boissons", error);
      setError(`Erreur de connexion au serveur: ${error.message}`);
      setTimeout(fetchBoissons, 5000);
    } finally {
      setLoading(false);
    }
  };


  const handleShowModal = (boisson = null) => {
    if (boisson) {
      setFormData(boisson);
      setEditId(boisson.id);
    } else {
      setFormData({ nom: "", prix: "", stock: "" });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.prix || !formData.stock) {
      setError("Tous les champs sont requis !");
      return;
    }

    try {
      const dataToSend = {
        nom: formData.nom,
        prix: parseFloat(formData.prix),
        stock: parseInt(formData.stock)
      };

      if (editId) {
        await axios.put(`/api/boissons/${editId}`, dataToSend);
        setSuccess("Boisson modifiée avec succès !");
      } else {
        await axios.post("/api/boissons", dataToSend);
        setSuccess("Boisson ajoutée avec succès !");
      }
      
      fetchBoissons();
      setTimeout(() => {
        setSuccess(null);
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'opération", error);
      setError(error.response?.data?.message || "Une erreur s'est produite");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette boisson ?")) {
      try {
        await axios.delete(`/api/boissons/${id}`);
        setSuccess("Boisson supprimée avec succès !");
        fetchBoissons();
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Filtrage et pagination
  const filteredBoissons = boissons.filter(boisson =>
    boisson.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoissons = filteredBoissons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBoissons.length / itemsPerPage);

  const StockBadge = ({ stock }) => {
    if (stock > 20) return <Badge bg="success">Stock: {stock}</Badge>;
    if (stock > 5) return <Badge bg="warning" text="dark">Stock: {stock}</Badge>;
    return <Badge bg="danger">Stock: {stock}</Badge>;
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaWineGlassAlt className="me-2" />
              Gestion des Boissons
            </h2>
            <div>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal()} 
                size="sm"
                className="me-2"
              >
                <FaPlus size={12} className="me-1" /> Ajouter
              </Button>
              <Button 
                variant="info" 
                onClick={() => navigate("/venteBoissons")} 
                size="sm"
              >
                <FaShoppingCart size={12} className="me-1" /> Vendre
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch size={14} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                size="sm"
              />
            </InputGroup>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="sm" />
              <p className="mt-2 small">Chargement des boissons...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <tr>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>#</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Nom</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Prix</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Stock</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBoissons.length > 0 ? (
                      currentBoissons.map((boisson, index) => (
                        <tr key={boisson.id}>
                          <td style={{ fontSize: '0.9rem' }}>{indexOfFirstItem + index + 1}</td>
                          <td style={{ fontSize: '0.9rem' }}>
                            <strong>{boisson.nom}</strong>
                          </td>
                          <td style={{ fontSize: '0.9rem' }}>{boisson.prix} €</td>
                          <td style={{ fontSize: '0.9rem' }}>
                            <StockBadge stock={boisson.stock} />
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowModal(boisson)}
                              className="me-2"
                              style={{ padding: '0.25rem 0.5rem' }}
                            >
                              <FaEdit size={12} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(boisson.id)}
                              style={{ padding: '0.25rem 0.5rem' }}
                            >
                              <FaTrash size={12} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 small">
                          {searchTerm ? "Aucune boisson ne correspond à votre recherche" : "Aucune boisson disponible"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {filteredBoissons.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination size="sm">
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
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal Boisson */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="sm">
        <Modal.Header closeButton className="py-2">
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editId ? "Modifier" : "Ajouter"} une boisson
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger" className="py-1">{error}</Alert>}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="small">Nom *</Form.Label>
              <Form.Control 
                type="text" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
                required 
                size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small">Prix (€) *</Form.Label>
              <Form.Control 
                type="number" 
                name="prix" 
                value={formData.prix} 
                onChange={handleChange} 
                min="0"
                step="0.01"
                required 
                size="sm"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small">Stock *</Form.Label>
              <Form.Control 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                min="0"
                required 
                size="sm"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="secondary" onClick={handleCloseModal} size="sm">
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} size="sm">
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Boissons;
