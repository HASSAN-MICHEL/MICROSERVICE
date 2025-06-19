// // // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // // import Dashboard from "./components/dashboard";
// // // import Chambres from "./components/chambres";
// // // import Reservations from "./components/reservation";
// // // import Menus from "./components/menus";
// // // import { setupWebSocket } from './api/websocket';
// // // import User from "./components/user" ;
// // // import  Homepage from "./components/Homepage";
// // // import RapportReservations from "./components/rapportreservation";
// // // import RapportVente from "./components/rapportvente"
// // // import CommandesRestaurant from "./components/CommandesRestaurant";
// // // import Clients from "./components/clients";
// // // import  Login from "./components/login";
// // // import Boissons from "./components/boisson";
// // // // Importer le fournisseur de cont
// // // import VenteBoissons from "./components/venteBoissons";
// // // import "bootstrap/dist/css/bootstrap.min.css";

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         {/* Route principale pour le tableau de bord */}
// // //         <Route path="/" element={<Dashboard />}>
// // //           {/* Routes imbriquées pour les composants */}
// // //           <Route path="chambres" element={<Chambres />} />
// // //           <Route path="Homepage" element={<Homepage />} />
// // //           <Route path="reservation" element={<Reservations />} />
// // //           <Route path="menus" element={<Menus />} />
// // //           <Route path="rapportreservation" element={<RapportReservations />} />
// // //           <Route path="user" element={<User />} />
// // //           <Route path="login" element={<Login />} />
// // //           <Route path="commandesRestaurant" element={<CommandesRestaurant />} />
// // //           <Route path="boisson" element={<Boissons />} />
// // //           <Route path="rapportvente" element={<RapportVente />} />
// // //           <Route path="clients" element={<Clients />} />
// // //           <Route path="venteBoissons" element={<VenteBoissons />} />
// // //         </Route>
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;




// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AppProvider } from './context/AppContext.jsx';
// // import Navbar from './components/Layout/Navbar.jsx';
// // import Sidebar from './components/Layout/Sidebar.jsx';
// // import ProductList from './components/Products/ProductList.jsx';
// // import ProductForm from './components/Products/ProductForm.jsx';
// // import SaleList from './components/Sales/SaleList.jsx';
// // import  SecretairePage from './components/secretariat.jsx';
// // import SaleForm from './components/Sales/SaleForm.jsx';
// // import DailyReport from './components/Reports/DailyReport.jsx';
// // import StockReport from './components/Reports/StockReport.jsx';

// // function App() {
// //   return (
// //     <AppProvider>
// //       <Router>
// //         <div className="app">
// //           <Navbar />
// //           <div className="main-content">
// //             <Sidebar />
// //             <div className="content">
// //               <Routes>
// //                 <Route path="/secretariat" element={< SecretairePage/>} />
// //                 <Route path="/products/new" element={<ProductForm />} />
// //                 <Route path="/products/:id/edit" element={<ProductForm />} />
// //                 <Route path="/sales" element={<SaleList />} />
// //                 <Route path="/sales/new" element={<SaleForm />} />
// //                 <Route path="/sales/:id" element={<SaleForm />} />
// //                 <Route path="/reports/daily" element={<DailyReport />} />
// //                 <Route path="/reports/stock" element={<StockReport />} />
// //               </Routes>
// //             </div>
// //           </div>
// //         </div>
// //       </Router>
// //     </AppProvider>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CreationDossier from "./pages/CreationDossier";
// import RechercheDossier from "./pages/RechercheDossier";
// //import "bootstrap/dist/css/bootstrap.min.css"; 
// import Statistiques from "./pages/statistiques";
// import Navigation from "./components/Navbar";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<CreationDossier />} />
//         <Route path="/recherche" element={<RechercheDossier />} />
//         <Route path="/statistiques" element={<Statistiques />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Depenses from "./pages/Depenses"
import PagePaiement from "./pages/PagePaiement";
import DashboardSuivi from "./pages/DashboardSuivi";
import PageProgrammation from "./pages/PageProgrammation";
import DossiersRejetes from './pages/DossiersRejetes'
import CreationDossier from "./pages/CreationDossier";
import ListeDossiers from "./pages/listeDossier";
import RechercheDossier from "./pages/RechercheDossier";
import Statistiques from "./pages/statistiques";
import PageComptabilite from './pages/PageComptabilite';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<ListeDossiers />} />
        <Route path="/creer" element={<CreationDossier />} />
        <Route path="/liste" element={<ListeDossiers />} />
         <Route path="/Depenses" element={< Depenses/>} />
        <Route path="/PageProgrammation" element={< PageProgrammation/>} />
          <Route path="/PageComptabilite" element={< PageComptabilite/>} />
        <Route path="/DossiersRejetes" element={< DossiersRejetes/>} />
        <Route path="/recherche" element={<RechercheDossier />} />
        <Route path="/PagePaiement" element={<PagePaiement />} />
        {/* Route pour les statistiques */}
        <Route path="/statistiques" element={<Statistiques />} />
        {/* Route pour la page de suivi */}
        <Route path="/DashboardSuivi" element={<DashboardSuivi />} />
      </Routes>
    </Router>
  );
}

export default App;
