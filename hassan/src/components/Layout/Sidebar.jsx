import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBoxes, FaShoppingCart, FaChartLine, 
  FaCog, FaUsers, FaSun, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileShow, setMobileShow] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobileShow(!mobileShow);
  };

  return (
    <>
      {/* Bouton mobile */}
      <button 
        className="d-md-none btn btn-primary position-fixed"
        style={{
          zIndex: 1100,
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%'
        }}
        onClick={toggleMobile}
      >
        {mobileShow ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-primary text-white d-flex flex-column flex-shrink-0 p-3 sidebar ${collapsed ? 'collapsed' : ''} ${mobileShow ? 'show' : ''}`}
        style={{height: ''}}
      >
        {/* Logo et bouton de collapse */}
        <div className="d-flex align-items-center justify-content-between mb-4 p-2">
          {!collapsed && (
            <div className="d-flex align-items-center">
              <FaSun className="fs-3 me-2 text-warning" />
              <span className="fs-4 fw-bold">Drink Manage</span>
            </div>
          )}
          {collapsed && <FaSun className="fs-3 text-warning mx-auto" />}
          <button 
            className="btn btn-link text-white d-none d-md-block p-0"
            onClick={toggleCollapse}
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 overflow-auto">
          <ul className="nav nav-pills flex-column mb-auto">
            <NavItem 
              to="/" 
              icon={<FaHome />} 
              label="Tableau de bord" 
              active={isActive('/')} 
              collapsed={collapsed}
            />
            
            <NavItem 
              to="/products" 
              icon={<FaBoxes />} 
              label="Gestion des produits" 
              active={isActive('/products')} 
              collapsed={collapsed}
            />
            
            <NavItem 
              to="/sales" 
              icon={<FaShoppingCart />} 
              label="Gestion des ventes" 
              active={isActive('/sales')} 
              collapsed={collapsed}
            />

            {/* Section Rapports */}
            {!collapsed && (
              <li className="my-3">
                <small className="text-white-50 fw-bold">RAPPORTS</small>
              </li>
            )}
            
            <NavItem 
              to="/reports/daily" 
              icon={<FaChartLine />} 
              label="Rapport quotidien" 
              active={isActive('/reports/daily')} 
              collapsed={collapsed}
            />
            
            <NavItem 
              to="/reports/stock" 
              icon={<FaBoxes />} 
              label="Niveau de stock" 
              active={isActive('/reports/stock')} 
              collapsed={collapsed}
            />

            {/* Section Admin */}
            {!collapsed && (
              <li className="my-3">
                <small className="text-white-50 fw-bold">ADMINISTRATION</small>
              </li>
            )}
            
            <NavItem 
              to="/settings" 
              icon={<FaCog />} 
              label="Paramètres" 
              active={isActive('/settings')} 
              collapsed={collapsed}
            />
            
            <NavItem 
              to="/users" 
              icon={<FaUsers />} 
              label="Utilisateurs" 
              active={isActive('/users')} 
              collapsed={collapsed}
            />
          </ul>
        </nav>

        {/* Profil utilisateur */}
        <div className="border-top pt-3 mt-auto">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-info d-flex align-items-center justify-content-center" 
              style={{width: collapsed ? '40px' : '40px', height: '40px'}}>
              <span className="fw-bold text-white">DB</span>
            </div>
            {!collapsed && (
              <div className="ms-3">
                <p className="mb-0 fw-bold text-white">Debit Boissons</p>
                <p className="mb-0 small text-white-50">Administrateur</p>
              </div>
            )}
            {!collapsed && (
              <button className="btn btn-link text-white ms-auto p-0">
                <FaSignOutAlt />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, active, collapsed }) => (
  <li className="nav-item mb-2">
    <Link
      to={to}
      className={`nav-link d-flex align-items-center ${active ? 'bg-white text-primary' : 'text-white hover-bg-dark'}`}
      title={collapsed ? label : ''}
    >
      <span className="me-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  </li>
);

export default Sidebar;