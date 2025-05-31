import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/ui/Sidebar'
import Topbar from '../components/ui/Topbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="app-container">
      <Topbar />
      <Container fluid>
        <Row>
          <Col xs={2} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col xs={10} className="main-content">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MainLayout