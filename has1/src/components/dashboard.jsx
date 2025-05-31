import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaUtensils, 
  FaGlassCheers, 
  FaUsers, 
  FaBars, 
  FaSignOutAlt,
  FaHome,
  FaUserCog,
  FaChartPie,
  FaBell,
  FaCog
} from "react-icons/fa";
import { 
  Container, 
  Row, 
  Col, 
  Nav, 
  Button, 
  Offcanvas, 
  Alert,
  Badge,
  Dropdown,
  ListGroup,
  Card
} from "react-bootstrap";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState(null);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleMenuToggle = () => setShowMenu(!showMenu);
  const handleNavigation = (path) => navigate(path);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { path: "/Homepage ", label: "Accueil", icon: <FaHome className="me-2" /> },
    // { path: "/reservation", label: "Réservations", icon: <FaCalendarAlt className="me-2" /> },
    // { path: "/menus", label: "Restaurant", icon: <FaUtensils className="me-2" /> },
    { path: "/boisson", label: "Bar", icon: <FaGlassCheers className="me-2" /> },
    { path: "/clients", label: "Clients", icon: <FaUsers className="me-2" /> },
    // { path: "/user", label: "Utilisateurs", icon: <FaUserCog className="me-2" /> },
    { path: "/rapportvente", label: "Rapports", icon: <FaChartPie className="me-2" /> },
    // { path: "/rapportreservation", label: "Statistiques reservation", icon: <FaChartLine className="me-2" /> }
  ];

  return (
    <Container fluid className="p-0 d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky-top">
        <Row className="align-items-center g-0">
          <Col xs="auto" className="d-lg-none">
            <Button 
              variant="link" 
              onClick={handleMenuToggle}
              className="text-dark"
            >
              <FaBars size={20} />
            </Button>
          </Col>
          <Col className="ps-3 ps-lg-4">
            <h4 className="mb-0 text-primary fw-bold">
              <span className="text-dark">Next</span> Management
            </h4>
          </Col>
          <Col xs="auto" className="pe-3">
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                <div className="me-2 d-none d-sm-block">Admin</div>
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                  <FaUserCog className="text-white" />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow border-0">
                <Dropdown.Header className="small text-muted">Connecté en tant que Admin</Dropdown.Header>
                <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center">
                  <FaUserCog className="me-2 text-muted" /> Mon Profil
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings" className="d-flex align-items-center">
                  <FaCog className="me-2 text-muted" /> Paramètres
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center text-danger">
                  <FaSignOutAlt className="me-2" /> Déconnexion
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </header>

      {/* Main Content */}
      <Row className="g-0 flex-grow-1">
        {/* Sidebar - Desktop */}
        <Col lg={2} className="d-none d-lg-block bg-dark text-white vh-100 sticky-top pt-3" style={{top: '56px'}}>
          <ListGroup variant="flush" className="border-0">
            {menuItems.map((item) => (
              <ListGroup.Item 
                key={item.path}
                as={Link}
                to={item.path}
                action
                className={`border-0 rounded-0 py-3 ps-4 pe-2 bg-dark text-white ${activePath === item.path ? 'bg-primary' : 'hover-bg-dark'}`}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge pill bg="light" text="dark" className="ms-2">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Sidebar - Mobile */}
        <Offcanvas 
          show={showMenu} 
          onHide={() => setShowMenu(false)} 
          placement="start"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary">
            <Offcanvas.Title>
              <h5 className="mb-0 text-primary fw-bold">
                <span className="text-white">Next</span> Management
              </h5>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <ListGroup variant="flush" className="border-0">
              {menuItems.map((item) => (
                <ListGroup.Item 
                  key={item.path}
                  as={Link}
                  to={item.path}
                  action
                  className={`border-0 rounded-0 py-3 ps-4 pe-2 bg-dark text-white ${activePath === item.path ? 'bg-primary' : 'hover-bg-dark'}`}
                  onClick={() => setShowMenu(false)}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge pill bg="light" text="dark" className="ms-2">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Content Area */}
        <Col lg={10} className="p-4">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4 bg-light rounded p-2">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="Homepage">Accueil</Link></li>
              <li className="breadcrumb-item active" aria-current="page">
                {menuItems.find(item => item.path === activePath)?.label || 'Tableau de bord'}
              </li>
            </ol>
          </nav>

          {/* Error Alert */}
          {error && (
            <Alert 
              variant="danger" 
              dismissible 
              onClose={() => setError(null)}
              className="mb-4"
            >
              <Alert.Heading>Erreur</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          {/* Page Content */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <small className="text-muted">
                © {new Date().getFullYear()} Next Management System. Tous droits réservés.
              </small>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <small className="text-muted">
                Version 1.0.0
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
};

export default Dashboard;