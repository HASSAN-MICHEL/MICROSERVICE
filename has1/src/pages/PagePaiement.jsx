import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form } from "react-bootstrap";

export default function PagePaiement() {
  const [dossiers, setDossiers] = useState([]);
  const [commentaires, setCommentaires] = useState({});

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dossiers/a-payer");
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur chargement dossiers paiement :", err);
      }
    };
    fetchDossiers();
  }, []);

  const handleChangeComment = (id, value) => {
    setCommentaires({ ...commentaires, [id]: value });
  };

  const confirmerPaiement = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/confirmer`);
      alert("Dossier confirmé ✅");
      setDossiers(dossiers.filter((d) => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors de la confirmation");
    }
  };

  const rejeter = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
        commentaire_rejet: commentaires[id] || "Non précisé",
      });
      alert("Dossier rejeté ❌");
      setDossiers(dossiers.filter((d) => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors du rejet");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Validation finale - Paiement</h3>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Propriétaire</th>
            <th>Fichier</th>
            <th>Commentaire (rejet)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dossiers.map((d) => (
            <tr key={d.id_dossier}>
              <td>{d.nom_dossier}</td>
              <td>{d.nom_proprietaire}</td>
              <td>
                {d.fichier_url ? (
                  <a href={`http://localhost:3000/${d.fichier_url}`} target="_blank" rel="noreferrer">
                    📎 Voir fichier
                  </a>
                ) : "Aucun"}
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Commentaire si rejet"
                  onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
                />
              </td>
              <td>
                <Button variant="success" size="sm" onClick={() => confirmerPaiement(d.id_dossier)}>
                  ✅ Confirmer
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => rejeter(d.id_dossier)}>
                  ❌ Rejeter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
