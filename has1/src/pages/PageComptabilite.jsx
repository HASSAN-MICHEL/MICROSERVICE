// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Table, Container, Button, Form } from "react-bootstrap";

// // // export default function PageComptabilite() {
// // //   const [dossiers, setDossiers] = useState([]);
// // //   const [commentaires, setCommentaires] = useState({});

// // //   useEffect(() => {
// // //     const fetchDossiers = async () => {
// // //       try {
// // //         const res = await axios.get("http://localhost:3000/api/dossiers/a-verifier-compta");
// // //         setDossiers(res.data);
// // //       } catch (err) {
// // //         console.error("Erreur chargement dossiers comptabilité :", err);
// // //       }
// // //     };
// // //     fetchDossiers();
// // //   }, []);

// // //   const handleChangeComment = (id, value) => {
// // //     setCommentaires({ ...commentaires, [id]: value });
// // //   };

// // //   const confirmer = async (id) => {
// // //     try {
// // //       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-programmation`);
// // //       alert("Dossier envoyé à la programmation");
// // //       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
// // //     } catch (err) {
// // //       alert("Erreur lors de l'envoi");
// // //     }
// // //   };

// // //   const rejeter = async (id) => {
// // //     try {
// // //       await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
// // //         commentaire_rejet: commentaires[id] || "Non précisé",
// // //       });
// // //       alert("Dossier rejeté");
// // //       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
// // //     } catch (err) {
// // //       alert("Erreur lors du rejet");
// // //     }
// // //   };

// // //   return (
// // //     <Container className="mt-4">
// // //       <h3>Comptabilité - Vérification des Dossiers</h3>
// // //       <Table bordered striped responsive>
// // //         <thead>
// // //           <tr>
// // //             <th>Nom</th>
// // //             <th>Propriétaire</th>
// // //             <th>Justificatif</th>
// // //             <th>Commentaire (rejet)</th>
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
// // //                   <a href={`http://localhost:3000/${d.fichier_url}`} target="_blank" rel="noreferrer">
// // //                     📎 Voir
// // //                   </a>
// // //                 ) : "Aucun"}
// // //               </td>
// // //               <td>
// // //                 <Form.Control
// // //                   as="textarea"
// // //                   rows={2}
// // //                   placeholder="Cause du rejet..."
// // //                   onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
// // //                 />
// // //               </td>
// // //               <td>
// // //                 <Button variant="success" size="sm" onClick={() => confirmer(d.id_dossier)}>
// // //                   ✅ Valider
// // //                 </Button>{" "}
// // //                 <Button variant="danger" size="sm" onClick={() => rejeter(d.id_dossier)}>
// // //                   ❌ Rejeter
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
// // import { Table, Container, Button, Form, Row, Col } from "react-bootstrap";

// // export default function PageComptabilite() {
// //   const [dossiers, setDossiers] = useState([]);
// //   const [commentaires, setCommentaires] = useState({});
// //   const [statutFiltre, setStatutFiltre] = useState("tous");

// //   useEffect(() => {
// //     const fetchDossiers = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/dossiers/a-verifier-comptabilite");
// //         setDossiers(res.data);
// //       } catch (err) {
// //         console.error("Erreur chargement dossiers comptabilité :", err);
// //       }
// //     };
// //     fetchDossiers();
// //   }, []);

// //   const handleChangeComment = (id, value) => {
// //     setCommentaires({ ...commentaires, [id]: value });
// //   };

// //   const confirmer = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-programmation`);
// //       alert("Dossier envoyé à la programmation");
// //       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
// //     } catch (err) {
// //       alert("Erreur lors de l'envoi");
// //     }
// //   };

// //   const rejeter = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
// //         commentaire_rejet: commentaires[id] || "Non précisé",
// //       });
// //       alert("Dossier rejeté");
// //       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
// //     } catch (err) {
// //       alert("Erreur lors du rejet");
// //     }
// //   };

// //   // Filtrage dynamique par statut
// //   const dossiersFiltres = statutFiltre === "tous"
// //     ? dossiers
// //     : dossiers.filter((d) => (d.statut || "en cours").toLowerCase() === statutFiltre);

// //   return (
// //     <Container className="mt-4">
// //       <Row className="mb-3">
// //         <Col><h3>Comptabilité - Vérification des Dossiers</h3></Col>
// //         <Col md="4">
// //           <Form.Select onChange={(e) => setStatutFiltre(e.target.value)} value={statutFiltre}>
// //             <option value="tous">📁 Tous les statuts</option>
// //             <option value="en cours">⏳ En cours</option>
// //             <option value="validé">✅ Validé</option>
// //             <option value="rejeté">❌ Rejeté</option>
// //           </Form.Select>
// //         </Col>
// //       </Row>

// //       <Table bordered striped responsive>
// //         <thead>
// //           <tr>
// //             <th>Nom</th>
// //             <th>Propriétaire</th>
// //             <th>Statut</th>
// //             <th>Justificatif</th>
// //             <th>Commentaire (rejet)</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {dossiersFiltres.map((d) => (
// //             <tr key={d.id_dossier}>
// //               <td>{d.nom_dossier}</td>
// //               <td>{d.nom_proprietaire}</td>
// //               <td>{d.statut || "En cours"}</td>
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
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={2}
// //                   placeholder="Cause du rejet..."
// //                   onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
// //                 />
// //               </td>
// //               <td>
// //                 <Button variant="success" size="sm" onClick={() => confirmer(d.id_dossier)}>
// //                   ✅ Valider
// //                 </Button>{" "}
// //                 <Button variant="danger" size="sm" onClick={() => rejeter(d.id_dossier)}>
// //                   ❌ Rejeter
// //                 </Button>
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
//   Container, Card, Table, Button, Form, 
//   Modal, Badge, Alert, Pagination, Row, Col 
// } from "react-bootstrap";
// import { 
//   FiFile, FiUser, FiCheck, FiX, FiSend, 
//   FiDownload, FiAlertCircle, FiClock, FiFilter,
//   FiArchive, FiCheckCircle, FiSlash
// } from "react-icons/fi";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function PageComptabilite() {
//   const [dossiers, setDossiers] = useState([]);
//   const [commentaires, setCommentaires] = useState({});
//   const [statutFiltre, setStatutFiltre] = useState("tous");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [selectedDossier, setSelectedDossier] = useState(null);
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:3000/api/dossiers/a-verifier-comptabilite");
//         setDossiers(res.data);
//       } catch (err) {
//         setError("Erreur de chargement: " + (err.response?.data?.message || err.message));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   const handleChangeComment = (id, value) => {
//     setCommentaires(prev => ({ ...prev, [id]: value }));
//   };

//   const confirmer = async (id) => {
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-programmation`);
//       setSuccess("Dossier envoyé à la programmation");
//       setDossiers(dossiers.filter((d) => d.id_dossier !== id));
//     } catch (err) {
//       setError("Erreur lors de la validation: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const openRejectModal = (dossier) => {
//     setSelectedDossier(dossier);
//     setShowRejectModal(true);
//   };

//   const rejeter = async () => {
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${selectedDossier.id_dossier}/rejet`, {
//         commentaire_rejet: commentaires[selectedDossier.id_dossier] || "Non précisé",
//       });
//       setSuccess("Dossier rejeté avec succès");
//       setDossiers(dossiers.filter((d) => d.id_dossier !== selectedDossier.id_dossier));
//       setShowRejectModal(false);
//     } catch (err) {
//       setError("Erreur lors du rejet: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Filtrage et pagination
//   const dossiersFiltres = statutFiltre === "tous"
//     ? dossiers
//     : dossiers.filter((d) => (d.statut || "en cours").toLowerCase() === statutFiltre);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = dossiersFiltres.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(dossiersFiltres.length / itemsPerPage);

//   // Styles
//   const cardStyle = {
//     borderRadius: '15px',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//     border: 'none'
//   };

//   const getStatusBadge = (statut) => {
//     const status = statut || 'en cours';
//     const statusMap = {
//       'validé': { color: 'success', icon: <FiCheckCircle /> },
//       'rejeté': { color: 'danger', icon: <FiSlash /> },
//       'en cours': { color: 'warning', icon: <FiClock /> }
//     };
    
//     const config = statusMap[status.toLowerCase()] || statusMap['en cours'];
    
//     return (
//       <Badge bg={config.color} className="d-flex align-items-center">
//         {config.icon}
//         <span className="ms-1 text-capitalize">{status}</span>
//       </Badge>
//     );
//   };

//   return (
//     <Container className="mt-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">
//           <FiArchive className="me-2" style={{ color: '#4e73df' }} />
//           Validation Comptabilité
//         </h2>
//         <Badge bg="light" text="dark" className="fs-6">
//           {dossiersFiltres.length} dossier{dossiersFiltres.length !== 1 ? 's' : ''} à traiter
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

//       {/* Filter Card */}
//       <Card className="mb-4" style={cardStyle}>
//         <Card.Body>
//           <Row>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label className="d-flex align-items-center">
//                   <FiFilter className="me-2" />
//                   Filtrer par statut
//                 </Form.Label>
//                 <Form.Select 
//                   onChange={(e) => setStatutFiltre(e.target.value)} 
//                   value={statutFiltre}
//                 >
//                   <option value="tous">Tous les statuts</option>
//                   <option value="en cours">En cours</option>
//                   <option value="validé">Validé</option>
//                   <option value="rejeté">Rejeté</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

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
//                       <th>Statut</th>
//                       <th>Justificatif</th>
//                       <th>Commentaire</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.length > 0 ? (
//                       currentItems.map((d) => (
//                         <tr key={d.id_dossier}>
//                           <td>
//                             <div className="fw-bold">{d.nom_dossier}</div>
//                             <small className="text-muted">ID: {d.id_dossier}</small>
//                           </td>
//                           <td>{d.nom_proprietaire}</td>
//                           <td>{getStatusBadge(d.statut)}</td>
//                           <td>
//                             {d.fichier_url ? (
//                               <Button 
//                                 variant="link" 
//                                 href={`http://localhost:3000/uploads/${d.fichier_url}`} 
//                                 target="_blank"
//                                 className="p-0 text-decoration-none d-flex align-items-center"
//                               >
//                                 <FiDownload className="me-1" />
//                                 Voir
//                               </Button>
//                             ) : (
//                               <span className="text-muted">Aucun</span>
//                             )}
//                           </td>
//                           <td>
//                             <Form.Control
//                               as="textarea"
//                               rows={2}
//                               placeholder="Raison du rejet..."
//                               onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
//                               value={commentaires[d.id_dossier] || ''}
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               <Button
//                                 variant="success"
//                                 size="sm"
//                                 onClick={() => confirmer(d.id_dossier)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <FiCheck className="me-1" />
//                                 Valider
//                               </Button>
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 onClick={() => openRejectModal(d)}
//                                 className="d-flex align-items-center"
//                               >
//                                 <FiX className="me-1" />
//                                 Rejeter
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="text-center py-4 text-muted">
//                           Aucun dossier à afficher
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {dossiersFiltres.length > itemsPerPage && (
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
//       <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
//         <Modal.Header closeButton className="border-0 pb-0">
//           <Modal.Title className="d-flex align-items-center">
//             <FiAlertCircle className="me-2 text-danger" />
//             <span>Confirmation de rejet</span>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="mb-3">
//             Vous êtes sur le point de rejeter le dossier <strong>{selectedDossier?.nom_dossier}</strong>.
//             {commentaires[selectedDossier?.id_dossier] ? (
//               <>
//                 <br />
//                 <span className="fw-bold">Raison :</span> {commentaires[selectedDossier?.id_dossier]}
//               </>
//             ) : (
//               " Aucun commentaire n'a été saisi."
//             )}
//           </p>
//           <Form.Group className="mb-3">
//             <Form.Label>Commentaire (optionnel)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={commentaires[selectedDossier?.id_dossier] || ''}
//               onChange={(e) => handleChangeComment(selectedDossier?.id_dossier, e.target.value)}
//               placeholder="Précisez la raison du rejet..."
//             />
//           </Form.Group>
//           <div className="d-flex justify-content-end gap-2">
//             <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>
//               Annuler
//             </Button>
//             <Button 
//               variant="danger" 
//               onClick={rejeter}
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
  Modal, Badge, Alert, Pagination, Row, Col
} from "react-bootstrap";
import {
  FiFile, FiUser, FiCheck, FiX, FiSend,
  FiDownload, FiAlertCircle, FiClock, FiFilter,
  FiArchive, FiCheckCircle, FiSlash
} from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function PageComptabilite() {
  const [dossiers, setDossiers] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [statutFiltre, setStatutFiltre] = useState("tous");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/dossiers/a-verifier-comptabilite`);
        setDossiers(res.data);
      } catch (err) {
        setError("Erreur de chargement: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchDossiers();
  }, []);

  const handleChangeComment = (id, value) => {
    setCommentaires(prev => ({ ...prev, [id]: value }));
  };

  const confirmer = async (id) => {
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${id}/envoyer-programmation`);
      setSuccess("✅ Dossier envoyé à la programmation");
      setDossiers(dossiers.filter((d) => d.id_dossier !== id));
    } catch (err) {
      setError("Erreur lors de la validation: " + (err.response?.data?.message || err.message));
    }
  };

  const openRejectModal = (dossier) => {
    setSelectedDossier(dossier);
    setShowRejectModal(true);
  };

  const rejeter = async () => {
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${selectedDossier.id_dossier}/rejet`, {
        commentaire_rejet: commentaires[selectedDossier.id_dossier] || "Non précisé",
      });
      setSuccess("🚫 Dossier rejeté avec succès");
      setDossiers(dossiers.filter((d) => d.id_dossier !== selectedDossier.id_dossier));
      setShowRejectModal(false);
    } catch (err) {
      setError("Erreur lors du rejet: " + (err.response?.data?.message || err.message));
    }
  };

  const dossiersFiltres = statutFiltre === "tous"
    ? dossiers
    : dossiers.filter((d) => (d.statut || "en cours").toLowerCase() === statutFiltre);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dossiersFiltres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dossiersFiltres.length / itemsPerPage);

  const cardStyle = {
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: 'none'
  };

  const getStatusBadge = (statut) => {
    const status = statut || 'en cours';
    const statusMap = {
      'validé': { color: 'success', icon: <FiCheckCircle /> },
      'rejeté': { color: 'danger', icon: <FiSlash /> },
      'en cours': { color: 'warning', icon: <FiClock /> }
    };
    const config = statusMap[status.toLowerCase()] || statusMap['en cours'];
    return (
      <Badge bg={config.color} className="d-flex align-items-center">
        {config.icon}
        <span className="ms-1 text-capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FiArchive className="me-2" style={{ color: '#4e73df' }} />
          Validation Comptabilité
        </h2>
        <Badge bg="light" text="dark" className="fs-6">
          {dossiersFiltres.length} dossier{dossiersFiltres.length !== 1 ? 's' : ''} à traiter
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

      <Card className="mb-4" style={cardStyle}>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center">
                  <FiFilter className="me-2" />
                  Filtrer par statut
                </Form.Label>
                <Form.Select
                  onChange={(e) => setStatutFiltre(e.target.value)}
                  value={statutFiltre}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en cours">En cours</option>
                  <option value="validé">Validé</option>
                  <option value="rejeté">Rejeté</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card style={cardStyle}>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Chargement des dossiers...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th><FiFile className="me-1" /> Nom</th>
                      <th><FiUser className="me-1" /> Propriétaire</th>
                      <th>Statut</th>
                      <th>Justificatif</th>
                      <th>Commentaire</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? currentItems.map((d) => (
                      <tr key={d.id_dossier}>
                        <td>
                          <div className="fw-bold">{d.nom_dossier}</div>
                          <small className="text-muted">ID: {d.id_dossier}</small>
                        </td>
                        <td>{d.nom_proprietaire}</td>
                        <td>{getStatusBadge(d.statut)}</td>
                         
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
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Raison du rejet..."
                            onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
                            value={commentaires[d.id_dossier] || ''}
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button variant="success" size="sm" onClick={() => confirmer(d.id_dossier)}>
                              <FiCheck className="me-1" />
                              Valider
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => openRejectModal(d)}>
                              <FiX className="me-1" />
                              Rejeter
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          Aucun dossier à afficher
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {dossiersFiltres.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de rejet */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center">
            <FiAlertCircle className="me-2 text-danger" />
            Confirmation de rejet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Voulez-vous rejeter le dossier <strong>{selectedDossier?.nom_dossier}</strong> ?
            <br />
            {commentaires[selectedDossier?.id_dossier]
              ? <><strong>Raison :</strong> {commentaires[selectedDossier?.id_dossier]}</>
              : <span className="text-muted">Aucune raison spécifiée.</span>}
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Commentaire (optionnel)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentaires[selectedDossier?.id_dossier] || ''}
              onChange={(e) => handleChangeComment(selectedDossier?.id_dossier, e.target.value)}
              placeholder="Précisez la raison du rejet..."
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>Annuler</Button>
            <Button variant="danger" onClick={rejeter}>
              <FiX className="me-1" /> Confirmer le rejet
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
