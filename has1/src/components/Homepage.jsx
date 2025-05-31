// import React, { useState, useEffect } from "react";
// import { 
//   FaChartLine, 
//   FaCalendarAlt, 
//   FaUtensils, 
//   FaGlassCheers, 
//   FaUsers, 
//   FaUserCog,
//   FaMoneyBillWave,
//   FaClipboardList,
//   FaPlus,
//   FaArrowRight
// } from "react-icons/fa";
// import { FiActivity } from "react-icons/fi";
// import { Card, Row, Col, ProgressBar, Container, Badge } from "react-bootstrap";
// import axios from "axios";
// import { motion } from "framer-motion";


// const restaurantImg = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
// const barImg = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
// const statsImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
// const reservationImg = "https://images.unsplash.com/photo-1572715376701-98568319fd0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

// // Animation configurations
// const cardVariants = {
//   offscreen: { y: 20, opacity: 0 },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.4,
//       duration: 0.8
//     }
//   }
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.6 } }
// };

// const Homepage = () => {
//   const [stats, setStats] = useState([]);
//   const [dailySales, setDailySales] = useState({ bar: 0, restaurant: 0 });
//   const [monthlySales, setMonthlySales] = useState({ bar: 0, restaurant: 0 });
//   const [topDrinks, setTopDrinks] = useState([]);
//   const [recentSales, setRecentSales] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fonction pour formater les dates
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('fr-FR', options);
//   };

//   // Fonction pour récupérer les données
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Date d'aujourd'hui pour le rapport journalier
//         const today = new Date().toISOString().split('T')[0];
        
//         // Récupérer le rapport journalier
//         const dailyResponse = await axios.get(`/rapports/journalier/${today}`);
//         const dailyData = dailyResponse.data;
        
//         // Récupérer le rapport mensuel (mois en cours)
//         const currentDate = new Date();
//         const monthlyResponse = await axios.get(
//           `/rapports/mensuel/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`
//         );
//         const monthlyData = monthlyResponse.data;
        
//         // Récupérer les boissons les plus vendues (ce mois-ci)
//         const topDrinksResponse = await axios.get(
//           `/statistiques/boissons-plus-vendues/mensuel/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`
//         );
        
//         // Récupérer les dernières ventes
//         const recentSalesResponse = await axios.get("/");
//         const recentSalesData = recentSalesResponse.data.slice(0, 5);

//         // Calculer les totaux
//         const barDailyTotal = dailyData.reduce((sum, sale) => sum + (sale.type === 'bar' ? sale.montant : 0), 0);
//         const restaurantDailyTotal = dailyData.reduce((sum, sale) => sum + (sale.type === 'restaurant' ? sale.montant : 0), 0);
        
//         const barMonthlyTotal = monthlyData.reduce((sum, sale) => sum + (sale.type === 'bar' ? sale.montant : 0), 0);
//         const restaurantMonthlyTotal = monthlyData.reduce((sum, sale) => sum + (sale.type === 'restaurant' ? sale.montant : 0), 0);
        
//         // Mettre à jour les stats
//         setStats([
//           { 
//             title: "Réservations", 
//             value: 124, 
//             icon: <FaCalendarAlt size={24} className="text-primary" />, 
//             progress: 75, 
//             variant: "primary",
//             image: reservationImg
//           },
//           { 
//             title: "Clients", 
//             value: 89, 
//             icon: <FaUsers size={24} className="text-success" />, 
//             progress: 60, 
//             variant: "success",
//             image: statsImg
//           },
//           { 
//             title: "Ventes Restaurant", 
//             value: `${restaurantDailyTotal.toFixed(2)}€`, 
//             icon: <FaUtensils size={24} className="text-info" />, 
//             progress: (restaurantDailyTotal / restaurantMonthlyTotal * 100) || 0, 
//             variant: "info",
//             image: restaurantImg
//           },
//           { 
//             title: "Ventes Bar", 
//             value: `${barDailyTotal.toFixed(2)}€`, 
//             icon: <FaGlassCheers size={24} className="text-warning" />, 
//             progress: (barDailyTotal / barMonthlyTotal * 100) || 0, 
//             variant: "warning",
//             image: barImg
//           }
//         ]);

//         setDailySales({
//           bar: barDailyTotal,
//           restaurant: restaurantDailyTotal
//         });

//         setMonthlySales({
//           bar: barMonthlyTotal,
//           restaurant: restaurantMonthlyTotal
//         });

//         setTopDrinks(topDrinksResponse.data.slice(0, 3));
        
//         setRecentSales(recentSalesData.map(sale => ({
//           id: sale._id,
//           action: `Vente ${sale.type === 'bar' ? 'bar' : 'restaurant'}`,
//           time: formatDate(sale.date),
//           user: sale.client || 'Anonyme',
//           status: sale.type === 'bar' ? 'warning' : 'info'
//         })));

//         setLoading(false);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <motion.div 
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//             <span className="visually-hidden">Chargement...</span>
//           </div>
//           <p className="mt-3 fs-5">Chargement des données...</p>
//         </motion.div>
//       </Container>
//     );
//   }

//   const quickActions = [
//     { title: "Créer réservation", icon: <FaCalendarAlt className="fs-4" />, link: "/reservation", bg: "bg-primary-light" },
//     { title: "Ajouter client", icon: <FaUsers className="fs-4" />, link: "/clients", bg: "bg-success-light" },
//     { title: "Gérer menu", icon: <FaUtensils className="fs-4" />, link: "/menus", bg: "bg-info-light" },
//     { title: "Voir rapports", icon: <FaChartLine className="fs-4" />, link: "/rapportvente", bg: "bg-purple-light" }
//   ];

//   return (
//     <Container fluid className="px-4 py-3">
//       {/* En-tête */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//       >
//         <Row className="mb-4">
//           <Col>
//             <h2 className="fw-bold text-gradient">Tableau de bord</h2>
//             <p className="text-muted">Aperçu des activités et statistiques</p>
//           </Col>
//         </Row>
//       </motion.div>

//       {/* Cartes statistiques */}
//       <Row className="mb-4 g-4">
//         {stats.map((stat, index) => (
//           <Col key={index} xs={12} md={6} lg={3}>
//             <motion.div
//               variants={cardVariants}
//               initial="offscreen"
//               whileInView="onscreen"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <Card className="h-100 border-0 shadow-hover">
//                 <Card.Body className="p-0 overflow-hidden rounded">
//                   <div className="position-relative">
//                     <img 
//                       src={stat.image} 
//                       alt={stat.title}
//                       className="img-fluid w-100"
//                       style={{ height: '100px', objectFit: 'cover', filter: 'brightness(0.7)' }}
//                     />
//                     <div className="position-absolute top-0 start-0 p-3">
//                       <div className={`p-3 rounded-circle bg-white shadow-sm`}>
//                         {stat.icon}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-3">
//                     <h5 className="text-muted mb-1">{stat.title}</h5>
//                     <h3 className="mb-3">{stat.value}</h3>
//                     <div className="d-flex align-items-center">
//                       <ProgressBar 
//                         now={stat.progress} 
//                         variant={stat.variant} 
//                         className="flex-grow-1"
//                         style={{height: '6px'}}
//                       />
//                       <small className="ms-2 fw-bold">{stat.progress}%</small>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </motion.div>
//           </Col>
//         ))}
//       </Row>

//       {/* Contenu principal */}
//       <Row className="g-4">
//         {/* Activités récentes */}
//         <Col lg={8}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card className="h-100 border-0 shadow-sm">
//               <Card.Header className="bg-white border-0 py-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h5 className="mb-0 fw-bold d-flex align-items-center">
//                     <FiActivity className="me-2 text-primary" /> Activités récentes
//                   </h5>
//                   <a href="/activities" className="btn btn-sm btn-outline-primary">
//                     Voir tout <FaArrowRight className="ms-1" />
//                   </a>
//                 </div>
//               </Card.Header>
//               <Card.Body className="p-0">
//                 <div className="list-group list-group-flush">
//                   {recentSales.map((activity, i) => (
//                     <motion.div
//                       key={activity.id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 * i }}
//                     >
//                       <div className="list-group-item border-0 px-4 py-3 hover-bg-light">
//                         <Row className="align-items-center">
//                           <Col xs="auto">
//                             <Badge pill bg={activity.status} className="me-2">
//                               &nbsp;
//                             </Badge>
//                           </Col>
//                           <Col>
//                             <div className="d-flex justify-content-between">
//                               <span className="fw-medium">{activity.action}</span>
//                               <small className="text-muted">{activity.time}</small>
//                             </div>
//                             <small className="text-muted">Par {activity.user}</small>
//                           </Col>
//                         </Row>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </Card.Body>
//             </Card>
//           </motion.div>
//         </Col>

//         {/* Actions rapides + Statistiques */}
//         <Col lg={4}>
//           <Row className="g-4">
//             {/* Actions rapides */}
//             <Col xs={12}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <Card className="border-0 shadow-sm">
//                   <Card.Header className="bg-white border-0 py-3">
//                     <h5 className="mb-0 fw-bold">Actions rapides</h5>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row className="g-3">
//                       {quickActions.map((action, index) => (
//                         <Col key={index} xs={6}>
//                           <motion.div whileHover={{ y: -3 }}>
//                             <a href={action.link} className="text-decoration-none">
//                               <div className={`text-center p-3 rounded ${action.bg} hover-shadow`}>
//                                 <div className="mb-2">{action.icon}</div>
//                                 <small className="d-block fw-medium">{action.title}</small>
//                               </div>
//                             </a>
//                           </motion.div>
//                         </Col>
//                       ))}
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>

//             {/* Statistiques mensuelles */}
//             <Col xs={12}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Card className="border-0 shadow-sm">
//                   <Card.Header className="bg-white border-0 py-3">
//                     <h5 className="mb-0 fw-bold">Statistiques mensuelles</h5>
//                   </Card.Header>
//                   <Card.Body>
//                     <div className="mb-3">
//                       <div className="d-flex justify-content-between mb-1">
//                         <span className="text-muted">Restaurant</span>
//                         <span className="fw-bold">{monthlySales.restaurant.toFixed(2)}€</span>
//                       </div>
//                       <ProgressBar 
//                         now={(dailySales.restaurant / monthlySales.restaurant * 100) || 0} 
//                         variant="info" 
//                         style={{height: '6px'}} 
//                         className="progress-thin"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <div className="d-flex justify-content-between mb-1">
//                         <span className="text-muted">Bar</span>
//                         <span className="fw-bold">{monthlySales.bar.toFixed(2)}€</span>
//                       </div>
//                       <ProgressBar 
//                         now={(dailySales.bar / monthlySales.bar * 100) || 0} 
//                         variant="warning" 
//                         style={{height: '6px'}} 
//                         className="progress-thin"
//                       />
//                     </div>
//                     <div>
//                       <div className="d-flex justify-content-between mb-1">
//                         <span className="text-muted">Total</span>
//                         <span className="fw-bold text-success">{(monthlySales.bar + monthlySales.restaurant).toFixed(2)}€</span>
//                       </div>
//                       <ProgressBar 
//                         now={((dailySales.bar + dailySales.restaurant) / (monthlySales.bar + monthlySales.restaurant) * 100) || 0} 
//                         variant="success" 
//                         style={{height: '6px'}} 
//                         className="progress-thin"
//                       />
//                     </div>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-0 py-3 text-end">
//                     <a href="/stats" className="btn btn-sm btn-outline-primary">
//                       Voir détails <FaArrowRight className="ms-1" />
//                     </a>
//                   </Card.Footer>
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       {/* Section supplémentaire - Boissons les plus vendues */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="mt-4"
//       >
//         <Card className="border-0 shadow-sm">
//           <Card.Header className="bg-white border-0 py-3">
//             <h5 className="mb-0 fw-bold">Boissons les plus vendues</h5>
//           </Card.Header>
//           <Card.Body>
//             <div className="table-responsive">
//               <table className="table table-hover mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Boisson</th>
//                     <th>Quantité vendue</th>
//                     <th>Chiffre d'affaires</th>
//                     <th>Popularité</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topDrinks.map((drink, index) => (
//                     <motion.tr 
//                       key={index}
//                       whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
//                     >
//                       <td className="fw-medium">{drink.nom}</td>
//                       <td>{drink.quantite}</td>
//                       <td>{drink.montantTotal.toFixed(2)}€</td>
//                       <td>
//                         <ProgressBar 
//                           now={(drink.quantite / topDrinks[0].quantite * 100)} 
//                           variant="info" 
//                           style={{height: '6px', width: '100px'}} 
//                           className="progress-thin"
//                         />
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Card.Body>
//         </Card>
//       </motion.div>
//     </Container>
//   );
// };

// export default Homepage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Card, Badge, Spinner, Alert, Pagination, InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWineGlassAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

// Configuration dynamique de l'URL de base (identique à boisson.jsx)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '192.168.52.216'
  ? "http://localhost:5000"
  : `http://${window.location.hostname}:5000`;

axios.defaults.baseURL = API_BASE_URL;

// Intercepteurs pour le débogage (identique à boisson.jsx)
axios.interceptors.request.use(config => {
  console.log(`Requête envoyée à: ${config.baseURL}${config.url}`);
  return config;
}, error => {
  console.error('Erreur de requête:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('Réponse reçue:', response.config.url, response.status);
  return response;
}, error => {
  console.error('Erreur de réponse:', error);
  return Promise.reject(error);
});

const Homepage = () => {
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBoisson, setSelectedBoisson] = useState(null);
  const [error, setError] = useState(null);
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
      const response = await axios.get("/api/boissons", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      setBoissons(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des boissons", error);
      setError(`Erreur de connexion au serveur: ${error.message}`);
      setTimeout(fetchBoissons, 5000); // Tentative de reconnexion après 5s
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (boisson) => {
    setSelectedBoisson(boisson);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setError(null);
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
              Liste des Boissons
            </h2>
            <div>
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
                      <th style={{ padding: '10px 12px', fontSize: '0.9rem', textAlign: 'center', width: '100px' }}>Actions</th>
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
                          <td style={{ fontSize: '0.9rem' }}>{boisson.prix} FCFA</td>
                          <td style={{ fontSize: '0.9rem' }}>
                            <StockBadge stock={boisson.stock} />
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleShowDetails(boisson)}
                              className="px-2 py-1"
                            >
                              <MdInfo size={14} />
                            </Button>
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
                <strong>Prix:</strong> {selectedBoisson.prix} FCFA
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
    </div>
  );
};

export default Homepage;