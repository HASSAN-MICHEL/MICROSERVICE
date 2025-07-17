// import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import {
//   FaHome, FaBoxes, FaShoppingCart, FaChartLine,
//   FaCog, FaUsers, FaSignOutAlt, FaTimes
// } from 'react-icons/fa';
// import { Sun, ChartBarIncreasing } from 'lucide-react';
// import { useEffect } from 'react';

// const Sidebar = ({ collapsed, toggleCollapse, isSidebarOpen }) => {
//   const location = useLocation();

//   useEffect(() => {
//     if (window.innerWidth < 1024) {
//       toggleCollapse(false); // Auto-close on route change (mobile only)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   const isActive = (path) => {
//     if (path === '/') return location.pathname === '/';
//     return location.pathname.startsWith(path);
//   };

//   const sidebarVisibilityClasses = `
//     fixed top-0 left-0 z-50 h-full overflow-y-auto
//     bg-primary text-white flex flex-col p-2 pt-3
//     transform transition-transform duration-300 ease-in-out
//     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//     lg:translate-x-0 lg:static
//     ${collapsed ? 'w-[80px]' : 'w-[300px]'}
//   `;

//   return (
//     <>
//       {/* Mobile Backdrop */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-0 lg:hidden"
//           onClick={() => toggleCollapse(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={sidebarVisibilityClasses}>
//         {/* Header */}
//         <div className="relative flex items-center justify-between mb-4 p-2 gap-2">
//           {!collapsed ? (
//             <div className="flex items-center">
//               <Sun className="text-yellow-400 mr-2" />
//               <span className="text-lg text-yellow-400 font-bold">Drink Manage</span>
//             </div>
//           ) : (
//             <Sun className="text-yellow-400 mx-auto" />
//           )}

//           {/* Mobile-only close button */}
//           <div className="flex justify-end lg:hidden">
//             <button
//               className="text-white text-xl hover:text-yellow-400 p-2"
//               onClick={() => toggleCollapse(false)}
//             >
//               <FaTimes />
//             </button>
//           </div>

//           {/* Collapse Toggle (Desktop only) */}
//           <button
//             className="text-white text-lg hover:text-yellow-400 transition-all duration-300 hidden lg:block"
//             onClick={toggleCollapse}
//           >
//             <ChartBarIncreasing
//               className={`transition-transform duration-500 ${collapsed ? 'rotate-180' : ''}`}
//             />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto">
//           <ul className={`space-y-2 flex flex-col ${collapsed ? 'items-center' : 'items-start'} w-full`}>
//             <NavItem to="/" icon={<FaHome />} label="Tableau de bord" active={isActive('/')} collapsed={collapsed} />
//             <NavItem to="/products" icon={<FaBoxes />} label="Gestion des produits" active={isActive('/products')} collapsed={collapsed} />
//             <NavItem to="/sales" icon={<FaShoppingCart />} label="Gestion des ventes" active={isActive('/sales')} collapsed={collapsed} />

// <<<<<<< HEAD
//             {/* Section Rapports */}
//             {!collapsed && (
//               <li className="my-3">
//                 <small className="text-white-50 fw-bold">RAPPORTS</small>
//               </li>
              
//             )}
            
     
//             <NavItem 
//               to="/reports/daily" 
//               icon={<FaChartLine />} 
//               label="Rapport quotidien" 
//               active={isActive('/reports/daily')} 
//               collapsed={collapsed}
//             />

            
//             <NavItem 
//               to="/reports/stock" 
//               icon={<FaBoxes />} 
//               label="Niveau de stock" 
//               active={isActive('/reports/stock')} 
//               collapsed={collapsed}
//             />
// =======
//             {!collapsed && <li className="text-sm text-white/50 font-bold mt-4 ml-3">RAPPORTS</li>}
//             <NavItem to="/reports/daily" icon={<FaChartLine />} label="Rapport quotidien" active={isActive('/reports/daily')} collapsed={collapsed} />
//             <NavItem to="/reports/stock" icon={<FaBoxes />} label="Niveau de stock" active={isActive('/reports/stock')} collapsed={collapsed} />
// >>>>>>> 67ab220e62c810e6afeb3710f72de8c0078c873e

//             {!collapsed && <li className="text-sm text-white/50 font-bold mt-4 ml-3">ADMINISTRATION</li>}
//             <NavItem to="/settings" icon={<FaCog />} label="Paramètres" active={isActive('/settings')} collapsed={collapsed} />
//             <NavItem to="/users" icon={<FaUsers />} label="Utilisateurs" active={isActive('/users')} collapsed={collapsed} />
//           </ul>
//         </nav>

//         {/* Profile Section */}
//         <div className="border-t pt-3 mt-auto">
//           <div className="flex items-center justify-between px-2">
//             <div className={`w-12 h-10 bg-info text-white rounded-full flex items-center justify-center ${collapsed ? 'mx-auto' : 'ml-2'}`}>
//               DB
//             </div>
//             {!collapsed && (
//               <div className="flex items-center justify-between gap-3 w-full px-2">
//                 <div>
//                   <p className="font-bold mb-0">Débit Boissons</p>
//                   <p className="text-sm text-white/70 mb-0">Administrateur</p>
//                 </div>
//                 <button className="text-white hover:text-orange-400">
//                   <FaSignOutAlt />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const NavItem = ({ to, icon, label, active, collapsed }) => (
//   <li className="w-full">
//     <Link
//       to={to}
//       className={`flex items-center no-underline px-3 py-2 rounded hover:bg-white/20 transition-all duration-300 w-full ${
//         active ? 'bg-white text-primary font-bold' : 'text-white'
//       }`}
//     >
//       <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</span>
//       {!collapsed && <span className="whitespace-nowrap">{label}</span>}
//     </Link>
//   </li>
// );

// Sidebar.propTypes = {
//   collapsed: PropTypes.bool.isRequired,
//   toggleCollapse: PropTypes.func.isRequired,
//   isSidebarOpen: PropTypes.bool.isRequired,
// };

// NavItem.propTypes = {
//   to: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   label: PropTypes.string.isRequired,
//   active: PropTypes.bool.isRequired,
//   collapsed: PropTypes.bool.isRequired,
// };

// export default Sidebar;


import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaHome, FaBoxes, FaShoppingCart, FaChartLine,
  FaCog, FaUsers, FaSignOutAlt, FaTimes
} from 'react-icons/fa';
import { Sun, ChartBarIncreasing } from 'lucide-react';
import { useEffect } from 'react';

const Sidebar = ({ collapsed, toggleCollapse, isSidebarOpen }) => {
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      toggleCollapse(false); // Auto-close on route change (mobile only)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

    // className={`bg-primary text-white d-flex flex-column flex-shrink-0 p-3 sidebar ${collapsed ? 'collapsed' : ''} ${mobileShow ? 'show' : ''}`}
    //     style={{height: ''}}
  const sidebarVisibilityClasses = `
    d-flex flex-column flex-shrink   bg-primary text-white 
    transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static
    ${collapsed ?  'collapse': ''}
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="flex justify-center inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-0 lg:hidden"
          onClick={() => toggleCollapse(false)}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarVisibilityClasses}>
        {/* Header */}
        <div className=" flex items-center justify-between mb-4 p-2 gap-2">
          {!collapsed ? (
            <div className="flex items-center">
              <Sun className="text-yellow-400 mr-2" />
              <span className="text-lg text-yellow-400 font-bold">Drink Manage</span>
            </div>
          ) : (
            <Sun className="text-yellow-400 mx-auto" />
          )}

          {/* Mobile-only close button */}
          <div className="flex justify-end lg:hidden">
            <button
              className="text-white text-xl hover:text-yellow-400 p-2"
              onClick={() => toggleCollapse(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Collapse Toggle (Desktop only) */}
          <button
            className="text-white text-lg hover:text-yellow-400 transition-all duration-300 hidden lg:block"
            onClick={toggleCollapse}
          >
            <ChartBarIncreasing
              className={`transition-transform duration-500 ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className={`space-y-2 flex flex-col ${collapsed ? 'items-center' : 'items-start'} w-full`}>
            <NavItem to="/" icon={<FaHome />} label="Tableau de bord" active={isActive('/')} collapsed={collapsed} />
            <NavItem to="/products" icon={<FaBoxes />} label="Gestion des produits" active={isActive('/products')} collapsed={collapsed} />
            <NavItem to="/sales" icon={<FaShoppingCart />} label="Gestion des ventes" active={isActive('/sales')} collapsed={collapsed} />

            {!collapsed && <li className="text-sm text-white/50 font-bold mt-4 ml-3">RAPPORTS</li>}
            <NavItem to="/reports/daily" icon={<FaChartLine />} label="Rapport quotidien" active={isActive('/reports/daily')} collapsed={collapsed} />
            <NavItem to="/reports/stock" icon={<FaBoxes />} label="Niveau de stock" active={isActive('/reports/stock')} collapsed={collapsed} />

            {!collapsed && <li className="text-sm text-white/50 font-bold mt-4 ml-3">ADMINISTRATION</li>}
            <NavItem to="/settings" icon={<FaCog />} label="Paramètres" active={isActive('/settings')} collapsed={collapsed} />
            <NavItem to="/users" icon={<FaUsers />} label="Utilisateurs" active={isActive('/users')} collapsed={collapsed} />
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="border-t pt-3 mt-auto">
          <div className="flex items-center justify-between px-2">
            <div className={`w-12 h-10 bg-info text-white rounded-full flex items-center justify-center ${collapsed ? 'mx-auto' : 'ml-2'}`}>
              DB
            </div>
            {!collapsed && (
              <div className="flex items-center justify-between gap-3 w-full px-2">
                <div>
                  <p className="font-bold mb-0">Débit Boissons</p>
                  <p className="text-sm text-white/70 mb-0">Administrateur</p>
                </div>
                <button className="text-white hover:text-orange-400">
                  <FaSignOutAlt />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, active, collapsed }) => (
  <li className="w-full">
    <Link
      to={to}
      className={`flex items-center no-underline px-3 py-2 rounded hover:bg-white/20 transition-all duration-300 w-full ${
        active ? 'bg-white text-primary font-bold' : 'text-white'
      }`}
    >
      <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</span>
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  </li>
);

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;