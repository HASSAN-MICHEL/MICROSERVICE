import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form } from "react-bootstrap";

export default function PageProgrammation() {
  const [dossiers, setDossiers] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [criteres, setCriteres] = useState({});

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dossiers/programmation");
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur chargement dossiers :", err);
      }
    };
    fetchDossiers();
  }, []);

  const handleCritere = (id, champ) => {
    setCriteres((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [champ]: !prev[id]?.[champ],
      },
    }));
  };

  const estValide = (id) => {
    const c = criteres[id] || {};
    return c.critere1 && c.critere2;
  };

  const handleChangeComment = (id, value) => {
    setCommentaires({ ...commentaires, [id]: value });
  };

  const envoyerPaiement = async (id) => {
    if (!estValide(id)) {
      return alert("Veuillez valider tous les critères !");
    }
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-paiement`);
      alert("Dossier envoyé à Paiement !");
      setDossiers(dossiers.filter(d => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors de l'envoi.");
    }
  };

  const rejeter = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
        commentaire_rejet: commentaires[id] || "Non précisé",
      });
      alert("Dossier rejeté.");
      setDossiers(dossiers.filter(d => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors du rejet.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Programmation - Traitement des Dossiers</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Propriétaire</th>
            <th>Fichier</th>
            <th>Critères</th>
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
    <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer">
      📎 Voir
    </a>
  ) : "Aucun"}
</td>
              <td>
                <Form.Check
                  label="Budget OK"
                  checked={criteres[d.id_dossier]?.critere1 || false}
                  onChange={() => handleCritere(d.id_dossier, "critere1")}
                />
                <Form.Check
                  label="Planning OK"
                  checked={criteres[d.id_dossier]?.critere2 || false}
                  onChange={() => handleCritere(d.id_dossier, "critere2")}
                />
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Commentaire en cas de rejet"
                  onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
                />
              </td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => envoyerPaiement(d.id_dossier)}
                  disabled={!estValide(d.id_dossier)}
                >
                  ✅ Envoyer à Paiement
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => rejeter(d.id_dossier)}
                >
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
