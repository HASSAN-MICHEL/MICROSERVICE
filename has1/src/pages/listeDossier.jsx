// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Table, Button, Modal, Form, Card, Badge, Alert, Pagination } from "react-bootstrap";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "bootstrap/dist/css/bootstrap.min.css";
// // // // import { FaPlus, FaEdit, FaTrashAlt, FaBed, FaMoneyBillWave, FaSearch } from "react-icons/fa";

// // // // axios.defaults.baseURL = "http://localhost:3000";

// // // // const Chambres = () => {
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [chambres, setChambres] = useState([]);
// // // //   const [formData, setFormData] = useState({ 
// // // //     nom_dossier: "",
// // // //     nom_proprietaire: "",
// // // //     id_nature: 1,
// // // //     id_type: 1,
// // // //   });
// // // //   const [editIndex, setEditIndex] = useState(null);
// // // //   const [error, setError] = useState(null);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [itemsPerPage] = useState(10);
// // // //   const [searchTerm, setSearchTerm] = useState("");

// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchChambres();
// // // //   }, []);

// // // //   const fetchChambres = async () => {
// // // //     try {
// // // //       const response = await axios.get("/api/list");
// // // //       setChambres(response.data);
// // // //       setError(null);
// // // //     } catch (error) {
// // // //       console.error("Erreur lors du chargement des dossiers", error);
// // // //       setError("Erreur lors du chargement des dossiers");
// // // //     }
// // // //   };

// // // //   const handleShowModal = () => setShowModal(true);
// // // //   const handleCloseModal = () => {
// // // //     setShowModal(false);
// // // //     setFormData({ nom_dossier: "", nom_proprietaire:  "",  id_nature: 1, id_type: 1 });
// // // //     setEditIndex(null);
// // // //     setError(null);
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     try {
// // // //       // Validation simple
// // // //       if (!formData.nom_dossier || !formData.nom_proprietaire || !formData.id_nature || !formData.id_type) {
// // // //         setError("Veuillez remplir tous les champs");
// // // //         return;
// // // //       }

// // // //       if (editIndex !== null) {
// // // //         await axios.put(`/api/dossiers/${chambres[editIndex].id}`, formData);
// // // //       } else {
// // // //         await axios.post("/api/dossiers", formData);
// // // //       }
// // // //       fetchChambres();
// // // //       handleCloseModal();
// // // //     } catch (error) {
// // // //       console.error("Erreur lors de l'ajout/modification de la chambre", error);
// // // //       setError(error.response?.data?.message || "Erreur lors de l'opération");
// // // //     }
// // // //   };

// // // //   const handleEdit = (index) => {
// // // //     setFormData(chambres[index]);
// // // //     setEditIndex(index);
// // // //     handleShowModal();
// // // //   };

// // // //   const handleDelete = async (index) => {
// // // //     if (window.confirm("Êtes-vous sûr de vouloir supprimer se dossier  ?")) {
// // // //       try {
// // // //         await axios.delete(`/api/chambres/${chambres[index].id}`);
// // // //         fetchChambres();
// // // //       } catch (error) {
// // // //         console.error("Erreur lors de la suppression de la chambre", error);
// // // //         setError("Erreur lors de la suppression");
// // // //       }
// // // //     }
// // // //   };

// // // //   // Filtrage et pagination
// // // //   const filteredChambres = chambres.filter(chambre =>
// // // //     chambre.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     chambre.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     chambre.statut.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentChambres = filteredChambres.slice(indexOfFirstItem, indexOfLastItem);
// // // //   const totalPages = Math.ceil(filteredChambres.length / itemsPerPage);

// // // //   const getStatusBadge = (status) => {
// // // //     switch (status) {
// // // //       case "disponible":
// // // //         return <Badge bg="success">Disponible</Badge>;
// // // //       case "occupée":
// // // //         return <Badge bg="danger">Occupée</Badge>;
// // // //       default:
// // // //         return <Badge bg="secondary">{status}</Badge>;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="container-fluid py-4">
// // // //       <Card className="shadow-sm">
// // // //         <Card.Body>
// // // //           <div className="d-flex justify-content-between align-items-center mb-4">
// // // //             <h2 className="mb-0">
// // // //               <FaBed className="me-2" />
// // // //               Gestion des Chambres
// // // //             </h2>
// // // //             <div>
// // // //               <Button variant="primary" onClick={handleShowModal} className="me-2">
// // // //                 <FaPlus className="me-1" /> Ajouter
// // // //               </Button>
// // // //               <Button variant="info" onClick={() => navigate("/reservation")}>
// // // //                 Voir les réservations
// // // //               </Button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Barre de recherche */}
// // // //           <div className="mb-3">
// // // //             <div className="input-group">
// // // //               <span className="input-group-text">
// // // //                 <FaSearch />
// // // //               </span>
// // // //               <Form.Control
// // // //                 type="text"
// // // //                 placeholder="Rechercher une chambre..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => {
// // // //                   setSearchTerm(e.target.value);
// // // //                   setCurrentPage(1);
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

// // // //           <div className="table-responsive">
// // // //             <Table hover className="align-middle">
// // // //               <thead className="table-light">
// // // //                 <tr>
// // // //                   <th>#</th>
// // // //                   <th>Numéro</th>
// // // //                   <th>Type</th>
// // // //                   <th>Prix</th>
// // // //                   <th>Statut</th>
// // // //                   <th className="text-end">Actions</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {currentChambres.length > 0 ? (
// // // //                   currentChambres.map((chambre, index) => (
// // // //                     <tr key={index}>
// // // //                       <td>{indexOfFirstItem + index + 1}</td>
// // // //                       <td>
// // // //                         <strong>{chambre.numero}</strong>
// // // //                       </td>
// // // //                       <td>{chambre.type}</td>
// // // //                       <td>
// // // //                         <FaMoneyBillWave className="me-1" />
// // // //                         {chambre.prix} FCFA
// // // //                       </td>
// // // //                       <td>{getStatusBadge(chambre.statut)}</td>
// // // //                       <td className="text-end">
// // // //                         <Button
// // // //                           variant="outline-primary"
// // // //                           size="sm"
// // // //                           onClick={() => handleEdit(indexOfFirstItem + index)}
// // // //                           className="me-2"
// // // //                         >
// // // //                           <FaEdit />
// // // //                         </Button>
// // // //                         <Button
// // // //                           variant="outline-danger"
// // // //                           size="sm"
// // // //                           onClick={() => handleDelete(indexOfFirstItem + index)}
// // // //                         >
// // // //                           <FaTrashAlt />
// // // //                         </Button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 ) : (
// // // //                   <tr>
// // // //                     <td colSpan="6" className="text-center py-4">
// // // //                       {searchTerm ? "Aucune chambre ne correspond à votre recherche" : "Aucune chambre disponible"}
// // // //                     </td>
// // // //                   </tr>
// // // //                 )}
// // // //               </tbody>
// // // //             </Table>
// // // //           </div>

// // // //           {/* Pagination améliorée */}
// // // //           {filteredChambres.length > itemsPerPage && (
// // // //             <div className="d-flex justify-content-center mt-3">
// // // //               <Pagination>
// // // //                 <Pagination.Prev
// // // //                   onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
// // // //                   disabled={currentPage === 1}
// // // //                 />
// // // //                 {Array.from({ length: totalPages }, (_, i) => (
// // // //                   <Pagination.Item
// // // //                     key={i + 1}
// // // //                     active={i + 1 === currentPage}
// // // //                     onClick={() => setCurrentPage(i + 1)}
// // // //                   >
// // // //                     {i + 1}
// // // //                   </Pagination.Item>
// // // //                 ))}
// // // //                 <Pagination.Next
// // // //                   onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
// // // //                   disabled={currentPage === totalPages}
// // // //                 />
// // // //               </Pagination>
// // // //             </div>
// // // //           )}
// // // //         </Card.Body>
// // // //       </Card>

// // // //       {/* Modal d'ajout/modification */}
// // // //       <Modal show={showModal} onHide={handleCloseModal} centered>
// // // //         <Modal.Header closeButton>
// // // //           <Modal.Title>{editIndex !== null ? "Modifier" : "Ajouter"} une chambre</Modal.Title>
// // // //         </Modal.Header>
// // // //         <Modal.Body>
// // // //           {error && <Alert variant="danger">{error}</Alert>}
// // // //           <Form>
// // // //             <Form.Group className="mb-3">
// // // //               <Form.Label>Numéro</Form.Label>
// // // //               <Form.Control
// // // //                 type="text"
// // // //                 name="numero"
// // // //                 value={formData.numero}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //               />
// // // //             </Form.Group>
// // // //             <Form.Group className="mb-3">
// // // //               <Form.Label>Type</Form.Label>
// // // //               <Form.Control
// // // //                 type="text"
// // // //                 name="type"
// // // //                 value={formData.type}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //               />
// // // //             </Form.Group>
// // // //             <Form.Group className="mb-3">
// // // //               <Form.Label>Prix (FCFA)</Form.Label>
// // // //               <Form.Control
// // // //                 type="number"
// // // //                 name="prix"
// // // //                 value={formData.prix}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 min="0"
// // // //               />
// // // //             </Form.Group>
// // // //             <Form.Group className="mb-3">
// // // //               <Form.Label>Statut</Form.Label>
// // // //               <Form.Select name="statut" value={formData.statut} onChange={handleChange}>
// // // //                 <option value="disponible">Disponible</option>
// // // //                 <option value="occupée">Occupée</option>
// // // //               </Form.Select>
// // // //             </Form.Group>
// // // //           </Form>
// // // //         </Modal.Body>
// // // //         <Modal.Footer>
// // // //           <Button variant="secondary" onClick={handleCloseModal}>
// // // //             Annuler
// // // //           </Button>
// // // //           <Button variant="primary" onClick={handleSubmit}>
// // // //             Sauvegarder
// // // //           </Button>
// // // //         </Modal.Footer>
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Chambres;

// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Table, Container } from "react-bootstrap";

// // // export default function ListeDossiers() {
// // //   const [dossiers, setDossiers] = useState([]);

// // //   useEffect(() => {
// // //     axios.get("http://localhost:3000/api/list")
// // //       .then(res => setDossiers(res.data))
// // //       .catch(err => console.error(err));
// // //   }, []);

// // //   return (
// // //     <Container className="mt-4">
// // //       <h3>Liste des dossiers</h3>
// // //       <Table striped bordered>
// // //         <thead>
// // //           <tr>
// // //             <th>Nom</th>
// // //             <th>Propriétaire</th>
// // //             <th>Étape actuelle</th>
// // //             <th>Statut</th>
// // //             <th>Fichier</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {dossiers.map((d) => (
// // //             <tr key={d.id_dossier}>
// // //               <td>{d.nom_dossier}</td>
// // //               <td>{d.nom_proprietaire}</td>
// // //               <td>{d.etape_actuelle || "Non défini"}</td>
// // //               <td>{d.statut || "En cours"}</td>
// // //               <td>
// // //                 {d.fichier_url ? (
// // //                  <a href={`http://localhost:3000/${d.fichier_url}`} target="_blank" rel="noreferrer">
// // //   📄 Voir fichier
// // // </a>

// // //                 ) : "Aucun"}
// // //               </td>

              
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </Table>
// // //     </Container>
// // //   );
// // // }

// // // //ALTER TABLE dossiers ADD COLUMN fichier_url TEXT;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Container, Button, Alert } from "react-bootstrap";

// export default function ListeDossiers() {
//   const [dossiers, setDossiers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const fetchDossiers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/list");
//         console.log("Données reçues:", res.data);
//         setDossiers(res.data);
//       } catch (err) {
//         console.error("Erreur:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Erreur de chargement des dossiers");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDossiers();
//   }, []);

//   const envoyerADepense = async (id_dossier) => {
//     try {
//       setError(null);
//       setSuccess(null);
      
//       const response = await axios.put(
//         `http://localhost:3000/api/dossiers/${id_dossier}/envoyer-depense`
//       );
      
//       console.log("Réponse du serveur:", response.data);
      
//       setSuccess("Dossier envoyé à la dépense avec succès");
//       setDossiers(dossiers.map(d => 
//         d.id_dossier === id_dossier 
//           ? {...d, etape_actuelle: "Dépense"} 
//           : d
//       ));
//     } catch (err) {
//       console.error("Erreur complète:", {
//         message: err.message,
//         response: err.response?.data
//       });
//       setError(err.response?.data?.message || "Échec de l'envoi à la dépense");
//     }
//   };

//   if (loading) return <Container className="mt-4">Chargement en cours...</Container>;

//   return (
//     <Container className="mt-4">
//       <h3>Liste des dossiers</h3>
      
//       {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
//       {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Propriétaire</th>
//             <th>Étape actuelle</th>
//             <th>Statut</th>
//             <th>Fichier</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dossiers.map((d) => (
//             <tr key={d.id_dossier}>
//               <td>{d.nom_dossier}</td>
//               <td>{d.nom_proprietaire}</td>
//               <td>{d.etape_actuelle || "Non défini"}</td>
//               <td>{d.statut || "En cours"}</td>
//               <td>
//                 {d.fichier_url ? (
//                   <a 
//                     href={`http://localhost:3000/uploads/${d.fichier_url}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-decoration-none"
//                   >
//                     📄 Voir fichier
//                   </a>
//                 ) : "Aucun fichier"}
//               </td>
            
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }


// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { 
// //   Table, 
// //   Container, 
// //   Button, 
// //   Alert, 
// //   Spinner,
// //   Badge,
// //   ButtonGroup,
// //   Modal,
// //   Form
// // } from "react-bootstrap";
// // import { 
// //   FileEarmarkText, 
// //   ArrowRight, 
// //   CheckCircle,
// //   XCircle,
// //   Pencil,
// //   Trash,
// //   Search
// // } from "react-bootstrap-icons";

// // export default function ListeDossiers() {
// //   const [dossiers, setDossiers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [selectedDossier, setSelectedDossier] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;

// //   useEffect(() => {
// //     const fetchDossiers = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:3000/api/list");
// //         setDossiers(res.data);
// //       } catch (err) {
// //         console.error("Erreur:", err.response?.data || err.message);
// //         setError(err.response?.data?.message || "Erreur de chargement des dossiers");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchDossiers();
// //   }, []);

// //   const envoyerADepense = async (id_dossier) => {
// //     try {
// //       setError(null);
// //       setSuccess(null);
      
// //       const response = await axios.put(
// //         `http://localhost:3000/api/dossiers/${id_dossier}/envoyer-depense`
// //       );
      
// //       setSuccess("Dossier envoyé à la dépense avec succès");
// //       setDossiers(dossiers.map(d => 
// //         d.id_dossier === id_dossier 
// //           ? {...d, etape_actuelle: "Dépense"} 
// //           : d
// //       ));
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Échec de l'envoi à la dépense");
// //     }
// //   };

// //   const handleDelete = async () => {
// //     try {
// //       await axios.delete(`http://localhost:3000/api/dossiers/${selectedDossier}`);
// //       setDossiers(dossiers.filter(d => d.id_dossier !== selectedDossier));
// //       setSuccess("Dossier supprimé avec succès");
// //       setShowDeleteModal(false);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Échec de la suppression");
// //     }
// //   };

// //   const filteredDossiers = dossiers.filter(dossier => 
// //     dossier.nom_dossier.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     dossier.nom_proprietaire.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const totalPages = Math.ceil(filteredDossiers.length / itemsPerPage);
// //   const paginatedDossiers = filteredDossiers.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   const getStatusBadge = (status) => {
// //     switch(status?.toLowerCase()) {
// //       case 'terminé':
// //         return <Badge bg="success" className="text-uppercase"><CheckCircle className="me-1" /> {status}</Badge>;
// //       case 'rejeté':
// //         return <Badge bg="danger" className="text-uppercase"><XCircle className="me-1" /> {status}</Badge>;
// //       default:
// //         return <Badge bg="warning" text="dark" className="text-uppercase">En cours</Badge>;
// //     }
// //   };

// //   const getEtapeBadge = (etape) => {
// //     const etapes = {
// //       'secrétariat': 'primary',
// //       'Dépense': 'info',
// //       'Programmation': 'success',
// //       'Comptabilité': 'secondary'
// //     };
    
// //     const couleur = etapes[etape?.toLowerCase()] || 'light';
// //     return <Badge bg={couleur} className="text-uppercase bg-green">{etape || "Non défini"}</Badge>;
// //   };

// //   if (loading) {
// //     return (
// //       <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// //         <Spinner animation="border" role="status">
// //           <span className="visually-hidden">Chargement en cours...</span>
// //         </Spinner>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container className="mt-4 mb-5">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2 className="mb-0">
// //           <FileEarmarkText className="me-2" />
// //           Liste des dossiers
// //           <Badge bg="light" text="dark" className="ms-2">
// //             {filteredDossiers.length}
// //           </Badge>
// //         </h2>
        
// //         <div className="d-flex">
// //           <Form.Control
// //             type="search"
// //             placeholder="Rechercher un dossier..."
// //             className="me-2"
// //             style={{ width: '250px' }}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <Button variant="outline-primary">
// //             <Search />
// //           </Button>
// //         </div>
// //       </div>
      
// //       {error && (
// //         <Alert variant="danger" dismissible onClose={() => setError(null)}>
// //           {error}
// //         </Alert>
// //       )}
      
// //       {success && (
// //         <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
// //           {success}
// //         </Alert>
// //       )}

// //       <div className="table-responsive rounded shadow-sm">
// //         <Table striped bordered hover className="mb-0">
// //           <thead className="table-dark">
// //             <tr>
// //               <th style={{ width: '20%' }}>Nom</th>
// //               <th style={{ width: '15%' }}>Propriétaire</th>
// //               <th style={{ width: '15%' }}>Étape actuelle</th>
// //               <th style={{ width: '15%' }}>Statut</th>
// //               <th style={{ width: '15%' }}>Fichier</th>
// //               <th style={{ width: '20%' }}>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {paginatedDossiers.length > 0 ? (
// //               paginatedDossiers.map((d) => (
// //                 <tr key={d.id_dossier}>
// //                   <td className="fw-bold">{d.nom_dossier}</td>
// //                   <td>{d.nom_proprietaire}</td>
// //                   <td>{getEtapeBadge(d.etape_actuelle)}</td>
// //                   <td>{getStatusBadge(d.statut)}</td>
// //                   <td>
// //                     {d.fichier_url ? (
// //                       <Button 
// //                         variant="outline-primary"
// //                         size="sm"
// //                         href={`http://localhost:3000/uploads/${d.fichier_url}`}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                       >
// //                         <FileEarmarkText className="me-1" />
// //                         Voir fichier
// //                       </Button>
// //                     ) : (
// //                       <span className="text-muted">Aucun fichier</span>
// //                     )}
// //                   </td>
// //                   <td>
// //                     <ButtonGroup size="sm">
// //                       {/secr[eé]tariat/i.test(d.etape_actuelle) && (
// //                         <Button
// //                           variant="outline-success"
// //                           onClick={() => envoyerADepense(d.id_dossier)}
// //                           title="Envoyer à Dépense"
// //                         >
// //                           <ArrowRight />
// //                         </Button>
// //                       )}
// //                       <Button
// //                         variant="outline-primary"
// //                         title="Modifier"
// //                       >
// //                         <Pencil />
// //                       </Button>
// //                       <Button
// //                         variant="outline-danger"
// //                         title="Supprimer"
// //                         onClick={() => {
// //                           setSelectedDossier(d.id_dossier);
// //                           setShowDeleteModal(true);
// //                         }}
// //                       >
// //                         <Trash />
// //                       </Button>
// //                     </ButtonGroup>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" className="text-center py-4">
// //                   {searchTerm ? 
// //                     "Aucun dossier ne correspond à votre recherche" : 
// //                     "Aucun dossier disponible"}
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </Table>
// //       </div>

// //       {filteredDossiers.length > 0 && (
// //         <div className="d-flex justify-content-between align-items-center mt-3">
// //           <div>
// //             <span className="text-muted">
// //               Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
// //               {Math.min(currentPage * itemsPerPage, filteredDossiers.length)} sur{' '}
// //               {filteredDossiers.length} dossiers
// //             </span>
// //           </div>
// //           <div>
// //             <Button 
// //               variant="outline-secondary" 
// //               size="sm" 
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage(currentPage - 1)}
// //               className="me-2"
// //             >
// //               Précédent
// //             </Button>
// //             <Button 
// //               variant="outline-secondary" 
// //               size="sm" 
// //               disabled={currentPage === totalPages}
// //               onClick={() => setCurrentPage(currentPage + 1)}
// //             >
// //               Suivant
// //             </Button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modal de confirmation de suppression */}
// //       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Confirmer la suppression</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
// //             Annuler
// //           </Button>
// //           <Button variant="danger" onClick={handleDelete}>
// //             Supprimer
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   );
// // }



import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Alert, Spinner } from "react-bootstrap";

// Détection dynamique de l’URL backend
const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function ListeDossiers() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/list`);
        setDossiers(res.data);
      } catch (err) {
        console.error("Erreur:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Erreur de chargement des dossiers");
      } finally {
        setLoading(false);
      }
    };
    fetchDossiers();
  }, []);

  const envoyerADepense = async (id_dossier) => {
    try {
      setError(null);
      setSuccess(null);
      const response = await axios.put(`${API_BASE_URL}/api/dossiers/${id_dossier}/envoyer-depense`);
      setSuccess("✅ Dossier envoyé à la dépense avec succès");

      // Met à jour l'étape du dossier dans la liste
      setDossiers((prev) =>
        prev.map((d) =>
          d.id_dossier === id_dossier
            ? { ...d, etape_actuelle: "Dépense" }
            : d
        )
      );
    } catch (err) {
      console.error("Erreur complète:", {
        message: err.message,
        response: err.response?.data,
      });
      setError(err.response?.data?.message || "❌ Échec de l'envoi à la dépense");
    }
  };

  return (
    <Container className="mt-4">
      <h3>📁 Liste des Dossiers</h3>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Chargement des dossiers...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-light">
            <tr>
              <th>Nom</th>
              <th>Propriétaire</th>
              <th>Étape actuelle</th>
              <th>Statut</th>
              <th>Fichier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.length > 0 ? (
              dossiers.map((d) => (
                <tr key={d.id_dossier}>
                  <td>{d.nom_dossier}</td>
                  <td>{d.nom_proprietaire}</td>
                  <td>{d.etape_actuelle || <span className="text-muted">Non défini</span>}</td>
                  <td>{d.statut || "En cours"}</td>
                  <td>
                    {d.fichier_url ? (
                      <a
                        href={`${API_BASE_URL}/uploads/${d.fichier_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        📄 Voir fichier
                      </a>
                    ) : (
                      <span className="text-muted">Aucun fichier</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => envoyerADepense(d.id_dossier)}
                    >
                      Envoyer à la dépense
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Aucun dossier disponible
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
