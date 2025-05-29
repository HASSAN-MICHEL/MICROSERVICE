 import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, Row, Col, Card, Form, Spinner, 
  Table, Badge, Alert, ProgressBar, Button, Stack
} from "react-bootstrap";

// Configuration axios
const api = axios.create({
  baseURL: "http://localhost:5000/api/reservations", // Adaptez selon votre configuration
  timeout: 10000,
});

const RapportReservations = () => {
  // États
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Données
  const [dailyRevenue, setDailyRevenue] = useState({ total: 0, count: 0 });
  const [monthlyRevenue, setMonthlyRevenue] = useState({ total: 0, count: 0 });
  const [yearlyRevenue, setYearlyRevenue] = useState({ total: 0, count: 0 });
  const [monthlyEvolution, setMonthlyEvolution] = useState([]);
  const [mostBookedTypes, setMostBookedTypes] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Formatage des montants
  const formatAmount = (value) => {
    const num = parseFloat(value || 0);
    return isNaN(num) ? '0.00' : num.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Formatage des mois
  const formatMonth = (monthIndex) => {
    return new Date(0, monthIndex - 1).toLocaleString('fr-FR', { month: 'long' });
  };

  // Récupération des données
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Appels API en parallèle
      const [
        dailyRes,
        monthlyRes,
        yearlyRes,
        evolutionRes,
        mostBookedRes
      ] = await Promise.all([
        api.get(`/rapports/revenu-journalier/${date}`),
        api.get(`/rapports/revenu-mensuel/${year}/${month}`),
        api.get(`/rapports/revenu-annuel/${year}`),
        api.get(`/rapports/evolution-mensuelle/${year}`),
        api.get(`/statistiques/chambres-plus-reservees/${period}/${year}${period === 'month' ? `/${month}` : ''}`)
      ]);

      // Mise à jour des états
      setDailyRevenue(dailyRes.data || { total: 0, count: 0 });
      setMonthlyRevenue(monthlyRes.data || { total: 0, count: 0 });
      setYearlyRevenue(yearlyRes.data || { total: 0, count: 0 });
      setMonthlyEvolution(evolutionRes.data || []);
      setMostBookedTypes(mostBookedRes.data || []);

      // Récupération des réservations pour le tableau
      const reservationsRes = await api.get(`/rapports/revenu-mensuel/${year}/${month}`);
      setReservations(reservationsRes.data?.reservations || []);

    } catch (error) {
      console.error("Erreur:", error);
      setError(error.response?.data?.message || error.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period, month, year, date]);

  // Gestion des changements
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleDateChange = (e) => setDate(e.target.value);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Chargement des données...</span>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4 py-4">
      {/* En-tête */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold">Tableau de bord des réservations</h1>
          <p className="text-muted">Analyse des performances et statistiques</p>
        </Col>
      </Row>

      {/* Filtres */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
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
                        {formatMonth(i+1)}
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
                <Form.Label>Date journalière</Form.Label>
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={handleDateChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Affichage des erreurs */}
      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Erreur</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" size="sm" onClick={fetchData}>
            Réessayer
          </Button>
        </Alert>
      )}

      {/* Cartes de statistiques */}
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="h-100 border-start border-primary border-4">
            <Card.Body>
              <Card.Title className="text-primary">
                Revenu journalier
              </Card.Title>
              <Card.Text className="display-6 fw-bold">
                {formatAmount(dailyRevenue.total)} FCFA
              </Card.Text>
              <div className="d-flex justify-content-between">
                <span>{dailyRevenue.count} réservations</span>
                <Badge bg="primary">
                  {new Date(date).toLocaleDateString('fr-FR')}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-start border-success border-4">
            <Card.Body>
              <Card.Title className="text-success">
                {period === 'month' ? 'Revenu mensuel' : 'Revenu annuel'}
              </Card.Title>
              <Card.Text className="display-6 fw-bold">
                {formatAmount(period === 'month' ? monthlyRevenue.total : yearlyRevenue.total)} FCFA
              </Card.Text>
              <div className="d-flex justify-content-between">
                <span>{period === 'month' ? monthlyRevenue.count : yearlyRevenue.count} réservations</span>
                <Badge bg="success">
                  {period === 'month' ? formatMonth(month) : year}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-start border-info border-4">
            <Card.Body>
              <Card.Title className="text-info">
                Types populaires
              </Card.Title>
              {mostBookedTypes.length > 0 ? (
                <>
                  <Card.Text className="fw-bold mb-3">
                    {mostBookedTypes[0].type}
                  </Card.Text>
                  <ProgressBar>
                    {mostBookedTypes.slice(0, 3).map((type, idx) => (
                      <ProgressBar 
                        key={idx}
                        now={(type.reservations_count / mostBookedTypes[0].reservations_count) * 100}
                        variant={["info", "warning", "danger"][idx]}
                        label={`${type.type} (${type.reservations_count})`}
                      />
                    ))}
                  </ProgressBar>
                </>
              ) : (
                <Card.Text>Aucune donnée disponible</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Évolution mensuelle */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">Évolution mensuelle ({year})</Card.Title>
          <Table striped hover>
            <thead>
              <tr>
                <th>Mois</th>
                <th className="text-end">Revenu</th>
                <th className="text-end">Réservations</th>
                <th>Évolution</th>
              </tr>
            </thead>
            <tbody>
              {monthlyEvolution.map((item, index) => (
                <tr key={index}>
                  <td>{formatMonth(item.month)}</td>
                  <td className="text-end fw-bold">{formatAmount(item.total_revenue)} FCFA</td>
                  <td className="text-end">{item.reservations_count}</td>
                  <td>
                    <ProgressBar 
                      now={(item.reservations_count / 30) * 100} 
                      variant="primary" 
                      style={{ height: '6px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Détail des réservations */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">
            Détail des réservations ({formatMonth(month)} {year})
          </Card.Title>
          {reservations.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th className="text-end">Nuitées</th>
                    <th className="text-end">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res, index) => (
                    <tr key={index}>
                      <td>{res.client_nom || 'Anonyme'}</td>
                      <td>
                        <Badge bg="light" text="dark">
                          {res.type}
                        </Badge>
                      </td>
                      <td>{new Date(res.date_debut).toLocaleDateString('fr-FR')}</td>
                      <td className="text-end">
                        {Math.ceil((new Date(res.date_fin) - new Date(res.date_debut)) / (1000 * 60 * 60 * 24))}
                      </td>
                      <td className="text-end fw-bold text-primary">
                        {formatAmount(res.montant_total)} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3">Total</th>
                    <th className="text-end">{reservations.length}</th>
                    <th className="text-end">
                      {formatAmount(reservations.reduce((sum, res) => sum + res.montant_total, 0))} FCFA
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ) : (
            <Alert variant="info">
              Aucune réservation trouvée pour cette période
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RapportReservations;