import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaChartLine, FaBoxes, FaHome, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo et nom de l'application */}
          <div className="flex-shrink-0 flex items-center">
            <FaSun className="h-8 w-8 text-yellow-300" />
            <span className="ml-2 text-xl font-bold">SunStore</span>
          </div>

          {/* Menu principal - version desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FaHome className="mr-1" /> Accueil
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FaBoxes className="mr-1" /> Produits
            </Link>
            <Link
              to="/sales"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FaShoppingCart className="mr-1" /> Ventes
            </Link>
            <Link
              to="/reports/daily"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FaChartLine className="mr-1" /> Rapports
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={toggleMobileMenu}
            >
              <FaHome className="mr-2" /> Accueil
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={toggleMobileMenu}
            >
              <FaBoxes className="mr-2" /> Produits
            </Link>
            <Link
              to="/sales"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={toggleMobileMenu}
            >
              <FaShoppingCart className="mr-2" /> Ventes
            </Link>
            <Link
              to="/reports/daily"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={toggleMobileMenu}
            >
              <FaChartLine className="mr-2" /> Rapports
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;