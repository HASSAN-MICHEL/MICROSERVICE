import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Spinner, Card, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL_VENTES = "http://localhost:3000/api/vente-boissons";
const API_URL_BOISSONS = "http://localhost:3000/api/boissons";
const API_URL_CLIENTS = "http://localhost:3000/api/clients";

const VenteBoissons = () => {
  const [ventes, setVentes] = useState([]);
  const [clients, setClients] = useState([]);
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ client_id: "", boisson_id: "", quantite: 1 });

  // États pour les rapports
  const [dailyReport, setDailyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [reportDate, setReportDate] = useState("");
  const [reportYear, setReportYear] = useState("");
  const [reportMonth, setReportMonth] = useState("");

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resClients, resBoissons, resVentes] = await Promise.all([
        axios.get(API_URL_CLIENTS),
        axios.get(API_URL_BOISSONS),
        axios.get(API_URL_VENTES)
      ]);
      setClients(resClients.data);
      setBoissons(resBoissons.data);
      setVentes(resVentes.data);
    } catch (error) {
      console.error("Erreur de chargement", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = () => {
    setFormData({ client_id: "", boisson_id: "", quantite: 1 });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(API_URL_VENTES, formData);
      alert("Vente ajoutée avec succès !");
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert("Erreur lors de l'ajout");
    }
  };

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`${API_URL_VENTES}/rapports/journalier/${reportDate}`);
      setDailyReport(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport journalier", error);
      alert("Erreur lors de la récupération du rapport journalier");
    }
  };

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get(`${API_URL_VENTES}/rapports/mensuel/${reportYear}/${reportMonth}`);
      setMonthlyReport(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport mensuel", error);
      alert("Erreur lors de la récupération du rapport mensuel");
    }
  };

  const navigate = useNavigate();

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

  return (
    <div className="container mt-4">
      <h2>Ventes de Boissons</h2>
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={handleShow}>
          VENTE
        </Button>
        <Button variant="info" onClick={() => navigate("/boisson")}>
          Voir les boissons
        </Button>
      </div>

      {/* Section pour les rapports */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Rapports</h5>
          <div className="mb-3">
            <label>Rapport Journalier</label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="form-control"
            />
            <Button onClick={fetchDailyReport} className="mt-2">
              Générer Rapport Journalier
            </Button>
            {dailyReport && (
              <div className="mt-3">
                <p><strong>Jour :</strong> {dailyReport.jour}</p>
                <p><strong>Total des ventes :</strong> {dailyReport.total_ventes} €</p>
              </div>
            )}
          </div>
          <div>
            <label>Rapport Mensuel</label>
            <div className="d-flex gap-2">
              <input
                type="number"
                placeholder="Année"
                value={reportYear}
                onChange={(e) => setReportYear(e.target.value)}
                className="form-control"
              />
              <input
                type="number"
                placeholder="Mois"
                value={reportMonth}
                onChange={(e) => setReportMonth(e.target.value)}
                className="form-control"
              />
            </div>
            <Button onClick={fetchMonthlyReport} className="mt-2">
              Générer Rapport Mensuel
            </Button>
            {monthlyReport && (
              <div className="mt-3">
                <p><strong>Mois :</strong> {new Date(monthlyReport.mois).toLocaleDateString()}</p>
                <p><strong>Total des ventes :</strong> {monthlyReport.total_ventes} €</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {loading ? <Spinner animation="border" /> : (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Boisson</th>
                <th>Quantité</th>
                <th>Montant (€)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentVentes.map((vente, index) => (
                <tr key={vente.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{clients.find((c) => c.id === vente.client_id)?.nom || "N/A"}</td>
                  <td>{boissons.find((b) => b.id === vente.boisson_id)?.nom || "N/A"}</td>
                  <td>{vente.quantite}</td>
                  <td>{vente.montant_total} €</td>
                  <td>{vente.date_vente}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            />
          </Pagination>
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Vente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control as="select" name="client_id" onChange={handleChange}>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Boisson</Form.Label>
              <Form.Control as="select" name="boisson_id" onChange={handleChange}>
                {boissons.map((b) => <option key={b.id} value={b.id}>{b.nom}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="number" name="quantite" min="1" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Valider</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VenteBoissons;





import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from "recharts";
import axios from "axios";
import { 
  Container, Row, Col, Form, Spinner, Card, 
  Table, Alert, Badge, Stack 
} from "react-bootstrap";
import moment from "moment";
import { 
  FiCalendar, FiTrendingUp, FiCoffee, 
  FiPieChart, FiShoppingCart, FiDollarSign 
} from "react-icons/fi";

// Configuration d'axios
axios.defaults.baseURL = "http://localhost:3000";

const RapportVente = () => {
  // États
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [mostSold, setMostSold] = useState([]);
  const [salesEvolution, setSalesEvolution] = useState([]);
  const [dailyReport, setDailyReport] = useState({ total_ventes: 0, count: 0 });
  const [monthlyReport, setMonthlyReport] = useState({ total_ventes: 0, count: 0 });
  const [yearlyReport, setYearlyReport] = useState({ total_ventes: 0, count: 0 });
  const [salesByProduct, setSalesByProduct] = useState([]);

  // Palette de couleurs
  const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"];

  // Formatage des montants
  const formatAmount = (value) => {
    const num = parseFloat(value || 0);
    return isNaN(num) ? '0.00' : num.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Fonction unifiée de récupération des données
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoints = [
        `/api/vente-boissons/statistiques/boissons-plus-vendues/${period}/${year}${period === 'month' ? `/${month}` : ''}`,
        `/api/vente-boissons/statistiques/evolution-ventes/${year}`,
        `/api/vente-boissons/rapports/journalier/${date}`,
        period === 'month' 
          ? `/api/vente-boissons/rapports/mensuel/${year}/${month}`
          : `/api/vente-boissons/rapports/annuel/${year}`,
        `/api/vente-boissons/statistiques/ventes-par-produit/${period}/${year}${period === 'month' ? `/${month}` : ''}`
      ];

      const [
        mostSoldRes, 
        salesEvolutionRes, 
        dailyReportRes, 
        periodReportRes, 
        salesByProductRes
      ] = await Promise.all(endpoints.map(url => axios.get(url)));

      setMostSold(mostSoldRes.data || []);
      setSalesEvolution(salesEvolutionRes.data || []);
      setDailyReport(dailyReportRes.data || { total_ventes: 0, count: 0 });
      
      if (period === 'month') {
        setMonthlyReport(periodReportRes.data || { total_ventes: 0, count: 0 });
      } else {
        setYearlyReport(periodReportRes.data || { total_ventes: 0, count: 0 });
      }
      
      setSalesByProduct(salesByProductRes.data || []);

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.response?.data?.message || "Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period, month, year, date]);

  // Gestion des changements de filtres
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleDateChange = (e) => setDate(e.target.value);

  // Calcul des totaux pour le tableau
  const totalQuantite = salesByProduct.reduce((sum, item) => sum + (item.total_ventes || 0), 0);
  const totalCA = salesByProduct.reduce((sum, item) => sum + (parseFloat(item.prix_total) || 0), 0);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid="lg" className="py-4">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-primary">
          <FiCoffee className="me-2" />
          Rapports des ventes de boissons
        </h1>
        <Badge bg="light" text="dark" className="fs-6">
          <FiCalendar className="me-1" />
          {moment().format('LL')}
        </Badge>
      </div>

      {/* Message d'erreur */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
          <div className="d-flex align-items-center">
            <FiCoffee className="me-2" />
            {error}
          </div>
        </Alert>
      )}

      {/* Filtres */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-medium">Période</Form.Label>
                <Form.Select 
                  value={period} 
                  onChange={handlePeriodChange}
                  className="border-primary"
                >
                  <option value="month">Mensuel</option>
                  <option value="year">Annuel</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {period === 'month' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-medium">Mois</Form.Label>
                  <Form.Select 
                    value={month} 
                    onChange={handleMonthChange}
                    className="border-primary"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i+1} value={i+1}>
                        {new Date(0, i).toLocaleString('fr-FR', { month: 'long' })}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            
            <Col md={period === 'month' ? 3 : 6}>
              <Form.Group>
                <Form.Label className="fw-medium">Année</Form.Label>
                <Form.Control 
                  type="number" 
                  value={year} 
                  onChange={handleYearChange}
                  min="2020" 
                  max={new Date().getFullYear()}
                  className="border-primary"
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-medium">Date journalière</Form.Label>
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={handleDateChange}
                  max={moment().format('YYYY-MM-DD')}
                  className="border-primary"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Cartes de résumé */}
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="h-100 border-start border-4 border-primary shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded">
                  <FiCalendar className="text-primary fs-4" />
                </div>
                <Card.Title className="mb-0">Journalier</Card.Title>
              </Stack>
              <Card.Text className="fs-5 fw-bold text-primary">
                {formatAmount(dailyReport.total_ventes)} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>{dailyReport.count || 0} ventes</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-start border-4 border-success shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-success bg-opacity-10 p-2 rounded">
                  <FiTrendingUp className="text-success fs-4" />
                </div>
                <Card.Title className="mb-0">
                  {period === 'month' ? 'Mensuel' : 'Annuel'}
                </Card.Title>
              </Stack>
              <Card.Text className="fs-5 fw-bold text-success">
                {formatAmount(period === 'month' ? monthlyReport.total_ventes : yearlyReport.total_ventes)} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>
                  {period === 'month' ? monthlyReport.count || 0 : yearlyReport.count || 0} ventes
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        {/* <Col md={4}>
          <Card className="h-100 border-start border-4 border-info shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-info bg-opacity-10 p-2 rounded">
                  <FiTrendingUp className="text-info fs-4" />
                </div>
                <Card.Title className="mb-0">Évolution annuelle</Card.Title>
              </Stack>
              <Card.Text className="fs-5 fw-bold text-info">
                {formatAmount(salesEvolution.reduce((sum, item) => sum + (item.total || 0), 0))} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>Total sur {salesEvolution.length} mois</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      {/* Graphiques */}
      <Row className="mb-4 g-4">
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FiShoppingCart className="text-warning me-2 fs-4" />
                <Card.Title className="mb-0">Top boissons</Card.Title>
              </div>
              {mostSold.length > 0 ? (
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mostSold}>
                      <XAxis 
                        dataKey="nom" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value}`, "Quantité vendue"]}
                        contentStyle={{
                          background: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="total_ventes" 
                        name="Quantité vendue" 
                        fill="#4E79A7"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <FiCoffee className="fs-1 opacity-25" />
                  <p className="mt-2">Aucune donnée disponible</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FiPieChart className="text-danger me-2 fs-4" />
                <Card.Title className="mb-0">Répartition des ventes</Card.Title>
              </div>
              {salesByProduct.length > 0 ? (
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByProduct.slice(0, 5)}
                        dataKey="total_ventes"
                        nameKey="nom"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {salesByProduct.slice(0, 5).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} ventes`, "Quantité"]}
                        contentStyle={{
                          background: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <FiCoffee className="fs-1 opacity-25" />
                  <p className="mt-2">Aucune donnée disponible</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau des ventes */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-0">
          <div className="p-3 bg-light bg-opacity-10 border-bottom">
            <div className="d-flex align-items-center">
              <FiDollarSign className="text-primary me-2 fs-5" />
              <Card.Title className="mb-0">Détail des ventes par produit</Card.Title>
            </div>
          </div>
          
          {salesByProduct.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light bg-opacity-10">
                  <tr>
                    <th className="py-3 ps-4">Produit</th>
                    <th className="py-3 text-end">Quantité vendue</th>
                    <th className="py-3 pe-4 text-end">Chiffre d'affaires</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByProduct.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 ps-4 align-middle">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                            <FiCoffee className="text-primary" />
                          </div>
                          <span>{item.nom || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3 align-middle text-end">
                        {item.total_ventes || 0}
                      </td>
                      <td className="py-3 pe-4 align-middle text-end fw-bold text-primary">
                        {formatAmount(item.prix_total)} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-light bg-opacity-10">
                  <tr>
                    <th className="py-3 ps-4">Total</th>
                    <th className="py-3 text-end fw-bold">
                      {totalQuantite}
                    </th>
                    <th className="py-3 pe-4 text-end fw-bold text-primary">
                      {formatAmount(totalCA)} FCFA
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <FiCoffee className="fs-1 opacity-25" />
              <p className="mt-2">Aucune donnée disponible</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RapportVente;