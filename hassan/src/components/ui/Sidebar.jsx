import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { 
  FaTachometerAlt, 
  FaMoneyBillWave, 
  FaCreditCard, 
  FaFileInvoiceDollar 
} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <LinkContainer to="/" exact>
        <Nav.Link>
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/payments">
        <Nav.Link>
          <FaMoneyBillWave className="me-2" />
          Paiements
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/accounts">
        <Nav.Link>
          <FaCreditCard className="me-2" />
          Comptes
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/invoices">
        <Nav.Link>
          <FaFileInvoiceDollar className="me-2" />
          Factures
        </Nav.Link>
      </LinkContainer>
    </Nav>
  )
}

export default Sidebar