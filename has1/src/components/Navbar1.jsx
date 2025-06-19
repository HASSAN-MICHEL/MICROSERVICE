import { Navbar, Nav, Container } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>Gestion Dossiers</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Créer</Nav.Link>
          <Nav.Link href="/recherche">Recherche</Nav.Link>
          <Nav.Link href="/statistiques">Statistiques</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
