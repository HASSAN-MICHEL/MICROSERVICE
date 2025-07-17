

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react"; // Ajout pour gérer le responsive
import { Container } from "react-bootstrap";
import AppSidebar from "./components/Navbar";
import Depenses from "./pages/Depenses";
import { ThemeProvider } from './context/Themecontext';
import PagePaiement from "./pages/PagePaiement";
import DashboardSuivi from "./pages/DashboardSuivi";
import PageProgrammation from "./pages/PageProgrammation";
import DossiersRejetes from './pages/DossiersRejetes';
import CreationDossier from "./pages/CreationDossier";
import LoginModal from "./components/LoginModal";
import ListeDossiers from "./pages/listeDossier";
import PageParametres from "./pages/PageParametres";
import RechercheDossier from "./pages/RechercheDossier";
import  AdminUtilisateurs from "./pages/statistiques";
import PageComptabilite from './pages/PageComptabilite';
import './App.css'; // Fichier CSS supplémentaire pour les styles personnalisés


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setSidebarCollapsed(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <AppSidebar 
            isMobile={isMobile} 
            collapsed={sidebarCollapsed}
            toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="main-content">
            {isMobile && (
              <button 
                className="sidebar-toggle-btn"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                ☰
              </button>
            )}

          <Routes>
            <Route path="/" element={<ListeDossiers />} />
            <Route path="/creer" element={<CreationDossier />} />
            <Route path="/liste" element={<ListeDossiers />} />
            <Route path="/Depenses" element={<Depenses />} />
            <Route path="/PageProgrammation" element={<PageProgrammation />} />
            <Route path="/PageParametres" element={<PageParametres />} />
            <Route path="/PageComptabilite" element={<PageComptabilite />} />
            <Route path="/DossiersRejetes" element={<DossiersRejetes />} />
            <Route path="/recherche" element={<RechercheDossier />} />
            <Route path="/PagePaiement" element={<PagePaiement />} />
            <Route path="/login" element={<LoginModal expectedRole="secretaire" />} />
            <Route path="/statistiques" element={< AdminUtilisateurs />} />
            <Route path="/DashboardSuivi" element={<DashboardSuivi />} />
          </Routes>
          </main>
         </div>
       </Router>
      </ThemeProvider>

  );
}

export default App;