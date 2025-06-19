import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

export default function DossiersRejetes() {
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
    const fetchRejetes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dossiers/rejetes");
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des dossiers rejetés :", err);
      }
    };
    fetchRejetes();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Dossiers Rejetés</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Propriétaire</th>
            <th>Étape de rejet</th>
            <th>Commentaire</th>
            <th>Fichier</th>
          </tr>
        </thead>
        <tbody>
          {dossiers.map((d) => (
            <tr key={d.id_dossier}>
              <td>{d.nom_dossier}</td>
              <td>{d.nom_proprietaire}</td>
              <td>{d.etape_actuelle}</td>
              <td>{d.commentaire_rejet || "Non précisé"}</td>
              <td>
                {d.fichier_url ? (
                  <a
                    href={`http://localhost:3000/${d.fichier_url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 Voir fichier
                  </a>
                ) : "Aucun"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
