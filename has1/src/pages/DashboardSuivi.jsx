// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Table } from "react-bootstrap";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from "recharts";

// export default function DashboardSuivi() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchStatistiques = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/dossiers/statistiques/etapes");
//         setData(res.data);
//       } catch (err) {
//         console.error("Erreur statistiques :", err);
//       }
//     };
//     fetchStatistiques();
//   }, []);

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">📊 Dashboard de Suivi des Dossiers</h3>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="etape_actuelle" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Bar dataKey="total" fill="#0d6efd" />
//         </BarChart>
//       </ResponsiveContainer>

//       <Table striped bordered className="mt-5">
//         <thead>
//           <tr>
//             <th>Étape</th>
//             <th>Nombre de dossiers</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d, i) => (
//             <tr key={i}>
//               <td>{d.etape_actuelle || "Non définie"}</td>
//               <td>{d.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Détection dynamique de l'URL de base
const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function DashboardSuivi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatistiques = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dossiers/statistiques/etapes`);
        setData(res.data);
      } catch (err) {
        console.error("Erreur statistiques :", err);
      }
    };
    fetchStatistiques();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">📊 Dashboard de Suivi des Dossiers</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="etape_actuelle" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>

      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>Étape</th>
            <th>Nombre de dossiers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.etape_actuelle || "Non définie"}</td>
              <td>{d.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
