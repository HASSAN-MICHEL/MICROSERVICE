import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

export default function RechercheDossier() {
  const [query, setQuery] = useState("");
  const [dossiers, setDossiers] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:3000/api/dossiers/recherche?query=${query}`);
    setDossiers(res.data);
  };

  return (
    <Container>
      <h3>Rechercher un dossier</h3>
      <Form className="d-flex mb-3">
        <Form.Control placeholder="Nom ou propriétaire" onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={search}>Chercher</Button>
      </Form>
      <ListGroup>
        {dossiers.map((d) => (
          <ListGroup.Item key={d.id_dossier}>
            <strong>{d.nom_dossier}</strong> - {d.nom_proprietaire} | Étape : {d.etape_actuelle}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
