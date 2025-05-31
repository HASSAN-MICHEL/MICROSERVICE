import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Spinner, 
  Alert,
  Badge
} from 'react-bootstrap';
import { 
  ShieldLock, 
  People, 
  CreditCard,
  CashCoin,
  ClockHistory,
  CheckCircle,
  XCircle
} from 'react-bootstrap-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { admin } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Erreur de chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatusBadge = ({ statut }) => {
    const variants = {
      'en cours': { bg: 'warning', icon: <ClockHistory className="me-1" /> },
      'complet': { bg: 'success', icon: <CheckCircle className="me-1" /> },
      'echec': { bg: 'danger', icon: <XCircle className="me-1" /> }
    };
    
    const { bg, icon } = variants[statut] || { bg: 'secondary', icon: null };
    
    return (
      <Badge bg={bg} className="d-flex align-items-center">
        {icon}
        {statut}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Chargement du tableau de bord...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">
        <ShieldLock className="me-2" />
        Tableau de Bord Administrateur
      </h1>

      <div className="mb-4 p-3 bg-light rounded">
        <h5>Informations de connexion</h5>
        <p className="mb-1">
          <strong>Connecté en tant que :</strong> {admin.nom} ({admin.email})
        </p>
        <p className="mb-0">
          <strong>Rôle :</strong> <Badge bg={admin.role === 'superadmin' ? 'danger' : 'primary'}>
            {admin.role === 'superadmin' ? 'Super Administrateur' : 'Administrateur'}
          </Badge>
        </p>
      </div>

      <Row className="g-4 mb-4">
        {/* Carte Statistiques Admins */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>
                    <People className="me-2" />
                    Administrateurs
                  </Card.Title>
                  <h2 className="mb-0">{stats?.adminCount || 0}</h2>
                  <small className="text-muted">Total administrateurs</small>
                </div>
                <Badge bg="primary" className="fs-6">
                  {stats?.activeAdminCount || 0} actifs
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Carte Statistiques Paiements */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>
                    <CreditCard className="me-2" />
                    Paiements
                  </Card.Title>
                  <h2 className="mb-0">{stats?.paymentCount || 0}</h2>
                  <small className="text-muted">Transactions totales</small>
                </div>
                <div className="text-end">
                  <h5 className="mb-0 text-success">
                    {stats?.totalRevenue?.toFixed(2) || '0.00'} €
                  </h5>
                  <small className="text-muted">Chiffre d'affaires</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Carte Dernières Transactions */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>
                <CashCoin className="me-2" />
                Derniers Paiements
              </Card.Title>
              <div className="mt-3">
                {stats?.recentPayments?.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {stats.recentPayments.map((payment) => (
                      <li key={payment.id} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>#{payment.id}</span>
                          <span>
                            <StatusBadge statut={payment.statut} />
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">
                            {new Date(payment.date).toLocaleDateString()}
                          </small>
                          <strong>{payment.montant.toFixed(2)} €</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted mb-0">Aucune transaction récente</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section Activité Récente */}
      <Card className="mb-4 shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Activité Récente</h5>
        </Card.Header>
        <Card.Body>
          {stats?.recentActivity?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Utilisateur</th>
                    <th>Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivity.map((activity) => (
                    <tr key={activity.id}>
                      <td>{new Date(activity.date).toLocaleString()}</td>
                      <td>
                        <Badge bg={activity.type === 'connexion' ? 'success' : 'info'}>
                          {activity.type}
                        </Badge>
                      </td>
                      <td>{activity.userEmail}</td>
                      <td>{activity.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted mb-0">Aucune activité récente</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;