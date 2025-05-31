import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaShoppingCart, 
  FaChartLine, FaBoxes, FaHome, FaSun,
  FaBell, FaSearch, FaUserCircle
} from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Bouton sidebar et logo */}
        <button 
          className="navbar-toggler me-2 d-lg-none" 
          type="button" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <button 
          className="navbar-toggler me-2 d-none d-lg-block" 
          type="button"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FaSun className="text-warning me-2" />
          <span>Drink Manage</span>
        </Link>

        {/* Barre de recherche */}
        
        {/* Menu principal */}
        <div className="collapse navbar-collapse">
         

          {/* Menu utilisateur */}
          <div className="d-flex align-items-center ms-auto">
            <button 
              className="btn btn-link text-white d-lg-none" 
              onClick={toggleSearch}
            >
              <FaSearch />
            </button>
            
            <button className="btn btn-link text-white position-relative me-3">
              <FaBell />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            
            <div className="dropdown">
              <button 
                className="btn btn-link text-white dropdown-toggle d-flex align-items-center" 
                data-bs-toggle="dropdown"
              >
                <div className="rounded-circle bg-info d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                  <span className="fw-bold text-white small">DB</span>
                </div>
                <span className="d-none d-lg-inline">Debit Boissons</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profil</Link></li>
                <li><Link className="dropdown-item" to="/settings">Paramètres</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/logout">Déconnexion</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`collapse navbar-collapse bg-primary mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <MobileNavLink to="/" icon={<FaHome />} label="Accueil" toggle={toggleMobileMenu} />
          <MobileNavLink to="/products" icon={<FaBoxes />} label="Produits" toggle={toggleMobileMenu} />
          <MobileNavLink to="/sales" icon={<FaShoppingCart />} label="Ventes" toggle={toggleMobileMenu} />
          <MobileNavLink to="/reports/daily" icon={<FaChartLine />} label="Rapports" toggle={toggleMobileMenu} />
        </ul>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <li className="nav-item">
    <Link to={to} className="nav-link d-flex align-items-center">
      <span className="me-1">{icon}</span>
      <span>{label}</span>
    </Link>
  </li>
);

const MobileNavLink = ({ to, icon, label, toggle }) => (
  <li className="nav-item">
    <Link 
      to={to} 
      className="nav-link d-flex align-items-center py-3"
      onClick={toggle}
    >
      <span className="me-3 fs-5">{icon}</span>
      <span className="fs-5">{label}</span>
    </Link>
  </li>
);

export default Navbar;