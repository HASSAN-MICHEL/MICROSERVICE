import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxes, FaShoppingCart, FaChartLine, FaCog, FaUsers , Fasun } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  // Détermine si un lien est actif
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="bg-white text-blue-900 w-64 min-h-screen border-r border-gray-200 shadow-sm hidden md:block">
      <div className="p-4">
        <div className="flex items-center space-x-2 p-4 mb-6">
          <FaSun className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold">SunStore</span>
        </div>

        <nav className="mt-6">
          <div className="space-y-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                isActive('/') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
              }`}
            >
              <FaHome className="mr-3 text-lg" />
              Tableau de bord
            </Link>

            <Link
              to="/products"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                isActive('/products') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
              }`}
            >
              <FaBoxes className="mr-3 text-lg" />
              Gestion des produits
            </Link>

            <Link
              to="/sales"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                isActive('/sales') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
              }`}
            >
              <FaShoppingCart className="mr-3 text-lg" />
              Gestion des ventes
            </Link>

            <div className="pt-2">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rapports
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  to="/reports/daily"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                    isActive('/reports/daily') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
                  }`}
                >
                  <FaChartLine className="mr-3 text-lg" />
                  Rapport quotidien
                </Link>

                <Link
                  to="/reports/stock"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                    isActive('/reports/stock') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
                  }`}
                >
                  <FaBoxes className="mr-3 text-lg" />
                  Niveau de stock
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  to="/settings"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                    isActive('/settings') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
                  }`}
                >
                  <FaCog className="mr-3 text-lg" />
                  Paramètres
                </Link>

                <Link
                  to="/users"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 ${
                    isActive('/users') ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
                  }`}
                >
                  <FaUsers className="mr-3 text-lg" />
                  Utilisateurs
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Pied de page de la sidebar */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">HS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Hassan</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;