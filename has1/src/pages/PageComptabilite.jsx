// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Container, Button, Form } from "react-bootstrap";

// export default function PageComptabilite() {
//   const [dossiers, setDossiers] = useState([]);
//   const [commentaires, setCommentaires] = useState({});

//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/dossiers/a-verifier-compta");
//         setDossiers(res.data);
//       } catch (err) {
//         console.error("Erreur chargement dossiers comptabilité :", err);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   const handleChangeComment = (id, value) => {
//     setCommentaires({ ...commentaires, [id]: value });
//   };

//   const confirmer = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-programmation`);
//       alert("Dossier envoyé à la programmation");
//       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
//     } catch (err) {
//       alert("Erreur lors de l'envoi");
//     }
//   };

//   const rejeter = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
//         commentaire_rejet: commentaires[id] || "Non précisé",
//       });
//       alert("Dossier rejeté");
//       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
//     } catch (err) {
//       alert("Erreur lors du rejet");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h3>Comptabilité - Vérification des Dossiers</h3>
//       <Table bordered striped responsive>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Propriétaire</th>
//             <th>Justificatif</th>
//             <th>Commentaire (rejet)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dossiers.map((d) => (
//             <tr key={d.id_dossier}>
//               <td>{d.nom_dossier}</td>
//               <td>{d.nom_proprietaire}</td>
//               <td>
//                 {d.fichier_url ? (
//                   <a href={`http://localhost:3000/${d.fichier_url}`} target="_blank" rel="noreferrer">
//                     📎 Voir
//                   </a>
//                 ) : "Aucun"}
//               </td>
//               <td>
//                 <Form.Control
//                   as="textarea"
//                   rows={2}
//                   placeholder="Cause du rejet..."
//                   onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
//                 />
//               </td>
//               <td>
//                 <Button variant="success" size="sm" onClick={() => confirmer(d.id_dossier)}>
//                   ✅ Valider
//                 </Button>{" "}
//                 <Button variant="danger" size="sm" onClick={() => rejeter(d.id_dossier)}>
//                   ❌ Rejeter
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Row, Col } from "react-bootstrap";

export default function PageComptabilite() {
  const [dossiers, setDossiers] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [statutFiltre, setStatutFiltre] = useState("tous");

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dossiers/a-verifier-comptabilite");
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur chargement dossiers comptabilité :", err);
      }
    };
    fetchDossiers();
  }, []);

  const handleChangeComment = (id, value) => {
    setCommentaires({ ...commentaires, [id]: value });
  };

  const confirmer = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-programmation`);
      alert("Dossier envoyé à la programmation");
      setDossiers(dossiers.filter((d) => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors de l'envoi");
    }
  };

  const rejeter = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
        commentaire_rejet: commentaires[id] || "Non précisé",
      });
      alert("Dossier rejeté");
      setDossiers(dossiers.filter((d) => d.id_dossier !== id));
    } catch (err) {
      alert("Erreur lors du rejet");
    }
  };

  // Filtrage dynamique par statut
  const dossiersFiltres = statutFiltre === "tous"
    ? dossiers
    : dossiers.filter((d) => (d.statut || "en cours").toLowerCase() === statutFiltre);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h3>Comptabilité - Vérification des Dossiers</h3></Col>
        <Col md="4">
          <Form.Select onChange={(e) => setStatutFiltre(e.target.value)} value={statutFiltre}>
            <option value="tous">📁 Tous les statuts</option>
            <option value="en cours">⏳ En cours</option>
            <option value="validé">✅ Validé</option>
            <option value="rejeté">❌ Rejeté</option>
          </Form.Select>
        </Col>
      </Row>

      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Propriétaire</th>
            <th>Statut</th>
            <th>Justificatif</th>
            <th>Commentaire (rejet)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dossiersFiltres.map((d) => (
            <tr key={d.id_dossier}>
              <td>{d.nom_dossier}</td>
              <td>{d.nom_proprietaire}</td>
              <td>{d.statut || "En cours"}</td>
              <td>
  {d.fichier_url ? (
    <a
      href={`http://localhost:3000/uploads/${d.fichier_url}`}  // Ajoutez /uploads/
      target="_blank"
      rel="noreferrer"
    >
      📄 Voir fichier
    </a>
  ) : "Aucun"}
</td>
              <td>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Cause du rejet..."
                  onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
                />
              </td>
              <td>
                <Button variant="success" size="sm" onClick={() => confirmer(d.id_dossier)}>
                  ✅ Valider
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
