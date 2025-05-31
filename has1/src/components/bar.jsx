// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   Table, Button, Modal, Form, Spinner, 
//   Badge, Container, Row, Col, Alert 
// } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Configuration Axios
// axios.defaults.baseURL = "http://localhost:3000/api";

// const Boissons = () => {
//   // États
//   const [boissons, setBoissons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ 
//     nom: "", 
//     prix: "", 
//     stock: "" 
//   });
//   const [editId, setEditId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const boissonsPerPage = 8;

//   const navigate = useNavigate();

//   // Fetch des boissons
//   useEffect(() => {
//     const fetchBoissons = async () => {
//       try {
//         const response = await axios.get("/boissons");
//         setBoissons(response.data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Erreur API:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBoissons();
//   }, []);

//   // Gestion de la modal
//   const handleShowModal = (boisson = null) => {
//     if (boisson) {
//       setFormData(boisson);
//       setEditId(boisson.id);
//     } else {
//       setFormData({ nom: "", prix: "", stock: "" });
//       setEditId(null);
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   // Gestion du formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.nom || !formData.prix || !formData.stock) {
//       setError("Veuillez remplir tous les champs");
//       return;
//     }

//     const data = {
//       nom: formData.nom,
//       prix: parseFloat(formData.prix),
//       stock: parseInt(formData.stock)
//     };

//     try {
//       if (editId) {
//         await axios.put(`/boissons/${editId}`, data);
//       } else {
//         await axios.post("/boissons", data);
//       }
//       setShowModal(false);
//       setCurrentPage(1);
//       // Recharger les données
//       const response = await axios.get("/boissons");
//       setBoissons(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   // Suppression
//   const handleDelete = async (id) => {
//     if (window.confirm("Confirmez la suppression ?")) {
//       try {
//         await axios.delete(`/boissons/${id}`);
//         setBoissons(prev => prev.filter(b => b.id !== id));
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   // Pagination
//   const indexOfLast = currentPage * boissonsPerPage;
//   const indexOfFirst = indexOfLast - boissonsPerPage;
//   const currentBoissons = boissons.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(boissons.length / boissonsPerPage);

//   // Composant d'indicateur de stock
//   const StockIndicator = ({ stock }) => {
//     let variant = "success";
//     if (stock < 10) variant = "warning";
//     if (stock < 3) variant = "danger";
//     return <Badge bg={variant}>{stock}</Badge>;
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="px-4">
//       <Row className="me-4">
//         <Col>
//           <h2 className="text-primary">Gestion des Boissons</h2>
//           <p className="text-muted">Gérez votre inventaire de boissons</p>
//         </Col>
//         <Col className="d-flex justify-content-end ">
//           <Button variant="primary" size="sm" className="me-1"  onClick={() => handleShowModal()}>
//             Ajouter une Boisson
//           </Button>
//           <Button variant="info" className="me-2" onClick={() => navigate("/venteBoissons")}>
//             Ventes
//           </Button>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {boissons.length === 0 ? (
//         <Alert variant="info">
//           Aucune boisson enregistrée. Commencez par en ajouter une.
//         </Alert>
//       ) : (
//         <>
//           <Table striped hover responsive className="mt-3">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Nom</th>
//                 <th className="text-end">Prix (€)</th>
//                 <th className="text-center">Stock</th>
//                 <th className="text-end">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentBoissons.map(boisson => (
//                 <tr key={boisson.id}>
//                   <td>{boisson.id}</td>
//                   <td>{boisson.nom}</td>
//                   <td className="text-end">{parseFloat(boisson.prix).toFixed(2)}</td>
//                   <td className="text-center">
//                     <StockIndicator stock={boisson.stock} />
//                   </td>
//                   <td className="text-end">
//                     <Button 
//                       variant="outline-primary" 
//                       size="sm" 
//                       onClick={() => handleShowModal(boisson)}
//                       className="me-2"
//                     >
//                       Modifier
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="sm" 
//                       onClick={() => handleDelete(boisson.id)}
//                     >
//                       Supprimer
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {/* Pagination */}
//           <div className="d-flex justify-content-between mt-3">
//             <div>
//               <span className="text-muted">
//                 {indexOfFirst + 1}-{Math.min(indexOfLast, boissons.length)} sur {boissons.length}
//               </span>
//             </div>
//             <div>
//               <Button 
//                 variant="outline-secondary" 
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => p - 1)}
//                 className="me-2"
//               >
//                 Précédent
//               </Button>
//               <span className="mx-2">Page {currentPage}</span>
//               <Button 
//                 variant="outline-secondary" 
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(p => p + 1)}
//               >
//                 Suivant
//               </Button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editId ? "Modifier Boisson" : "Nouvelle Boisson"}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Nom</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="nom"
//                 value={formData.nom}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Prix (€)</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="prix"
//                 min="0"
//                 step="0.01"
//                 value={formData.prix}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Stock</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="stock"
//                 min="0"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Annuler
//             </Button>
//             <Button variant="primary" type="submit">
//               {editId ? "Modifier" : "Enregistrer"}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   );
// };

// export default Boissons;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// axios.defaults.baseURL = "http://localhost:3000";

// const Boissons = () => {
//   const [boissons, setBoissons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [show, setShow] = useState(false); // Modal pour ajouter/modifier une boisson
//   const [formData, setFormData] = useState({ nom: "", prix: "", stock: "" });
//   const [editId, setEditId] = useState(null);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const boissonsPerPage = 9;

//   useEffect(() => {
//     fetchBoissons();
//   }, []);

//   // Récupérer les boissons
//   const fetchBoissons = async () => {
//     try {
//       const response = await axios.get("/api/boissons");
//       setBoissons(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des boissons", error.response || error.message);
//       alert("Erreur lors du chargement des boissons. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ouvrir la modal pour ajouter/modifier une boisson
//   const handleShow = (boisson = null) => {
//     if (boisson) {
//       setFormData(boisson);
//       setEditId(boisson.id);
//     } else {
//       setFormData({ nom: "", prix: "", stock: "" });
//       setEditId(null);
//     }
//     setShow(true);
//   };

//   // Fermer la modal
//   const handleClose = () => setShow(false);

//   // Gérer les changements dans le formulaire
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Soumettre le formulaire (ajouter/modifier une boisson)
//   const handleSubmit = async () => {
//     if (!formData.nom || !formData.prix || !formData.stock) {
//       alert("Veuillez remplir tous les champs correctement :\n- Nom obligatoire\n- Prix > 0\n- Stock >= 0");
//       return;
//     }

//     const dataToSend = {
//       nom: formData.nom,
//       prix: parseFloat(formData.prix),
//       stock: parseInt(formData.stock, 10),
//     };

//     try {
//       if (editId) {
//         await axios.put(`/api/boissons/${editId}`, dataToSend);
//         alert("Boisson modifiée avec succès !");
//       } else {
//         await axios.post("/api/boissons", dataToSend);
//         alert("Boisson ajoutée avec succès !");
//       }
//       fetchBoissons();
//       handleClose();
//     } catch (error) {
//       console.error("Erreur lors de l'ajout/modification de la boisson", error.response || error.message);
//       alert(`Erreur : ${error.response?.data?.message || error.message}`);
//     }
//   };

//   // Supprimer une boisson
//   const handleDelete = async (id) => {
//     if (window.confirm("Voulez-vous vraiment supprimer cette boisson ?")) {
//       try {
//         await axios.delete(`/api/boissons/${id}`);
//         alert("Boisson supprimée avec succès !");
//         fetchBoissons();
//       } catch (error) {
//         console.error("Erreur lors de la suppression de la boisson", error.response || error.message);
//         alert("Une erreur s'est produite. Veuillez réessayer.");
//       }
//     }
//   };

//   const navigate = useNavigate();

//   // Gestion de la pagination
//   const indexOfLastBoisson = currentPage * boissonsPerPage;
//   const indexOfFirstBoisson = indexOfLastBoisson - boissonsPerPage;
//   const currentBoissons = boissons.slice(indexOfFirstBoisson, indexOfLastBoisson);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mt-4">
//       <h2>Boissons</h2>
//       <div className="d-flex gap-2 mb-3">
//         <Button variant="primary" onClick={handleShow}>
//           Ajouter une boisson
//         </Button>
//         <Button variant="info" onClick={() => navigate("/venteBoissons")}>
//           Vendre
//         </Button>
//       </div>

//       {loading ? (
//         <Spinner animation="border" />
//       ) : boissons.length > 0 ? (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Nom</th>
//                 <th>Prix (€)</th>
//                 <th>Stock</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentBoissons.map((boisson) => (
//                 <tr key={boisson.id}>
//                   <td>{boisson.id}</td>
//                   <td>{boisson.nom}</td>
//                   <td>{boisson.prix} €</td>
//                   <td>{boisson.stock}</td>
//                   <td>
//                     <Button variant="warning" onClick={() => handleShow(boisson)} className="me-2">
//                       Modifier
//                     </Button>
//                     <Button variant="danger" onClick={() => handleDelete(boisson.id)} className="me-2">
//                       Supprimer
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {/* Pagination */}
//           <div className="d-flex justify-content-center mt-3">
//             <Button
//               variant="secondary"
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Précédent
//             </Button>
//             <span className="mx-3">Page {currentPage}</span>
//             <Button
//               variant="secondary"
//               onClick={() => paginate(currentPage + 1)}
//               disabled={indexOfLastBoisson >= boissons.length}
//             >
//               Suivant
//             </Button>
//           </div>
//         </>
//       ) : (
//         <p>Aucune boisson disponible</p>
//       )}

//       {/* Modal pour l'ajout/modification */}
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Modifier" : "Ajouter"} une boisson</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Nom</Form.Label>
//               <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Prix (€)</Form.Label>
//               <Form.Control type="number" name="prix" value={formData.prix} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Stock</Form.Label>
//               <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Annuler
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Sauvegarder
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Boissons;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Card, Badge, Spinner, Alert, Pagination, InputGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaEdit, FaTrash, FaWineGlassAlt, FaSearch, FaShoppingCart, FaEllipsisV } from "react-icons/fa";
import { MdInfo, MdWarning } from "react-icons/md";

axios.defaults.baseURL = "http://localhost:5000";

const Bar = () => {
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prix: "", stock: "", description: "" });
  const [selectedBoisson, setSelectedBoisson] = useState(null);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBoissons();
  }, []);

  const fetchBoissons = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/boissons");
      setBoissons(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des boissons", error);
      setError("Erreur lors du chargement des boissons");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (boisson = null) => {
    if (boisson) {
      setFormData(boisson);
      setEditId(boisson.id);
    } else {
      setFormData({ nom: "", prix: "", stock: "", description: "" });
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleShowDetails = (boisson) => {
    setSelectedBoisson(boisson);
    setShowDetailsModal(true);
  };

  const handleShowDeleteConfirmation = (boisson) => {
    setSelectedBoisson(boisson);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setShowDetailsModal(false);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.prix || !formData.stock) {
      setError("Les champs marqués d'un * sont obligatoires !");
      return;
    }

    try {
      const dataToSend = {
        nom: formData.nom,
        prix: parseFloat(formData.prix),
        stock: parseInt(formData.stock),
        description: formData.description || "Aucune description"
      };

      if (editId) {
        await axios.put(`/api/boissons/${editId}`, dataToSend);
        setSuccess("Boisson modifiée avec succès !");
      } else {
        await axios.post("/api/boissons", dataToSend);
        setSuccess("Boisson ajoutée avec succès !");
      }
      
      fetchBoissons();
      setTimeout(() => {
        setSuccess(null);
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'opération", error);
      setError(error.response?.data?.message || "Une erreur s'est produite");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/boissons/${selectedBoisson.id}`);
      setSuccess("Boisson supprimée avec succès !");
      fetchBoissons();
      setTimeout(() => setSuccess(null), 3000);
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      setError("Erreur lors de la suppression");
    }
  };

  // Filtrage et pagination
  const filteredBoissons = boissons.filter(boisson =>
    boisson.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoissons = filteredBoissons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBoissons.length / itemsPerPage);

  const StockBadge = ({ stock }) => {
    if (stock > 20) return <Badge bg="success">Stock: {stock}</Badge>;
    if (stock > 5) return <Badge bg="warning" text="dark">Stock: {stock}</Badge>;
    return <Badge bg="danger">Stock: {stock}</Badge>;
  };

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaWineGlassAlt className="me-2" />
              Gestion des Boissons
            </h2>
            <div>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal()} 
                size="sm"
                className="me-2"
              >
                <FaPlus size={12} className="me-1" /> Ajouter
              </Button>
              <Button 
                variant="info" 
                onClick={() => navigate("/venteBoissons")} 
                size="sm"
              >
                <FaShoppingCart size={12} className="me-1" /> Vendre
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch size={14} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                size="sm"
              />
            </InputGroup>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="sm" />
              <p className="mt-2 small">Chargement des boissons...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <tr>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>#</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Nom</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Prix</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem' }}>Stock</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem', textAlign: 'center', width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBoissons.length > 0 ? (
                      currentBoissons.map((boisson, index) => (
                        <tr key={boisson.id}>
                          <td style={{ fontSize: '0.9rem' }}>{indexOfFirstItem + index + 1}</td>
                          <td style={{ fontSize: '0.9rem' }}>
                            <strong>{boisson.nom}</strong>
                          </td>
                          <td style={{ fontSize: '0.9rem' }}>{boisson.prix} €</td>
                          <td style={{ fontSize: '0.9rem' }}>
                            <StockBadge stock={boisson.stock} />
                          </td>
                          <td className="text-center">
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="light" 
                                size="sm" 
                                id="dropdown-actions"
                                className="px-2 py-1"
                              >
                                <FaEllipsisV size={12} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleShowDetails(boisson)}>
                                  <MdInfo className="me-2 text-info" /> Détails
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleShowModal(boisson)}>
                                  <FaEdit className="me-2 text-primary" /> Modifier
                                </Dropdown.Item>
                                <Dropdown.Item 
                                  onClick={() => handleShowDeleteConfirmation(boisson)}
                                  className="text-danger"
                                >
                                  <FaTrash className="me-2" /> Supprimer
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 small">
                          {searchTerm ? "Aucune boisson ne correspond à votre recherche" : "Aucune boisson disponible"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {filteredBoissons.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination size="sm">
                    <Pagination.Prev
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal Ajout/Modification */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="md">
        <Modal.Header closeButton className="py-2">
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editId ? "Modifier" : "Ajouter"} une boisson
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger" className="py-1">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small">Nom *</Form.Label>
              <Form.Control 
                type="text" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
                required 
                size="sm"
                placeholder="Nom de la boisson"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small">Prix (€) *</Form.Label>
              <Form.Control 
                type="number" 
                name="prix" 
                value={formData.prix} 
                onChange={handleChange} 
                min="0"
                step="0.01"
                required 
                size="sm"
                placeholder="0.00"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small">Stock *</Form.Label>
              <Form.Control 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                min="0"
                required 
                size="sm"
                placeholder="Quantité en stock"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small">Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                size="sm"
                placeholder="Description optionnelle..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="outline-secondary" onClick={handleCloseModal} size="sm">
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} size="sm">
            {editId ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Détails */}
      <Modal show={showDetailsModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="py-2">
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            Détails de la boisson
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBoisson && (
            <div>
              <h5 className="mb-3">{selectedBoisson.nom}</h5>
              <div className="mb-2">
                <strong>Prix:</strong> {selectedBoisson.prix} €
              </div>
              <div className="mb-2">
                <strong>Stock:</strong> <StockBadge stock={selectedBoisson.stock} />
              </div>
              <div className="mb-2">
                <strong>Description:</strong>
                <p className="mt-1 text-muted">
                  {selectedBoisson.description || "Aucune description disponible"}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="outline-primary" onClick={handleCloseModal} size="sm">
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Confirmation Suppression */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered size="sm">
        <Modal.Header closeButton className="py-2 bg-light">
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            <MdWarning className="text-danger me-2" />
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            Êtes-vous sûr de vouloir supprimer la boisson <strong>{selectedBoisson?.nom}</strong> ?
            Cette action est irréversible.
          </p>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="outline-secondary" onClick={handleCloseModal} size="sm">
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete} size="sm">
            Confirmer la suppression
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bar;