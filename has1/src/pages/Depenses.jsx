// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Table, Container, Button, Form } from "react-bootstrap";

// // // export default function Depenses() {
// // //   const [dossiers, setDossiers] = useState([]);
// // //   const [criteres, setCriteres] = useState({}); // pour suivre les cases cochées

// // //   useEffect(() => {
// // //     const fetchDossiers = async () => {
// // //       try {
// // //         const res = await axios.get("http://localhost:3000/api/list");
// // //         const dossiersDepense = res.data.filter(d => d.etape_actuelle?.toLowerCase() === "depense");
// // //         setDossiers(dossiersDepense);
// // //       } catch (err) {
// // //         console.error("Erreur lors du chargement des dossiers :", err);
// // //       }
// // //     };
// // //     fetchDossiers();
// // //   }, []);

// // //   const handleCritereChange = (id_dossier, critere) => {
// // //     setCriteres(prev => ({
// // //       ...prev,
// // //       [id_dossier]: {
// // //         ...prev[id_dossier],
// // //         [critere]: !prev[id_dossier]?.[critere],
// // //       }
// // //     }));
// // //   };

// // //   const estValide = (id_dossier) => {
// // //     const c = criteres[id_dossier] || {};
// // //     return c.critere1 && c.critere2 && c.critere3;
// // //   };

// // //   const envoyerAComptabilite = async (id_dossier) => {
// // //     if (!estValide(id_dossier)) {
// // //       return alert("Veuillez valider les 3 critères avant d’envoyer.");
// // //     }

// // //     try {
// // //       await axios.put(`http://localhost:3000/api/dossiers/${id_dossier}/envoyer-comptabilite`);
// // //       alert("Dossier envoyé à la comptabilité !");
// // //       setDossiers(dossiers.filter(d => d.id_dossier !== id_dossier));
// // //     } catch (err) {
// // //       console.error("Erreur lors de l'envoi à la comptabilité :", err);
// // //       alert("Échec de l'envoi");
// // //     }
// // //   };

// // //   return (
// // //     <Container className="mt-4">
// // //       <h3>📁 Dossiers à la dépense</h3>
// // //       <Table striped bordered responsive>
// // //         <thead>
// // //           <tr>
// // //             <th>Nom</th>
// // //             <th>Propriétaire</th>
// // //             <th>Fichier</th>
// // //             <th>Critère 1</th>
// // //             <th>Critère 2</th>
// // //             <th>Critère 3</th>
// // //             <th>Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {dossiers.map((d) => (
// // //             <tr key={d.id_dossier}>
// // //               <td>{d.nom_dossier}</td>
// // //               <td>{d.nom_proprietaire}</td>
// // //               <td>
// // //                 {d.fichier_url ? (
// // //                   <a
// // //                     href={`http://localhost:3000/${d.fichier_url}`}
// // //                     target="_blank"
// // //                     rel="noreferrer"
// // //                   >
// // //                     📄 Voir fichier
// // //                   </a>
// // //                 ) : "Aucun"}
// // //               </td>
// // //               <td>
// // //                 <Form.Check
// // //                   type="checkbox"
// // //                   label=""
// // //                   checked={criteres[d.id_dossier]?.critere1 || false}
// // //                   onChange={() => handleCritereChange(d.id_dossier, "critere1")}
// // //                 />
// // //               </td>
// // //               <td>
// // //                 <Form.Check
// // //                   type="checkbox"
// // //                   label=""
// // //                   checked={criteres[d.id_dossier]?.critere2 || false}
// // //                   onChange={() => handleCritereChange(d.id_dossier, "critere2")}
// // //                 />
// // //               </td>
// // //               <td>
// // //                 <Form.Check
// // //                   type="checkbox"
// // //                   label=""
// // //                   checked={criteres[d.id_dossier]?.critere3 || false}
// // //                   onChange={() => handleCritereChange(d.id_dossier, "critere3")}
// // //                 />
// // //               </td>
// // //               <td>
// // //                 <Button
// // //                   variant="success"
// // //                   size="sm"
// // //                   disabled={!estValide(d.id_dossier)}
// // //                   onClick={() => envoyerAComptabilite(d.id_dossier)}
// // //                 >
// // //                   ✅ Envoyer à comptabilité
// // //                 </Button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </Table>
// // //     </Container>
// // //   );
// // // }


// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Table, Container, Button, Form, Modal } from "react-bootstrap";

// // export default function Depenses() {
// //   const [dossiers, setDossiers] = useState([]);
// //   const [criteres, setCriteres] = useState({});
// //   const [showModal, setShowModal] = useState(false);
// //   const [rejetCommentaire, setRejetCommentaire] = useState("");
// //   const [dossierRejete, setDossierRejete] = useState(null);

// //   useEffect(() => {
// //     const fetchDossiers = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/list");
// //         const dossiersDepense = res.data.filter(d => d.etape_actuelle?.toLowerCase() === "depense");
// //         setDossiers(dossiersDepense);
// //       } catch (err) {
// //         console.error("Erreur lors du chargement des dossiers :", err);
// //       }
// //     };
// //     fetchDossiers();
// //   }, []);

// //   const handleCritereChange = (id, critere) => {
// //     setCriteres(prev => ({
// //       ...prev,
// //       [id]: {
// //         ...prev[id],
// //         [critere]: !prev[id]?.[critere],
// //       }
// //     }));
// //   };

// //   const estValide = (id) => {
// //     const c = criteres[id] || {};
// //     return c.Timbre && c.Signature && c.Cashets;
// //   };

// //   const envoyerAComptabilite = async (id) => {
// //     if (!estValide(id)) {
// //       return alert("Validez les 3 critères d’abord.");
// //     }
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-comptabilite`);
// //       alert("Envoyé à la comptabilité !");
// //       setDossiers(dossiers.filter(d => d.id_dossier !== id));
// //     } catch (err) {
// //       console.error(err);
// //       alert("Erreur d'envoi.");
// //     }
// //   };

// //   const handleRejectClick = (dossier) => {
// //     setDossierRejete(dossier);
// //     setRejetCommentaire("");
// //     setShowModal(true);
// //   };

// //   const confirmerRejet = async () => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${dossierRejete.id_dossier}/rejet`, {
// //         commentaire: rejetCommentaire,
// //       });
// //       alert("Dossier rejeté.");
// //       setDossiers(dossiers.filter(d => d.id_dossier !== dossierRejete.id_dossier));
// //       setShowModal(false);
// //     } catch (err) {
// //       console.error("Erreur de rejet :", err);
// //       alert("Erreur lors du rejet.");
// //     }
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h3>Dossiers en attente (Dépense)</h3>
// //       <Table striped bordered responsive>
// //         <thead>
// //           <tr>
// //             <th>Nom</th>
// //             <th>Propriétaire</th>
// //             <th>Fichier</th>
// //             <th>Critères</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {dossiers.map((d) => (
// //             <tr key={d.id_dossier}>
// //               <td>{d.nom_dossier}</td>
// //               <td>{d.nom_proprietaire}</td>
// //               <td>
// //   {d.fichier_url ? (
// //     <a
// //       href={`http://localhost:3000/uploads/${d.fichier_url}`}  // Ajoutez /uploads/
// //       target="_blank"
// //       rel="noreferrer"
// //     >
// //       📄 Voir fichier
// //     </a>
// //   ) : "Aucun"}
// // </td>
// //               <td>
// //                 <Form.Check
// //                   inline
// //                   label="Timbre"
// //                   checked={criteres[d.id_dossier]?.Timbre || false}
// //                   onChange={() => handleCritereChange(d.id_dossier, "Timbre")}
// //                 />
// //                 <Form.Check
// //                   inline
// //                   label=" Signature"
// //                   checked={criteres[d.id_dossier]?.Signature || false}
// //                   onChange={() => handleCritereChange(d.id_dossier, "Signature")}
// //                 />
// //                 <Form.Check
// //                   inline
// //                   label="Cashets"
// //                   checked={criteres[d.id_dossier]?.Cashets || false}
// //                   onChange={() => handleCritereChange(d.id_dossier, "Cashets")}
// //                 />
// //               </td>
// //               <td>
// //                 <Button
// //                   variant="success"
// //                   size="sm"
// //                   disabled={!estValide(d.id_dossier)}
// //                   onClick={() => envoyerAComptabilite(d.id_dossier)}
// //                   className="me-2"
// //                 >
// //                   ✅ Envoyer à comptabilité
// //                 </Button>
// //                 <Button
// //                   variant="danger"
// //                   size="sm"
// //                   onClick={() => handleRejectClick(d)}
// //                 >
// //                   ❌ Rejeter
// //                 </Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>

// //       {/* Modal pour le rejet */}
// //       <Modal show={showModal} onHide={() => setShowModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Raison du rejet</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form.Group>
// //             <Form.Label>Commentaire</Form.Label>
// //             <Form.Control
// //               as="textarea"
// //               rows={3}
// //               value={rejetCommentaire}
// //               onChange={(e) => setRejetCommentaire(e.target.value)}
// //             />
// //           </Form.Group>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
// //           <Button variant="danger" onClick={confirmerRejet}>Confirmer le rejet</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Container, Card, Table, Button, Form, 
//   Modal, Badge, Alert, Pagination 
// } from "react-bootstrap";
// import { 
//   FiFile, FiUser, FiCheck, FiX, FiSend, 
//   FiDownload, FiAlertCircle, FiClock 
// } from "react-icons/fi";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Depenses() {
//   const [dossiers, setDossiers] = useState([]);
//   const [criteres, setCriteres] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [rejetCommentaire, setRejetCommentaire] = useState("");
//   const [dossierRejete, setDossierRejete] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/list");
//         const dossiersDepense = res.data.filter(d => 
//           d.etape_actuelle?.toLowerCase() === "depense"
//         );
//         setDossiers(dossiersDepense);
        
//         // Initialiser les critères
//         const initialCriteres = {};
//         dossiersDepense.forEach(d => {
//           initialCriteres[d.id_dossier] = {
//             Timbre: false,
//             Signature: false,
//             Cashets: false
//           };
//         });
//         setCriteres(initialCriteres);
        
//       } catch (err) {
//         setError("Erreur de chargement: " + (err.response?.data?.message || err.message));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   const handleCritereChange = (id, critere) => {
//     setCriteres(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [critere]: !prev[id]?.[critere],
//       }
//     }));
//   };

//   const estValide = (id) => {
//     const c = criteres[id] || {};
//     return c.Timbre && c.Signature && c.Cashets;
//   };

//   const envoyerAComptabilite = async (id) => {
//     if (!estValide(id)) {
//       return setError("Veuillez valider les 3 critères avant d'envoyer");
//     }
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-comptabilite`);
//       setSuccess("Dossier envoyé à la comptabilité avec succès");
//       setDossiers(dossiers.filter(d => d.id_dossier !== id));
//     } catch (err) {
//       setError("Erreur d'envoi: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const handleRejectClick = (dossier) => {
//     setDossierRejete(dossier);
//     setRejetCommentaire("");
//     setShowModal(true);
//   };

//   const confirmerRejet = async () => {
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${dossierRejete.id_dossier}/rejet`, {
//         commentaire: rejetCommentaire,
//       });
//       setSuccess("Dossier rejeté avec succès");
//       setDossiers(dossiers.filter(d => d.id_dossier !== dossierRejete.id_dossier));
//       setShowModal(false);
//     } catch (err) {
//       setError("Erreur lors du rejet: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = dossiers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(dossiers.length / itemsPerPage);

//   // Styles
//   const cardStyle = {
//     borderRadius: '15px',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//     border: 'none'
//   };

//   const getStatusBadge = (statut) => {
//     const statusMap = {
//       'Validé': { color: 'success', icon: <FiCheck /> },
//       'Rejeté': { color: 'danger', icon: <FiX /> },
//       'En cours': { color: 'warning', icon: <FiClock /> }
//     };
    
//     const status = statut || 'En cours';
//     const config = statusMap[status] || statusMap['En cours'];
    
//     return (
//       <Badge bg={config.color} className="d-flex align-items-center">
//         {config.icon}
//         <span className="ms-1">{status}</span>
//       </Badge>
//     );
//   };

//   return (
//     <Container className="mt-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">
//           <FiFile className="me-2" style={{ color: '#4e73df' }} />
//           Dossiers en Dépense
//         </h2>
//         <Badge bg="light" text="dark" className="fs-6">
//           {dossiers.length} dossier{dossiers.length !== 1 ? 's' : ''} en attente
//         </Badge>
//       </div>

//       {/* Alerts */}
//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError(null)} className="d-flex align-items-center">
//           <FiAlertCircle className="me-2" size={20} />
//           {error}
//         </Alert>
//       )}
//       {success && (
//         <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="d-flex align-items-center">
//           <FiCheck className="me-2" size={20} />
//           {success}
//         </Alert>
//       )}

//       {/* Main Card */}
//       <Card style={cardStyle}>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Chargement...</span>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="table-responsive">
//                 <Table hover className="mb-0">
//                   <thead>
//                     <tr>
//                       <th><FiFile className="me-1" /> Nom</th>
//                       <th><FiUser className="me-1" /> Propriétaire</th>
//                       <th>Fichier</th>
//                       <th>Validation</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((d) => (
//                       <tr key={d.id_dossier} className={estValide(d.id_dossier) ? 'table-success' : ''}>
//                         <td>
//                           <div className="fw-bold">{d.nom_dossier}</div>
//                           <div className="small text-muted">{getStatusBadge(d.statut)}</div>
//                         </td>
//                         <td>{d.nom_proprietaire}</td>
//                         <td>
//                           {d.fichier_url ? (
//                             <Button 
//                               variant="link" 
//                               href={`http://localhost:3000/uploads/${d.fichier_url}`} 
//                               target="_blank"
//                               className="p-0 text-decoration-none d-flex align-items-center"
//                             >
//                               <FiDownload className="me-1" />
//                               Voir
//                             </Button>
//                           ) : (
//                             <span className="text-muted">Aucun</span>
//                           )}
//                         </td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-3">
//                             <Form.Check
//                               type="checkbox"
//                               id={`timbre-${d.id_dossier}`}
//                               label="Timbre"
//                               checked={criteres[d.id_dossier]?.Timbre || false}
//                               onChange={() => handleCritereChange(d.id_dossier, "Timbre")}
//                               className="me-2"
//                             />
//                             <Form.Check
//                               type="checkbox"
//                               id={`signature-${d.id_dossier}`}
//                               label="Signature"
//                               checked={criteres[d.id_dossier]?.Signature || false}
//                               onChange={() => handleCritereChange(d.id_dossier, "Signature")}
//                               className="me-2"
//                             />
//                             <Form.Check
//                               type="checkbox"
//                               id={`cashets-${d.id_dossier}`}
//                               label="Cashets"
//                               checked={criteres[d.id_dossier]?.Cashets || false}
//                               onChange={() => handleCritereChange(d.id_dossier, "Cashets")}
//                             />
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex gap-2">
//                             <Button
//                               variant={estValide(d.id_dossier) ? "success" : "outline-success"}
//                               size="sm"
//                               disabled={!estValide(d.id_dossier)}
//                               onClick={() => envoyerAComptabilite(d.id_dossier)}
//                               className="d-flex align-items-center"
//                             >
//                               <FiSend className="me-1" />
//                               Comptabilité
//                             </Button>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => handleRejectClick(d)}
//                               className="d-flex align-items-center"
//                             >
//                               <FiX className="me-1" />
//                               Rejeter
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {dossiers.length > itemsPerPage && (
//                 <div className="d-flex justify-content-center mt-3">
//                   <Pagination>
//                     <Pagination.Prev 
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
//                       disabled={currentPage === 1} 
//                     />
//                     {[...Array(totalPages)].map((_, i) => (
//                       <Pagination.Item
//                         key={i + 1}
//                         active={i + 1 === currentPage}
//                         onClick={() => setCurrentPage(i + 1)}
//                       >
//                         {i + 1}
//                       </Pagination.Item>
//                     ))}
//                     <Pagination.Next 
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
//                       disabled={currentPage === totalPages} 
//                     />
//                   </Pagination>
//                 </div>
//               )}
//             </>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Reject Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton className="border-0 pb-0">
//           <Modal.Title className="d-flex align-items-center">
//             <FiAlertCircle className="me-2 text-danger" />
//             <span>Rejet du dossier</span>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="mb-3">
//             Vous êtes sur le point de rejeter le dossier <strong>{dossierRejete?.nom_dossier}</strong>.
//             Veuillez indiquer la raison du rejet :
//           </p>
//           <Form.Group>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={rejetCommentaire}
//               onChange={(e) => setRejetCommentaire(e.target.value)}
//               placeholder="Décrivez la raison du rejet..."
//               className="mb-3"
//             />
//           </Form.Group>
//           <div className="d-flex justify-content-end gap-2">
//             <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
//               Annuler
//             </Button>
//             <Button 
//               variant="danger" 
//               onClick={confirmerRejet}
//               disabled={!rejetCommentaire.trim()}
//               className="d-flex align-items-center"
//             >
//               <FiX className="me-1" />
//               Confirmer le rejet
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Card, Table, Button, Form,
  Modal, Badge, Alert, Pagination
} from "react-bootstrap";
import {
  FiFile, FiUser, FiCheck, FiX, FiSend,
  FiDownload, FiAlertCircle, FiClock
} from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

// Détection dynamique de l'API
const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function Depenses() {
  const [dossiers, setDossiers] = useState([]);
  const [criteres, setCriteres] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejetCommentaire, setRejetCommentaire] = useState("");
  const [dossierRejete, setDossierRejete] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/list`);
        const dossiersDepense = res.data.filter(d =>
          d.etape_actuelle?.toLowerCase() === "depense"
        );
        setDossiers(dossiersDepense);

        const initialCriteres = {};
        dossiersDepense.forEach(d => {
          initialCriteres[d.id_dossier] = {
            Timbre: false,
            Signature: false,
            Cashets: false
          };
        });
        setCriteres(initialCriteres);
      } catch (err) {
        setError("Erreur de chargement: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
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
      return setError("Veuillez valider les 3 critères avant d'envoyer");
    }
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${id}/envoyer-comptabilite`);
      setSuccess("Dossier envoyé à la comptabilité avec succès");
      setDossiers(dossiers.filter(d => d.id_dossier !== id));
    } catch (err) {
      setError("Erreur d'envoi: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRejectClick = (dossier) => {
    setDossierRejete(dossier);
    setRejetCommentaire("");
    setShowModal(true);
  };

  const confirmerRejet = async () => {
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${dossierRejete.id_dossier}/rejet`, {
        commentaire: rejetCommentaire,
      });
      setSuccess("Dossier rejeté avec succès");
      setDossiers(dossiers.filter(d => d.id_dossier !== dossierRejete.id_dossier));
      setShowModal(false);
    } catch (err) {
      setError("Erreur lors du rejet: " + (err.response?.data?.message || err.message));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dossiers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dossiers.length / itemsPerPage);

  const cardStyle = {
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: 'none'
  };

  const getStatusBadge = (statut) => {
    const statusMap = {
      'Validé': { color: 'success', icon: <FiCheck /> },
      'Rejeté': { color: 'danger', icon: <FiX /> },
      'En cours': { color: 'warning', icon: <FiClock /> }
    };
    const status = statut || 'En cours';
    const config = statusMap[status] || statusMap['En cours'];

    return (
      <Badge bg={config.color} className="d-flex align-items-center">
        {config.icon}
        <span className="ms-1">{status}</span>
      </Badge>
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FiFile className="me-2" style={{ color: '#4e73df' }} />
          Dossiers en Dépense
        </h2>
        <Badge bg="light" text="dark" className="fs-6">
          {dossiers.length} dossier{dossiers.length !== 1 ? 's' : ''} en attente
        </Badge>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="d-flex align-items-center">
          <FiAlertCircle className="me-2" size={20} />
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="d-flex align-items-center">
          <FiCheck className="me-2" size={20} />
          {success}
        </Alert>
      )}

      <Card style={cardStyle}>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th><FiFile className="me-1" /> Nom</th>
                      <th><FiUser className="me-1" /> Propriétaire</th>
                      <th>Fichier</th>
                      <th>Validation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((d) => (
                      <tr key={d.id_dossier} className={estValide(d.id_dossier) ? 'table-success' : ''}>
                        <td>
                          <div className="fw-bold">{d.nom_dossier}</div>
                          <div className="small text-muted">{getStatusBadge(d.statut)}</div>
                        </td>
                        <td>{d.nom_proprietaire}</td>
                           
                        <td>
                            {d.fichier_url ? (
                           <Button 
                          variant="link" 
                          href={`${API_BASE_URL}${d.fichier_url.startsWith('/') ? '' : '/'}${d.fichier_url}`}
                           target="_blank"
                           className="p-0 text-decoration-none"
                           >
                         <FiFile className="me-1" />
                         Voir
                         </Button>
                            ) : (
                             <span className="text-muted">Aucun</span>
                             )}
                        </td>

                        <td>
                          <div className="d-flex flex-wrap gap-3">
                            <Form.Check
                              type="checkbox"
                              label="Timbre"
                              checked={criteres[d.id_dossier]?.Timbre || false}
                              onChange={() => handleCritereChange(d.id_dossier, "Timbre")}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Signature"
                              checked={criteres[d.id_dossier]?.Signature || false}
                              onChange={() => handleCritereChange(d.id_dossier, "Signature")}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Cashets"
                              checked={criteres[d.id_dossier]?.Cashets || false}
                              onChange={() => handleCritereChange(d.id_dossier, "Cashets")}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant={estValide(d.id_dossier) ? "success" : "outline-success"}
                              size="sm"
                              disabled={!estValide(d.id_dossier)}
                              onClick={() => envoyerAComptabilite(d.id_dossier)}
                            >
                              <FiSend className="me-1" />
                              Comptabilité
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleRejectClick(d)}
                            >
                              <FiX className="me-1" />
                              Rejeter
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {dossiers.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center">
            <FiAlertCircle className="me-2 text-danger" />
            <span>Rejet du dossier</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Vous êtes sur le point de rejeter le dossier <strong>{dossierRejete?.nom_dossier}</strong>.
            Veuillez indiquer la raison du rejet :
          </p>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              value={rejetCommentaire}
              onChange={(e) => setRejetCommentaire(e.target.value)}
              placeholder="Décrivez la raison du rejet..."
              className="mb-3"
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={confirmerRejet}
              disabled={!rejetCommentaire.trim()}
            >
              <FiX className="me-1" />
              Confirmer le rejet
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
