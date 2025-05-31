import { Row, Col, Card } from 'react-bootstrap'
import StatsCard from '../components/dashboard/StatsCard'
//import RecentPayments from '../components/dashboard/RecentPayments'
import { 
  FaMoneyBillWave, 
  FaFileInvoiceDollar, 
  FaCheckCircle,
  FaClock
} from 'react-icons/fa'

const DashboardPage = () => {
  const stats = [
    { 
      title: "Revenus Totaux", 
      value: "$12,345", 
      icon: <FaMoneyBillWave size={24} />,
      variant: 'primary'
    },
    { 
      title: "Factures", 
      value: "56", 
      icon: <FaFileInvoiceDollar size={24} />,
      variant: 'success'
    },
    { 
      title: "Paiements Réussis", 
      value: "48", 
      icon: <FaCheckCircle size={24} />,
      variant: 'info'
    },
    { 
      title: "En Attente", 
      value: "8", 
      icon: <FaClock size={24} />,
      variant: 'warning'
    }
  ]

  return (
    <div className="dashboard-page">
      <h2 className="mb-4">Tableau de Bord</h2>
      
      <Row className="g-4 mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={3}>
            <StatsCard {...stat} />
          </Col>
        ))}
      </Row>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Graphique des Paiements</Card.Title>
              {/* Ici vous intégrerez un graphique avec Chart.js */}
              <div className="chart-placeholder" style={{ height: '300px' }}>
                [Graphique des paiements]
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <RecentPayments />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage