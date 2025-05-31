import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ShieldLock, BoxArrowRight, Person } from 'react-bootstrap-icons';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { admin, logout } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/admin/dashboard">
            <ShieldLock className="me-2" />
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/admins">Administrateurs</Nav.Link>
              <Nav.Link as={Link} to="/admin/paiements">Paiements</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                <Person className="me-1" />
                {admin?.nom} ({admin?.role})
              </Navbar.Text>
              <Button variant="outline-light" onClick={logout}>
                <BoxArrowRight className="me-1" />
                Déconnexion
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;