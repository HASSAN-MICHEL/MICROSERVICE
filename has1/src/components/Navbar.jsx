// // // src/components/Navbar.jsx
// // const Navbar = () => {
// //   const { user, logout } = useAuth();

// //   const getMenuItems = () => {
// //     switch(user?.role) {
// //       case "Secretaire":
// //         return [
// //           { path: "/dossiers", label: "Dossiers" },
// //           { path: "/nouveau", label: "Nouveau dossier" }
// //         ];
// //       case "Depenses":
// //         return [
// //           { path: "/depenses", label: "Dossiers à valider" }
// //         ];
// //       // ... autres rôles
// //       default:
// //         return [];
// //     }
// //   };

// //   return (
// //     <Navbar bg="dark" variant="dark">
// //       <Container>
// //         <Navbar.Brand>SuiviDossiers</Navbar.Brand>
// //         <Nav className="me-auto">
// //           {getMenuItems().map((item) => (
// //             <Nav.Link as={Link} to={item.path} key={item.path}>
// //               {item.label}
// //             </Nav.Link>
// //           ))}
// //         </Nav>
// //         <Button onClick={logout}>Déconnexion</Button>
// //       </Container>
// //     </Navbar>
// //   );
// // };


// import { Navbar, Nav, Container } from "react-bootstrap";

// export default function Navigation() {
//   return (
//     <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
//       <Container>
//         <Navbar.Brand>Gestion Dossiers</Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link href="/">Créer</Nav.Link>
//           <Nav.Link href="/recherche">Recherche</Nav.Link>
//           <Nav.Link href="/statistiques">Statistiques</Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// }


// src/components/Navbar.jsx
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Suivi Dossiers</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />
        <Navbar.Collapse id="menu">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/creer">Créer</Nav.Link>
            {/* <Nav.Link as={Link} to="/liste">Liste</Nav.Link> */}
            <Nav.Link as={Link} to="/DashboardSuivi">Suivi</Nav.Link>
             <Nav.Link as={Link} to="/Depenses">Depenses</Nav.Link>
              <Nav.Link as={Link} to="/PageComptabilite">comptabilité</Nav.Link>
            <Nav.Link as={Link} to="/PageProgrammation">Programmation</Nav.Link>
              <Nav.Link as={Link} to="/DossiersRejetes">Rejetés</Nav.Link>
            <Nav.Link as={Link} to="/PagePaiement">Paiement</Nav.Link>
            <Nav.Link as={Link} to="/recherche">Recherche</Nav.Link>
            {/* <Nav.Link as={Link} to="/statistiques">Statistiques</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
