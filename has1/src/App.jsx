// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/dashboard";
// import Chambres from "./components/chambres";
// import Reservations from "./components/reservation";
// import Menus from "./components/menus";
// import { setupWebSocket } from './api/websocket';
// import User from "./components/user" ;
// import  Homepage from "./components/Homepage";
// import RapportReservations from "./components/rapportreservation";
// import RapportVente from "./components/rapportvente"
// import CommandesRestaurant from "./components/CommandesRestaurant";
// import Clients from "./components/clients";
// import  Login from "./components/login";
// import Boissons from "./components/boisson";
// // Importer le fournisseur de cont
// import VenteBoissons from "./components/venteBoissons";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Route principale pour le tableau de bord */}
//         <Route path="/" element={<Dashboard />}>
//           {/* Routes imbriquées pour les composants */}
//           <Route path="chambres" element={<Chambres />} />
//           <Route path="Homepage" element={<Homepage />} />
//           <Route path="reservation" element={<Reservations />} />
//           <Route path="menus" element={<Menus />} />
//           <Route path="rapportreservation" element={<RapportReservations />} />
//           <Route path="user" element={<User />} />
//           <Route path="login" element={<Login />} />
//           <Route path="commandesRestaurant" element={<CommandesRestaurant />} />
//           <Route path="boisson" element={<Boissons />} />
//           <Route path="rapportvente" element={<RapportVente />} />
//           <Route path="clients" element={<Clients />} />
//           <Route path="venteBoissons" element={<VenteBoissons />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import ProductList from './components/Products/ProductList.jsx';
import ProductForm from './components/Products/ProductForm.jsx';
import SaleList from './components/Sales/SaleList.jsx';
import SaleForm from './components/Sales/SaleForm.jsx';
import DailyReport from './components/Reports/DailyReport.jsx';
import StockReport from './components/Reports/StockReport.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/sales" element={<SaleList />} />
                <Route path="/sales/new" element={<SaleForm />} />
                <Route path="/sales/:id" element={<SaleForm />} />
                <Route path="/reports/daily" element={<DailyReport />} />
                <Route path="/reports/stock" element={<StockReport />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;