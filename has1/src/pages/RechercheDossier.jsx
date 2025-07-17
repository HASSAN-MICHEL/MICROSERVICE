
// // // // import { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Container, Form, ListGroup, Row, Col, Spinner } from "react-bootstrap";

// // // // export default function RechercheDossier() {
// // // //   const [query, setQuery] = useState("");
// // // //   const [dossiers, setDossiers] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [sort, setSort] = useState("desc");
// // // //   const [filtreEtape, setFiltreEtape] = useState("");

// // // //   // Chargement initial de tous les dossiers
// // // //   useEffect(() => {
// // // //     fetchDossiers();
// // // //   }, [sort, filtreEtape]);

// // // //   // Recherche dynamique avec debounce
// // // //   useEffect(() => {
// // // //     const timer = setTimeout(() => {
// // // //       fetchDossiers();
// // // //     }, 400);
// // // //     return () => clearTimeout(timer);
// // // //   }, [query]);

// // // //   const fetchDossiers = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await axios.get("http://localhost:3000/api/dossiers/recherche", {
// // // //         params: {
// // // //           query,
// // // //           sort,
// // // //           etape: filtreEtape
// // // //         }
// // // //       });
// // // //       setDossiers(res.data);
// // // //     } catch (err) {
// // // //       console.error("Erreur chargement:", err);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     <Container className="mt-4">
// // // //       <h3 className="mb-4">🔍 Rechercher un dossier</h3>

// // // //       <Row className="mb-3">
// // // //         <Col md={6}>
// // // //           <Form.Control
// // // //             placeholder="Nom du dossier ou du propriétaire"
// // // //             value={query}
// // // //             onChange={(e) => setQuery(e.target.value)}
// // // //           />
// // // //         </Col>
// // // //         <Col md={3}>
// // // //           <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
// // // //             <option value="desc">Plus récents</option>
// // // //             <option value="asc">Plus anciens</option>
// // // //           </Form.Select>
// // // //         </Col>
// // // //         <Col md={3}>
// // // //           <Form.Select value={filtreEtape} onChange={(e) => setFiltreEtape(e.target.value)}>
// // // //             <option value="">Toutes les étapes</option>
// // // //             <option value="initialisation">Initialisation</option>
// // // //             <option value="en attente">En attente</option>
// // // //             <option value="traitement">Traitement</option>
// // // //             <option value="terminé">Terminé</option>
// // // //           </Form.Select>
// // // //         </Col>
// // // //       </Row>

// // // //       {loading && <Spinner animation="border" size="sm" className="mb-2" />}

// // // //       <ListGroup>
// // // //         {dossiers.map((d) => (
// // // //           <ListGroup.Item key={d.id_dossier}>
// // // //             <strong>{d.nom_dossier}</strong> — {d.nom_proprietaire} |
// // // //             Étape : {d.etape_actuelle} | Créé le :{" "}
// // // //             {new Date(d.date_depot).toLocaleDateString()}
// // // //           </ListGroup.Item>
// // // //         ))}
// // // //         {!loading && dossiers.length === 0 && (
// // // //           <div className="text-muted">Aucun résultat trouvé.</div>
// // // //         )}
// // // //       </ListGroup>
// // // //     </Container>
// // // //   );
// // // // }


// // // import { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Container, Form, ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";

// // // // Configuration centralisée de l'URL API
// // // const getApiBaseUrl = () => {
// // //   if (process.env.NODE_ENV === 'development' || 
// // //       window.location.hostname === "localhost" || 
// // //       window.location.hostname === "127.0.0.1") {
// // //     return `http://${window.location.hostname}:3000`;
// // //   }
// // //   return `http://${window.location.hostname}:3000`; // Pour le réseau local
// // // };

// // // const API_BASE_URL = getApiBaseUrl();

// // // export default function RechercheDossier() {
// // //   const [query, setQuery] = useState("");
// // //   const [dossiers, setDossiers] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [sort, setSort] = useState("desc");
// // //   const [filtreEtape, setFiltreEtape] = useState("");
// // //   const [error, setError] = useState(null);

// // //   // Chargement initial de tous les dossiers
// // //   useEffect(() => {
// // //     fetchDossiers();
// // //   }, [sort, filtreEtape]);

// // //   // Recherche dynamique avec debounce
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       fetchDossiers();
// // //     }, 400);
// // //     return () => clearTimeout(timer);
// // //   }, [query]);

// // //   const fetchDossiers = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const res = await axios.get(`${API_BASE_URL}/api/dossiers/recherche`, {
// // //         params: {
// // //           query,
// // //           sort,
// // //           etape: filtreEtape
// // //         },
// // //         timeout: 10000 // 10 secondes timeout
// // //       });
// // //       setDossiers(res.data);
// // //     } catch (err) {
// // //       console.error("Erreur recherche:", {
// // //         url: `${API_BASE_URL}/api/dossiers/recherche`,
// // //         error: err,
// // //         message: err.message,
// // //         code: err.code
// // //       });
      
// // //       let errorMessage = "Erreur lors de la recherche";
// // //       if (err.code === "ECONNABORTED") {
// // //         errorMessage = "Le serveur ne répond pas - vérifiez votre connexion";
// // //       } else if (err.response?.status === 404) {
// // //         errorMessage = "Endpoint non trouvé";
// // //       } else if (!err.response) {
// // //         errorMessage = `Impossible de joindre le serveur à ${API_BASE_URL}`;
// // //       }
      
// // //       setError(`${errorMessage}: ${err.message}`);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <Container className="mt-4">
// // //       <h3 className="mb-4">🔍 Rechercher un dossier</h3>
      
// // //       {error && (
// // //         <Alert variant="danger" className="mb-3">
// // //           {error}
// // //           <div className="mt-2 small">
// // //             URL du serveur: {API_BASE_URL}
// // //           </div>
// // //         </Alert>
// // //       )}

// // //       <Row className="mb-3">
// // //         <Col md={6}>
// // //           <Form.Control
// // //             placeholder="Nom du dossier ou du propriétaire"
// // //             value={query}
// // //             onChange={(e) => setQuery(e.target.value)}
// // //           />
// // //         </Col>
// // //         <Col md={3}>
// // //           <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
// // //             <option value="desc">Plus récents</option>
// // //             <option value="asc">Plus anciens</option>
// // //           </Form.Select>
// // //         </Col>
// // //         <Col md={3}>
// // //           <Form.Select value={filtreEtape} onChange={(e) => setFiltreEtape(e.target.value)}>
// // //             <option value="">Toutes les étapes</option>
// // //             <option value="initialisation">Initialisation</option>
// // //             <option value="en attente">En attente</option>
// // //             <option value="traitement">Traitement</option>
// // //             <option value="terminé">Terminé</option>
// // //           </Form.Select>
// // //         </Col>
// // //       </Row>

// // //       {loading && (
// // //         <div className="text-center my-4">
// // //           <Spinner animation="border" />
// // //           <p className="mt-2">Recherche en cours...</p>
// // //         </div>
// // //       )}

// // //       <ListGroup>
// // //         {dossiers.map((d) => (
// // //           <ListGroup.Item key={d.id_dossier} action onClick={() => {
// // //             // Navigation vers le détail du dossier si nécessaire
// // //             // window.location.href = `/dossier/${d.id_dossier}`;
// // //           }}>
// // //             <div className="d-flex justify-content-between">
// // //               <div>
// // //                 <strong>{d.nom_dossier}</strong> — {d.nom_proprietaire}
// // //               </div>
// // //               <small className="text-muted">
// // //                 {new Date(d.date_depot).toLocaleDateString()}
// // //               </small>
// // //             </div>
// // //             <div className="mt-1">
// // //               <span className={`badge bg-${getEtapeColor(d.etape_actuelle)}`}>
// // //                 {d.etape_actuelle}
// // //               </span>
// // //             </div>
// // //           </ListGroup.Item>
// // //         ))}
// // //         {!loading && dossiers.length === 0 && (
// // //           <div className="text-muted py-4 text-center">
// // //             Aucun résultat trouvé pour "{query}"
// // //           </div>
// // //         )}
// // //       </ListGroup>
      
// // //       {/* <div className="mt-3 text-muted small">
// // //         <small>Serveur API: {API_BASE_URL}</small>
// // //       </div> */}
// // //     </Container>
// // //   );
// // // }

// // // // Helper pour les couleurs des étapes
// // // function getEtapeColor(etape) {
// // //   switch(etape) {
// // //     case 'initialisation': return 'primary';
// // //     case 'en attente': return 'warning';
// // //     case 'traitement': return 'info';
// // //     case 'terminé': return 'success';
// // //     default: return 'secondary';
// // //   }
// // // }



// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { 
// //   Container, Form, ListGroup, Row, Col, 
// //   Spinner, Alert, Modal, Button, Badge 
// // } from "react-bootstrap";

// // const getApiBaseUrl = () => {
// //   if (process.env.NODE_ENV === 'development' || 
// //       window.location.hostname === "localhost" || 
// //       window.location.hostname === "127.0.0.1") {
// //     return `http://${window.location.hostname}:3000`;
// //   }
// //   return `http://${window.location.hostname}:3000`;
// // };

// // const API_BASE_URL = getApiBaseUrl();

// // export default function RechercheDossier() {
// //   const [query, setQuery] = useState("");
// //   const [dossiers, setDossiers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [sort, setSort] = useState("desc");
// //   const [filtreEtape, setFiltreEtape] = useState("");
// //   const [error, setError] = useState(null);
// //   const [showBilan, setShowBilan] = useState(false);
// //   const [dossierSelectionne, setDossierSelectionne] = useState(null);
// //   const [historique, setHistorique] = useState([]);

// //   useEffect(() => {
// //     fetchDossiers();
// //   }, [sort, filtreEtape]);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       fetchDossiers();
// //     }, 400);
// //     return () => clearTimeout(timer);
// //   }, [query]);

// //   const fetchDossiers = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const res = await axios.get(`${API_BASE_URL}/api/dossiers/recherche`, {
// //         params: { query, sort, etape: filtreEtape },
// //         timeout: 10000
// //       });
// //       setDossiers(res.data);
// //     } catch (err) {
// //       console.error("Erreur recherche:", err);
// //       setError(`Erreur lors de la recherche: ${err.message}`);
// //     }
// //     setLoading(false);
// //   };

// //   const fetchBilanDossier = async (id) => {
// //     try {
// //       const res = await axios.get(`${API_BASE_URL}/api/dossiers/${id}/bilan`);
// //       setDossierSelectionne(res.data.dossier);
// //       setHistorique(res.data.historique);
// //       setShowBilan(true);
// //     } catch (err) {
// //       console.error("Erreur chargement bilan:", err);
// //       setError(`Erreur lors du chargement du bilan: ${err.message}`);
// //     }
// //   };

// //   const getDelaiTotal = () => {
// //     if (historique.length < 2) return "0 jours";
// //     const premier = new Date(historique[0].date_action);
// //     const dernier = new Date(historique[historique.length - 1].date_action);
// //     const jours = Math.round((dernier - premier) / (1000 * 60 * 60 * 24));
// //     return `${jours} jours`;
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h3 className="mb-4">🔍 Rechercher un dossier</h3>
      
// //       {error && (
// //         <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
// //           {error}
// //         </Alert>
// //       )}

// //       <Row className="mb-3">
// //         <Col md={6}>
// //           <Form.Control
// //             placeholder="Nom du dossier ou du propriétaire"
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //           />
// //         </Col>
// //         <Col md={3}>
// //           <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
// //             <option value="desc">Plus récents</option>
// //             <option value="asc">Plus anciens</option>
// //           </Form.Select>
// //         </Col>
// //         <Col md={3}>
// //           <Form.Select value={filtreEtape} onChange={(e) => setFiltreEtape(e.target.value)}>
// //             <option value="">Toutes les étapes</option>
// //             <option value="Secrétariat">Secrétariat</option>
// //             <option value="depense">Dépense</option>
// //             <option value="comptabilite">Comptabilité</option>
// //             <option value="programmation">Programmation</option>
// //             <option value="paiement">Paiement</option>
// //             <option value="confirmé">Confirmé</option>
// //             <option value="rejeté">Rejeté</option>
// //           </Form.Select>
// //         </Col>
// //       </Row>

// //       {loading && (
// //         <div className="text-center my-4">
// //           <Spinner animation="border" />
// //           <p className="mt-2">Recherche en cours...</p>
// //         </div>
// //       )}

// //       <ListGroup>
// //         {dossiers.map((d) => (
// //           <ListGroup.Item key={d.id_dossier}>
// //             <div className="d-flex justify-content-between align-items-center">
// //               <div>
// //                 <strong>{d.nom_dossier}</strong> — {d.nom_proprietaire}
// //                 <div className="mt-1">
// //                   <Badge bg={getEtapeColor(d.etape_actuelle)}>
// //                     {d.etape_actuelle}
// //                   </Badge>
// //                 </div>
// //               </div>
// //               <div>
// //                 <small className="text-muted me-3">
// //                   {new Date(d.date_depot).toLocaleDateString()}
// //                 </small>
// //                 <Button 
// //                   variant="outline-primary" 
// //                   size="sm"
// //                   onClick={() => fetchBilanDossier(d.id_dossier)}
// //                 >
// //                   Bilan
// //                 </Button>
// //               </div>
// //             </div>
// //           </ListGroup.Item>
// //         ))}
// //         {!loading && dossiers.length === 0 && (
// //           <div className="text-muted py-4 text-center">
// //             Aucun résultat trouvé pour "{query}"
// //           </div>
// //         )}
// //       </ListGroup>

// //       {/* Modal pour afficher le bilan */}
// //       <Modal show={showBilan} onHide={() => setShowBilan(false)} size="lg">
// //         <Modal.Header closeButton>
// //           <Modal.Title>
// //             Bilan du dossier: {dossierSelectionne?.nom_dossier}
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {dossierSelectionne && (
// //             <div className="mb-4">
// //               <h5>Informations générales</h5>
// //               <Row>
// //                 <Col md={6}>
// //                   <p><strong>Propriétaire:</strong> {dossierSelectionne.nom_proprietaire}</p>
// //                   <p><strong>Statut:</strong> <Badge bg={getEtapeColor(dossierSelectionne.statut)}>
// //                     {dossierSelectionne.statut}
// //                   </Badge></p>
// //                 </Col>
// //                 <Col md={6}>
// //                   <p><strong>Date dépôt:</strong> {new Date(dossierSelectionne.date_depot).toLocaleDateString()}</p>
// //                   <p><strong>Délai total:</strong> {getDelaiTotal()}</p>
// //                 </Col>
// //               </Row>
              
// //               <h5 className="mt-4">Historique du cheminement</h5>
// //               <div className="timeline">
// //                 {historique.map((etape, index) => (
// //                   <div key={index} className="timeline-item mb-3">
// //                     <div className="d-flex">
// //                       <div className="timeline-badge bg-primary me-3"></div>
// //                       <div>
// //                         <strong>{etape.etape_suivante}</strong>
// //                         <div className="text-muted small">
// //                           {new Date(etape.date_action).toLocaleString()}
// //                         </div>
// //                         <div>
// //                           <small className="text-muted">
// //                             Par: {etape.acteur}
// //                           </small>
// //                         </div>
// //                         {etape.decision && (
// //                           <div>
// //                             <Badge bg="info">{etape.decision}</Badge>
// //                           </div>
// //                         )}
// //                         {etape.commentaire && (
// //                           <div className="mt-1">
// //                             <em>"{etape.commentaire}"</em>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowBilan(false)}>
// //             Fermer
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   );
// // }

// // function getEtapeColor(etape) {
// //   switch(etape?.toLowerCase()) {
// //     case 'secrétariat': return 'primary';
// //     case 'depense': return 'warning';
// //     case 'comptabilite': return 'info';
// //     case 'programmation': return 'secondary';
// //     case 'paiement': return 'dark';
// //     case 'confirmé': return 'success';
// //     case 'rejeté': return 'danger';
// //     default: return 'light';
// //   }
// // }




// import { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Container, Form, ListGroup, Row, Col, 
//   Spinner, Alert, Modal, Button, Badge,
//   Tab, Tabs, Table
// } from "react-bootstrap";

// const getApiBaseUrl = () => {
//   if (process.env.NODE_ENV === 'development' || 
//       window.location.hostname === "localhost" || 
//       window.location.hostname === "127.0.0.1") {
//     return `http://${window.location.hostname}:3000`;
//   }
//   return `http://${window.location.hostname}:3000`;
// };

// const API_BASE_URL = getApiBaseUrl();

// export default function RechercheDossier() {
//   const [query, setQuery] = useState("");
//   const [dossiers, setDossiers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sort, setSort] = useState("desc");
//   const [filtreEtape, setFiltreEtape] = useState("");
//   const [error, setError] = useState(null);
//   const [showBilan, setShowBilan] = useState(false);
//   const [showBilanProprietaire, setShowBilanProprietaire] = useState(false);
//   const [dossierSelectionne, setDossierSelectionne] = useState(null);
//   const [bilanProprietaire, setBilanProprietaire] = useState(null);
//   const [historique, setHistorique] = useState([]);

//   useEffect(() => {
//     fetchDossiers();
//   }, [sort, filtreEtape]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchDossiers();
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [query]);

//   const fetchDossiers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/dossiers/recherche`, {
//         params: { query, sort, etape: filtreEtape },
//         timeout: 10000
//       });
//       setDossiers(res.data);
//     } catch (err) {
//       console.error("Erreur recherche:", err);
//       setError(`Erreur lors de la recherche: ${err.message}`);
//     }
//     setLoading(false);
//   };

//   const fetchBilanDossier = async (id) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/dossiers/${id}/bilan`);
//       setDossierSelectionne(res.data.dossier);
//       setHistorique(res.data.historique);
//       setShowBilan(true);
//     } catch (err) {
//       console.error("Erreur chargement bilan:", err);
//       setError(`Erreur lors du chargement du bilan: ${err.message}`);
//     }
//   };

//   const fetchBilanProprietaire = async (nomProprietaire) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/dossiers/proprietaire/bilan`, {
//         params: { nom_proprietaire: nomProprietaire }
//       });
//       setBilanProprietaire(res.data);
//       setShowBilanProprietaire(true);
//     } catch (err) {
//       console.error("Erreur chargement bilan propriétaire:", err);
//       setError(`Erreur lors du chargement du bilan propriétaire: ${err.message}`);
//     }
//     setLoading(false);
//   };

//   const getDelaiTotal = () => {
//     if (historique.length < 2) return "0 jours";
//     const premier = new Date(historique[0].date_action);
//     const dernier = new Date(historique[historique.length - 1].date_action);
//     const jours = Math.round((dernier - premier) / (1000 * 60 * 60 * 24));
//     return `${jours} jours`;
//   };

//   const getEtapeColor = (etape) => {
//     switch(etape?.toLowerCase()) {
//       case 'secrétariat': return 'primary';
//       case 'depense': return 'warning';
//       case 'comptabilite': return 'info';
//       case 'programmation': return 'secondary';
//       case 'paiement': return 'dark';
//       case 'confirmé': return 'success';
//       case 'rejeté': return 'danger';
//       default: return 'light';
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">🔍 Rechercher un dossier</h3>
      
//       {error && (
//         <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
//           {error}
//         </Alert>
//       )}

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Control
//             placeholder="Nom du dossier ou du propriétaire"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </Col>
//         <Col md={3}>
//           <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
//             <option value="desc">Plus récents</option>
//             <option value="asc">Plus anciens</option>
//           </Form.Select>
//         </Col>
//         <Col md={3}>
//           <Form.Select value={filtreEtape} onChange={(e) => setFiltreEtape(e.target.value)}>
//             <option value="">Toutes les étapes</option>
//             <option value="Secrétariat">Secrétariat</option>
//             <option value="depense">Dépense</option>
//             <option value="comptabilite">Comptabilité</option>
//             <option value="programmation">Programmation</option>
//             <option value="paiement">Paiement</option>
//             <option value="confirmé">Confirmé</option>
//             <option value="rejeté">Rejeté</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       {loading && (
//         <div className="text-center my-4">
//           <Spinner animation="border" />
//           <p className="mt-2">Recherche en cours...</p>
//         </div>
//       )}

//       <ListGroup>
//         {dossiers.map((d) => (
//           <ListGroup.Item key={d.id_dossier}>
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <strong>{d.nom_dossier}</strong> — {d.nom_proprietaire}
//                 <div className="mt-1">
//                   <Badge bg={getEtapeColor(d.etape_actuelle)}>
//                     {d.etape_actuelle}
//                   </Badge>
//                 </div>
//               </div>
//               <div>
//                 <small className="text-muted me-3">
//                   {new Date(d.date_depot).toLocaleDateString()}
//                 </small>
//                 <Button 
//                   variant="outline-primary" 
//                   size="sm"
//                   onClick={() => fetchBilanDossier(d.id_dossier)}
//                   className="me-2"
//                 >
//                   Bilan
//                 </Button>
//                 <Button 
//                   variant="outline-info" 
//                   size="sm"
//                   onClick={() => fetchBilanProprietaire(d.nom_proprietaire)}
//                 >
//                   Bilan Propriétaire
//                 </Button>
//               </div>
//             </div>
//           </ListGroup.Item>
//         ))}
//         {!loading && dossiers.length === 0 && (
//           <div className="text-muted py-4 text-center">
//             Aucun résultat trouvé pour "{query}"
//           </div>
//         )}
//       </ListGroup>

//       {/* Modal pour afficher le bilan d'un dossier */}
//       <Modal show={showBilan} onHide={() => setShowBilan(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Bilan du dossier: {dossierSelectionne?.nom_dossier}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {dossierSelectionne && (
//             <div className="mb-4">
//               <h5>Informations générales</h5>
//               <Row>
//                 <Col md={6}>
//                   <p><strong>Propriétaire:</strong> {dossierSelectionne.nom_proprietaire}</p>
//                   <p><strong>Statut:</strong> <Badge bg={getEtapeColor(dossierSelectionne.statut)}>
//                     {dossierSelectionne.statut}
//                   </Badge></p>
//                 </Col>
//                 <Col md={6}>
//                   <p><strong>Date dépôt:</strong> {new Date(dossierSelectionne.date_depot).toLocaleDateString()}</p>
//                   <p><strong>Délai total:</strong> {getDelaiTotal()}</p>
//                 </Col>
//               </Row>
              
//               <h5 className="mt-4">Historique du cheminement</h5>
//               <div className="timeline">
//                 {historique.map((etape, index) => (
//                   <div key={index} className="timeline-item mb-3">
//                     <div className="d-flex">
//                       <div className="timeline-badge bg-primary me-3"></div>
//                       <div>
//                         <strong>{etape.etape_suivante}</strong>
//                         <div className="text-muted small">
//                           {new Date(etape.date_action).toLocaleString()}
//                         </div>
//                         <div>
//                           <small className="text-muted">
//                             Par: {etape.acteur}
//                           </small>
//                         </div>
//                         {etape.decision && (
//                           <div>
//                             <Badge bg="info">{etape.decision}</Badge>
//                           </div>
//                         )}
//                         {etape.commentaire && (
//                           <div className="mt-1">
//                             <em>"{etape.commentaire}"</em>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBilan(false)}>
//             Fermer
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal pour afficher le bilan du propriétaire */}
//       <Modal show={showBilanProprietaire} onHide={() => setShowBilanProprietaire(false)} size="xl">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Bilan complet pour: {bilanProprietaire?.proprietaire}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {bilanProprietaire && (
//             <div>
//               <Tabs defaultActiveKey="stats" className="mb-3">
//                 <Tab eventKey="stats" title="Statistiques">
//                   <Row className="mt-3">
//                     <Col md={6}>
//                       <h5>Répartition par étape</h5>
//                       <Table striped bordered hover>
//                         <thead>
//                           <tr>
//                             <th>Étape</th>
//                             <th>Nombre de dossiers</th>
//                             <th>Jours moyen</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {bilanProprietaire.statistiques.par_etape.map((stat, idx) => (
//                             <tr key={idx}>
//                               <td><Badge bg={getEtapeColor(stat.etape_actuelle)}>{stat.etape_actuelle}</Badge></td>
//                               <td>{stat.nombre_dossiers}</td>
//                               <td>{stat.jours_moyen.toFixed(1)} jours</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </Col>
//                     <Col md={6}>
//                       <h5>Temps moyen par étape</h5>
//                       <Table striped bordered hover>
//                         <thead>
//                           <tr>
//                             <th>Étape</th>
//                             <th>Jours moyen</th>
//                             <th>Nombre transitions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {bilanProprietaire.statistiques.temps_moyen_par_etape.map((stat, idx) => (
//                             <tr key={idx}>
//                               <td>{stat.etape}</td>
//                               <td>{stat.jours_moyen.toFixed(1)} jours</td>
//                               <td>{stat.nombre_transitions}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </Col>
//                   </Row>

//                   <Row className="mt-4">
//                     <Col md={6}>
//                       <h5>Répartition par type</h5>
//                       <Table striped bordered hover>
//                         <thead>
//                           <tr>
//                             <th>Type</th>
//                             <th>Nombre</th>
//                             <th>Jours moyen</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {bilanProprietaire.statistiques.par_type.map((stat, idx) => (
//                             <tr key={idx}>
//                               <td>{stat.nom_type}</td>
//                               <td>{stat.nombre_dossiers}</td>
//                               <td>{stat.jours_moyen.toFixed(1)} jours</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </Col>
//                     <Col md={6}>
//                       <h5>Répartition par nature</h5>
//                       <Table striped bordered hover>
//                         <thead>
//                           <tr>
//                             <th>Nature</th>
//                             <th>Nombre</th>
//                             <th>Jours moyen</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {bilanProprietaire.statistiques.par_nature.map((stat, idx) => (
//                             <tr key={idx}>
//                               <td>{stat.nom_nature}</td>
//                               <td>{stat.nombre_dossiers}</td>
//                               <td>{stat.jours_moyen.toFixed(1)} jours</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </Col>
//                   </Row>
//                 </Tab>

//                 <Tab eventKey="dossiers" title="Liste des dossiers">
//                   <h5 className="mt-3">Dossiers récemment modifiés</h5>
//                   <Table striped bordered hover>
//                     <thead>
//                       <tr>
//                         <th>Dossier</th>
//                         <th>Étape</th>
//                         <th>Dernière modification</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {bilanProprietaire.dossiers_recemment_modifies.map((d, idx) => (
//                         <tr key={idx}>
//                           <td>{d.nom_dossier}</td>
//                           <td><Badge bg={getEtapeColor(d.etape_actuelle)}>{d.etape_actuelle}</Badge></td>
//                           <td>{new Date(d.date_modification).toLocaleDateString()}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>

//                   <h5 className="mt-4">Dossiers bloqués ({bilanProprietaire.alertes.nombre_dossiers_bloques})</h5>
//                   {bilanProprietaire.alertes.nombre_dossiers_bloques > 0 ? (
//                     <Table striped bordered hover>
//                       <thead>
//                         <tr>
//                           <th>Dossier</th>
//                           <th>Étape</th>
//                           <th>Dernière modification</th>
//                           <th>Jours d'inactivité</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {bilanProprietaire.alertes.dossiers_bloques.map((d, idx) => (
//                           <tr key={idx}>
//                             <td>{d.nom_dossier}</td>
//                             <td><Badge bg={getEtapeColor(d.etape_actuelle)}>{d.etape_actuelle}</Badge></td>
//                             <td>{new Date(d.date_modification).toLocaleDateString()}</td>
//                             <td>{Math.round(d.jours_inactifs)} jours</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <p className="text-muted">Aucun dossier bloqué</p>
//                   )}
//                 </Tab>

//                 <Tab eventKey="all" title="Tous les dossiers">
//                   <h5 className="mt-3">Liste complète ({bilanProprietaire.total_dossiers} dossiers)</h5>
//                   <Table striped bordered hover responsive>
//                     <thead>
//                       <tr>
//                         <th>Dossier</th>
//                         <th>Type</th>
//                         <th>Nature</th>
//                         <th>Étape</th>
//                         <th>Statut</th>
//                         <th>Date dépôt</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {bilanProprietaire.liste_complete_dossiers.map((d, idx) => (
//                         <tr key={idx}>
//                           <td>{d.nom_dossier}</td>
//                           <td>{d.type}</td>
//                           <td>{d.nature}</td>
//                           <td><Badge bg={getEtapeColor(d.etape_actuelle)}>{d.etape_actuelle}</Badge></td>
//                           <td><Badge bg={getEtapeColor(d.statut)}>{d.statut}</Badge></td>
//                           <td>{new Date(d.date_depot).toLocaleDateString()}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Tab>
//               </Tabs>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowBilanProprietaire(false)}>
//             Fermer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, Form, ListGroup, Row, Col, 
  Spinner, Alert, Modal, Button, Badge,
  Tab, Tabs, Table
} from "react-bootstrap";

const getApiBaseUrl = () => {
  return process.env.NODE_ENV === 'development' 
    ? `http://${window.location.hostname}:3000`
    : `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function RechercheDossier() {
  const [query, setQuery] = useState("");
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBilan, setLoadingBilan] = useState(false);
  const [sort, setSort] = useState("desc");
  const [filtreEtape, setFiltreEtape] = useState("");
  const [error, setError] = useState(null);
  const [showBilan, setShowBilan] = useState(false);
  const [showBilanProprietaire, setShowBilanProprietaire] = useState(false);
  const [dossierSelectionne, setDossierSelectionne] = useState(null);
  const [bilanProprietaire, setBilanProprietaire] = useState(null);
  const [historique, setHistorique] = useState([]);

  // Chargement initial et recherche
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dossiers/recherche`, {
          params: { query, sort, etape: filtreEtape },
          timeout: 10000
        });
        setDossiers(res.data);
      } catch (err) {
        handleApiError(err, "Erreur lors de la recherche");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 400);
    return () => clearTimeout(timer);
  }, [query, sort, filtreEtape]);

  const fetchBilanDossier = async (id) => {
    setLoadingBilan(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/dossiers/${id}/bilan`);
      setDossierSelectionne(res.data.dossier);
      setHistorique(res.data.historique);
      setShowBilan(true);
    } catch (err) {
      handleApiError(err, "Erreur lors du chargement du bilan");
    } finally {
      setLoadingBilan(false);
    }
  };

  const fetchBilanProprietaire = async (nomProprietaire) => {
    setLoadingBilan(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/dossiers/proprietaire/bilan`, {
        params: { nom_proprietaire: encodeURIComponent(nomProprietaire) },
        timeout: 15000
      });
      
      if (res.data?.statistiques) {
        setBilanProprietaire(res.data);
        setShowBilanProprietaire(true);
      } else {
        throw new Error("Réponse inattendue du serveur");
      }
    } catch (err) {
      handleApiError(err, "Erreur lors du chargement du bilan propriétaire");
    } finally {
      setLoadingBilan(false);
    }
  };

  const handleApiError = (err, context) => {
    console.error(`${context}:`, {
      error: err,
      response: err.response?.data,
      stack: err.stack
    });
    
    const errorMessage = err.response?.data?.error 
      || err.message 
      || "Une erreur inconnue est survenue";
    
    setError(`${context}: ${errorMessage}`);
  };

  const getDelaiTotal = () => {
    if (!historique?.length || historique.length < 2) return "0 jours";
    const premier = new Date(historique[0].date_action);
    const dernier = new Date(historique[historique.length - 1].date_action);
    const jours = Math.round((dernier - premier) / (1000 * 60 * 60 * 24));
    return `${jours} jours`;
  };

  const getEtapeColor = (etape) => {
    if (!etape) return 'secondary';
    
    switch(etape.toLowerCase()) {
      case 'secrétariat': return 'primary';
      case 'depense': return 'warning';
      case 'comptabilite': return 'info';
      case 'programmation': return 'secondary';
      case 'paiement': return 'dark';
      case 'confirmé': return 'success';
      case 'rejeté': return 'danger';
      default: return 'light';
    }
  };

  const renderTimelineItem = (etape, index) => (
    <div key={index} className="timeline-item mb-3">
      <div className="d-flex">
        <div className="timeline-badge bg-primary me-3"></div>
        <div>
          <strong>{etape.etape_suivante}</strong>
          <div className="text-muted small">
            {new Date(etape.date_action).toLocaleString()}
          </div>
          <div>
            <small className="text-muted">
              Par: {etape.acteur}
            </small>
          </div>
          {etape.decision && (
            <div>
              <Badge bg="info">{etape.decision}</Badge>
            </div>
          )}
          {etape.commentaire && (
            <div className="mt-1">
              <em>"{etape.commentaire}"</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStatTable = (data, columns) => (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col, i) => (
              <td key={i}>
                {col.badge ? (
                  <Badge bg={getEtapeColor(item[col.key])}>
                    {item[col.key]}
                  </Badge>
                ) : (
                  col.format ? col.format(item[col.key]) : item[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container className="mt-4">
      <h3 className="mb-4">🔍 Rechercher un dossier</h3>
      
      {error && (
        <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <Form.Control
            placeholder="Nom du dossier ou du propriétaire"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Plus récents</option>
            <option value="asc">Plus anciens</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={filtreEtape} onChange={(e) => setFiltreEtape(e.target.value)}>
            <option value="">Toutes les étapes</option>
            <option value="Secrétariat">Secrétariat</option>
            <option value="depense">Dépense</option>
            <option value="comptabilite">Comptabilité</option>
            <option value="programmation">Programmation</option>
            <option value="paiement">Paiement</option>
            <option value="confirmé">Confirmé</option>
            <option value="rejeté">Rejeté</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Recherche en cours...</p>
        </div>
      ) : (
        <ListGroup>
          {dossiers.length > 0 ? (
            dossiers.map((d) => (
              <ListGroup.Item key={d.id_dossier}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{d.nom_dossier}</strong> — {d.nom_proprietaire}
                    <div className="mt-1">
                      <Badge bg={getEtapeColor(d.etape_actuelle)}>
                        {d.etape_actuelle}
                      </Badge>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="text-muted me-3">
                      {new Date(d.date_depot).toLocaleDateString()}
                    </small>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => fetchBilanDossier(d.id_dossier)}
                      className="me-2"
                      disabled={loadingBilan}
                    >
                      Bilan
                    </Button>
                    <Button 
                      variant="outline-info" 
                      size="sm"
                      onClick={() => fetchBilanProprietaire(d.nom_proprietaire)}
                      disabled={loadingBilan}
                    >
                      Bilan Propriétaire
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <div className="text-muted py-4 text-center">
              Aucun résultat trouvé pour "{query}"
            </div>
          )}
        </ListGroup>
      )}

      {/* Modal Bilan Dossier */}
      <Modal show={showBilan} onHide={() => setShowBilan(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Bilan du dossier: {dossierSelectionne?.nom_dossier || 'Non trouvé'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingBilan ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p className="mt-2">Chargement du bilan...</p>
            </div>
          ) : dossierSelectionne ? (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Propriétaire:</strong> {dossierSelectionne.nom_proprietaire}</p>
                  <p><strong>Statut:</strong> <Badge bg={getEtapeColor(dossierSelectionne.statut)}>
                    {dossierSelectionne.statut}
                  </Badge></p>
                </Col>
                <Col md={6}>
                  <p><strong>Date dépôt:</strong> {new Date(dossierSelectionne.date_depot).toLocaleDateString()}</p>
                  <p><strong>Délai total:</strong> {getDelaiTotal()}</p>
                </Col>
              </Row>
              
              <h5 className="mt-4">Historique du cheminement</h5>
              <div className="timeline">
                {historique?.length > 0 ? (
                  historique.map(renderTimelineItem)
                ) : (
                  <p className="text-muted">Aucun historique disponible</p>
                )}
              </div>
            </>
          ) : (
            <Alert variant="warning">Aucune donnée à afficher</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBilan(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Bilan Propriétaire */}
      <Modal 
        show={showBilanProprietaire} 
        onHide={() => setShowBilanProprietaire(false)} 
        size="xl"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Bilan complet pour: {bilanProprietaire?.proprietaire || 'Non trouvé'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingBilan ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p className="mt-2">Chargement du bilan propriétaire...</p>
            </div>
          ) : bilanProprietaire ? (
            <Tabs defaultActiveKey="stats" className="mb-3">
              <Tab eventKey="stats" title="Statistiques">
                <Row>
                  <Col md={6}>
                    <h5 className="mt-3">Répartition par étape</h5>
                    {renderStatTable(
                      bilanProprietaire.statistiques.par_etape,
                      [
                        { key: 'etape_actuelle', label: 'Étape', badge: true },
                        { key: 'nombre_dossiers', label: 'Nombre' },
                        { key: 'jours_moyen', label: 'Jours moyen', format: (val) => val?.toFixed(1) + ' jours' }
                      ]
                    )}
                  </Col>
                  <Col md={6}>
                    <h5 className="mt-3">Temps moyen par étape</h5>
                    {renderStatTable(
                      bilanProprietaire.statistiques.temps_moyen_par_etape,
                      [
                        { key: 'etape', label: 'Étape' },
                        { key: 'jours_moyen', label: 'Jours moyen', format: (val) => val?.toFixed(1) + ' jours' },
                        { key: 'nombre_transitions', label: 'Transitions' }
                      ]
                    )}
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={6}>
                    <h5>Répartition par type</h5>
                    {renderStatTable(
                      bilanProprietaire.statistiques.par_type,
                      [
                        { key: 'nom_type', label: 'Type' },
                        { key: 'nombre_dossiers', label: 'Nombre' },
                        { key: 'jours_moyen', label: 'Jours moyen', format: (val) => val?.toFixed(1) + ' jours' }
                      ]
                    )}
                  </Col>
                  <Col md={6}>
                    <h5>Répartition par nature</h5>
                    {renderStatTable(
                      bilanProprietaire.statistiques.par_nature,
                      [
                        { key: 'nom_nature', label: 'Nature' },
                        { key: 'nombre_dossiers', label: 'Nombre' },
                        { key: 'jours_moyen', label: 'Jours moyen', format: (val) => val?.toFixed(1) + ' jours' }
                      ]
                    )}
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="dossiers" title="Dossiers">
                <h5 className="mt-3">Dossiers récemment modifiés</h5>
                {renderStatTable(
                  bilanProprietaire.dossiers_recemment_modifies,
                  [
                    { key: 'nom_dossier', label: 'Dossier' },
                    { key: 'etape_actuelle', label: 'Étape', badge: true },
                    { key: 'date_modification', label: 'Dernière modification', format: (val) => new Date(val).toLocaleDateString() }
                  ]
                )}

                <h5 className="mt-4">Dossiers bloqués ({bilanProprietaire.alertes.nombre_dossiers_bloques})</h5>
                {bilanProprietaire.alertes.nombre_dossiers_bloques > 0 ? (
                  renderStatTable(
                    bilanProprietaire.alertes.dossiers_bloques,
                    [
                      { key: 'nom_dossier', label: 'Dossier' },
                      { key: 'etape_actuelle', label: 'Étape', badge: true },
                      { key: 'date_modification', label: 'Dernière modification', format: (val) => new Date(val).toLocaleDateString() },
                      { key: 'jours_inactifs', label: 'Jours inactifs', format: (val) => Math.round(val) }
                    ]
                  )
                ) : (
                  <Alert variant="info">Aucun dossier bloqué</Alert>
                )}
              </Tab>

              <Tab eventKey="all" title="Tous les dossiers">
                <div className="table-responsive">
                  <h5 className="mt-3">Liste complète ({bilanProprietaire.total_dossiers} dossiers)</h5>
                  {renderStatTable(
                    bilanProprietaire.liste_complete_dossiers,
                    [
                      { key: 'nom_dossier', label: 'Dossier' },
                      { key: 'type', label: 'Type' },
                      { key: 'nature', label: 'Nature' },
                      { key: 'etape_actuelle', label: 'Étape', badge: true },
                      { key: 'statut', label: 'Statut', badge: true },
                      { key: 'date_depot', label: 'Date dépôt', format: (val) => new Date(val).toLocaleDateString() }
                    ]
                  )}
                </div>
              </Tab>
            </Tabs>
          ) : (
            <Alert variant="warning">Aucune donnée disponible pour ce propriétaire</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBilanProprietaire(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}