import React, { useState, useEffect } from "react";
import axios from "axios"; // Importer axios
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

// Configurer l'URL de base pour axios
axios.defaults.baseURL = "http://localhost:3000";

const Chambres = () => {
  const [show, setShow] = useState(false);
  const [chambres, setChambres] = useState([]);
  const [formData, setFormData] = useState({ numero: "", type: "", prix: "", statut: "disponible" });
  const [editIndex, setEditIndex] = useState(null);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page

  const navigate = useNavigate(); // Initialisez useNavigate

  useEffect(() => {
    fetchChambres();
  }, []);

  const fetchChambres = async () => {
    try {
      const response = await axios.get("/api/chambres");
      setChambres(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des chambres", error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setFormData({ numero: "", type: "", prix: "", statut: "disponible" });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editIndex !== null) {
        await axios.put(`/api/chambres/${chambres[editIndex].id}`, formData);
      } else {
        await axios.post("/api/chambres", formData);
      }
      fetchChambres();
      handleClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification de la chambre", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(chambres[index]);
    setEditIndex(index);
    setShow(true);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`/api/chambres/${chambres[index].id}`);
      fetchChambres();
    } catch (error) {
      console.error("Erreur lors de la suppression de la chambre", error);
    }
  };

  // Calcul des chambres à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChambres = chambres.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2>Chambres</h2>
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={handleShow}>
          Ajouter une chambre
        </Button>
        {/* Bouton pour rediriger vers la page reservation.jsx */}
        <Button variant="info" onClick={() => navigate("/reservation")}>
          Voir les réservations
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Numéro</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentChambres.map((chambre, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{chambre.numero}</td>
              <td>{chambre.type}</td>
              <td>{chambre.prix} FCFA</td>
              <td>{chambre.statut}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(indexOfFirstItem + index)} className="me-2">Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(indexOfFirstItem + index)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <Button
          variant="outline-primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span className="mx-3">
          Page {currentPage} sur {Math.ceil(chambres.length / itemsPerPage)}
        </span>
        <Button
          variant="outline-primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(chambres.length / itemsPerPage)}
        >
          Suivant
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Modifier" : "Ajouter"} une chambre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Numéro</Form.Label>
              <Form.Control type="text" name="numero" value={formData.numero} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prix</Form.Label>
              <Form.Control type="number" name="prix" value={formData.prix} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Statut</Form.Label>
              <Form.Select name="statut" value={formData.statut} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="occupée">Occupée</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>Sauvegarder</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Chambres;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, Button, Modal, Form, Spinner, Card, 
  Pagination, Tab, Tabs, Row, Col, Alert, InputGroup
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaPlus, FaWineGlassAlt, FaSearch, FaShoppingCart } from "react-icons/fa";

// Configuration dynamique de l'URL de base (identique à boisson.jsx)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '192.168.52.216'
  ? "http://localhost:4000"
  : `http://${window.location.hostname}:4000`;

axios.defaults.baseURL = API_BASE_URL;

// Intercepteurs pour le débogage (identique à boisson.jsx)
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

// URLs API
const API_URL_VENTES = "/api/vente-boissons";
const API_URL_BOISSONS = "/api/boissons";
const API_URL_CLIENTS = "/api/clients";

// Fonction helper pour formater les montants
const formatMontant = (montant) => {
  const num = Number(montant);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

const VenteBoissons = () => {
  const [ventes, setVentes] = useState([]);
  const [clients, setClients] = useState([]);
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ client_id: "", boisson_id: "", quantite: 1 });
  const [activeTab, setActiveTab] = useState("ventes");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // États pour les rapports
  const [dailyReport, setDailyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [yearlyReport, setYearlyReport] = useState(null);
  const [reportDate, setReportDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
  const [reportMonth, setReportMonth] = useState((new Date().getMonth() + 1).toString());
  const [stats, setStats] = useState({ mostSold: [], salesByProduct: [], salesByClient: [] });

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchInitialReports();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resClients, resBoissons, resVentes] = await Promise.all([
        axios.get(API_URL_CLIENTS, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }),
        axios.get(API_URL_BOISSONS, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }),
        axios.get(API_URL_VENTES, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
      ]);
      setClients(resClients.data);
      setBoissons(resBoissons.data);
      setVentes(resVentes.data);
      setError(null);
    } catch (error) {
      console.error("Erreur de chargement", error);
      setError(`Erreur de connexion au serveur: ${error.message}`);
      setTimeout(fetchData, 5000);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialReports = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      
      const [dailyRes, monthlyRes, yearlyRes, mostSoldRes, salesProductRes, salesClientRes] = await Promise.all([
        axios.get(`${API_URL_VENTES}/rapports/journalier/${today}`),
        axios.get(`${API_URL_VENTES}/rapports/mensuel/${year}/${month}`),
        axios.get(`${API_URL_VENTES}/rapports/annuel/${year}`),
        axios.get(`${API_URL_VENTES}/statistiques/boissons-plus-vendues/month/${year}/${month}`),
        axios.get(`${API_URL_VENTES}/statistiques/ventes-par-produit/month/${year}/${month}`),
        axios.get(`${API_URL_VENTES}/statistiques/ventes-par-client/${year}`)
      ]);
      
      setDailyReport(dailyRes.data);
      setMonthlyReport(monthlyRes.data);
      setYearlyReport(yearlyRes.data);
      setStats({
        mostSold: mostSoldRes.data,
        salesByProduct: salesProductRes.data,
        salesByClient: salesClientRes.data
      });
    } catch (error) {
      console.error("Erreur lors du chargement des rapports initiaux", error);
      setError("Erreur lors du chargement des rapports");
    }
  };

  const handleShow = () => {
    setFormData({ client_id: clients[0]?.id || "", boisson_id: boissons[0]?.id || "", quantite: 1 });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.client_id || !formData.boisson_id || !formData.quantite) {
      setError("Tous les champs sont requis !");
      return;
    }

    try {
      await axios.post(API_URL_VENTES, formData);
      setSuccess("Vente ajoutée avec succès !");
      handleClose();
      fetchData();
      fetchInitialReports();
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setError(error.response?.data?.message || "Une erreur s'est produite");
    }
  };

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`${API_URL_VENTES}/rapports/journalier/${reportDate}`);
      setDailyReport(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport journalier", error);
      setError("Erreur lors de la récupération du rapport journalier");
    }
  };

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get(`${API_URL_VENTES}/rapports/mensuel/${reportYear}/${reportMonth}`);
      setMonthlyReport(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport mensuel", error);
      setError("Erreur lors de la récupération du rapport mensuel");
    }
  };

  const fetchYearlyReport = async () => {
    try {
      const response = await axios.get(`${API_URL_VENTES}/rapports/annuel/${reportYear}`);
      setYearlyReport(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport annuel", error);
      setError("Erreur lors de la récupération du rapport annuel");
    }
  };

  const fetchStats = async (period = 'month') => {
    try {
      let mostSoldUrl, salesProductUrl;
      
      if (period === 'month') {
        mostSoldUrl = `${API_URL_VENTES}/statistiques/boissons-plus-vendues/month/${reportYear}/${reportMonth}`;
        salesProductUrl = `${API_URL_VENTES}/statistiques/ventes-par-produit/month/${reportYear}/${reportMonth}`;
      } else {
        mostSoldUrl = `${API_URL_VENTES}/statistiques/boissons-plus-vendues/year/${reportYear}`;
        salesProductUrl = `${API_URL_VENTES}/statistiques/ventes-par-produit/year/${reportYear}`;
      }
      
      const [mostSoldRes, salesProductRes, salesClientRes] = await Promise.all([
        axios.get(mostSoldUrl),
        axios.get(salesProductUrl),
        axios.get(`${API_URL_VENTES}/statistiques/ventes-par-client/${reportYear}`)
      ]);
      
      setStats({
        mostSold: mostSoldRes.data,
        salesByProduct: salesProductRes.data,
        salesByClient: salesClientRes.data
      });
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques", error);
      setError("Erreur lors de la récupération des statistiques");
    }
  };

  const downloadReport = async (type) => {
    try {
      let params = {};
      if (type === 'daily') params = { date: reportDate };
      if (type === 'monthly') params = { year: reportYear, month: reportMonth };
      if (type === 'yearly') params = { year: reportYear };
      
      const response = await axios.get(`${API_URL_VENTES}/rapports/download/${type}`, {
        params,
        responseType: 'blob'
      });
      
      const filename = `rapport_${type}_${reportDate || reportYear}.pdf`;
      saveAs(new Blob([response.data]), filename);
    } catch (error) {
      console.error("Erreur lors du téléchargement du rapport", error);
      setError("Erreur lors du téléchargement du rapport");
    }
  };

  // Calcul des éléments à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVentes = ventes.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcul du nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ventes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  // Filtrage des ventes
  const filteredVentes = ventes.filter(vente => {
    const client = clients.find(c => c.id === vente.client_id);
    const boisson = boissons.find(b => b.id === vente.boisson_id);
    
    return (
      (client?.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (boisson?.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaWineGlassAlt className="me-2" />
              Ventes de Boissons
            </h2>
            <div>
              <Button 
                variant="primary" 
                onClick={handleShow} 
                size="sm"
                className="me-2"
              >
                <FaPlus size={12} className="me-1" /> Nouvelle Vente
              </Button>
              <Button 
                variant="info" 
                onClick={() => navigate("/boisson")} 
                size="sm"
              >
                <FaShoppingCart size={12} className="me-1" /> Gestion Boissons
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
                placeholder="Rechercher par client ou boisson..."
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

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="ventes" title="Liste des Ventes">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" size="sm" />
                  <p className="mt-2 small">Chargement des ventes...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                        <tr>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>#</th>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Client</th>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Boisson</th>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Quantité</th>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Montant (FCFA)</th>
                          <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentes.length > 0 ? (
                          filteredVentes.slice(indexOfFirstItem, indexOfLastItem).map((vente, index) => (
                            <tr key={vente.id}>
                              <td style={{ fontSize: '0.9rem' }}>{indexOfFirstItem + index + 1}</td>
                              <td style={{ fontSize: '0.9rem' }}>
                                {clients.find((c) => c.id === vente.client_id)?.nom || "N/A"}
                              </td>
                              <td style={{ fontSize: '0.9rem' }}>
                                {boissons.find((b) => b.id === vente.boisson_id)?.nom || "N/A"}
                              </td>
                              <td style={{ fontSize: '0.9rem' }}>{vente.quantite}</td>
                              <td style={{ fontSize: '0.9rem' }}>{formatMontant(vente.montant_total)}</td>
                              <td style={{ fontSize: '0.9rem' }}>{formatDate(vente.date_vente)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4 small">
                              {searchTerm ? "Aucune vente ne correspond à votre recherche" : "Aucune vente disponible"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {filteredVentes.length > itemsPerPage && (
                    <div className="d-flex justify-content-center mt-3">
                      <Pagination size="sm">
                        <Pagination.Prev
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {Array.from({ length: Math.ceil(filteredVentes.length / itemsPerPage) }, (_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(filteredVentes.length / itemsPerPage)}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </Tab>

            <Tab eventKey="rapports" title="Rapports">
              <Row>
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Rapport Journalier</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={reportDate}
                          onChange={(e) => setReportDate(e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button onClick={fetchDailyReport} size="sm">
                          Générer
                        </Button>
                        <Button variant="success" onClick={() => downloadReport('daily')} size="sm">
                          Télécharger PDF
                        </Button>
                      </div>
                      
                      {dailyReport && (
                        <div className="mt-3">
                          <h6>Détails des ventes</h6>
                          <Table striped bordered size="sm">
                            <thead>
                              <tr>
                                <th>Boisson</th>
                                <th>Quantité</th>
                                <th>Prix Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dailyReport.details.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.boisson_nom}</td>
                                  <td>{item.quantite}</td>
                                  <td>{formatMontant(item.prix_total)} FCFA</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Alert variant="info" className="py-2">
                            Total journalier: <strong>{formatMontant(dailyReport.total)} FCFA</strong>
                          </Alert>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Rapport Mensuel</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Année</Form.Label>
                        <Form.Control
                          type="number"
                          value={reportYear}
                          onChange={(e) => setReportYear(e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Mois</Form.Label>
                        <Form.Control
                          as="select"
                          value={reportMonth}
                          onChange={(e) => setReportMonth(e.target.value)}
                          size="sm"
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button onClick={fetchMonthlyReport} size="sm">
                          Générer
                        </Button>
                        <Button variant="success" onClick={() => downloadReport('monthly')} size="sm">
                          Télécharger PDF
                        </Button>
                      </div>
                      
                      {monthlyReport && (
                        <div className="mt-3">
                          <h6>Résumé mensuel</h6>
                          <Table striped bordered size="sm">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Boisson</th>
                                <th>Quantité</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {monthlyReport.details.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.date}</td>
                                  <td>{item.boisson_nom}</td>
                                  <td>{item.quantite_totale}</td>
                                  <td>{formatMontant(item.prix_total)} FCFA</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Alert variant="info" className="py-2">
                            Total mensuel: <strong>{formatMontant(monthlyReport.total)} FCFA</strong>
                          </Alert>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Rapport Annuel</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Année</Form.Label>
                        <Form.Control
                          type="number"
                          value={reportYear}
                          onChange={(e) => setReportYear(e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button onClick={fetchYearlyReport} size="sm">
                          Générer
                        </Button>
                        <Button variant="success" onClick={() => downloadReport('yearly')} size="sm">
                          Télécharger PDF
                        </Button>
                      </div>
                      
                      {yearlyReport && (
                        <div className="mt-3">
                          <h6>Ventes par mois</h6>
                          <Table striped bordered size="sm">
                            <thead>
                              <tr>
                                <th>Mois</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {yearlyReport.monthly_totals.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.mois}</td>
                                  <td>{formatMontant(item.total_mois)} FCFA</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <h6 className="mt-3">Top produits</h6>
                          <Table striped bordered size="sm">
                            <thead>
                              <tr>
                                <th>Boisson</th>
                                <th>Quantité</th>
                                <th>CA</th>
                              </tr>
                            </thead>
                            <tbody>
                              {yearlyReport.product_totals.slice(0, 5).map((item, i) => (
                                <tr key={i}>
                                  <td>{item.boisson_nom}</td>
                                  <td>{item.quantite_totale}</td>
                                  <td>{formatMontant(item.chiffre_affaires)} FCFA</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Alert variant="info" className="py-2">
                            Total annuel: <strong>{formatMontant(yearlyReport.total)} FCFA</strong>
                          </Alert>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="statistiques" title="Statistiques">
              <Row>
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Boissons les plus vendues</h5>
                      <div className="d-flex gap-2 mb-3">
                        <Button 
                          onClick={() => fetchStats('month')}
                          active={activeTab === 'month'}
                          size="sm"
                        >
                          Ce mois
                        </Button>
                        <Button 
                          onClick={() => fetchStats('year')}
                          active={activeTab === 'year'}
                          size="sm"
                        >
                          Cette année
                        </Button>
                      </div>
                      <Table striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>Boisson</th>
                            <th>Quantité</th>
                            <th>Prix unitaire</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.mostSold.map((item, i) => (
                            <tr key={i}>
                              <td>{item.nom}</td>
                              <td>{item.total_ventes}</td>
                              <td>{formatMontant(item.prix)} FCFA</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Ventes par produit</h5>
                      <Table striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>Produit</th>
                            <th>Quantité</th>
                            <th>Chiffre d'affaires</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.salesByProduct.map((item, i) => (
                            <tr key={i}>
                              <td>{item.nom}</td>
                              <td>{item.total_ventes}</td>
                              <td>{formatMontant(item.prix_total || item.chiffre_affaires)} FCFA</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Ventes par client</h5>
                      <Table striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Nombre d'achats</th>
                            <th>Montant total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.salesByClient.map((item, i) => (
                            <tr key={i}>
                              <td>{item.client_nom}</td>
                              <td>{item.nombre_achats}</td>
                              <td>{formatMontant(item.montant_total)} FCFA</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="py-2">
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            Nouvelle Vente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger" className="py-1">{error}</Alert>}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="small">Client *</Form.Label>
              <Form.Control 
                as="select" 
                name="client_id" 
                value={formData.client_id}
                onChange={handleChange}
                size="sm"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.nom}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small">Boisson *</Form.Label>
              <Form.Control 
                as="select" 
                name="boisson_id" 
                value={formData.boisson_id}
                onChange={handleChange}
                size="sm"
              >
                {boissons.map((b) => (
                  <option key={b.id} value={b.id}>{b.nom} (Stock: {b.stock})</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small">Quantité *</Form.Label>
              <Form.Control 
                type="number" 
                name="quantite" 
                min="1" 
                value={formData.quantite}
                onChange={handleChange}
                size="sm"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="secondary" onClick={handleClose} size="sm">
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} size="sm">
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VenteBoissons;





// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AppNavbar from "./components/Navbar";
// import Depenses from "./pages/Depenses"
// import PagePaiement from "./pages/PagePaiement";
// import DashboardSuivi from "./pages/DashboardSuivi";
// import PageProgrammation from "./pages/PageProgrammation";
// import DossiersRejetes from './pages/DossiersRejetes'
// import CreationDossier from "./pages/CreationDossier";
// import ListeDossiers from "./pages/listeDossier";
// import RechercheDossier from "./pages/RechercheDossier";
// import Statistiques from "./pages/statistiques";
// import PageComptabilite from './pages/PageComptabilite';

// function App() {
//   return (
//     <Router>
//       <AppNavbar />
//       <Routes>
//         <Route path="/" element={<ListeDossiers />} />
//         <Route path="/creer" element={<CreationDossier />} />
//         <Route path="/liste" element={<ListeDossiers />} />
//          <Route path="/Depenses" element={< Depenses/>} />
//         <Route path="/PageProgrammation" element={< PageProgrammation/>} />
//           <Route path="/PageComptabilite" element={< PageComptabilite/>} />
//         <Route path="/DossiersRejetes" element={< DossiersRejetes/>} />
//         <Route path="/recherche" element={<RechercheDossier />} />
//         <Route path="/PagePaiement" element={<PagePaiement />} />
//         {/* Route pour les statistiques */}
//         <Route path="/statistiques" element={<Statistiques />} />
//         {/* Route pour la page de suivi */}
//         <Route path="/DashboardSuivi" element={<DashboardSuivi />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react"; // Ajout pour gérer le responsive
import { Container } from "react-bootstrap";
import AppSidebar from "./components/Navbar";
import Depenses from "./pages/Depenses";
import { ThemeProvider } from './context/Themecontext';
import PagePaiement from "./pages/PagePaiement";
import DashboardSuivi from "./pages/DashboardSuivi";
import PageProgrammation from "./pages/PageProgrammation";
import DossiersRejetes from './pages/DossiersRejetes';
import CreationDossier from "./pages/CreationDossier";
import LoginModal from "./components/LoginModal";
import ListeDossiers from "./pages/listeDossier";
import PageParametres from "./pages/PageParametres";
import RechercheDossier from "./pages/RechercheDossier";
import  AdminUtilisateurs from "./pages/statistiques";
import PageComptabilite from './pages/PageComptabilite';
import './App.css'; // Fichier CSS supplémentaire pour les styles personnalisés


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setSidebarCollapsed(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <AppSidebar 
            isMobile={isMobile} 
            collapsed={sidebarCollapsed}
            toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="main-content">
            {isMobile && (
              <button 
                className="sidebar-toggle-btn"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                ☰
              </button>
            )}

          <Routes>
            <Route path="/" element={<ListeDossiers />} />
            <Route path="/creer" element={<CreationDossier />} />
            <Route path="/liste" element={<ListeDossiers />} />
            <Route path="/Depenses" element={<Depenses />} />
            <Route path="/PageProgrammation" element={<PageProgrammation />} />
            <Route path="/PageParametres" element={<PageParametres />} />
            <Route path="/PageComptabilite" element={<PageComptabilite />} />
            <Route path="/DossiersRejetes" element={<DossiersRejetes />} />
            <Route path="/recherche" element={<RechercheDossier />} />
            <Route path="/PagePaiement" element={<PagePaiement />} />
            <Route path="/login" element={<LoginModal expectedRole="secretaire" />} />
            <Route path="/statistiques" element={< AdminUtilisateurs />} />
            <Route path="/DashboardSuivi" element={<DashboardSuivi />} />
          </Routes>
          </main>
         </div>
       </Router>
      </ThemeProvider>

  );
}

export default App;