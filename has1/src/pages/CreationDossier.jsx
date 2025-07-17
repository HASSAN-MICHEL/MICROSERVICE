// // // import { useState } from "react";
// // // import axios from "axios";
// // // import { Form, Button, Container } from "react-bootstrap";
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // export default function CreationDossier() {
// // //   const [form, setForm] = useState({
// // //     nom_dossier: "",
// // //     nom_proprietaire: "",
// // //     id_nature: 1,
// // //     id_type: 1,
// // //   });

// // //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     await axios.post("http://localhost:3000/api/dossiers", form);
// // //     alert("Dossier créé !");
// // //   };

  
// // //   const fetchDossier = async () => {
// // //     try {
// // //       const response = await axios.get("http://localhost:3000/api/dossiers");
// // //       setChambres(response.data);
// // //       setError(null);
// // //     } catch (error) {
// // //       console.error("Erreur lors du chargement des dossiers", error);
// // //       setError("Erreur lors du chargement des dossiers");
// // //     }
// // //   };


// // //   return (
// // //     <Container className="shadow-sm">
// // //       <h3 >Créer un nouveau dossier</h3>
// // //       <Form  className="bg-red  mb-3"onSubmit={handleSubmit} >
// // //         <Form.Group className="mb-3">
// // //           <Form.Label>Nom du dossier</Form.Label>
// // //           <Form.Control name="nom_dossier" onChange={handleChange} required />
// // //         </Form.Group>
// // //         <Form.Group className="mb-3">
// // //           <Form.Label>Propriétaire</Form.Label>
// // //           <Form.Control name="nom_proprietaire" onChange={handleChange} required />
// // //         </Form.Group>
// // //         <Form.Group className="mb-3">
// // //           <Form.Label>Nature</Form.Label>
// // //           <Form.Select name="id_nature" onChange={handleChange}>
// // //             <option value={1}>Marchandise</option>
// // //             <option value={2}>Contrat</option>
// // //           </Form.Select>
// // //         </Form.Group>
// // //         <Form.Group className="mb-3">
// // //           <Form.Label>Type</Form.Label>
// // //           <Form.Select name="id_type" onChange={handleChange}>
// // //             <option value={1}>Entrée</option>
// // //             <option value={2}>Urgent</option>
            
// // //           </Form.Select>
// // //         </Form.Group>
// // //         <Button type="submit" variant="primary" className=" me-2 ">Enregistrer</Button>
// // //       </Form>
// // //     </Container>
// // //   );
// // // }


// // import { useState } from "react"; 
// // import axios from "axios";
// // import { Form, Button, Container } from "react-bootstrap";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // export default function CreationDossier() {
// //   const [form, setForm] = useState({
// //     nom_dossier: "",
// //     nom_proprietaire: "",
// //     id_nature: 1,
// //     id_type: 1,
// //   });
// //   const [fichier, setFichier] = useState(null);

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleFichier = (e) => setFichier(e.target.files[0]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       // 1. Créer le dossier
// //       const res = await axios.post("http://localhost:3000/api/dossiers", form);
// //       const dossier = res.data;

// //       // 2. Uploader le fichier
// //       if (fichier) {
// //         const formData = new FormData();
// //         formData.append("fichier", fichier);
// //         await axios.post(`http://localhost:3000/api/dossiers/${dossier.id_dossier}/upload`, formData);
// //       }

// //       alert("Dossier créé avec succès !");
// //     } catch (err) {
// //       alert("Erreur lors de la création du dossier.");
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <Container className="shadow-sm mt-4 p-4 bg-light rounded">
// //       <h3>Créer un nouveau dossier</h3>
// //       <Form onSubmit={handleSubmit}>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Nom du dossier</Form.Label>
// //           <Form.Control name="nom_dossier" onChange={handleChange} required />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Propriétaire</Form.Label>
// //           <Form.Control name="nom_proprietaire" onChange={handleChange} required />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Nature</Form.Label>
// //           <Form.Select name="id_nature" onChange={handleChange}>
// //             <option value={1}>Marchandise</option>
// //             <option value={2}>Contrat</option>
// //           </Form.Select>
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Type</Form.Label>
// //           <Form.Select name="id_type" onChange={handleChange}>
// //             <option value={1}>Entrée</option>
// //             <option value={2}>Urgent</option>
// //           </Form.Select>
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Fichier numérique (PDF, image...)</Form.Label>
// //           <Form.Control type="file" onChange={handleFichier} />
// //         </Form.Group>
// //         <Button type="submit" variant="primary">Enregistrer</Button>
// //       </Form>
// //     </Container>
// //   );
// // }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Tabs, Tab, Form, Button, Table, Alert, ListGroup } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function CreationDossier() {
//   // États pour les onglets
//   const [activeTab, setActiveTab] = useState("liste");
  
//   // États pour la création de dossier
//   const [form, setForm] = useState({
//     nom_dossier: "",
//     nom_proprietaire: "",
//     id_nature: 1,
//     id_type: 1,
//   });
//   const [fichier, setFichier] = useState(null);
  
//   // États pour la liste des dossiers
//   const [dossiers, setDossiers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
  
//   // États pour la recherche
//   const [query, setQuery] = useState("");
//   const [resultats, setResultats] = useState([]);

//   // Charger les dossiers au montage
//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/list");
//         setDossiers(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Erreur de chargement");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   // Création de dossier
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/dossiers", form);
//       const dossier = res.data;

//       if (fichier) {
//         const formData = new FormData();
//         formData.append("fichier", fichier);
//         await axios.post(`http://localhost:3000/api/dossiers/${dossier.id_dossier}/upload`, formData);
//       }

//       setSuccess("Dossier créé avec succès !");
//       setForm({ nom_dossier: "", nom_proprietaire: "", id_nature: 1, id_type: 1 });
//       setFichier(null);
//       // Recharger la liste
//       const updated = await axios.get("http://localhost:3000/api/list");
//       setDossiers(updated.data);
//       setActiveTab("liste");
//     } catch (err) {
//       setError("Erreur lors de la création");
//     }
//   };

//   // Envoyer à la dépense
//   const envoyerADepense = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-depense`);
//       setSuccess("Dossier envoyé à la dépense");
//       setDossiers(dossiers.map(d => 
//         d.id_dossier === id ? {...d, etape_actuelle: "Dépense"} : d
//       ));
//     } catch (err) {
//       setError("Échec de l'envoi");
//     }
//   };

//   // Recherche de dossiers
//   const search = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/dossiers/recherche?query=${query}`);
//       setResultats(res.data);
//     } catch (err) {
//       setError("Erreur de recherche");
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-4">Gestion des dossiers</h2>
      
//       {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
//       {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

//       <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
//         <Tab eventKey="liste" title="📋 Liste des dossiers">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Nom</th>
//                 <th>Propriétaire</th>
//                 <th>Étape</th>
//                 <th>Statut</th>
//                 <th>Fichier</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center">Chargement...</td>
//                 </tr>
//               ) : dossiers.map((d) => (
//                 <tr key={d.id_dossier}>
//                   <td>{d.nom_dossier}</td>
//                   <td>{d.nom_proprietaire}</td>
//                   <td>{d.etape_actuelle || "Non défini"}</td>
//                   <td>{d.statut || "En cours"}</td>
//                   <td>
//                     {d.fichier_url ? (
//                       <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer">
//                         📄 Voir
//                       </a>
//                     ) : "Aucun"}
//                   </td>
//                   <td>
//                     {/secr[eé]tariat/i.test(d.etape_actuelle) && (
//                       <Button size="sm" onClick={() => envoyerADepense(d.id_dossier)}>
//                         ➡️ Dépense
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Tab>

//         <Tab eventKey="creation" title="➕ Créer un dossier">
//           <Form onSubmit={handleSubmit} className="shadow-sm p-4 bg-light rounded">
//             <Form.Group className="mb-3">
//               <Form.Label>Nom du dossier *</Form.Label>
//               <Form.Control 
//                 name="nom_dossier" 
//                 value={form.nom_dossier}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
//                 required 
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Propriétaire *</Form.Label>
//               <Form.Control 
//                 name="nom_proprietaire" 
//                 value={form.nom_proprietaire}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
//                 required 
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Nature</Form.Label>
//               <Form.Select 
//                 name="id_nature" 
//                 value={form.id_nature}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
//               >
//                 <option value={1}>Marchandise</option>
//                 <option value={2}>Contrat</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Type</Form.Label>
//               <Form.Select 
//                 name="id_type" 
//                 value={form.id_type}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
//               >
//                 <option value={1}>Entrée</option>
//                 <option value={2}>Urgent</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Fichier (PDF, image...)</Form.Label>
//               <Form.Control 
//                 type="file" 
//                 onChange={(e) => setFichier(e.target.files[0])} 
//               />
//             </Form.Group>
//             <Button type="submit" variant="primary">Enregistrer</Button>
//           </Form>
//         </Tab>

//         <Tab eventKey="recherche" title="🔍 Rechercher">
//           <Form className="d-flex mb-3">
//             <Form.Control 
//               placeholder="Nom ou propriétaire" 
//               value={query}
//               onChange={(e) => setQuery(e.target.value)} 
//             />
//             <Button onClick={search} className="ms-2">Chercher</Button>
//           </Form>
// //           <ListGroup>
// //             {resultats.map((d) => (
// //               <ListGroup.Item key={d.id_dossier}>
// //                 <strong>{d.nom_dossier}</strong> - {d.nom_proprietaire} | 
// //                 Étape : {d.etape_actuelle} | 
// //                 Statut : {d.statut || "En cours"}
// //                 {d.fichier_url && (
// //                   <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer" className="ms-2">
// //                     📄 Fichier
// //                   </a>
// //                 )}
// //               </ListGroup.Item>
// //             ))}
// //           </ListGroup>
// //         </Tab>
// //       </Tabs>
// //     </Container>
// //   );
// // }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Container, Button, Table, Alert, ListGroup, 
//   Modal, Form, Pagination, Badge, Card 
// } from "react-bootstrap";
// import { 
//   FiFile, FiUser, FiSend, FiSearch, FiPlus, 
//   FiList, FiFolder, FiCheck, FiX, FiDownload 
// } from "react-icons/fi";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function GestionDossiers() {
//   // États principaux
//   const [dossiers, setDossiers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   // États pour la création de dossier
//   const [form, setForm] = useState({
//     nom_dossier: "",
//     nom_proprietaire: "",
//     id_nature: 1,
//     id_type: 1,
//   });
//   const [fichier, setFichier] = useState(null);
  
//   // États pour la recherche
//   const [query, setQuery] = useState("");
//   const [resultats, setResultats] = useState([]);
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;

//   // Charger les dossiers
//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/list");
//         setDossiers(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Erreur de chargement");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   // Création de dossier
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/dossiers", form);
//       const dossier = res.data;

//       if (fichier) {
//         const formData = new FormData();
//         formData.append("fichier", fichier);
//         await axios.post(
//           `http://localhost:3000/api/dossiers/${dossier.id_dossier}/upload`, 
//           formData,
//           { headers: { 'Content-Type': 'multipart/form-data' } }
//         );
//       }

//       setSuccess("Dossier créé avec succès !");
//       setForm({ nom_dossier: "", nom_proprietaire: "", id_nature: 1, id_type: 1 });
//       setFichier(null);
//       setShowModal(false);
      
//       // Recharger la liste
//       const updated = await axios.get("http://localhost:3000/api/list");
//       setDossiers(updated.data);
//     } catch (err) {
//       setError("Erreur lors de la création: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Envoyer à la dépense
//   const envoyerADepense = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-depense`);
//       setSuccess("Dossier envoyé à la dépense");
//       setDossiers(dossiers.map(d => 
//         d.id_dossier === id ? {...d, etape_actuelle: "Dépense"} : d
//       ));
//     } catch (err) {
//       setError("Échec de l'envoi: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Recherche de dossiers
//   const search = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/dossiers/recherche?query=${query}`);
//       setResultats(res.data);
//     } catch (err) {
//       setError("Erreur de recherche: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = dossiers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(dossiers.length / itemsPerPage);

//   // Styles modernes
//   const cardStyle = {
//     borderRadius: '15px',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//     border: 'none'
//   };

//   const badgeStyle = (statut) => ({
//     backgroundColor: statut === 'Validé' ? '#28a745' : statut === 'Rejeté' ? '#dc3545' : '#6c757d',
//     color: 'white',
//     borderRadius: '10px',
//     padding: '5px 10px',
//     fontSize: '0.8rem'
//   });

//   return (
//     <Container className="mt-4">
//       {/* Header avec bouton de création */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">
//           <FiFolder className="me-2" style={{ color: '#4e73df' }} />
//           Gestion des Dossiers
//         </h2>
//         <Button 
//           variant="primary" 
//           onClick={() => setShowModal(true)}
//           className="d-flex align-items-center"
//         >
//           <FiPlus className="me-2" />
//           Créer un dossier
//         </Button>
//       </div>
      
//       {/* Notifications */}
//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError(null)} className="animate__animated animate__fadeIn">
//           <FiX className="me-2" />
//           {error}
//         </Alert>
//       )}
//       {success && (
//         <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="animate__animated animate__fadeIn">
//           <FiCheck className="me-2" />
//           {success}
//         </Alert>
//       )}

//       {/* Section Recherche */}
//       <Card className="mb-4" style={cardStyle}>
//         <Card.Body>
//           <h5 className="card-title d-flex align-items-center">
//             <FiSearch className="me-2" style={{ color: '#4e73df' }} />
//             Recherche rapide
//           </h5>
//           <div className="d-flex">
//             <Form.Control 
//               placeholder="Rechercher par nom ou propriétaire..." 
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="me-2"
//             />
//             <Button variant="outline-primary" onClick={search} className="d-flex align-items-center">
//               <FiSearch className="me-1" />
//               Chercher
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Résultats de recherche */}
//       {resultats.length > 0 && (
//         <Card className="mb-4" style={cardStyle}>
//           <Card.Body>
//             <h5 className="card-title">Résultats de recherche ({resultats.length})</h5>
//             <ListGroup variant="flush">
//               {resultats.map((d) => (
//                 <ListGroup.Item key={d.id_dossier} className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <strong>{d.nom_dossier}</strong> - {d.nom_proprietaire}
//                     <div className="text-muted small">
//                       Étape: {d.etape_actuelle || "Non défini"} | Statut: {d.statut || "En cours"}
//                     </div>
//                   </div>
//                   {d.fichier_url && (
//                     <a 
//                       href={`http://localhost:3000/uploads/${d.fichier_url}`} 
//                       target="_blank" 
//                       rel="noreferrer"
//                       className="btn btn-sm btn-outline-primary"
//                     >
//                       <FiDownload className="me-1" />
//                       Fichier
//                     </a>
//                   )}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Liste des dossiers */}
//       <Card style={cardStyle}>
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="card-title mb-0 d-flex align-items-center">
//               <FiList className="me-2" style={{ color: '#4e73df' }} />
//               Liste des Dossiers ({dossiers.length})
//             </h5>
//           </div>
          
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
//                       <th>Étape</th>
//                       <th>Statut</th>
//                       <th>Fichier</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((d) => (
//                       <tr key={d.id_dossier}>
//                         <td>{d.nom_dossier}</td>
//                         <td>{d.nom_proprietaire}</td>
//                         <td>{d.etape_actuelle || "Non défini"}</td>
//                         <td>
//                           <Badge style={badgeStyle(d.statut)}>
//                             {d.statut || "En cours"}
//                           </Badge>
//                         </td>
//                         <td>
//                           {d.fichier_url ? (
//                             <Button 
//                               variant="link" 
//                               href={`http://localhost:3000/uploads/${d.fichier_url}`} 
//                               target="_blank"
//                               className="p-0 text-decoration-none"
//                             >
//                               <FiFile className="me-1" />
//                               Voir
//                             </Button>
//                           ) : (
//                             <span className="text-muted">Aucun</span>
//                           )}
//                         </td>
//                         <td>
//                           {/secr[eé]tariat/i.test(d.etape_actuelle) && (
//                             <Button 
//                               variant="outline-primary" 
//                               size="sm" 
//                               onClick={() => envoyerADepense(d.id_dossier)}
//                               className="d-flex align-items-center"
//                             >
//                               <FiSend className="me-1" />
//                               Dépense
//                             </Button>
//                           )}
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

//       {/* Modal de création */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title className="d-flex align-items-center">
//             <FiPlus className="me-2" />
//             Nouveau Dossier
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Nom du dossier *</Form.Label>
//               <Form.Control 
//                 name="nom_dossier" 
//                 value={form.nom_dossier}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
//                 required 
//                 placeholder="Entrez le nom du dossier"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Propriétaire *</Form.Label>
//               <Form.Control 
//                 name="nom_proprietaire" 
//                 value={form.nom_proprietaire}
//                 onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
//                 required 
//                 placeholder="Entrez le nom du propriétaire"
//               />
//             </Form.Group>
//             <div className="row">
//               <div className="col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Nature</Form.Label>
//                   <Form.Select 
//                     name="id_nature" 
//                     value={form.id_nature}
//                     onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
//                   >
//                     <option value={1}>Université</option>
//                     <option value={2}>Impots</option>
//                   </Form.Select>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Type</Form.Label>
//                   <Form.Select 
//                     name="id_type" 
//                     value={form.id_type}
//                     onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
//                   >
//                     <option value={1}>Entrée</option>
//                     <option value={2}>Urgent</option>
//                   </Form.Select>
//                 </Form.Group>
//               </div>
//             </div>
//             <Form.Group className="mb-4">
//               <Form.Label>Fichier joint (PDF, image...)</Form.Label>
//               <Form.Control 
//                 type="file" 
//                 onChange={(e) => setFichier(e.target.files[0])}
//                 accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//               />
//               {fichier && (
//                 <div className="mt-2 text-muted small">
//                   Fichier sélectionné: {fichier.name}
//                 </div>
//               )}
//             </Form.Group>
//             <div className="d-flex justify-content-end">
//               <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
//                 Annuler
//               </Button>
//               <Button type="submit" variant="primary" className="d-flex align-items-center">
//                 <FiCheck className="me-1" />
//                 Enregistrer
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }






import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, Button, Table, Alert, ListGroup, 
  Modal, Form, Pagination, Badge, Card 
} from "react-bootstrap";
import { 
  FiFile, FiUser, FiSend, FiSearch, FiPlus, 
  FiList, FiFolder, FiCheck, FiX, FiDownload 
} from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔁 Configuration dynamique de l'URL de base (réseau local ou localhost)
const getApiBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  return `http://${window.location.hostname}:3000`;
};
const API_BASE_URL = getApiBaseUrl();

// Axios instance configurée pour tous les appels API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default function GestionDossiers() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom_dossier: "",
    nom_proprietaire: "",
    id_nature: 1,
    id_type: 1,
  });
  const [fichier, setFichier] = useState(null);
  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axiosInstance.get("/api/list");
        setDossiers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchDossiers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/dossiers", form);
      const dossier = res.data;

      if (fichier) {
        const formData = new FormData();
        formData.append("fichier", fichier);
        await axiosInstance.post(
          `/api/dossiers/${dossier.id_dossier}/upload`, 
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      setSuccess("Dossier créé avec succès !");
      setForm({ nom_dossier: "", nom_proprietaire: "", id_nature: 1, id_type: 1 });
      setFichier(null);
      setShowModal(false);
      const updated = await axiosInstance.get("/api/list");
      setDossiers(updated.data);
    } catch (err) {
      setError("Erreur lors de la création: " + (err.response?.data?.message || err.message));
    }
  };

  const envoyerADepense = async (id) => {
    try {
      await axiosInstance.put(`/api/dossiers/${id}/envoyer-depense`);
      setSuccess("Dossier envoyé à la dépense");
      setDossiers(dossiers.map(d => 
        d.id_dossier === id ? {...d, etape_actuelle: "Dépense"} : d
      ));
    } catch (err) {
      setError("Échec de l'envoi: " + (err.response?.data?.message || err.message));
    }
  };

  const search = async () => {
    try {
      const res = await axiosInstance.get(`/api/dossiers/recherche?query=${query}`);
      setResultats(res.data);
    } catch (err) {
      setError("Erreur de recherche: " + (err.response?.data?.message || err.message));
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

  const badgeStyle = (statut) => ({
    backgroundColor: statut === 'Validé' ? '#28a745' : statut === 'Rejeté' ? '#dc3545' : '#6c757d',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 10px',
    fontSize: '0.8rem'
  });


  
  return (
    <Container className="mt-4">
      {/* Header avec bouton de création */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FiFolder className="me-2" style={{ color: '#4e73df' }} />
          Gestion des Dossiers
        </h2>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center"
        >
          <FiPlus className="me-2" />
          Créer un dossier
        </Button>
      </div>
      
      {/* Notifications */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="animate__animated animate__fadeIn">
          <FiX className="me-2" />
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="animate__animated animate__fadeIn">
          <FiCheck className="me-2" />
          {success}
        </Alert>
      )}

      {/* Section Recherche */}
      <Card className="mb-4" style={cardStyle}>
        <Card.Body>
          <h5 className="card-title d-flex align-items-center">
            <FiSearch className="me-2" style={{ color: '#4e73df' }} />
            Recherche rapide
          </h5>
          <div className="d-flex">
            <Form.Control 
              placeholder="Rechercher par nom ou propriétaire..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-primary" onClick={search} className="d-flex align-items-center">
              <FiSearch className="me-1" />
              Chercher
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Résultats de recherche */}
      {resultats.length > 0 && (
        <Card className="mb-4" style={cardStyle}>
          <Card.Body>
            <h5 className="card-title">Résultats de recherche ({resultats.length})</h5>
            <ListGroup variant="flush">
              {resultats.map((d) => (
                <ListGroup.Item key={d.id_dossier} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{d.nom_dossier}</strong> - {d.nom_proprietaire}
                    <div className="text-muted small">
                      Étape: {d.etape_actuelle || "Non défini"} | Statut: {d.statut || "En cours"}
                    </div>
                  </div>
                  {d.fichier_url && (
                    <a 
                      href={`http://localhost:3000/uploads/${d.fichier_url}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FiDownload className="me-1" />
                      Fichier
                    </a>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* Liste des dossiers */}
      <Card style={cardStyle}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0 d-flex align-items-center">
              <FiList className="me-2" style={{ color: '#4e73df' }} />
              Liste des Dossiers ({dossiers.length})
            </h5>
          </div>
          
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
                      <th>Étape</th>
                      <th>Statut</th>
                      <th>Fichier</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((d) => (
                      <tr key={d.id_dossier}>
                        <td>{d.nom_dossier}</td>
                        <td>{d.nom_proprietaire}</td>
                        <td>{d.etape_actuelle || "Non défini"}</td>
                        <td>
                          <Badge style={badgeStyle(d.statut)}>
                            {d.statut || "En cours"}
                          </Badge>
                        </td>
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
                          {/secr[eé]tariat/i.test(d.etape_actuelle) && (
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => envoyerADepense(d.id_dossier)}
                              className="d-flex align-items-center"
                            >
                              <FiSend className="me-1" />
                              Dépense
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              {/* Pagination */}
              {dossiers.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination>
                    <Pagination.Prev 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                      disabled={currentPage === 1} 
                    />
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                      disabled={currentPage === totalPages} 
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de création */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FiPlus className="me-2" />
            Nouveau Dossier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom du dossier *</Form.Label>
              <Form.Control 
                name="nom_dossier" 
                value={form.nom_dossier}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                required 
                placeholder="Entrez le nom du dossier"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Propriétaire *</Form.Label>
              <Form.Control 
                name="nom_proprietaire" 
                value={form.nom_proprietaire}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                required 
                placeholder="Entrez le nom du propriétaire"
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nature</Form.Label>
                  <Form.Select 
                    name="id_nature" 
                    value={form.id_nature}
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  >
                    <option value={1}>Université</option>
                    <option value={2}>Impots</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select 
                    name="id_type" 
                    value={form.id_type}
                    onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  >
                    <option value={1}>Entrée</option>
                    <option value={2}>Urgent</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-4">
              <Form.Label>Fichier joint (PDF, image...)</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => setFichier(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              {fichier && (
                <div className="mt-2 text-muted small">
                  Fichier sélectionné: {fichier.name}
                </div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Annuler
              </Button>
              <Button type="submit" variant="primary" className="d-flex align-items-center">
                <FiCheck className="me-1" />
                Enregistrer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
