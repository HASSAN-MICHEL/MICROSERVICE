// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Table, Button, Modal, Form, Spinner, Card, 
//   Pagination, Tab, Tabs, Row, Col, Alert
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { saveAs } from 'file-saver';
// import { format, parseISO } from 'date-fns';
// import { fr } from 'date-fns/locale';

// const API_URL_VENTES = "http://localhost:5000/api/vente-boissons";
// const API_URL_BOISSONS = "http://localhost:5000/api/boissons";
// const API_URL_CLIENTS = "http://localhost:5000/api/clients";

// // Fonction helper pour formater les montants
// const formatMontant = (montant) => {
//   const num = Number(montant);
//   return isNaN(num) ? '0.00' : num.toFixed(2);
// };

// const VenteBoissons = () => {
//   const [ventes, setVentes] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [boissons, setBoissons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [show, setShow] = useState(false);
//   const [formData, setFormData] = useState({ client_id: "", boisson_id: "", quantite: 1 });
//   const [activeTab, setActiveTab] = useState("ventes");

//   // États pour les rapports
//   const [dailyReport, setDailyReport] = useState(null);
//   const [monthlyReport, setMonthlyReport] = useState(null);
//   const [yearlyReport, setYearlyReport] = useState(null);
//   const [reportDate, setReportDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//   const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
//   const [reportMonth, setReportMonth] = useState((new Date().getMonth() + 1).toString());
//   const [stats, setStats] = useState({ mostSold: [], salesByProduct: [], salesByClient: [] });

//   // États pour la pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(7);

//   useEffect(() => {
//     fetchData();
//     fetchInitialReports();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [resClients, resBoissons, resVentes] = await Promise.all([
//         axios.get(API_URL_CLIENTS),
//         axios.get(API_URL_BOISSONS),
//         axios.get(API_URL_VENTES)
//       ]);
//       setClients(resClients.data);
//       setBoissons(resBoissons.data);
//       setVentes(resVentes.data);
//     } catch (error) {
//       console.error("Erreur de chargement", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInitialReports = async () => {
//     try {
//       const today = format(new Date(), 'yyyy-MM-dd');
//       const year = new Date().getFullYear();
//       const month = new Date().getMonth() + 1;
      
//       const [dailyRes, monthlyRes, yearlyRes, mostSoldRes, salesProductRes, salesClientRes] = await Promise.all([
//         axios.get(`${API_URL_VENTES}/rapports/journalier/${today}`),
//         axios.get(`${API_URL_VENTES}/rapports/mensuel/${year}/${month}`),
//         axios.get(`${API_URL_VENTES}/rapports/annuel/${year}`),
//         axios.get(`${API_URL_VENTES}/statistiques/boissons-plus-vendues/month/${year}/${month}`),
//         axios.get(`${API_URL_VENTES}/statistiques/ventes-par-produit/month/${year}/${month}`),
//         axios.get(`${API_URL_VENTES}/statistiques/ventes-par-client/${year}`)
//       ]);
      
//       setDailyReport(dailyRes.data);
//       setMonthlyReport(monthlyRes.data);
//       setYearlyReport(yearlyRes.data);
//       setStats({
//         mostSold: mostSoldRes.data,
//         salesByProduct: salesProductRes.data,
//         salesByClient: salesClientRes.data
//       });
//     } catch (error) {
//       console.error("Erreur lors du chargement des rapports initiaux", error);
//     }
//   };

//   const handleShow = () => {
//     setFormData({ client_id: clients[0]?.id || "", boisson_id: boissons[0]?.id || "", quantite: 1 });
//     setShow(true);
//   };

//   const handleClose = () => setShow(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post(API_URL_VENTES, formData);
//       alert("Vente ajoutée avec succès !");
//       handleClose();
//       fetchData();
//       fetchInitialReports();
//     } catch (error) {
//       console.error("Erreur lors de l'ajout", error);
//       alert(`Erreur lors de l'ajout: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const fetchDailyReport = async () => {
//     try {
//       const response = await axios.get(`${API_URL_VENTES}/rapports/journalier/${reportDate}`);
//       setDailyReport(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du rapport journalier", error);
//       alert("Erreur lors de la récupération du rapport journalier");
//     }
//   };

//   const fetchMonthlyReport = async () => {
//     try {
//       const response = await axios.get(`${API_URL_VENTES}/rapports/mensuel/${reportYear}/${reportMonth}`);
//       setMonthlyReport(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du rapport mensuel", error);
//       alert("Erreur lors de la récupération du rapport mensuel");
//     }
//   };

//   const fetchYearlyReport = async () => {
//     try {
//       const response = await axios.get(`${API_URL_VENTES}/rapports/annuel/${reportYear}`);
//       setYearlyReport(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du rapport annuel", error);
//       alert("Erreur lors de la récupération du rapport annuel");
//     }
//   };

//   const fetchStats = async (period = 'month') => {
//     try {
//       let mostSoldUrl, salesProductUrl;
      
//       if (period === 'month') {
//         mostSoldUrl = `${API_URL_VENTES}/statistiques/boissons-plus-vendues/month/${reportYear}/${reportMonth}`;
//         salesProductUrl = `${API_URL_VENTES}/statistiques/ventes-par-produit/month/${reportYear}/${reportMonth}`;
//       } else {
//         mostSoldUrl = `${API_URL_VENTES}/statistiques/boissons-plus-vendues/year/${reportYear}`;
//         salesProductUrl = `${API_URL_VENTES}/statistiques/ventes-par-produit/year/${reportYear}`;
//       }
      
//       const [mostSoldRes, salesProductRes, salesClientRes] = await Promise.all([
//         axios.get(mostSoldUrl),
//         axios.get(salesProductUrl),
//         axios.get(`${API_URL_VENTES}/statistiques/ventes-par-client/${reportYear}`)
//       ]);
      
//       setStats({
//         mostSold: mostSoldRes.data,
//         salesByProduct: salesProductRes.data,
//         salesByClient: salesClientRes.data
//       });
//     } catch (error) {
//       console.error("Erreur lors de la récupération des statistiques", error);
//     }
//   };

//   const downloadReport = async (type) => {
//     try {
//       let params = {};
//       if (type === 'daily') params = { date: reportDate };
//       if (type === 'monthly') params = { year: reportYear, month: reportMonth };
//       if (type === 'yearly') params = { year: reportYear };
      
//       const response = await axios.get(`${API_URL_VENTES}/rapports/download/${type}`, {
//         params,
//         responseType: 'blob'
//       });
      
//       const filename = `rapport_${type}_${reportDate || reportYear}.pdf`;
//       saveAs(new Blob([response.data]), filename);
//     } catch (error) {
//       console.error("Erreur lors du téléchargement du rapport", error);
//       alert("Erreur lors du téléchargement du rapport");
//     }
//   };

//   const navigate = useNavigate();

//   // Calcul des éléments à afficher
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentVentes = ventes.slice(indexOfFirstItem, indexOfLastItem);

//   // Fonction pour changer de page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calcul du nombre total de pages
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(ventes.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const formatDate = (dateString) => {
//     return format(parseISO(dateString), 'dd MMMM yyyy', { locale: fr });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Ventes de Boissons</h2>
      
//       <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
//         <Tab eventKey="ventes" title="Liste des Ventes">
//           <div className="d-flex gap-2 mb-3">
//             <Button variant="primary" onClick={handleShow}>
//               Nouvelle Vente
//             </Button>
//             <Button variant="info" onClick={() => navigate("/boisson")}>
//               Voir les boissons
//             </Button>
//           </div>

//           {loading ? <Spinner animation="border" /> : (
//             <>
//               <Table striped bordered hover className="mt-3">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Client</th>
//                     <th>Boisson</th>
//                     <th>Quantité</th>
//                     <th>Montant (€)</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentVentes.map((vente, index) => (
//                     <tr key={vente.id}>
//                       <td>{indexOfFirstItem + index + 1}</td>
//                       <td>{clients.find((c) => c.id === vente.client_id)?.nom || "N/A"}</td>
//                       <td>{boissons.find((b) => b.id === vente.boisson_id)?.nom || "N/A"}</td>
//                       <td>{vente.quantite}</td>
//                       <td>{formatMontant(vente.montant_total)} FCFA</td>
//                       <td>{formatDate(vente.date_vente)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               <Pagination>
//                 <Pagination.Prev
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 />
//                 {pageNumbers.map((number) => (
//                   <Pagination.Item
//                     key={number}
//                     active={number === currentPage}
//                     onClick={() => paginate(number)}
//                   >
//                     {number}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === pageNumbers.length}
//                 />
//               </Pagination>
//             </>
//           )}
//         </Tab>

//         <Tab eventKey="rapports" title="Rapports">
//           <Row>
//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Rapport Journalier</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       value={reportDate}
//                       onChange={(e) => setReportDate(e.target.value)}
//                     />
//                   </Form.Group>
//                   <div className="d-flex gap-2">
//                     <Button onClick={fetchDailyReport}>
//                       Générer
//                     </Button>
//                     <Button variant="success" onClick={() => downloadReport('daily')}>
//                       Télécharger PDF
//                     </Button>
//                   </div>
                  
//                   {dailyReport && (
//                     <div className="mt-3">
//                       <h6>Détails des ventes</h6>
//                       <Table striped bordered size="sm">
//                         <thead>
//                           <tr>
//                             <th>Boisson</th>
//                             <th>Quantité</th>
//                             <th>Prix Total</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {dailyReport.details.map((item, i) => (
//                             <tr key={i}>
//                               <td>{item.boisson_nom}</td>
//                               <td>{item.quantite}</td>
//                               <td>{formatMontant(item.prix_total)} FCFA</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                       <Alert variant="info">
//                         Total journalier: <strong>{formatMontant(dailyReport.total)} FCFA</strong>
//                       </Alert>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Rapport Mensuel</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Année</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={reportYear}
//                       onChange={(e) => setReportYear(e.target.value)}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Mois</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={reportMonth}
//                       onChange={(e) => setReportMonth(e.target.value)}
//                     >
//                       {Array.from({ length: 12 }, (_, i) => (
//                         <option key={i+1} value={i+1}>{i+1}</option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                   <div className="d-flex gap-2">
//                     <Button onClick={fetchMonthlyReport}>
//                       Générer
//                     </Button>
//                     <Button variant="success" onClick={() => downloadReport('monthly')}>
//                       Télécharger PDF
//                     </Button>
//                   </div>
                  
//                   {monthlyReport && (
//                     <div className="mt-3">
//                       <h6>Résumé mensuel</h6>
//                       <Table striped bordered size="sm">
//                         <thead>
//                           <tr>
//                             <th>Date</th>
//                             <th>Boisson</th>
//                             <th>Quantité</th>
//                             <th>Total</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {monthlyReport.details.map((item, i) => (
//                             <tr key={i}>
//                               <td>{item.date}</td>
//                               <td>{item.boisson_nom}</td>
//                               <td>{item.quantite_totale}</td>
//                               <td>{formatMontant(item.prix_total)} FCFA</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                       <Alert variant="info">
//                         Total mensuel: <strong>{formatMontant(monthlyReport.total)} FCFA</strong>
//                       </Alert>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Rapport Annuel</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Année</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={reportYear}
//                       onChange={(e) => setReportYear(e.target.value)}
//                     />
//                   </Form.Group>
//                   <div className="d-flex gap-2">
//                     <Button onClick={fetchYearlyReport}>
//                       Générer
//                     </Button>
//                     <Button variant="success" onClick={() => downloadReport('yearly')}>
//                       Télécharger PDF
//                     </Button>
//                   </div>
                  
//                   {yearlyReport && (
//                     <div className="mt-3">
//                       <h6>Ventes par mois</h6>
//                       <Table striped bordered size="sm">
//                         <thead>
//                           <tr>
//                             <th>Mois</th>
//                             <th>Total</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {yearlyReport.monthly_totals.map((item, i) => (
//                             <tr key={i}>
//                               <td>{item.mois}</td>
//                               <td>{formatMontant(item.total_mois)} FCFA</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                       <h6 className="mt-3">Top produits</h6>
//                       <Table striped bordered size="sm">
//                         <thead>
//                           <tr>
//                             <th>Boisson</th>
//                             <th>Quantité</th>
//                             <th>CA</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {yearlyReport.product_totals.slice(0, 5).map((item, i) => (
//                             <tr key={i}>
//                               <td>{item.boisson_nom}</td>
//                               <td>{item.quantite_totale}</td>
//                               <td>{formatMontant(item.chiffre_affaires)} FCFA</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                       <Alert variant="info">
//                         Total annuel: <strong>{formatMontant(yearlyReport.total)} FCFA</strong>
//                       </Alert>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Tab>

//         <Tab eventKey="statistiques" title="Statistiques">
//           <Row>
//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Boissons les plus vendues</h5>
//                   <div className="d-flex gap-2 mb-3">
//                     <Button 
//                       onClick={() => fetchStats('month')}
//                       active={activeTab === 'month'}
//                     >
//                       Ce mois
//                     </Button>
//                     <Button 
//                       onClick={() => fetchStats('year')}
//                       active={activeTab === 'year'}
//                     >
//                       Cette année
//                     </Button>
//                   </div>
//                   <Table striped bordered size="sm">
//                     <thead>
//                       <tr>
//                         <th>Boisson</th>
//                         <th>Quantité</th>
//                         <th>Prix unitaire</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {stats.mostSold.map((item, i) => (
//                         <tr key={i}>
//                           <td>{item.nom}</td>
//                           <td>{item.total_ventes}</td>
//                           <td>{formatMontant(item.prix)} FCFA</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Ventes par produit</h5>
//                   <Table striped bordered size="sm">
//                     <thead>
//                       <tr>
//                         <th>Produit</th>
//                         <th>Quantité</th>
//                         <th>Chiffre d'affaires</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {stats.salesByProduct.map((item, i) => (
//                         <tr key={i}>
//                           <td>{item.nom}</td>
//                           <td>{item.total_ventes}</td>
//                           <td>{formatMontant(item.prix_total || item.chiffre_affaires)} FCFA</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col md={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <h5>Ventes par client</h5>
//                   <Table striped bordered size="sm">
//                     <thead>
//                       <tr>
//                         <th>Client</th>
//                         <th>Nombre d'achats</th>
//                         <th>Montant total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {stats.salesByClient.map((item, i) => (
//                         <tr key={i}>
//                           <td>{item.client_nom}</td>
//                           <td>{item.nombre_achats}</td>
//                           <td>{formatMontant(item.montant_total)} FCFA</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Tab>
//       </Tabs>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Nouvelle Vente</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Client</Form.Label>
//               <Form.Control 
//                 as="select" 
//                 name="client_id" 
//                 value={formData.client_id}
//                 onChange={handleChange}
//               >
//                 {clients.map((c) => (
//                   <option key={c.id} value={c.id}>{c.nom}</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Boisson</Form.Label>
//               <Form.Control 
//                 as="select" 
//                 name="boisson_id" 
//                 value={formData.boisson_id}
//                 onChange={handleChange}
//               >
//                 {boissons.map((b) => (
//                   <option key={b.id} value={b.id}>{b.nom} (Stock: {b.stock})</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Quantité</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 name="quantite" 
//                 min="1" 
//                 value={formData.quantite}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Annuler
//           </Button>
//           <Button onClick={handleSubmit}>
//             Valider
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default VenteBoissons;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, Button, Modal, Form, Spinner, Card, 
  Pagination, Tab, Tabs, Row, Col, Alert, InputGroup
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaPlus, FaWineGlassAlt, FaSearch, FaShoppingCart, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";

// Configuration dynamique de l'URL de base
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '192.168.52.216'
  ? "http://localhost:4000"
  : `http://${window.location.hostname}:4000`;

axios.defaults.baseURL = API_BASE_URL;

// URLs API
const API_URL_VENTES = "/api/vente-boissons";
const API_URL_BOISSONS = "/api/boissons";
const API_URL_CLIENTS = "/api/clients";

// Fonction helper pour formater les montants
const formatMontant = (montant) => {
  const num = Number(montant);
  return isNaN(num) ? '0.00' : num.toLocaleString('fr-FR');
};

const VenteBoissons = () => {
  const [ventes, setVentes] = useState([]);
  const [clients, setClients] = useState([]);
  const [boissons, setBoissons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("ventes");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // États pour la nouvelle vente
  const [newVente, setNewVente] = useState({
    client_id: "",
    produits: [],
    avec_emballage: true
  });

  const [currentProduit, setCurrentProduit] = useState({
    id: "",
    quantite: 1,
    emballage: "casier",
    taille_casier: 12
  });

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resClients, resBoissons, resVentes] = await Promise.all([
        axios.get(API_URL_CLIENTS),
        axios.get(API_URL_BOISSONS),
        axios.get(API_URL_VENTES)
      ]);
      setClients(resClients.data);
      setBoissons(resBoissons.data);
      setVentes(resVentes.data);
      setError(null);
    } catch (error) {
      console.error("Erreur de chargement", error);
      setError(`Erreur de connexion au serveur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const ajouterProduit = () => {
    const produit = boissons.find(b => b.id === currentProduit.id);
    if (!produit) {
      setError("Veuillez sélectionner un produit");
      return;
    }

    setNewVente(prev => ({
      ...prev,
      produits: [
        ...prev.produits,
        {
          ...currentProduit,
          nom: produit.nom,
          prix_unitaire: produit.prix,
          stock: produit.stock
        }
      ]
    }));

    // Réinitialiser le formulaire produit
    setCurrentProduit({
      id: "",
      quantite: 1,
      emballage: "casier",
      taille_casier: 12
    });
  };

  const supprimerProduit = (index) => {
    setNewVente(prev => ({
      ...prev,
      produits: prev.produits.filter((_, i) => i !== index)
    }));
  };

  const creerVente = async () => {
    if (!newVente.client_id || newVente.produits.length === 0) {
      setError("Veuillez sélectionner un client et ajouter au moins un produit");
      return;
    }

    try {
      // Générer un numéro de facture
      const numeroFacture = `FCT${(ventes.length + 1).toString().padStart(4, '0')}`;
      
      // Calculer les totaux
      const totalProduits = newVente.produits.reduce((sum, p) => sum + (p.quantite * p.prix_unitaire), 0);
      
      const casiers = newVente.produits.filter(p => p.emballage === "casier").length;
      const prixEmballage = newVente.avec_emballage ? casiers * 3500 : 0;
      
      const fraisEnlevement = newVente.produits.reduce((sum, p) => {
        if (p.emballage === "casier") {
          return sum + (p.taille_casier === 12 ? 600 : 1200);
        }
        return sum;
      }, 0);

      const totalGeneral = totalProduits + prixEmballage + fraisEnlevement;

      const nouvelleVente = {
        ...newVente,
        numero: numeroFacture,
        date: new Date().toISOString(),
        total_produits: totalProduits,
        prix_emballage: prixEmballage,
        frais_enlevement: fraisEnlevement,
        total_general: totalGeneral
      };

      // Envoyer au backend
      await axios.post(API_URL_VENTES, nouvelleVente);
      
      // Mettre à jour l'état local
      setVentes([...ventes, { ...nouvelleVente, id: ventes.length + 1 }]);
      setSuccess("Vente enregistrée avec succès !");
      setShow(false);
      setNewVente({ client_id: "", produits: [], avec_emballage: true });
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur lors de la création de la vente", error);
      setError(error.response?.data?.message || "Erreur lors de la création de la vente");
    }
  };

  const genererFacture = (vente) => {
    const client = clients.find(c => c.id === vente.client_id);
    if (!client) {
      setError("Client introuvable pour cette facture");
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Styles
    const margin = 15;
    let y = margin;

    // En-tête de l'entreprise
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('BOISSONS CI', margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Adresse: Abidjan, Plateau', margin, y);
    y += 5;
    doc.text('Tél: +225 01 23 45 67 89 | Email: contact@boissons.ci', margin, y);
    y += 10;

    // Ligne de séparation
    doc.setDrawColor(200);
    doc.line(margin, y, 200 - margin, y);
    y += 10;

    // Titre Facture
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', margin, y);
    y += 10;

    // Infos client et numéro facture
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Client: ${client.nom}`, margin, y);
    doc.text(`N° Facture: ${vente.numero}`, 120, y);
    y += 5;
    
    const dateFacture = new Date(vente.date);
    doc.text(`Date: ${dateFacture.toLocaleDateString('fr-FR')}`, margin, y);
    doc.text(`Heure: ${dateFacture.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`, 120, y);
    y += 10;

    // Tableau des produits
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉTAIL DES PRODUITS', margin, y);
    y += 8;

    // En-têtes du tableau
    doc.setFillColor(220, 220, 220);
    doc.rect(margin, y, 160, 8, 'F');
    doc.text('Produit', margin + 2, y + 6);
    doc.text('Qté', 80, y + 6);
    doc.text('P.U', 110, y + 6);
    doc.text('Montant', 140, y + 6);
    y += 8;

    // Détails des produits
    doc.setFont('helvetica', 'normal');
    
    vente.produits.forEach(produit => {
      const montant = produit.quantite * produit.prix_unitaire;
      
      doc.text(produit.nom, margin + 2, y + 6);
      doc.text(produit.quantite.toString(), 80, y + 6);
      doc.text(`${formatMontant(produit.prix_unitaire)} FCFA`, 110, y + 6);
      doc.text(`${formatMontant(montant)} FCFA`, 140, y + 6);
      y += 8;
    });

    y += 5;

    // Calcul des emballages
    const casiers = vente.produits.filter(p => p.emballage === "casier").length;
    const palettes = vente.produits.filter(p => p.emballage === "palette").length;
    const boites = vente.produits.filter(p => p.emballage === "boite").length;
    
    const totalColis = casiers + palettes + boites;
    const prixEmballage = vente.avec_emballage ? casiers * 3500 : 0;
    
    const fraisEnlevement = vente.produits.reduce((sum, p) => {
      if (p.emballage === "casier") {
        return sum + (p.taille_casier === 12 ? 600 : 1200);
      }
      return sum;
    }, 0);

    // Tableau des colis
    doc.setFont('helvetica', 'bold');
    doc.text('EMBALLAGES', margin, y);
    y += 8;
    
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, 160, 8, 'F');
    doc.text('Type', margin + 2, y + 6);
    doc.text('Qté', 80, y + 6);
    doc.text('Détail', 110, y + 6);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.text('Casiers', margin + 2, y + 6);
    doc.text(casiers.toString(), 80, y + 6);
    doc.text(`${casiers > 0 ? '3500 FCFA/unité' : '-'}`, 110, y + 6);
    y += 8;
    
    doc.text('Palettes', margin + 2, y + 6);
    doc.text(palettes.toString(), 80, y + 6);
    doc.text('-', 110, y + 6);
    y += 8;
    
    doc.text('Boites', margin + 2, y + 6);
    doc.text(boites.toString(), 80, y + 6);
    doc.text('-', 110, y + 6);
    y += 8;
    
    doc.text('Total Colis', margin + 2, y + 6);
    doc.text(totalColis.toString(), 80, y + 6);
    y += 10;

    // Tableau des totaux
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAUX', margin, y);
    y += 8;

    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, 80, 8, 'F');
    doc.text('Désignation', margin + 2, y + 6);
    doc.text('Montant', 60, y + 6);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.text('Total Produits', margin + 2, y + 6);
    doc.text(`${formatMontant(vente.total_produits)} FCFA`, 60, y + 6);
    y += 8;

    if (vente.avec_emballage && vente.prix_emballage > 0) {
      doc.text('Emballages', margin + 2, y + 6);
      doc.text(`${formatMontant(vente.prix_emballage)} FCFA`, 60, y + 6);
      y += 8;
    }

    doc.text('Frais d\'enlèvement', margin + 2, y + 6);
    doc.text(`${formatMontant(vente.frais_enlevement)} FCFA`, 60, y + 6);
    y += 10;

    // Total général
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL GENERAL', margin + 2, y + 8);
    doc.text(`${formatMontant(vente.total_general)} FCFA`, 60, y + 8);
    y += 15;

    // Conditions de paiement
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Paiement comptant - TVA non applicable, art. 293 B du CGI', margin, y);
    y += 5;
    doc.text('Merci pour votre confiance et à bientôt !', margin, y);

    // Sauvegarde
    doc.save(`Facture_${vente.numero}_${client.nom}.pdf`);
  };

  // Calcul des éléments à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVentes = ventes.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  // Filtrage des ventes
  const filteredVentes = ventes.filter(vente => {
    const client = clients.find(c => c.id === vente.client_id);
    return client?.nom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container-fluid py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <FaWineGlassAlt className="me-2" />
              Ventes de Boissons
            </h2>
            <div>
              <Button 
                variant="primary" 
                onClick={() => setShow(true)} 
                size="sm"
                className="me-2"
              >
                <FaPlus size={12} className="me-1" /> Nouvelle Vente
              </Button>
              <Button 
                variant="info" 
                onClick={() => navigate("/boisson")} 
                size="sm"
              >
                <FaShoppingCart size={12} className="me-1" /> Gestion Boissons
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
                placeholder="Rechercher par client..."
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

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="ventes" title="Liste des Ventes">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" size="sm" />
                  <p className="mt-2 small">Chargement des ventes...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                        <tr>
                          <th>N° Facture</th>
                          <th>Client</th>
                          <th>Date</th>
                          <th>Nb Produits</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentes.length > 0 ? (
                          filteredVentes.slice(indexOfFirstItem, indexOfLastItem).map((vente) => {
                            const client = clients.find(c => c.id === vente.client_id);
                            return (
                              <tr key={vente.id}>
                                <td>{vente.numero}</td>
                                <td>{client?.nom || "N/A"}</td>
                                <td>{formatDate(vente.date)}</td>
                                <td>{vente.produits?.length || 0}</td>
                                <td>{formatMontant(vente.total_general)} FCFA</td>
                                <td>
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => genererFacture(vente)}
                                  >
                                    <FaFilePdf size={14} /> Facture
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4 small">
                              {searchTerm ? "Aucune vente ne correspond à votre recherche" : "Aucune vente disponible"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {filteredVentes.length > itemsPerPage && (
                    <div className="d-flex justify-content-center mt-3">
                      <Pagination size="sm">
                        <Pagination.Prev
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        {Array.from({ length: Math.ceil(filteredVentes.length / itemsPerPage) }, (_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(filteredVentes.length / itemsPerPage)}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Modal pour nouvelle vente */}
      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Vente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Client *</Form.Label>
                <Form.Control
                  as="select"
                  value={newVente.client_id}
                  onChange={(e) => setNewVente({...newVente, client_id: e.target.value})}
                  size="sm"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.nom}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Inclure emballages (3500 FCFA/casier)"
                checked={newVente.avec_emballage}
                onChange={(e) => setNewVente({...newVente, avec_emballage: e.target.checked})}
                className="mt-4"
              />
            </Col>
          </Row>

          <h5 className="mt-4">Ajouter un produit</h5>
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Produit *</Form.Label>
                <Form.Control
                  as="select"
                  value={currentProduit.id}
                  onChange={(e) => setCurrentProduit({...currentProduit, id: e.target.value})}
                  size="sm"
                >
                  <option value="">Sélectionner un produit</option>
                  {boissons.map(boisson => (
                    <option key={boisson.id} value={boisson.id}>
                      {boisson.nom} ({formatMontant(boisson.prix)} FCFA) - Stock: {boisson.stock}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Quantité *</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={currentProduit.quantite}
                  onChange={(e) => setCurrentProduit({...currentProduit, quantite: parseInt(e.target.value) || 1})}
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Emballage *</Form.Label>
                <Form.Control
                  as="select"
                  value={currentProduit.emballage}
                  onChange={(e) => setCurrentProduit({...currentProduit, emballage: e.target.value})}
                  size="sm"
                >
                  <option value="casier">Casier</option>
                  <option value="palette">Palette</option>
                  <option value="boite">Boîte</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {currentProduit.emballage === "casier" && (
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Taille du casier *</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentProduit.taille_casier}
                    onChange={(e) => setCurrentProduit({...currentProduit, taille_casier: parseInt(e.target.value)})}
                    size="sm"
                  >
                    <option value={12}>12 unités (frais: 600 FCFA)</option>
                    <option value={24}>24 unités (frais: 1200 FCFA)</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}

          <div className="d-flex justify-content-end mb-3">
            <Button 
              variant="primary" 
              onClick={ajouterProduit}
              size="sm"
            >
              <FaPlus size={12} className="me-1" /> Ajouter Produit
            </Button>
          </div>

          {newVente.produits.length > 0 && (
            <>
              <h5 className="mt-4">Produits ajoutés</h5>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Qté</th>
                    <th>P.U</th>
                    <th>Montant</th>
                    <th>Emballage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newVente.produits.map((produit, index) => (
                    <tr key={index}>
                      <td>{produit.nom}</td>
                      <td>{produit.quantite}</td>
                      <td>{formatMontant(produit.prix_unitaire)}</td>
                      <td>{formatMontant(produit.quantite * produit.prix_unitaire)}</td>
                      <td>
                        {produit.emballage} 
                        {produit.emballage === "casier" && ` (${produit.taille_casier}u)`}
                      </td>
                      <td>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => supprimerProduit(index)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Calcul des totaux */}
              <div className="mt-3 p-3 bg-light rounded">
                <Row>
                  <Col md={4}>
                    <p className="mb-1">
                      <strong>Total Produits:</strong> {formatMontant(
                        newVente.produits.reduce((sum, p) => sum + (p.quantite * p.prix_unitaire), 0)
                      )} FCFA
                    </p>
                  </Col>
                  <Col md={4}>
                    <p className="mb-1">
                      <strong>Emballages:</strong> {formatMontant(
                        newVente.avec_emballage 
                          ? newVente.produits.filter(p => p.emballage === "casier").length * 3500
                          : 0
                      )} FCFA
                    </p>
                  </Col>
                  <Col md={4}>
                    <p className="mb-1">
                      <strong>Frais d'enlèvement:</strong> {formatMontant(
                        newVente.produits.reduce((sum, p) => {
                          if (p.emballage === "casier") {
                            return sum + (p.taille_casier === 12 ? 600 : 1200);
                          }
                          return sum;
                        }, 0)
                      )} FCFA
                    </p>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <h5>
                      <strong>Total Général:</strong> {formatMontant(
                        newVente.produits.reduce((sum, p) => sum + (p.quantite * p.prix_unitaire), 0) +
                        (newVente.avec_emballage 
                          ? newVente.produits.filter(p => p.emballage === "casier").length * 3500
                          : 0) +
                        newVente.produits.reduce((sum, p) => {
                          if (p.emballage === "casier") {
                            return sum + (p.taille_casier === 12 ? 600 : 1200);
                          }
                          return sum;
                        }, 0)
                      )} FCFA
                    </h5>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} size="sm">
            Annuler
          </Button>
          <Button 
            variant="primary" 
            onClick={creerVente} 
            size="sm"
            disabled={newVente.produits.length === 0 || !newVente.client_id}
          >
            Enregistrer la Vente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VenteBoissons;