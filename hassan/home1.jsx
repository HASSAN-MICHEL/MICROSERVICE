import React from "react";
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaUtensils, 
  FaGlassCheers, 
  FaUsers, 
  FaUserCog,
  FaMoneyBillWave,
  FaClipboardList
} from "react-icons/fa";
import { Card, Row, Col, ProgressBar, Container, Badge } from "react-bootstrap";

const Homepage = () => {
  // Données statistiques (à remplacer par vos données réelles)
  const stats = [
    { title: "Réservations", value: 124, icon: <FaCalendarAlt size={24} />, progress: 75, variant: "primary" },
    { title: "Clients", value: 89, icon: <FaUsers size={24} />, progress: 60, variant: "success" },
    { title: "Ventes Restaurant", value: "5,420€", icon: <FaUtensils size={24} />, progress: 82, variant: "info" },
    { title: "Ventes Bar", value: "3,150€", icon: <FaGlassCheers size={24} />, progress: 45, variant: "warning" }
  ];

  const recentActivities = [
    { id: 1, action: "Nouvelle réservation", time: "10 min", user: "Jean D.", status: "success" },
    { id: 2, action: "Commande restaurant", time: "25 min", user: "Marie L.", status: "info" },
    { id: 3, action: "Paiement bar", time: "1h", user: "Pierre T.", status: "warning" },
    { id: 4, action: "Nouveau client", time: "2h", user: "Sophie M.", status: "success" },
    { id: 5, action: "Modification menu", time: "3h", user: "Admin", status: "primary" }
  ];

  const quickActions = [
    { title: "Créer réservation", icon: <FaCalendarAlt />, link: "/reservation" },
    { title: "Ajouter client", icon: <FaUsers />, link: "/clients" },
    { title: "Gérer menu", icon: <FaUtensils />, link: "/menus" },
    { title: "Voir rapports", icon: <FaChartLine />, link: "/rapportvente" }
  ];

  return (
    <Container fluid>
      {/* En-tête */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Tableau de bord</h2>
          <p className="text-muted">Aperçu des activités et statistiques</p>
        </Col>
      </Row>

      {/* Cartes statistiques */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <div className={`bg-${stat.variant}-subtle p-3 rounded-circle`}>
                      {stat.icon}
                    </div>
                  </Col>
                  <Col>
                    <h5 className="text-muted mb-1">{stat.title}</h5>
                    <h3 className="mb-2">{stat.value}</h3>
                    <ProgressBar 
                      now={stat.progress} 
                      variant={stat.variant} 
                      className="mt-2" 
                      style={{height: '6px'}}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contenu principal */}
      <Row>
        {/* Activités récentes */}
        <Col lg={8} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-white border-0">
              <h5 className="mb-0 fw-bold">Activités récentes</h5>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="list-group-item border-0 px-0 py-3">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Badge pill bg={activity.status} className="me-2">
                          &nbsp;
                        </Badge>
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-between">
                          <span>{activity.action}</span>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                        <small className="text-muted">Par {activity.user}</small>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0 text-end">
              <a href="/activities" className="text-primary">Voir toutes les activités</a>
            </Card.Footer>
          </Card>
        </Col>

        {/* Actions rapides + Statistiques */}
        <Col lg={4}>
          <Row>
            {/* Actions rapides */}
            <Col xs={12} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0 fw-bold">Actions rapides</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {quickActions.map((action, index) => (
                      <Col key={index} xs={6} className="mb-3">
                        <a href={action.link} className="text-decoration-none">
                          <div className="text-center p-3 bg-light rounded hover-bg-primary">
                            <div className="text-primary mb-2">{action.icon}</div>
                            <small className="d-block">{action.title}</small>
                          </div>
                        </a>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Statistiques mensuelles */}
            <Col xs={12}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0 fw-bold">Statistiques mensuelles</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Restaurant</span>
                      <span>5,420€</span>
                    </div>
                    <ProgressBar now={75} variant="info" style={{height: '6px'}} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Bar</span>
                      <span>3,150€</span>
                    </div>
                    <ProgressBar now={45} variant="warning" style={{height: '6px'}} />
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Total</span>
                      <span className="fw-bold">8,570€</span>
                    </div>
                    <ProgressBar now={60} variant="success" style={{height: '6px'}} />
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0 text-end">
                  <a href="/stats" className="text-primary">Voir détails</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Section supplémentaire */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0">
              <h5 className="mb-0 fw-bold">Prochaines réservations</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Date/Heure</th>
                      <th>Personnes</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Martin D.</td>
                      <td>Aujourd'hui, 19:30</td>
                      <td>4</td>
                      <td><Badge bg="success">Confirmé</Badge></td>
                      <td><a href="/reservation/1" className="text-primary">Voir</a></td>
                    </tr>
                    <tr>
                      <td>Sophie L.</td>
                      <td>Demain, 12:15</td>
                      <td>2</td>
                      <td><Badge bg="warning">En attente</Badge></td>
                      <td><a href="/reservation/2" className="text-primary">Voir</a></td>
                    </tr>
                    <tr>
                      <td>Jean P.</td>
                      <td>Demain, 20:00</td>
                      <td>6</td>
                      <td><Badge bg="success">Confirmé</Badge></td>
                      <td><a href="/reservation/3" className="text-primary">Voir</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;