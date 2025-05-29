import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  Button, 
  Card, 
  Badge, 
  Spinner, 
  Alert, 
  Pagination,
  Form  // Import manquant ajouté ici
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  FaSearch, 
  FaUtensils, 
  FaArrowLeft, 
  FaReceipt, 
  FaUser, 
  FaMoneyBillWave 
} from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:3000";

const CommandesRestaurant = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/restaurant/order/restaurant");
      setCommandes(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes", error);
      setError("Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  // Filtrage et pagination
  const filteredCommandes = commandes.filter(commande =>
    commande.menu_id?.toString().includes(searchTerm) ||
    commande.client_id?.toString().includes(searchTerm) ||
    commande.type_commande?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCommandes.length / itemsPerPage);

  const getTypeBadge = (type) => {
    switch (type) {
      case "restaurant": return <Badge bg="primary">Restaurant</Badge>;
      case "bar": return <Badge bg="secondary">Bar</Badge>;
      default: return <Badge bg="info">{type}</Badge>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaUtensils className="me-2" />
              Commandes du Restaurant
            </h2>
            <Button 
              variant="info" 
              onClick={() => navigate("/menus")}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-1" /> Retour aux menus
            </Button>
          </div>

          {/* Barre de recherche */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <FaSearch />
              </span>
              <Form.Control
                type="text"
                placeholder="Rechercher par ID menu, client ou type..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-primary"
              />
            </div>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Chargement des commandes...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive rounded">
                <Table hover className="align-middle mb-0">
                  <thead style={{ backgroundColor: '#1976D2', color: 'white' }}>
                    <tr>
                      <th style={{ padding: '12px 15px', width: '10%' }}>#</th>
                      <th style={{ padding: '12px 15px', width: '25%' }}>Menu</th>
                      <th style={{ padding: '12px 15px', width: '20%' }}>Client</th>
                      <th style={{ padding: '12px 15px', width: '20%' }}>Montant</th>
                      <th style={{ padding: '12px 15px', width: '25%' }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCommandes.length > 0 ? (
                      currentCommandes.map((commande, index) => (
                        <tr key={commande.id}>
                          <td className="fw-bold">{indexOfFirstItem + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaReceipt className="me-2 text-primary" />
                              <div>
                                <div>Menu #{commande.menu_id}</div>
                                <small className="text-muted">
                                  Quantité: {commande.quantite}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaUser className="me-2 text-secondary" />
                              <div>Client #{commande.client_id}</div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaMoneyBillWave className="me-2 text-success" />
                              <div className="fw-bold">
                                {parseFloat(commande.montant_total).toFixed(2)} €
                              </div>
                            </div>
                          </td>
                          <td>
                            {getTypeBadge(commande.type_commande)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <div className="text-muted">
                            {searchTerm ? (
                              <>
                                <FaSearch className="mb-2" />
                                <div>Aucune commande ne correspond à votre recherche</div>
                              </>
                            ) : (
                              <>
                                <FaUtensils className="mb-2" />
                                <div>Aucune commande disponible</div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredCommandes.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
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
    </div>
  );
};

export default CommandesRestaurant;