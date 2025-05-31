import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importer Bootstrap
import Dashboard from "./components/dashboard"; // Vérifiez la casse et le chemin du fichier
import Chambres from "./components/chambres"; // Vérifiez la casse et le chemin du fichier
import Reservations from "./components/reservations"; // Vérifiez la casse et le chemin du fichier
import Menus from "./components/menus"; // Vérifiez la casse et le chemin du fichier
import Rapports from "./components/rapports"; // Vérifiez la casse et le chemin du fichier
import Bar from "./components/bar"; // Vérifiez la casse et le chemin du fichier

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          {/* Route par défaut pour la page Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/chambres" element={<Chambres />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/rapports" element={<Rapports />} />
          <Route path="/bar" element={<Bar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



import Dashboard from "./components/dashboard";
import Chambres from "./components/chambres";
import Reservations from "./components/reservation";
import Menus from "./components/menus";
import { setupWebSocket } from './api/websocket';
import User from "./components/user" ;
import  Homepage from "./components/Homepage";
import RapportReservations from "./components/rapportreservation";
import RapportVente from "./components/rapportvente"
import CommandesRestaurant from "./components/CommandesRestaurant";
import Clients from "./components/clients";
import  Login from "./components/login";
import Boissons from "./components/boisson";
// Importer le fournisseur de cont
import VenteBoissons from "./components/venteBoissons";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route principale pour le tableau de bord */}
        <Route path="/" element={<Dashboard />}>
          {/* Routes imbriquées pour les composants */}
          <Route path="chambres" element={<Chambres />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="reservation" element={<Reservations />} />
          <Route path="menus" element={<Menus />} />
          <Route path="rapportreservation" element={<RapportReservations />} />
          <Route path="user" element={<User />} />
          <Route path="login" element={<Login />} />
          <Route path="commandesRestaurant" element={<CommandesRestaurant />} />
          <Route path="boisson" element={<Boissons />} />
          <Route path="rapportvente" element={<RapportVente />} />
          <Route path="clients" element={<Clients />} />
          <Route path="venteBoissons" element={<VenteBoissons />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


