// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Container, Table } from "react-bootstrap";

// // export default function DossiersRejetes() {
// //   const [dossiers, setDossiers] = useState([]);

// //   useEffect(() => {
// //     const fetchRejetes = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/dossiers/rejetes");
// //         setDossiers(res.data);
// //       } catch (err) {
// //         console.error("Erreur lors du chargement des dossiers rejetés :", err);
// //       }
// //     };
// //     fetchRejetes();
// //   }, []);

// //   return (
// //     <Container className="mt-4">
// //       <h3>Dossiers Rejetés</h3>
// //       <Table striped bordered hover responsive>
// //         <thead>
// //           <tr>
// //             <th>Nom</th>
// //             <th>Propriétaire</th>
// //             <th>Étape de rejet</th>
// //             <th>Commentaire</th>
// //             <th>Fichier</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {dossiers.map((d) => (
// //             <tr key={d.id_dossier}>
// //               <td>{d.nom_dossier}</td>
// //               <td>{d.nom_proprietaire}</td>
// //               <td>{d.etape_actuelle}</td>
// //               <td>{d.commentaire_rejet || "Non précisé"}</td>
// //               <td>
// //                 {d.fichier_url ? (
// //                   <a
// //                     href={`http://localhost:3000/${d.fichier_url}`}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                   >
// //                     📄 Voir fichier
// //                   </a>
// //                 ) : "Aucun"}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </Container>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Container, 
//   Table, 
//   Badge, 
//   InputGroup, 
//   Form, 
//   Button, 
//   Spinner, Modal,
//   Alert,
//   Stack
// } from "react-bootstrap";
// import { 
//   FileEarmarkText, 
//   Search, 
//   XCircleFill,
//   ArrowCounterclockwise
// } from "react-bootstrap-icons";

// export default function DossiersRejetes() {
//   const [dossiers, setDossiers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [refreshCount, setRefreshCount] = useState(0);

//   useEffect(() => {
//     const fetchRejetes = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:3000/api/dossiers/rejetes");
//         setDossiers(res.data);
//       } catch (err) {
//         console.error("Erreur lors du chargement des dossiers rejetés :", err);
//         setError("Erreur lors du chargement des dossiers");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRejetes();
//   }, [refreshCount]);

//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [selectedDossier, setSelectedDossier] = useState(null);


//   const filteredDossiers = dossiers.filter(dossier => 
//     dossier.nom_dossier.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dossier.nom_proprietaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (dossier.commentaire_rejet && dossier.commentaire_rejet.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const refreshData = () => {
//     setRefreshCount(prev => prev + 1);
//     setSearchTerm("");
//   };

//   return (
//     <Container className="my-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="mb-0 d-flex align-items-center">
//             <XCircleFill className="text-danger me-2" size={28} />
//             Dossiers Rejetés
//             <Badge bg="light" text="dark" className="ms-2 fs-6">
//               {filteredDossiers.length}
//             </Badge>
//           </h2>
//           <p className="text-muted mb-0">Liste des dossiers ayant été rejetés durant le processus</p>
//         </div>
        
//         <Stack direction="horizontal" gap={3}>
//           <InputGroup style={{ width: "300px" }}>
//             <InputGroup.Text>
//               <Search />
//             </InputGroup.Text>
//             <Form.Control
//               placeholder="Rechercher un dossier..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => setSearchTerm("")}
//               >
//                 ×
//               </Button>
//             )}
//           </InputGroup>
          
//           <Button 
//             variant="outline-secondary"
//             onClick={refreshData}
//             title="Rafraîchir"
//           >
//             <ArrowCounterclockwise />
//           </Button>
//         </Stack>
//       </div>

//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" variant="primary" />
//           <p className="mt-2">Chargement des dossiers...</p>
//         </div>
//       ) : (
//         <div className="border rounded-3 overflow-hidden shadow-sm">
//           <Table hover className="mb-0">
//             <thead className="bg-light">
//               <tr>
//                 <th className="py-3">Nom du dossier</th>
//                 <th className="py-3">Propriétaire</th>
//                 <th className="py-3">Étape de rejet</th>
//                 <th className="py-3">Commentaire</th>
//                 <th className="py-3 text-end">Fichier</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredDossiers.length > 0 ? (
//                 filteredDossiers.map((d) => (
//                   <tr key={d.id_dossier}>
//                     <td className="fw-semibold align-middle">{d.nom_dossier}</td>
//                     <td className="align-middle">{d.nom_proprietaire}</td>
//                     <td className="align-middle">
//                       <Badge bg="secondary" className="text-uppercase">
//                         {d.etape_actuelle}
//                       </Badge>
//                     </td>
//                     <td className="align-middle">
//                       {d.commentaire_rejet ? (
//                         <div className="text-danger fst-italic">
//                           {d.commentaire_rejet}
//                         </div>
//                       ) : (
//                         <span className="text-muted">Non précisé</span>
//                       )}
//                     </td>
//                   <td className="text-end align-middle">
//   <div className="d-flex flex-column align-items-end gap-2">
//     {d.fichier_url ? (
//       <Button 
//         variant="outline-primary" 
//         size="sm"
//         href={`http://localhost:3000/uploads/${d.fichier_url}`} 
//         target="_blank"
//         className="d-inline-flex align-items-center"
//       >
//         <FileEarmarkText className="me-1" />
//         Voir fichier
//       </Button>
//     ) : (
//       <span className="text-muted">Aucun</span>
//     )}

//     <Button 
//   variant="outline-success" 
//   size="sm"
//   onClick={() => {
//     setSelectedDossier(d);
//     setShowConfirmModal(true);
//   }}
// >
//   Retourner à la dépense
// </Button>

//           </div>
//             </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4">
//                     {searchTerm ? (
//                       "Aucun dossier rejeté ne correspond à votre recherche"
//                     ) : (
//                       "Aucun dossier rejeté disponible"
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}

//           <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         Voulez-vous vraiment retourner ce dossier à l’étape <strong>dépense</strong> ?
//         <br />
//         <span className="text-muted">
//           <small>
//             Dossier : <strong>{selectedDossier?.nom_dossier}</strong> - {selectedDossier?.nom_proprietaire}
//           </small>
//         </span>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
//           Annuler
//         </Button>
//         <Button 
//           variant="success"
//           onClick={async () => {
//             try {
//               await axios.put(`http://localhost:3000/api/dossiers/${selectedDossier.id_dossier}/retour-depense`);
//               setShowConfirmModal(false);
//               setSelectedDossier(null);
//               refreshData();
//             } catch (err) {
//               alert("Erreur lors du retour du dossier.");
//               console.error(err);
//             }
//           }}
//         >
//           Confirmer le retour
//         </Button>
//       </Modal.Footer>
//     </Modal>


      
//     </Container>
//   );
// }





// //  <td className="text-end align-middle">

// //                       {d.fichier_url ? (
// //                       <Button 
// //                               variant="outline-primary" 
// //                               size="sm"
// //                               href={`http://localhost:3000/uploads/${d.fichier_url}`} 
// //                               target="_blank"
// //                               className="d-inline-flex align-items-center"
// //                             >
// //                           <FileEarmarkText className="me-1" />
// //                           Voir fichier
// //                         </Button>
// //                       ) : (
// //                         <span className="text-muted">Aucun</span>
// //                       )}
// //                     </td>





import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Table, Badge, InputGroup, Form, Button,
  Spinner, Modal, Alert, Stack
} from "react-bootstrap";
import {
  FileEarmarkText, Search, XCircleFill, ArrowCounterclockwise
} from "react-bootstrap-icons";

// Détection dynamique de l’URL du backend
const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function DossiersRejetes() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null);

  useEffect(() => {
    const fetchRejetes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/dossiers/rejetes`);
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des dossiers rejetés :", err);
        setError("Erreur lors du chargement des dossiers");
      } finally {
        setLoading(false);
      }
    };
    fetchRejetes();
  }, [refreshCount]);

  const refreshData = () => {
    setRefreshCount(prev => prev + 1);
    setSearchTerm("");
  };

  const filteredDossiers = dossiers.filter(dossier =>
    dossier.nom_dossier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.nom_proprietaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dossier.commentaire_rejet && dossier.commentaire_rejet.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 d-flex align-items-center">
            <XCircleFill className="text-danger me-2" size={28} />
            Dossiers Rejetés
            <Badge bg="light" text="dark" className="ms-2 fs-6">
              {filteredDossiers.length}
            </Badge>
          </h2>
          <p className="text-muted mb-0">Liste des dossiers ayant été rejetés durant le processus</p>
        </div>

        <Stack direction="horizontal" gap={3}>
          <InputGroup style={{ width: "300px" }}>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Rechercher un dossier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="outline-secondary"
                onClick={() => setSearchTerm("")}
              >
                ×
              </Button>
            )}
          </InputGroup>

          <Button
            variant="outline-secondary"
            onClick={refreshData}
            title="Rafraîchir"
          >
            <ArrowCounterclockwise />
          </Button>
        </Stack>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Chargement des dossiers...</p>
        </div>
      ) : (
        <div className="border rounded-3 overflow-hidden shadow-sm">
          <Table hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="py-3">Nom du dossier</th>
                <th className="py-3">Propriétaire</th>
                <th className="py-3">Étape de rejet</th>
                <th className="py-3">Commentaire</th>
                <th className="py-3 text-end">Fichier</th>
              </tr>
            </thead>
            <tbody>
              {filteredDossiers.length > 0 ? (
                filteredDossiers.map((d) => (
                  <tr key={d.id_dossier}>
                    <td className="fw-semibold align-middle">{d.nom_dossier}</td>
                    <td className="align-middle">{d.nom_proprietaire}</td>
                    <td className="align-middle">
                      <Badge bg="secondary" className="text-uppercase">
                        {d.etape_actuelle}
                      </Badge>
                    </td>
                    <td className="align-middle">
                      {d.commentaire_rejet ? (
                        <div className="text-danger fst-italic">
                          {d.commentaire_rejet}
                        </div>
                      ) : (
                        <span className="text-muted">Non précisé</span>
                      )}
                    </td>
                    <td className="text-end align-middle">
                      <div className="d-flex flex-column align-items-end gap-2">
                        {d.fichier_url ? (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            href={`${API_BASE_URL}/uploads/${d.fichier_url}`}
                            target="_blank"
                            className="d-inline-flex align-items-center"
                          >
                            <FileEarmarkText className="me-1" />
                            Voir fichier
                          </Button>
                        ) : (
                          <span className="text-muted">Aucun</span>
                        )}

                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => {
                            setSelectedDossier(d);
                            setShowConfirmModal(true);
                          }}
                        >
                          Retourner à la dépense
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    {searchTerm ? (
                      "Aucun dossier rejeté ne correspond à votre recherche"
                    ) : (
                      "Aucun dossier rejeté disponible"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment retourner ce dossier à l’étape <strong>dépense</strong> ?
          <br />
          <span className="text-muted">
            <small>
              Dossier : <strong>{selectedDossier?.nom_dossier}</strong> – {selectedDossier?.nom_proprietaire}
            </small>
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              try {
                await axios.put(`${API_BASE_URL}/api/dossiers/${selectedDossier.id_dossier}/retour-depense`);
                setShowConfirmModal(false);
                setSelectedDossier(null);
                refreshData();
              } catch (err) {
                alert("Erreur lors du retour du dossier.");
                console.error(err);
              }
            }}
          >
            Confirmer le retour
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
