import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

export default function Statistiques() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/dossiers/statistiques/etapes")
      .then(res => setData(res.data));
  }, []);

  return (
    <Container>
      <h3>Statistiques par étape</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Étape</th>
            <th>Nombre de dossiers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.etape_actuelle}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
