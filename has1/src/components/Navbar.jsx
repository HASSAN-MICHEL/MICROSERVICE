
// // // // import { Nav } from "react-bootstrap";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import { 
// // // //   FiHome, FiFilePlus, FiList, FiDollarSign, 
// // // //   FiTrendingUp, FiCheckCircle, FiXCircle,
// // // //   FiCalendar, FiSearch, FiPieChart, FiSettings
// // // // } from "react-icons/fi";
// // // // import logo from '../assets/logo.jpeg'; // Ajoutez votre logo
// // // // export default function AppSidebar() {
// // // //   const location = useLocation();

// // // //   const navItems = [
// // // //     { path: "/", name: "Accueil", icon: <FiHome size={18} /> },
// // // //     { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} /> },
// // // //     { path: "/DashboardSuivi", name: "Suivi Dossiers", icon: <FiList size={18} /> },
// // // //     { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} /> },
// // // //     { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} /> },
// // // //     { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} /> },
// // // //     { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} /> },
// // // //     { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} /> },
// // // //     { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} /> },
// // // //     { path: "/statistiques", name: "Statistiques", icon: <FiPieChart size={18} /> } , 
// // // //     { path: "/PageParametres", name: "PageParametres", icon: <FiSettings size={18}/> }
    
// // // //   ];

// // // //   return (
// // // //     <div className="sidebar">
// // // //       <div className="sidebar-header">
// // // //         <img src={logo} alt="Logo" className="sidebar-logo" />
// // // //         <h4>Suivi Dossiers</h4>
// // // //       </div>
      
// // // //       <Nav className="flex-column">
// // // //         {navItems.map((item) => (
// // // //           <Nav.Item key={item.path} className="sidebar-item">
// // // //             <Link
// // // //               to={item.path}
// // // //               className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
// // // //             >
// // // //               <span className="sidebar-icon">{item.icon}</span>
// // // //               <span className="sidebar-text">{item.name}</span>
// // // //             </Link>
// // // //           </Nav.Item>
// // // //         ))}
// // // //       </Nav>

// // // //       <div className="sidebar-footer">
// // // //         <Link to="/PageParamètres" className="sidebar-link">
// // // //           <span className="sidebar-icon"><FiSettings size={18} /></span>
// // // //           <span className="sidebar-text">Paramètres</span>
// // // //         </Link>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // import { Nav } from "react-bootstrap";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import { 
// // // //   FiHome, FiFilePlus, FiList, FiDollarSign,  FiUserX ,
// // // //   FiTrendingUp, FiCheckCircle, FiXCircle,
// // // //   FiCalendar, FiSearch, FiPieChart, FiSettings,
// // // //   FiChevronLeft, FiChevronRight
// // // // } from "react-icons/fi";
// // // // import logo from '../assets/logo.jpeg';

// // // // export default function AppSidebar({ isMobile, collapsed, toggleCollapse }) {
// // // //   const location = useLocation();

// // // //   const navItems = [
// // // //     { path: "/", name: "Accueil", icon: <FiHome size={18} /> },
// // // //     { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} /> },
// // // //     { path: "/DashboardSuivi", name: "Statistique", icon: <FiList size={18} /> },
// // // //     { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} /> },
// // // //     { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} /> },
// // // //     { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} /> },
// // // //     { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} /> },
// // // //     { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} /> },
// // // //     { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} /> },
// // // //     { path: "/statistiques", name: "Admin", icon: < FiUserX size={18} /> },
// // // //     { path: "/PageParametres", name: "Paramètres", icon: <FiSettings size={18}/> }
// // // //   ];

// // // //   return (
// // // //     <aside 
// // // //       className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
// // // //       style={{
// // // //         width: collapsed ? '80px' : '250px',
// // // //         transform: isMobile && !collapsed ? 'translateX(-100%)' : 'translateX(0)'
// // // //       }}
// // // //     >
// // // //       <div className="sidebar-header">
// // // //         {!collapsed && (
// // // //           <>
// // // //             <img src={logo} alt="Logo" className="sidebar-logo" />
// // // //             <h4>Suivi Dossiers</h4>
// // // //           </>
// // // //         )}
// // // //         {!isMobile && (
// // // //           <button 
// // // //             className="sidebar-toggle" 
// // // //             onClick={toggleCollapse}
// // // //             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
// // // //           >
// // // //             {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
// // // //           </button>
// // // //         )}
// // // //       </div>
      
// // // //       <Nav className="flex-column">
// // // //         {navItems.map((item) => (
// // // //           <Nav.Item key={item.path} className="sidebar-item">
// // // //             <Link
// // // //               to={item.path}
// // // //               className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
// // // //               title={collapsed ? item.name : ''}
// // // //             >
// // // //               <span className="sidebar-icon">{item.icon}</span>
// // // //               {!collapsed && <span className="sidebar-text">{item.name}</span>}
// // // //             </Link>
// // // //           </Nav.Item>
// // // //         ))}
// // // //       </Nav>

// // // //       {!collapsed && (
// // // //         <div className="sidebar-footer">
// // // //           <small className="text-muted">Version 1.0.0</small>
// // // //         </div>
// // // //       )}
// // // //     </aside>
// // // //   );
// // // // }

// // // import { useEffect, useState } from "react";
// // // import { Nav } from "react-bootstrap";
// // // import { Link, useLocation } from "react-router-dom";
// // // import axios from "axios";
// // // import {
// // //   FiHome, FiFilePlus, FiList, FiDollarSign, FiUserX,
// // //   FiTrendingUp, FiCheckCircle, FiXCircle,
// // //   FiCalendar, FiSearch, FiPieChart, FiSettings,
// // //   FiChevronLeft, FiChevronRight
// // // } from "react-icons/fi";
// // // import logo from '../assets/logo.jpeg';

// // // export default function AppSidebar({ isMobile, collapsed, toggleCollapse }) {
// // //   const location = useLocation();
// // //   const [role, setRole] = useState(null);

// // //   useEffect(() => {
// // //     axios.get("http://localhost:3000/api/user", { withCredentials: true })
// // //       .then(res => setRole(res.data.nom_role?.toLowerCase()))
// // //       .catch(err => console.error("Erreur récupération rôle:", err));
// // //   }, []);

// // //   const navItems = [
// // //     { path: "/", name: "Accueil", icon: <FiHome size={18} />, roles: ["secrétariat", "dépense", "comptabilité", "programmation", "paiement", "administrateur"] },
// // //     { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} />, roles: ["secrétariat"] },
// // //     { path: "/DashboardSuivi", name: "Statistique", icon: <FiList size={18} />, roles: ["administrateur"] },
// // //     { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} />, roles: ["dépense"] },
// // //     { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} />, roles: ["comptabilité"] },
// // //     { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} />, roles: ["programmation"] },
// // //     { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} />, roles: ["paiement"] },
// // //     { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} />, roles: ["dépense", "comptabilité"] },
// // //     { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} />, roles: ["administrateur", "secrétariat"] },
// // //     { path: "/statistiques", name: "Admin", icon: <FiUserX size={18} />, roles: ["administrateur"] },
// // //     { path: "/PageParametres", name: "Paramètres", icon: <FiSettings size={18} />, roles: ["administrateur"] }
// // //   ];

// // //   const filteredNavItems = navItems.filter(item =>
// // //     !role || item.roles.includes(role)
// // //   );

// // //   return (
// // //     <aside
// // //       className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
// // //       style={{
// // //         width: collapsed ? '80px' : '250px',
// // //         transform: isMobile && !collapsed ? 'translateX(-100%)' : 'translateX(0)'
// // //       }}
// // //     >
// // //       <div className="sidebar-header">
// // //         {!collapsed && (
// // //           <>
// // //             <img src={logo} alt="Logo" className="sidebar-logo" />
// // //             <h4>Suivi Dossiers</h4>
// // //           </>
// // //         )}
// // //         {!isMobile && (
// // //           <button
// // //             className="sidebar-toggle"
// // //             onClick={toggleCollapse}
// // //             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
// // //           >
// // //             {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
// // //           </button>
// // //         )}
// // //       </div>

// // //       <Nav className="flex-column">
// // //         {filteredNavItems.map((item) => (
// // //           <Nav.Item key={item.path} className="sidebar-item">
// // //             <Link
// // //               to={item.path}
// // //               className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
// // //               title={collapsed ? item.name : ''}
// // //             >
// // //               <span className="sidebar-icon">{item.icon}</span>
// // //               {!collapsed && <span className="sidebar-text">{item.name}</span>}
// // //             </Link>
// // //           </Nav.Item>
// // //         ))}
// // //       </Nav>

// // //       {!collapsed && (
// // //         <div className="sidebar-footer">
// // //           <small className="text-muted">Version 1.0.0</small>
// // //         </div>
// // //       )}
// // //     </aside>
// // //   );
// // // }


// // import { useEffect, useState } from "react";
// // import { Nav, Modal, Button, Form } from "react-bootstrap";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   FiHome, FiFilePlus, FiList, FiDollarSign, FiUserX,
// //   FiTrendingUp, FiCheckCircle, FiXCircle,
// //   FiCalendar, FiSearch, FiSettings,
// //   FiChevronLeft, FiChevronRight
// // } from "react-icons/fi";
// // import logo from '../assets/logo.jpeg';

// // export default function AppSidebar({ isMobile, collapsed, toggleCollapse }) {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [role, setRole] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [targetPath, setTargetPath] = useState("/");
// //   const [form, setForm] = useState({ nom : "", email: "" });

// //   const fetchUser = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3000/api/user", { withCredentials: true });
// //       setRole(res.data.nom_role?.toLowerCase());
// //     } catch {
// //       setRole(null);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUser();
// //   }, []);

// //   const navItems = [
// //     { path: "/", name: "Accueil", icon: <FiHome size={18} />, roles: ["secrétariat", "dépense", "comptabilité", "programmation", "paiement", "administrateur"] },
// //     { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} />, roles: ["secrétariat"] },
// //     { path: "/DashboardSuivi", name: "Statistique", icon: <FiList size={18} />, roles: ["administrateur"] },
// //     { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} />, roles: ["dépense"] },
// //     { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} />, roles: ["comptabilité"] },
// //     { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} />, roles: ["programmation"] },
// //     { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} />, roles: ["paiement"] },
// //     { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} />, roles: ["dépense", "comptabilité"] },
// //     { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} />, roles: ["administrateur", "secrétariat"] },
// //     { path: "/statistiques", name: "Admin", icon: <FiUserX size={18} />, roles: ["administrateur"] },
// //     { path: "/PageParametres", name: "Paramètres", icon: <FiSettings size={18}/> , roles: ["administrateur"] }
// //   ];

// //   const handleNavClick = (e, item) => {
// //     e.preventDefault();
// //     if (role && item.roles.includes(role)) {
// //       navigate(item.path);
// //     } else {
// //       setTargetPath(item.path);
// //       setShowModal(true);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     try {
// //       await axios.post("http://localhost:3000/api/user-check", form, { withCredentials: true });
// //       setShowModal(false);
// //       setForm({ nom: "", email: "" });
// //       fetchUser();
// //       navigate(targetPath);
// //     } catch (err) {
// //       alert("Erreur de connexion : " + (err.response?.data?.error || err.message));
// //     }
// //   };

// //   return (
// //     <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
// //       style={{ width: collapsed ? '80px' : '250px', transform: isMobile && !collapsed ? 'translateX(-100%)' : 'translateX(0)' }}>

// //       <div className="sidebar-header">
// //         {!collapsed && (
// //           <>
// //             <img src={logo} alt="Logo" className="sidebar-logo" />
// //             <h4>Suivi Dossiers</h4>
// //           </>
// //         )}
// //         {!isMobile && (
// //           <button className="sidebar-toggle" onClick={toggleCollapse}>
// //             {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
// //           </button>
// //         )}
// //       </div>

// //       <Nav className="flex-column">
// //         {navItems.map((item) => (
// //           <Nav.Item key={item.path} className="sidebar-item">
// //             <Link to={item.path} className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`} onClick={(e) => handleNavClick(e, item)}>
// //               <span className="sidebar-icon">{item.icon}</span>
// //               {!collapsed && <span className="sidebar-text">{item.name}</span>}
// //             </Link>
// //           </Nav.Item>
// //         ))}
// //       </Nav>

// //       {!collapsed && (
// //         <div className="sidebar-footer">
// //           <small className="text-muted">Version 1.0.0</small>
// //         </div>
// //       )}

// //       {/* Modal de connexion */}
// //       <Modal show={showModal} onHide={() => setShowModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Connexion requise</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Nom</Form.Label>
// //               <Form.Control type="text" name="Nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
// //             </Form.Group>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Email</Form.Label>
// //               <Form.Control type="email" name="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
// //             </Form.Group>
// //             <Button onClick={handleLogin}>Se connecter</Button>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>
// //     </aside>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { Nav, Modal, Button, Form } from "react-bootstrap";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FiHome, FiFilePlus, FiList, FiDollarSign, FiUserX,
//   FiTrendingUp, FiCheckCircle, FiXCircle,
//   FiCalendar, FiSearch, FiSettings,
//   FiChevronLeft, FiChevronRight
// } from "react-icons/fi";
// import logo from '../assets/logo.jpeg';

// export default function AppSidebar({ isMobile, collapsed, toggleCollapse }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [targetItem, setTargetItem] = useState(null);
//   const [form, setForm] = useState({ nom: "", email: "" });

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/user", { withCredentials: true });
//       setRole(res.data.nom_role?.toLowerCase());
//     } catch {
//       setRole(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const navItems = [
//     { path: "/", name: "Accueil", icon: <FiHome size={18} />, roles: ["secrétariat", "dépense", "comptabilité", "programmation", "paiement", "administrateur"] },
//     { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} />, roles: ["secrétariat" , "administrateur"] },
//     { path: "/DashboardSuivi", name: "Statistique", icon: <FiList size={18} />, roles: ["administrateur"] },
//     { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} />, roles: ["dépense" , "administrateur"] },
//     { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} />, roles: ["comptabilité" , "administrateur" ] },
//     { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} />, roles: ["programmation" , "administrateur"] },
//     { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} />, roles: ["paiement" , "administrateur"] },
//     { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} />, roles: ["dépense", "comptabilité" , "administrateur"] },
//     { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} />, roles: ["administrateur", "secrétariat" , "dépense", "comptabilité", "programmation", "paiement" ] },
//     { path: "/statistiques", name: "Admin", icon: <FiUserX size={18} />, roles: ["administrateur"] },
//     { path: "/PageParametres", name: "Paramètres", icon: <FiSettings size={18} />, roles: ["administrateur"] }
//   ];

//   const handleNavClick = (e, item) => {
//     e.preventDefault();
//     if (role && item.roles.includes(role)) {
//       navigate(item.path);
//     } else {
//       setTargetItem(item);
//       setShowModal(true);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/api/user-check", form, { withCredentials: true });
//       const userRole = res.data.nom_role?.toLowerCase();

//       if (!targetItem.roles.includes(userRole)) {
//         alert("Accès interdit : vous n'avez pas le droit d'accéder à cette section.");
//         return;
//       }

//       setRole(userRole);
//       setShowModal(false);
//       setForm({ nom: "", email: "" });
//       navigate(targetItem.path);
//     } catch (err) {
//       alert("Erreur de connexion : " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
//       style={{ width: collapsed ? '80px' : '250px', transform: isMobile && !collapsed ? 'translateX(-100%)' : 'translateX(0)' }}>
      
//       <div className="sidebar-header">
//         {!collapsed && (
//           <>
//             <img src={logo} alt="Logo" className="sidebar-logo" />
//             <h4>Suivi Dossiers</h4>
//           </>
//         )}
//         {!isMobile && (
//           <button className="sidebar-toggle" onClick={toggleCollapse}>
//             {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
//           </button>
//         )}
//       </div>

//       <Nav className="flex-column">
//         {navItems.map((item) => (
//           <Nav.Item key={item.path} className="sidebar-item">
//             <Link
//               to={item.path}
//               className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
//               onClick={(e) => handleNavClick(e, item)}
//             >
//               <span className="sidebar-icon">{item.icon}</span>
//               {!collapsed && <span className="sidebar-text">{item.name}</span>}
//             </Link>
//           </Nav.Item>
//         ))}
//       </Nav>

//       {!collapsed && (
//         <div className="sidebar-footer">
//           <small className="text-muted">Version 1.0.0</small>
//         </div>
//       )}

//       {/* Modal de connexion */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Connexion requise</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Nom</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={form.nom}
//                 onChange={(e) => setForm({ ...form, nom: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button onClick={handleLogin}>Se connecter</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </aside>
//   );
// }



import { useEffect, useState } from "react";
import { Nav, Modal, Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiHome, FiFilePlus, FiList, FiDollarSign, FiUserX,
  FiTrendingUp, FiCheckCircle, FiXCircle,
  FiCalendar, FiSearch, FiSettings,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import logo from '../assets/logo.jpeg';

// Configuration centralisée de l'URL API
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development' || 
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1") {
    return `http://${window.location.hostname}:3000`;
  }
  return `http://${window.location.hostname}:3000`; // Pour le réseau local
};

const API_BASE_URL = getApiBaseUrl();

export default function AppSidebar({ isMobile, collapsed, toggleCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [form, setForm] = useState({ nom: "", email: "" });
  const [apiError, setApiError] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user`, { 
        withCredentials: true,
        timeout: 5000
      });
      setRole(res.data.nom_role?.toLowerCase());
      setApiError(null);
    } catch (err) {
      console.error("Erreur fetchUser:", {
        url: `${API_BASE_URL}/api/user`,
        error: err.message,
        code: err.code
      });
      setRole(null);
      if (err.code === "ECONNABORTED") {
        setApiError("Le serveur ne répond pas - vérifiez votre connexion");
      } else {
   //     setApiError("Erreur de connexion au serveur");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const navItems = [
    { path: "/", name: "Accueil", icon: <FiHome size={18} />, roles: ["secrétariat", "dépense", "comptabilité", "programmation", "paiement", "administrateur"] },
    { path: "/creer", name: "Créer Dossier", icon: <FiFilePlus size={18} />, roles: ["secrétariat" , "administrateur"] },
    { path: "/DashboardSuivi", name: "Statistique", icon: <FiList size={18} />, roles: ["administrateur"] },
    { path: "/Depenses", name: "Dépenses", icon: <FiDollarSign size={18} />, roles: ["dépense" , "administrateur"] },
    { path: "/PageComptabilite", name: "Comptabilité", icon: <FiTrendingUp size={18} />, roles: ["comptabilité" , "administrateur" ] },
    { path: "/PageProgrammation", name: "Programmation", icon: <FiCalendar size={18} />, roles: ["programmation" , "administrateur"] },
    { path: "/PagePaiement", name: "Paiements", icon: <FiCheckCircle size={18} />, roles: ["paiement" , "administrateur"] },
    { path: "/DossiersRejetes", name: "Dossiers Rejetés", icon: <FiXCircle size={18} />, roles: ["dépense", "comptabilité" , "administrateur"] },
    { path: "/recherche", name: "Recherche", icon: <FiSearch size={18} />, roles: ["administrateur", "secrétariat" , "dépense", "comptabilité", "programmation", "paiement" ] },
    { path: "/statistiques", name: "Admin", icon: <FiUserX size={18} />, roles: ["administrateur"] },
    { path: "/PageParametres", name: "Paramètres", icon: <FiSettings size={18} />, roles: ["administrateur"] }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (role && item.roles.includes(role)) {
      navigate(item.path);
    } else {
      setTargetItem(item);
      setShowModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user-check`, form, { 
        withCredentials: true,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const userRole = res.data.nom_role?.toLowerCase();
      console.log("Rôle détecté:", userRole); // Debug

      if (!targetItem.roles.includes(userRole)) {
        alert(`Accès interdit : rôle ${userRole} non autorisé pour ${targetItem.name}`);
        return;
      }

      setRole(userRole);
      setShowModal(false);
      setForm({ nom: "", email: "" });
      navigate(targetItem.path);
    } catch (err) {
      console.error("Erreur de connexion:", {
        url: `${API_BASE_URL}/api/user-check`,
        error: err,
        message: err.message,
        code: err.code
      });
      
      let errorMessage = "Erreur de connexion";
      if (err.code === "ECONNABORTED") {
        errorMessage = "Timeout - le serveur ne répond pas";
      } else if (err.response?.status === 401) {
        errorMessage = "Identifiants incorrects";
      } else if (!err.response) {
        errorMessage = `Impossible de joindre le serveur à ${API_BASE_URL}`;
      }
      
      alert(`${errorMessage}: ${err.message}`);
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}
      style={{ width: collapsed ? '80px' : '250px', transform: isMobile && !collapsed ? 'translateX(-100%)' : 'translateX(0)' }}>
      
      <div className="sidebar-header">
        {!collapsed && (
          <>
            <img src={logo} alt="Logo" className="sidebar-logo" />
            <h4>Suivi Dossiers</h4>
          </>
        )}
        {!isMobile && (
          <button className="sidebar-toggle" onClick={toggleCollapse}>
            {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* {apiError && (
        <div className="alert alert-danger mx-2 my-3">
          <small>{apiError}</small>
          <div className="text-muted small">Serveur: {API_BASE_URL}</div>
        </div>
      )} */}

      <Nav className="flex-column">
        {navItems.map((item) => (
          <Nav.Item key={item.path} className="sidebar-item">
            <Link
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-text">{item.name}</span>}
            </Link>
          </Nav.Item>
        ))}
      </Nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <small className="text-muted">Version 1.0.0</small>
          <small className="text-muted d-block">API: {API_BASE_URL}</small>
        </div>
      )}

      {/* Modal de connexion */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion requise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>
            <div className="text-muted small mb-3">
              Serveur: {API_BASE_URL}
            </div>
            <Button onClick={handleLogin}>Se connecter</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </aside>
  );
}