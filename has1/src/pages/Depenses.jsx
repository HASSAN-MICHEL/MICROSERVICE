// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Container, Button, Form } from "react-bootstrap";

// export default function Depenses() {
//   const [dossiers, setDossiers] = useState([]);
//   const [criteres, setCriteres] = useState({}); // pour suivre les cases cochées

//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/list");
//         const dossiersDepense = res.data.filter(d => d.etape_actuelle?.toLowerCase() === "depense");
//         setDossiers(dossiersDepense);
//       } catch (err) {
//         console.error("Erreur lors du chargement des dossiers :", err);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   const handleCritereChange = (id_dossier, critere) => {
//     setCriteres(prev => ({
//       ...prev,
//       [id_dossier]: {
//         ...prev[id_dossier],
//         [critere]: !prev[id_dossier]?.[critere],
//       }
//     }));
//   };

//   const estValide = (id_dossier) => {
//     const c = criteres[id_dossier] || {};
//     return c.critere1 && c.critere2 && c.critere3;
//   };

//   const envoyerAComptabilite = async (id_dossier) => {
//     if (!estValide(id_dossier)) {
//       return alert("Veuillez valider les 3 critères avant d’envoyer.");
//     }

//     try {
//       await axios.put(`http://localhost:3000/api/dossiers/${id_dossier}/envoyer-comptabilite`);
//       alert("Dossier envoyé à la comptabilité !");
//       setDossiers(dossiers.filter(d => d.id_dossier !== id_dossier));
//     } catch (err) {
//       console.error("Erreur lors de l'envoi à la comptabilité :", err);
//       alert("Échec de l'envoi");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h3>📁 Dossiers à la dépense</h3>
//       <Table striped bordered responsive>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Propriétaire</th>
//             <th>Fichier</th>
//             <th>Critère 1</th>
//             <th>Critère 2</th>
//             <th>Critère 3</th>
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
//                   <a
//                     href={`http://localhost:3000/${d.fichier_url}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     📄 Voir fichier
//                   </a>
//                 ) : "Aucun"}
//               </td>
//               <td>
//                 <Form.Check
//                   type="checkbox"
//                   label=""
//                   checked={criteres[d.id_dossier]?.critere1 || false}
//                   onChange={() => handleCritereChange(d.id_dossier, "critere1")}
//                 />
//               </td>
//               <td>
//                 <Form.Check
//                   type="checkbox"
//                   label=""
//                   checked={criteres[d.id_dossier]?.critere2 || false}
//                   onChange={() => handleCritereChange(d.id_dossier, "critere2")}
//                 />
//               </td>
//               <td>
//                 <Form.Check
//                   type="checkbox"
//                   label=""
//                   checked={criteres[d.id_dossier]?.critere3 || false}
//                   onChange={() => handleCritereChange(d.id_dossier, "critere3")}
//                 />
//               </td>
//               <td>
//                 <Button
//                   variant="success"
//                   size="sm"
//                   disabled={!estValide(d.id_dossier)}
//                   onClick={() => envoyerAComptabilite(d.id_dossier)}
//                 >
//                   ✅ Envoyer à comptabilité
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
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

export default function Depenses() {
  const [dossiers, setDossiers] = useState([]);
  const [criteres, setCriteres] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejetCommentaire, setRejetCommentaire] = useState("");
  const [dossierRejete, setDossierRejete] = useState(null);

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/list");
        const dossiersDepense = res.data.filter(d => d.etape_actuelle?.toLowerCase() === "depense");
        setDossiers(dossiersDepense);
      } catch (err) {
        console.error("Erreur lors du chargement des dossiers :", err);
      }
    };
    fetchDossiers();
  }, []);

  const handleCritereChange = (id, critere) => {
    setCriteres(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [critere]: !prev[id]?.[critere],
      }
    }));
  };

  const estValide = (id) => {
    const c = criteres[id] || {};
    return c.Timbre && c.Signature && c.Cashets;
  };

  const envoyerAComptabilite = async (id) => {
    if (!estValide(id)) {
      return alert("Validez les 3 critères d’abord.");
    }
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-comptabilite`);
      alert("Envoyé à la comptabilité !");
      setDossiers(dossiers.filter(d => d.id_dossier !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur d'envoi.");
    }
  };

  const handleRejectClick = (dossier) => {
    setDossierRejete(dossier);
    setRejetCommentaire("");
    setShowModal(true);
  };

  const confirmerRejet = async () => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${dossierRejete.id_dossier}/rejet`, {
        commentaire: rejetCommentaire,
      });
      alert("Dossier rejeté.");
      setDossiers(dossiers.filter(d => d.id_dossier !== dossierRejete.id_dossier));
      setShowModal(false);
    } catch (err) {
      console.error("Erreur de rejet :", err);
      alert("Erreur lors du rejet.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Dossiers en attente (Dépense)</h3>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Propriétaire</th>
            <th>Fichier</th>
            <th>Critères</th>
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
                <Form.Check
                  inline
                  label="Timbre"
                  checked={criteres[d.id_dossier]?.Timbre || false}
                  onChange={() => handleCritereChange(d.id_dossier, "Timbre")}
                />
                <Form.Check
                  inline
                  label=" Signature"
                  checked={criteres[d.id_dossier]?.Signature || false}
                  onChange={() => handleCritereChange(d.id_dossier, "Signature")}
                />
                <Form.Check
                  inline
                  label="Cashets"
                  checked={criteres[d.id_dossier]?.Cashets || false}
                  onChange={() => handleCritereChange(d.id_dossier, "Cashets")}
                />
              </td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  disabled={!estValide(d.id_dossier)}
                  onClick={() => envoyerAComptabilite(d.id_dossier)}
                  className="me-2"
                >
                  ✅ Envoyer à comptabilité
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRejectClick(d)}
                >
                  ❌ Rejeter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour le rejet */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Raison du rejet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejetCommentaire}
              onChange={(e) => setRejetCommentaire(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="danger" onClick={confirmerRejet}>Confirmer le rejet</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
