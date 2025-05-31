import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Card, Badge, Spinner, Alert, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaEdit, FaTrash, FaUtensils, FaWineGlassAlt, FaSearch, FaShoppingCart } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:3000";

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [formData, setFormData] = useState({ nom: "", categorie: "repas", prix: "" });
  const [orderData, setOrderData] = useState({ quantite: 1, type_commande: "restaurant", client_id: 1 });
  const [editId, setEditId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/restaurant/menu");
      setMenus(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des menus", error);
      setError("Erreur lors du chargement des menus");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (menu = null) => {
    if (menu) {
      setFormData(menu);
      setEditId(menu.id);
    } else {
      setFormData({ nom: "", categorie: "repas", prix: "" });
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
    if (!formData.nom || !formData.categorie || !formData.prix) {
      setError("Tous les champs sont requis !");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        prix: parseFloat(formData.prix),
      };

      if (editId) {
        await axios.put(`/api/restaurant/menu/${editId}`, dataToSend);
        setSuccess("Menu modifié avec succès !");
      } else {
        await axios.post("/api/restaurant/menu", dataToSend);
        setSuccess("Menu ajouté avec succès !");
      }
      
      fetchMenus();
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
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce menu ?")) {
      try {
        await axios.delete(`/api/restaurant/menu/${id}`);
        setSuccess("Menu supprimé avec succès !");
        fetchMenus();
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        setError("Erreur lors de la suppression");
      }
    }
  };

  const handleOrder = (menu) => {
    setSelectedMenu(menu);
    setOrderData({ quantite: 1, type_commande: "restaurant", client_id: 1 });
    setOrderModal(true);
  };

  const handleOrderClose = () => setOrderModal(false);

  const handleOrderChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return selectedMenu ? (selectedMenu.prix * orderData.quantite).toFixed(2) : 0;
  };

  const handleSubmitOrder = async () => {
    if (!orderData.quantite || !selectedMenu) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const orderDataToSend = {
        menu_id: selectedMenu.id,
        client_id: orderData.client_id,
        montant_total: calculateTotal(),
        quantite: orderData.quantite,
        type_commande: orderData.type_commande,
      };

      await axios.post("/api/restaurant/order", orderDataToSend);
      setSuccess("Commande passée avec succès !");
      handleOrderClose();
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur lors de la commande", error);
      setError(error.response?.data?.message || "Erreur lors de la commande");
    }
  };

  // Filtrage et pagination
  const filteredMenus = menus.filter(menu =>
    menu.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenus = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "repas": return <FaUtensils className="me-2" />;
      case "boisson": return <FaWineGlassAlt className="me-2" />;
      default: return <FaUtensils className="me-2" />;
    }
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaUtensils className="me-2" />
              Gestion des Menus
            </h2>
            <div>
              <Button variant="primary" onClick={() => handleShowModal()} className="me-2">
                <FaPlus className="me-1" /> Ajouter
              </Button>
              <Button variant="info" onClick={() => navigate("/commandesRestaurant")}>
                <FaShoppingCart className="me-1" /> Commandes
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
                placeholder="Rechercher par nom ou catégorie..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Chargement des menus...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <tr>
                      <th style={{ padding: '12px 15px' }}>#</th>
                      <th style={{ padding: '12px 15px' }}>Nom</th>
                      <th style={{ padding: '12px 15px' }}>Catégorie</th>
                      <th style={{ padding: '12px 15px' }}>Prix</th>
                      <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMenus.length > 0 ? (
                      currentMenus.map((menu, index) => (
                        <tr key={menu.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>
                            <strong>{menu.nom}</strong>
                          </td>
                          <td>
                            {getCategoryIcon(menu.categorie)}
                            {menu.categorie}
                          </td>
                          <td>{menu.prix} €</td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowModal(menu)}
                              className="me-2"
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(menu.id)}
                              className="me-2"
                            >
                              <FaTrash />
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleOrder(menu)}
                            >
                              <FaShoppingCart />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          {searchTerm ? "Aucun menu ne correspond à votre recherche" : "Aucun menu disponible"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {filteredMenus.length > itemsPerPage && (
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
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal Menu */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Modifier" : "Ajouter"} un menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom *</Form.Label>
              <Form.Control 
                type="text" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catégorie *</Form.Label>
              <Form.Select 
                name="categorie" 
                value={formData.categorie} 
                onChange={handleChange}
                required
              >
                <option value="repas">Repas</option>
                <option value="boisson">Boisson</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (€) *</Form.Label>
              <Form.Control 
                type="number" 
                name="prix" 
                value={formData.prix} 
                onChange={handleChange} 
                min="0"
                step="0.01"
                required 
              />
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

      {/* Modal Commande */}
      <Modal show={orderModal} onHide={handleOrderClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Passer une commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Menu</Form.Label>
              <Form.Control 
                type="text" 
                value={selectedMenu?.nom || ''} 
                readOnly 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix unitaire</Form.Label>
              <Form.Control 
                type="text" 
                value={selectedMenu ? `${selectedMenu.prix} €` : '0 €'} 
                readOnly 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité *</Form.Label>
              <Form.Control
                type="number"
                name="quantite"
                min="1"
                value={orderData.quantite}
                onChange={handleOrderChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type de commande *</Form.Label>
              <Form.Select
                name="type_commande"
                value={orderData.type_commande}
                onChange={handleOrderChange}
                required
              >
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Client *</Form.Label>
              <Form.Control
                type="number"
                name="client_id"
                min="1"
                value={orderData.client_id}
                onChange={handleOrderChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                value={`${calculateTotal()} €`}
                readOnly
                className="fw-bold"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOrderClose}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleSubmitOrder}>
            Confirmer la commande
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menus;