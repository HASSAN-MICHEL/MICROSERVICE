import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import { Container, Row, Col, Form, Spinner, Table, Card } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:5000";

const RapportVente = () => {
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mois actuel
  const [year, setYear] = useState(new Date().getFullYear()); // Année actuelle
  const [mostSold, setMostSold] = useState([]); // Boissons les plus vendues
  const [salesByProduct, setSalesByProduct] = useState([]); // Ventes par produit
  const [salesEvolution, setSalesEvolution] = useState([]); // Évolution mensuelle des ventes
  const [dailyReport, setDailyReport] = useState(null); // Rapport journalier
  const [monthlyReport, setMonthlyReport] = useState(null); // Rapport mensuel

  // Récupérer les données des boissons les plus vendues
  const fetchMostSoldByMonth = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/boissons-plus-vendues/${month}/${year}`);
      setMostSold(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des boissons les plus vendues :", error);
    }
  };

  // Récupérer les ventes par produit pour un mois donné
  const fetchSalesByProduct = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/vente-par-produit/${month}/${year}`);
      setSalesByProduct(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des ventes par produit :", error);
    }
  };

  // Récupérer l'évolution mensuelle des ventes
  const fetchMonthlySalesEvolution = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/evolution-ventes/${year}`);
      setSalesEvolution(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'évolution mensuelle des ventes :", error);
    }
  };

  // Récupérer le rapport journalier
  const fetchDailyReport = async (date) => {
    try {
      const response = await axios.get(`/api/vente-boissons/rapports/journalier/${date}`);
      setDailyReport(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport journalier :", error);
    }
  };

  // Récupérer le rapport mensuel
  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get(`/api/vente-boissons/rapport-mensuel/${year}/${month}`);
      setMonthlyReport(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport mensuel :", error);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      await fetchMostSoldByMonth();
      await fetchSalesByProduct();
      await fetchMonthlySalesEvolution();
      await fetchMonthlyReport();
      setLoading(false);
    };
    fetchData();
  }, [month, year]);

  // Gérer le changement de mois ou d'année
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  // Gérer le changement de date pour le rapport journalier
  const handleDailyReportDateChange = (e) => {
    const date = e.target.value;
    fetchDailyReport(date);
  };

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
      <h1 className="text-center mb-4">Rapports de Ventes</h1>

      {/* Sélecteurs pour le mois et l'année */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Mois</Form.Label>
            <Form.Control as="select" value={month} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Année</Form.Label>
            <Form.Control type="number" value={year} onChange={handleYearChange} />
          </Form.Group>
        </Col>
      </Row>

      {/* Cadres pour le nombre de ventes et le prix total */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Nombre de ventes</Card.Title>
              <Card.Text>
                {monthlyReport ? monthlyReport.total_ventes : "Chargement..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Prix total des ventes</Card.Title>
              <Card.Text>
                {monthlyReport ? `${monthlyReport.total_ventes} FCFA` : "Chargement..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Ventes par produit */}
      <Row className="mb-4">
        <Col>
          <h3>Ventes par produit</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité vendue</th>
                <th>Prix total (FCFA)</th>
              </tr>
            </thead>
            <tbody>
              {salesByProduct.map((produit, index) => (
                <tr key={index}>
                  <td>{produit.nom}</td>
                  <td>{produit.total_ventes}</td>
                  <td>{produit.prix_total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Boissons les plus vendues */}
      <Row className="mb-4">
        <Col>
          <h3>Boissons les plus vendues</h3>
          <BarChart width={600} height={300} data={mostSold}>
            <XAxis dataKey="nom" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="total_ventes" fill="#8884d8" name="Quantité vendue" />
            <Bar yAxisId="right" dataKey="prix" fill="#82ca9d" name="Prix (FCFA)" />
          </BarChart>
        </Col>
      </Row>

      {/* Évolution mensuelle des ventes */}
      <Row className="mb-4">
        <Col>
          <h3>Évolution mensuelle des ventes</h3>
          <BarChart width={600} height={300} data={salesEvolution}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </Col>
      </Row>

      {/* Rapport journalier */}
      <Row className="mb-4">
        <Col>
          <h3>Rapport journalier</h3>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" onChange={handleDailyReportDateChange} />
          </Form.Group>
          {dailyReport && (
            <div>
              <p>Total des ventes : {dailyReport.total_ventes} FCFA</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RapportVente;