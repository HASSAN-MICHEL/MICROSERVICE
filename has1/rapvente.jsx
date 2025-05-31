import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Container, Row, Col, Form, Spinner, Card, Table, Alert } from "react-bootstrap";
import moment from "moment";

// Configuration d'axios
axios.defaults.baseURL = "http://localhost:3000";

const RapportVente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [mostSold, setMostSold] = useState([]);
  const [salesEvolution, setSalesEvolution] = useState([]);
  const [dailyReport, setDailyReport] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [yearlyReport, setYearlyReport] = useState({});
  const [salesByProduct, setSalesByProduct] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Fonction pour formater les montants
  const formatAmount = (value) => {
    if (value === undefined || value === null || isNaN(value)) return '0.00';
    return parseFloat(value).toFixed(2);
  };

  // Fonctions de récupération des données
  const fetchMostSold = async () => {
    try {
      const url = `/api/vente-boissons/statistiques/boissons-plus-vendues/${period}/${year}${period === 'month' ? `/${month}` : ''}`;
      const response = await axios.get(url);
      setMostSold(response.data || []);
    } catch (error) {
      console.error("Erreur produits plus vendus:", error);
      setError("Erreur lors du chargement des produits les plus vendus");
    }
  };

  const fetchSalesEvolution = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/evolution-ventes/${year}`);
      setSalesEvolution(response.data || []);
    } catch (error) {
      console.error("Erreur évolution ventes:", error);
      setError("Erreur lors du chargement de l'évolution des ventes");
    }
  };

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/rapports/journalier/${date}`);
      setDailyReport(response.data || {});
    } catch (error) {
      console.error("Erreur rapport journalier:", error);
      setDailyReport({});
      setError("Erreur lors du chargement du rapport journalier");
    }
  };

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/rapports/mensuel/${year}/${month}`);
      setMonthlyReport(response.data || {});
    } catch (error) {
      console.error("Erreur rapport mensuel:", error);
      setMonthlyReport({});
    }
  };

  const fetchYearlyReport = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/rapports/annuel/${year}`);
      setYearlyReport(response.data || {});
    } catch (error) {
      console.error("Erreur rapport annuel:", error);
      setYearlyReport({});
    }
  };

  const fetchSalesByProduct = async () => {
    try {
      const url = `/api/vente-boissons/statistiques/ventes-par-produit/${period}/${year}${period === 'month' ? `/${month}` : ''}`;
      const response = await axios.get(url);
      setSalesByProduct(response.data || []);
    } catch (error) {
      console.error("Erreur ventes par produit:", error);
      setSalesByProduct([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchMostSold(),
          fetchSalesEvolution(),
          period === 'month' ? fetchMonthlyReport() : fetchYearlyReport(),
          fetchDailyReport(),
          fetchSalesByProduct()
        ]);
      } catch (error) {
        console.error("Erreur chargement données:", error);
        setError("Une erreur est survenue lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [period, month, year, date]);

  // Gestion des changements de filtres
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleDateChange = (e) => setDate(e.target.value);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Rapports des ventes de boissons</h2>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Filtres */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Période</Form.Label>
                <Form.Select value={period} onChange={handlePeriodChange}>
                  <option value="month">Mensuel</option>
                  <option value="year">Annuel</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {period === 'month' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Mois</Form.Label>
                  <Form.Select value={month} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i+1} value={i+1}>
                        {new Date(0, i).toLocaleString('fr-FR', { month: 'long' })}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Année</Form.Label>
                <Form.Control 
                  type="number" 
                  value={year} 
                  onChange={handleYearChange}
                  min="2020" 
                  max={new Date().getFullYear()}
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label>Date (journalier)</Form.Label>
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={handleDateChange}
                  max={moment().format('YYYY-MM-DD')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Cartes de résumé */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Journalier</Card.Title>
              <Card.Text className="fs-5">
                Total: {formatAmount(dailyReport.total_ventes)} FCFA
              </Card.Text>
              <Card.Text>
                Nombre de ventes: {dailyReport.count || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{period === 'month' ? 'Mensuel' : 'Annuel'}</Card.Title>
              <Card.Text className="fs-5">
                Total: {formatAmount(period === 'month' ? monthlyReport.total_ventes : yearlyReport.total_ventes)} FCFA
              </Card.Text>
              <Card.Text>
                Nombre de ventes: {period === 'month' ? monthlyReport.count || 0 : yearlyReport.count || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Évolution annuelle</Card.Title>
              <Card.Text className="fs-5">
                Total: {formatAmount(salesEvolution.reduce((sum, item) => sum + (item.total || 0), 0))} FCFA
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Top boissons</Card.Title>
              {mostSold.length > 0 ? (
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mostSold}>
                      <XAxis dataKey="nom" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [value, "Quantité vendue"]}
                        labelFormatter={(label) => `Boisson: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="total_ventes" name="Quantité vendue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-muted">Aucune donnée disponible</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Répartition des ventes</Card.Title>
              {salesByProduct.length > 0 ? (
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByProduct.slice(0, 5)}
                        dataKey="total_ventes"
                        nameKey="nom"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesByProduct.slice(0, 5).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`${value} ventes`, props.payload.nom]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-muted">Aucune donnée disponible</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau des ventes */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Détail des ventes par produit</Card.Title>
          {salesByProduct.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité vendue</th>
                  <th>Chiffre d'affaires (FCFA)</th>
                </tr>
              </thead>
              <tbody>
                {salesByProduct.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nom || 'N/A'}</td>
                    <td>{item.total_ventes || 0}</td>
                    <td>{formatAmount(item.prix_total)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">Aucune donnée disponible</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RapportVente;