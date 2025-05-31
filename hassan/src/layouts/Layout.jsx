import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Entête commune */}
      <header>Mon Header</header>
      
      {/* Contenu des pages */}
      <main>
        <Outlet />
      </main>
      
      {/* Pied de page commun */}
      <footer>Mon Footer</footer>
    </div>
  );
};

export default Layout;