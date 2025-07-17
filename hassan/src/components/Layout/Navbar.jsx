import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  // Define page titles based on routes
  const pageTitles = {
    "/": "Accueil",
    "/products": "Produits",
    "/sales": "Ventes",
    "/reports/daily": "Rapports",
    "/reports/stock": "Stock",
    "/profile": "Profil",
    "/settings": "Paramètres",
    "/users" : "Users" , 
  };

  const activePageTitle = pageTitles[location.pathname] || "Hotel App";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary !pl-4 rounded-sm absolute shadow-md w-full z-2">
      <div className="container-fluid">
        {/* Sidebar toggle button for mobile */}
      <button className="navbar-toggler me-2 d-lg-none" type="button" onClick={toggleSidebar}>
        <FaBars />
      </button>

        {/* Active Page Title */}
        <span className="navbar-brand pl-3 text-white fw-bold">{activePageTitle}</span>

        {/* Search and Notifications */}
        <div className="d-flex flex-row-reverse align-items-center ms-auto gap-4">
          {/* Search Input */}
          <div className="flex bg-gray-200 rounded-sm overflow-hidden">
            <input
              type="search"
              placeholder="Hotel app..."
              className="px-2 py-1 outline-0 placeholder-gray-400 border-0 bg-gray-200"
            />
            <button
              className="btn btn-link bg-secondary text-white rounded-0"
              onClick={toggleSearch}
            >
              <FaSearch />
            </button>
          </div>

          {/* Notification Icon */}
          <button className="btn btn-link text-white position-relative me-3">
            <FaBell />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Navbar;
