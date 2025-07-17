// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Container, Table, Button, Form } from "react-bootstrap";

// // export default function PageProgrammation() {
// //   const [dossiers, setDossiers] = useState([]);
// //   const [commentaires, setCommentaires] = useState({});
// //   const [criteres, setCriteres] = useState({});

// //   useEffect(() => {
// //     const fetchDossiers = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/dossiers/programmation");
// //         setDossiers(res.data);
// //       } catch (err) {
// //         console.error("Erreur chargement dossiers :", err);
// //       }
// //     };
// //     fetchDossiers();
// //   }, []);

// //   const handleCritere = (id, champ) => {
// //     setCriteres((prev) => ({
// //       ...prev,
// //       [id]: {
// //         ...prev[id],
// //         [champ]: !prev[id]?.[champ],
// //       },
// //     }));
// //   };

// //   const estValide = (id) => {
// //     const c = criteres[id] || {};
// //     return c.critere1 && c.critere2;
// //   };

// //   const handleChangeComment = (id, value) => {
// //     setCommentaires({ ...commentaires, [id]: value });
// //   };

// //   const envoyerPaiement = async (id) => {
// //     if (!estValide(id)) {
// //       return alert("Veuillez valider tous les critères !");
// //     }
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-paiement`);
// //       alert("Dossier envoyé à Paiement !");
// //       setDossiers(dossiers.filter(d => d.id_dossier !== id));
// //     } catch (err) {
// //       alert("Erreur lors de l'envoi.");
// //     }
// //   };

// //   const rejeter = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/dossiers/${id}/rejet`, {
// //         commentaire_rejet: commentaires[id] || "Non précisé",
// //       });
// //       alert("Dossier rejeté.");
// //       setDossiers(dossiers.filter(d => d.id_dossier !== id));
// //     } catch (err) {
// //       alert("Erreur lors du rejet.");
// //     }
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h3>Programmation - Traitement des Dossiers</h3>
// //       <Table striped bordered hover responsive>
// //         <thead>
// //           <tr>
// //             <th>Nom</th>
// //             <th>Propriétaire</th>
// //             <th>Fichier</th>
// //             <th>Critères</th>
// //             <th>Commentaire (rejet)</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {dossiers.map((d) => (
// //             <tr key={d.id_dossier}>
// //               <td>{d.nom_dossier}</td>
// //               <td>{d.nom_proprietaire}</td>
// //             <td>
// //   {d.fichier_url ? (
// //     <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer">
// //       📎 Voir
// //     </a>
// //   ) : "Aucun"}
// // </td>
// //               <td>
// //                 <Form.Check
// //                   label="Budget OK"
// //                   checked={criteres[d.id_dossier]?.critere1 || false}
// //                   onChange={() => handleCritere(d.id_dossier, "critere1")}
// //                 />
// //                 <Form.Check
// //                   label="Planning OK"
// //                   checked={criteres[d.id_dossier]?.critere2 || false}
// //                   onChange={() => handleCritere(d.id_dossier, "critere2")}
// //                 />
// //               </td>
// //               <td>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={2}
// //                   placeholder="Commentaire en cas de rejet"
// //                   onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
// //                 />
// //               </td>
// //               <td>
// //                 <Button
// //                   variant="success"
// //                   size="sm"
// //                   onClick={() => envoyerPaiement(d.id_dossier)}
// //                   disabled={!estValide(d.id_dossier)}
// //                 >
// //                   ✅ Envoyer à Paiement
// //                 </Button>{" "}
// //                 <Button
// //                   variant="danger"
// //                   size="sm"
// //                   onClick={() => rejeter(d.id_dossier)}
// //                 >
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
//   Modal, Badge, Alert, Pagination 
// } from "react-bootstrap";
// import { 
//   FiFile, FiUser, FiCheck, FiX, FiSend, 
//   FiDownload, FiAlertCircle, FiClock, 
//   FiCalendar, FiDollarSign, FiCheckCircle
// } from "react-icons/fi";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function PageProgrammation() {
//   const [dossiers, setDossiers] = useState([]);
//   const [commentaires, setCommentaires] = useState({});
//   const [criteres, setCriteres] = useState({});
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
//         const res = await axios.get("http://localhost:3000/api/dossiers/programmation");
//         setDossiers(res.data);
        
//         // Initialiser les critères
//         const initialCriteres = {};
//         res.data.forEach(d => {
//           initialCriteres[d.id_dossier] = {
//             critere1: false,
//             critere2: false
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

//   const handleCritere = (id, champ) => {
//     setCriteres(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [champ]: !prev[id]?.[champ],
//       },
//     }));
//   };

//   const estValide = (id) => {
//     const c = criteres[id] || {};
//     return c.critere1 && c.critere2;
//   };

//   const handleChangeComment = (id, value) => {
//     setCommentaires(prev => ({ ...prev, [id]: value }));
//   };

//   const envoyerPaiement = async (id) => {
//     if (!estValide(id)) {
//       return setError("Veuillez valider tous les critères avant d'envoyer");
//     }
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-paiement`);
//       setSuccess("Dossier envoyé au paiement avec succès");
//       setDossiers(dossiers.filter(d => d.id_dossier !== id));
//     } catch (err) {
//       setError("Erreur lors de l'envoi: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const openRejectModal = (dossier) => {
//     setSelectedDossier(dossier);
//     setShowRejectModal(true);
//   };

//   const confirmerRejet = async () => {
//     try {
//       setError(null);
//       await axios.put(`http://localhost:3000/api/dossiers/${selectedDossier.id_dossier}/rejet`, {
//         commentaire_rejet: commentaires[selectedDossier.id_dossier] || "Non précisé",
//       });
//       setSuccess("Dossier rejeté avec succès");
//       setDossiers(dossiers.filter(d => d.id_dossier !== selectedDossier.id_dossier));
//       setShowRejectModal(false);
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
//     const status = statut || 'en cours';
//     const statusMap = {
//       'validé': { color: 'success', icon: <FiCheckCircle /> },
//       'rejeté': { color: 'danger', icon: <FiX /> },
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
//           <FiCalendar className="me-2" style={{ color: '#4e73df' }} />
//           Programmation des Dossiers
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
//                       <th>Statut</th>
//                       <th>Fichier</th>
//                       <th>Validation</th>
//                       <th>Commentaire</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.length > 0 ? (
//                       currentItems.map((d) => (
//                         <tr key={d.id_dossier} className={estValide(d.id_dossier) ? 'table-success' : ''}>
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
//                             <div className="d-flex flex-column gap-2">
//                               <Form.Check
//                                 type="switch"
//                                 id={`budget-${d.id_dossier}`}
//                                 label={
//                                   <span className="d-flex align-items-center">
//                                     <FiDollarSign className="me-1" />
//                                     Budget OK
//                                   </span>
//                                 }
//                                 checked={criteres[d.id_dossier]?.critere1 || false}
//                                 onChange={() => handleCritere(d.id_dossier, "critere1")}
//                               />
//                               <Form.Check
//                                 type="switch"
//                                 id={`planning-${d.id_dossier}`}
//                                 label={
//                                   <span className="d-flex align-items-center">
//                                     <FiCalendar className="me-1" />
//                                     Planning OK
//                                   </span>
//                                 }
//                                 checked={criteres[d.id_dossier]?.critere2 || false}
//                                 onChange={() => handleCritere(d.id_dossier, "critere2")}
//                               />
//                             </div>
//                           </td>
//                           <td>
//                             <Form.Control
//                               as="textarea"
//                               rows={2}
//                               placeholder="Commentaire..."
//                               onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)}
//                               value={commentaires[d.id_dossier] || ''}
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex flex-column gap-2">
//                               <Button
//                                 variant={estValide(d.id_dossier) ? "success" : "outline-success"}
//                                 onClick={() => envoyerPaiement(d.id_dossier)}
//                                 disabled={!estValide(d.id_dossier)}
//                                 className="d-flex align-items-center justify-content-center"
//                               >
//                                 <FiSend className="me-1" />
//                                 Paiement
//                               </Button>
//                               <Button
//                                 variant="outline-danger"
//                                 onClick={() => openRejectModal(d)}
//                                 className="d-flex align-items-center justify-content-center"
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
//                         <td colSpan="7" className="text-center py-4 text-muted">
//                           Aucun dossier à programmer
//                         </td>
//                       </tr>
//                     )}
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
//           </p>
//           <Form.Group className="mb-3">
//             <Form.Label>Commentaire (obligatoire)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={commentaires[selectedDossier?.id_dossier] || ''}
//               onChange={(e) => handleChangeComment(selectedDossier?.id_dossier, e.target.value)}
//               placeholder="Veuillez préciser la raison du rejet..."
//               required
//             />
//           </Form.Group>
//           <div className="d-flex justify-content-end gap-2">
//             <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>
//               Annuler
//             </Button>
//             <Button 
//               variant="danger" 
//               onClick={confirmerRejet}
//               disabled={!commentaires[selectedDossier?.id_dossier]?.trim()}
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
  FiDownload, FiAlertCircle, FiClock,
  FiCalendar, FiDollarSign, FiCheckCircle
} from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};
const API_BASE_URL = getApiBaseUrl();

export default function PageProgrammation() {
  const [dossiers, setDossiers] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [criteres, setCriteres] = useState({});
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
        const res = await axios.get(`${API_BASE_URL}/api/dossiers/programmation`);
        setDossiers(res.data);

        const initialCriteres = {};
        res.data.forEach(d => {
          initialCriteres[d.id_dossier] = {
            critere1: false,
            critere2: false
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

  const handleCritere = (id, champ) => {
    setCriteres(prev => ({
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
    setCommentaires(prev => ({ ...prev, [id]: value }));
  };

  const envoyerPaiement = async (id) => {
    if (!estValide(id)) {
      return setError("Veuillez valider tous les critères avant d'envoyer");
    }
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${id}/envoyer-paiement`);
      setSuccess("Dossier envoyé au paiement avec succès");
      setDossiers(dossiers.filter(d => d.id_dossier !== id));
    } catch (err) {
      setError("Erreur lors de l'envoi: " + (err.response?.data?.message || err.message));
    }
  };

  const openRejectModal = (dossier) => {
    setSelectedDossier(dossier);
    setShowRejectModal(true);
  };

  const confirmerRejet = async () => {
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/api/dossiers/${selectedDossier.id_dossier}/rejet`, {
        commentaire_rejet: commentaires[selectedDossier.id_dossier] || "Non précisé",
      });
      setSuccess("Dossier rejeté avec succès");
      setDossiers(dossiers.filter(d => d.id_dossier !== selectedDossier.id_dossier));
      setShowRejectModal(false);
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
    const status = statut || 'en cours';
    const statusMap = {
      'validé': { color: 'success', icon: <FiCheckCircle /> },
      'rejeté': { color: 'danger', icon: <FiX /> },
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
          <FiCalendar className="me-2 text-primary" /> Programmation des Dossiers
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
                      <th>Statut</th>
                      <th>Fichier</th>
                      <th>Validation</th>
                      <th>Commentaire</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((d) => (
                        <tr key={d.id_dossier} className={estValide(d.id_dossier) ? 'table-success' : ''}>
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
                            <div className="d-flex flex-column gap-2">
                              <Form.Check type="switch" id={`budget-${d.id_dossier}`} label={<span className="d-flex align-items-center"><FiDollarSign className="me-1" /> Budget OK</span>} checked={criteres[d.id_dossier]?.critere1 || false} onChange={() => handleCritere(d.id_dossier, "critere1")} />
                              <Form.Check type="switch" id={`planning-${d.id_dossier}`} label={<span className="d-flex align-items-center"><FiCalendar className="me-1" /> Planning OK</span>} checked={criteres[d.id_dossier]?.critere2 || false} onChange={() => handleCritere(d.id_dossier, "critere2")} />
                            </div>
                          </td>
                          <td>
                            <Form.Control as="textarea" rows={2} placeholder="Commentaire..." onChange={(e) => handleChangeComment(d.id_dossier, e.target.value)} value={commentaires[d.id_dossier] || ''} />
                          </td>
                          <td>
                            <div className="d-flex flex-column gap-2">
                              <Button variant={estValide(d.id_dossier) ? "success" : "outline-success"} onClick={() => envoyerPaiement(d.id_dossier)} disabled={!estValide(d.id_dossier)} className="d-flex align-items-center justify-content-center">
                                <FiSend className="me-1" /> Paiement
                              </Button>
                              <Button variant="outline-danger" onClick={() => openRejectModal(d)} className="d-flex align-items-center justify-content-center">
                                <FiX className="me-1" /> Rejeter
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          Aucun dossier à programmer
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {dossiers.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
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

      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center">
            <FiAlertCircle className="me-2 text-danger" />
            <span>Confirmation de rejet</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Vous êtes sur le point de rejeter le dossier <strong>{selectedDossier?.nom_dossier}</strong>.
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Commentaire (obligatoire)</Form.Label>
            <Form.Control as="textarea" rows={3} value={commentaires[selectedDossier?.id_dossier] || ''} onChange={(e) => handleChangeComment(selectedDossier?.id_dossier, e.target.value)} placeholder="Veuillez préciser la raison du rejet..." required />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmerRejet} disabled={!commentaires[selectedDossier?.id_dossier]?.trim()} className="d-flex align-items-center">
              <FiX className="me-1" />
              Confirmer le rejet
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
