// import React, { useState, useEffect } from "react";
// import { 
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line, CartesianGrid, 
//   ComposedChart, Area ,  AreaChart
// } from "recharts";
// import axios from "axios";
// import { 
//   Container, Row, Col, Form, Spinner, Card, 
//   Table, Alert, Badge, Stack, ButtonGroup, Button
// } from "react-bootstrap";
// import moment from "moment";
// import 'moment/locale/fr';
// import { 
//   FiCalendar, FiTrendingUp, FiCoffee, 
//   FiPieChart, FiShoppingCart, FiDollarSign,
//   FiBarChart2, FiDownload
// } from "react-icons/fi";

// // Configuration d'axios
// axios.defaults.baseURL = "http://localhost:3000";

// const RapportVente = () => {
//   // États
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [period, setPeriod] = useState("month");
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
//   const [mostSold, setMostSold] = useState([]);
//   const [salesEvolution, setSalesEvolution] = useState([]);
//   const [dailyReport, setDailyReport] = useState({ total_ventes: 0, count: 0 });
//   const [monthlyReport, setMonthlyReport] = useState({ total_ventes: 0, count: 0 });
//   const [yearlyReport, setYearlyReport] = useState({ total_ventes: 0, count: 0 });
//   const [salesByProduct, setSalesByProduct] = useState([]);
//   const [chartType, setChartType] = useState("bar");

//   // Palette de couleurs
//   const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

//   // Formatage des montants
//   const formatAmount = (value) => {
//     const num = parseFloat(value || 0);
//     return isNaN(num) ? '0.00' : num.toLocaleString('fr-FR', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   };

//   // Calcul du pourcentage
//   const calculatePercentage = (part, total) => {
//     return total > 0 ? ((part / total * 100).toFixed(1)) : 0;
//   };

//   // Fonction unifiée de récupération des données
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const endpoints = [
//         `/api/vente-boissons/statistiques/boissons-plus-vendues/${period}/${year}${period === 'month' ? `/${month}` : ''}`,
//         `/api/vente-boissons/statistiques/evolution-ventes/${year}`,
//         `/api/vente-boissons/rapports/journalier/${date}`,
//         period === 'month' 
//           ? `/api/vente-boissons/rapports/mensuel/${year}/${month}`
//           : `/api/vente-boissons/rapports/annuel/${year}`,
//         `/api/vente-boissons/statistiques/ventes-par-produit/${period}/${year}${period === 'month' ? `/${month}` : ''}`
//       ];

//       const [
//         mostSoldRes, 
//         salesEvolutionRes, 
//         dailyReportRes, 
//         periodReportRes, 
//         salesByProductRes
//       ] = await Promise.all(endpoints.map(url => axios.get(url)));

//       setMostSold(mostSoldRes.data || []);
//       setSalesEvolution(salesEvolutionRes.data || []);
//       setDailyReport(dailyReportRes.data || { total_ventes: 0, count: 0 });
      
//       if (period === 'month') {
//         setMonthlyReport(periodReportRes.data || { total_ventes: 0, count: 0 });
//       } else {
//         setYearlyReport(periodReportRes.data || { total_ventes: 0, count: 0 });
//       }
      
//       setSalesByProduct(salesByProductRes.data || []);

//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError(error.response?.data?.message || "Erreur de chargement des données");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [period, month, year, date]);

//   // Gestion des changements de filtres
//   const handlePeriodChange = (e) => setPeriod(e.target.value);
//   const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
//   const handleYearChange = (e) => setYear(parseInt(e.target.value));
//   const handleDateChange = (e) => setDate(e.target.value);

//   // Calcul des totaux pour le tableau
//   const totalQuantite = salesByProduct.reduce((sum, item) => sum + (item.total_ventes || 0), 0);
//   const totalCA = salesByProduct.reduce((sum, item) => sum + (parseFloat(item.prix_total || item.chiffre_affaires) || 0), 0);

//   // Préparation des données pour les graphiques
//   const prepareChartData = () => {
//     return salesByProduct.slice(0, 7).map((item, index) => ({
//       name: item.nom,
//       quantité: item.total_ventes,
//       CA: parseFloat(item.prix_total || item.chiffre_affaires) || 0,
//       color: COLORS[index % COLORS.length]
//     }));
//   };

//   const chartData = prepareChartData();

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   return (
//     <Container fluid="lg" className="py-4">
//       {/* En-tête */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h1 className="h3 mb-1 text-primary">
//             <FiCoffee className="me-2" />
//             Rapports des ventes de boissons
//           </h1>
//           <p className="text-muted mb-0">Analyse et visualisation des performances de vente</p>
//         </div>
//         <Badge bg="light" text="dark" className="fs-6">
//           <FiCalendar className="me-1" />
//           {moment().format('LL')}
//         </Badge>
//       </div>

//       {/* Message d'erreur */}
//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
//           <div className="d-flex align-items-center">
//             <FiCoffee className="me-2" />
//             {error}
//           </div>
//         </Alert>
//       )}

//       {/* Filtres */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Body>
//           <Row className="g-3">
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label className="fw-medium">Période</Form.Label>
//                 <Form.Select 
//                   value={period} 
//                   onChange={handlePeriodChange}
//                   className="border-primary"
//                 >
//                   <option value="month">Mensuel</option>
//                   <option value="year">Annuel</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
            
//             {period === 'month' && (
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="fw-medium">Mois</Form.Label>
//                   <Form.Select 
//                     value={month} 
//                     onChange={handleMonthChange}
//                     className="border-primary"
//                   >
//                     {Array.from({ length: 12 }, (_, i) => (
//                       <option key={i+1} value={i+1}>
//                         {moment().month(i).format('MMMM')}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             )}
            
//             <Col md={period === 'month' ? 3 : 6}>
//               <Form.Group>
//                 <Form.Label className="fw-medium">Année</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   value={year} 
//                   onChange={handleYearChange}
//                   min="2020" 
//                   max={new Date().getFullYear()}
//                   className="border-primary"
//                 />
//               </Form.Group>
//             </Col>
            
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label className="fw-medium">Date journalière</Form.Label>
//                 <Form.Control 
//                   type="date" 
//                   value={date} 
//                   onChange={handleDateChange}
//                   max={moment().format('YYYY-MM-DD')}
//                   className="border-primary"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Cartes de résumé */}
//        // Modifiez la partie des cartes de résumé comme suit :

// <Row className="mb-4 g-4">
//   <Col md={4}>
//     <Card className="h-100 border-start border-4 border-primary shadow-sm">
//       <Card.Body>
//         <Stack direction="horizontal" gap={3} className="mb-3">
//           <div className="bg-primary bg-opacity-10 p-2 rounded">
//             <FiCalendar className="text-primary fs-4" />
//           </div>
//           <div>
//             <Card.Title className="mb-0">Journalier</Card.Title>
//             <Card.Text className="text-muted small">
//               {moment(date).format('LL')}
//             </Card.Text>
//           </div>
//         </Stack>
//         <Card.Text className="display-6 fw-bold text-primary mb-1">
//           {formatAmount(dailyReport?.total || dailyReport?.total_ventes || 0)} FCFA
//         </Card.Text>
//         <Card.Text className="text-muted">
//           <small>{dailyReport?.count || dailyReport?.nombre_ventes || 0} ventes</small>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   </Col>
  
//   <Col md={4}>
//     <Card className="h-100 border-start border-4 border-success shadow-sm">
//       <Card.Body>
//         <Stack direction="horizontal" gap={3} className="mb-3">
//           <div className="bg-success bg-opacity-10 p-2 rounded">
//             <FiTrendingUp className="text-success fs-4" />
//           </div>
//           <div>
//             <Card.Title className="mb-0">
//               {period === 'month' ? 'Mensuel' : 'Annuel'}
//             </Card.Title>
//             <Card.Text className="text-muted small">
//               {period === 'month' 
//                 ? moment().month(month-1).format('MMMM YYYY') 
//                 : year}
//             </Card.Text>
//           </div>
//         </Stack>
//         <Card.Text className="display-6 fw-bold text-success mb-1">
//           {formatAmount(
//             period === 'month' 
//               ? monthlyReport?.total || monthlyReport?.total_ventes || 0 
//               : yearlyReport?.total || yearlyReport?.total_ventes || 0
//           )} FCFA
//         </Card.Text>
//         <Card.Text className="text-muted">
//           <small>
//             {period === 'month' 
//               ? monthlyReport?.count || monthlyReport?.nombre_ventes || 0 
//               : yearlyReport?.count || yearlyReport?.nombre_ventes || 0} ventes
//           </small>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   </Col>
  
//   <Col md={4}>
//     <Card className="h-100 border-start border-4 border-info shadow-sm">
//       <Card.Body>
//         <Stack direction="horizontal" gap={3} className="mb-3">
//           <div className="bg-info bg-opacity-10 p-2 rounded">
//             <FiTrendingUp className="text-info fs-4" />
//           </div>
//           <div>
//             <Card.Title className="mb-0">Évolution {period === 'month' ? 'mensuelle' : 'annuelle'}</Card.Title>
//             <Card.Text className="text-muted small">
//               Comparaison des performances
//             </Card.Text>
//           </div>
//         </Stack>
//         <Card.Text className="display-6 fw-bold text-info mb-1">
//           {formatAmount(salesEvolution.reduce((sum, item) => sum + (item?.total || 0), 0))} FCFA
//         </Card.Text>
//         <Card.Text className="text-muted">
//           <small>Sur {salesEvolution.length} {period === 'month' ? 'mois' : 'années'}</small>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   </Col>
// </Row>

//       {/* Graphiques */}
//       <Row className="mb-4 g-4">
//         <Col lg={6}>
//           <Card className="h-100 shadow-sm">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div className="d-flex align-items-center">
//                   <FiShoppingCart className="text-warning me-2 fs-4" />
//                   <Card.Title className="mb-0">Top boissons</Card.Title>
//                 </div>
//                 <ButtonGroup size="sm">
//                   <Button 
//                     variant={chartType === 'bar' ? 'primary' : 'outline-primary'}
//                     onClick={() => setChartType('bar')}
//                   >
//                     <FiBarChart2 />
//                   </Button>
//                   <Button 
//                     variant={chartType === 'line' ? 'primary' : 'outline-primary'}
//                     onClick={() => setChartType('line')}
//                   >
//                     <FiTrendingUp />
//                   </Button>
//                 </ButtonGroup>
//               </div>
              
//               {mostSold.length > 0 ? (
//                 <div style={{ height: '350px' }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     {chartType === 'bar' ? (
//                       <ComposedChart data={mostSold.slice(0, 7)}>
//                         <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
//                         <XAxis 
//                           dataKey="nom" 
//                           tick={{ fontSize: 12 }}
//                           angle={-45}
//                           textAnchor="end"
//                           height={60}
//                         />
//                         <YAxis yAxisId="left" orientation="left" />
//                         <YAxis yAxisId="right" orientation="right" />
//                         <Tooltip 
//                           formatter={(value, name) => {
//                             if (name === 'Quantité vendue') return [value, name];
//                             return [`${formatAmount(value)} FCFA`, name];
//                           }}
//                           contentStyle={{
//                             background: '#fff',
//                             border: 'none',
//                             borderRadius: '8px',
//                             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                             padding: '12px'
//                           }}
//                         />
//                         <Legend />
//                         <Bar 
//                           yAxisId="left"
//                           dataKey="total_ventes" 
//                           name="Quantité vendue" 
//                           fill="#4E79A7"
//                           radius={[4, 4, 0, 0]}
//                         />
//                         <Line 
//                           yAxisId="right"
//                           type="monotone" 
//                           dataKey="priz" 
//                           name="Prix moyen" 
//                           stroke="#E15759"
//                           strokeWidth={2}
//                           dot={{ r: 4 }}
//                         />
//                       </ComposedChart>
//                     ) : (
//                       <LineChart data={mostSold.slice(0, 7)}>
//                         <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
//                         <XAxis 
//                           dataKey="nom" 
//                           tick={{ fontSize: 12 }}
//                           angle={-45}
//                           textAnchor="end"
//                           height={60}
//                         />
//                         <YAxis />
//                         <Tooltip 
//                           formatter={(value) => [`${value}`, "Quantité vendue"]}
//                           contentStyle={{
//                             background: '#fff',
//                             border: 'none',
//                             borderRadius: '8px',
//                             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                             padding: '12px'
//                           }}
//                         />
//                         <Legend />
//                         <Line 
//                           type="monotone" 
//                           dataKey="total_ventes" 
//                           name="Quantité vendue" 
//                           stroke="#4E79A7"
//                           strokeWidth={2}
//                           activeDot={{ r: 6 }}
//                         />
//                       </LineChart>
//                     )}
//                   </ResponsiveContainer>
//                 </div>
//               ) : (
//                 <div className="text-center py-5 text-muted">
//                   <FiCoffee className="fs-1 opacity-25" />
//                   <p className="mt-2">Aucune donnée disponible</p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col lg={6}>
//           <Card className="h-100 shadow-sm">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div className="d-flex align-items-center">
//                   <FiPieChart className="text-danger me-2 fs-4" />
//                   <Card.Title className="mb-0">Répartition des ventes</Card.Title>
//                 </div>
//                 <Button variant="outline-primary" size="sm">
//                   <FiDownload className="me-1" /> Exporter
//                 </Button>
//               </div>
              
//               {chartData.length > 0 ? (
//                 <Row>
//                   <Col md={7}>
//                     <div style={{ height: '350px' }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={chartData}
//                             dataKey="CA"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             innerRadius={60}
//                             paddingAngle={5}
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                             labelLine={false}
//                           >
//                             {chartData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Pie>
//                           <Tooltip 
//                             formatter={(value) => [`${formatAmount(value)} FCFA`, "Chiffre d'affaires"]}
//                             contentStyle={{
//                               background: '#fff',
//                               border: 'none',
//                               borderRadius: '8px',
//                               boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                               padding: '12px'
//                             }}
//                           />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Col>
//                   <Col md={5}>
//                     <div className="h-100 d-flex flex-column justify-content-center">
//                       <div className="mb-3">
//                         <h6 className="fw-bold mb-3">Légende</h6>
//                         <div className="d-flex flex-wrap gap-2">
//                           {chartData.map((item, index) => (
//                             <div key={index} className="d-flex align-items-center me-3 mb-2">
//                               <div 
//                                 style={{
//                                   width: '12px',
//                                   height: '12px',
//                                   backgroundColor: item.color,
//                                   borderRadius: '2px',
//                                   marginRight: '6px'
//                                 }}
//                               />
//                               <span className="small">{item.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="mt-auto pt-3">
//                         <h6 className="fw-bold mb-2">Totaux</h6>
//                         <div className="d-flex justify-content-between small">
//                           <span>Quantité totale:</span>
//                           <span className="fw-bold">{totalQuantite}</span>
//                         </div>
//                         <div className="d-flex justify-content-between small">
//                           <span>CA total:</span>
//                           <span className="fw-bold text-primary">{formatAmount(totalCA)} FCFA</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               ) : (
//                 <div className="text-center py-5 text-muted">
//                   <FiCoffee className="fs-1 opacity-25" />
//                   <p className="mt-2">Aucune donnée disponible</p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Tableau des ventes */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Body className="p-0">
//           <div className="p-3 bg-light bg-opacity-10 border-bottom">
//             <div className="d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center">
//                 <FiDollarSign className="text-primary me-2 fs-5" />
//                 <Card.Title className="mb-0">Détail des ventes par produit</Card.Title>
//               </div>
//               <Button variant="outline-primary" size="sm">
//                 <FiDownload className="me-1" /> Exporter en CSV
//               </Button>
//             </div>
//           </div>
          
//           {salesByProduct.length > 0 ? (
//             <div className="table-responsive">
//               <Table hover className="mb-0">
//                 <thead className="bg-light bg-opacity-10">
//                   <tr>
//                     <th className="py-3 ps-4">Produit</th>
//                     <th className="py-3 text-end">Quantité vendue</th>
//                     <th className="py-3 text-end">% du total</th>
//                     <th className="py-3 pe-4 text-end">Chiffre d'affaires</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {salesByProduct.map((item, index) => (
//                     <tr key={index}>
//                       <td className="py-3 ps-4 align-middle">
//                         <div className="d-flex align-items-center">
//                           <div 
//                             style={{
//                               width: '12px',
//                               height: '12px',
//                               backgroundColor: COLORS[index % COLORS.length],
//                               borderRadius: '2px',
//                               marginRight: '12px'
//                             }}
//                           />
//                           <span>{item.nom || 'N/A'}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 align-middle text-end">
//                         {item.total_ventes || 0}
//                       </td>
//                       <td className="py-3 align-middle text-end">
//                         {calculatePercentage(item.total_ventes, totalQuantite)}%
//                       </td>
//                       <td className="py-3 pe-4 align-middle text-end fw-bold text-primary">
//                         {formatAmount(item.prix_total || item.chiffre_affaires)} FCFA
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="bg-light bg-opacity-10">
//                   <tr>
//                     <th className="py-3 ps-4">Total</th>
//                     <th className="py-3 text-end fw-bold">
//                       {totalQuantite}
//                     </th>
//                     <th className="py-3 text-end fw-bold">
//                       100%
//                     </th>
//                     <th className="py-3 pe-4 text-end fw-bold text-primary">
//                       {formatAmount(totalCA)} FCFA
//                     </th>
//                   </tr>
//                 </tfoot>
//               </Table>
//             </div>
//           ) : (
//             <div className="text-center py-5 text-muted">
//               <FiCoffee className="fs-1 opacity-25" />
//               <p className="mt-2">Aucune donnée disponible</p>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Graphique d'évolution */}
//       {salesEvolution.length > 0 && (
//         <Card className="mb-4 shadow-sm">
//           <Card.Body>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="d-flex align-items-center">
//                 <FiTrendingUp className="text-success me-2 fs-4" />
//                 <Card.Title className="mb-0">Évolution des ventes</Card.Title>
//               </div>
//               <ButtonGroup size="sm">
//                 <Button variant="outline-primary">Mensuel</Button>
//                 <Button variant="outline-primary">Trimestriel</Button>
//                 <Button variant="outline-primary">Annuel</Button>
//               </ButtonGroup>
//             </div>
//             <div style={{ height: '300px' }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={salesEvolution}>
//                   <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
//                   <XAxis 
//                     dataKey="month" 
//                     tickFormatter={(value) => moment().month(value-1).format('MMM')}
//                   />
//                   <YAxis />
//                   <Tooltip 
//                     formatter={(value) => [`${formatAmount(value)} FCFA`, "Total"]}
//                     labelFormatter={(value) => `Mois: ${moment().month(value-1).format('MMMM')}`}
//                     contentStyle={{
//                       background: '#fff',
//                       border: 'none',
//                       borderRadius: '8px',
//                       boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                       padding: '12px'
//                     }}
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="total" 
//                     name="Ventes" 
//                     stroke="#59A14F" 
//                     fill="#59A14F" 
//                     fillOpacity={0.1}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default RapportVente;


import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, 
  ComposedChart, Area, AreaChart
} from "recharts";
import axios from "axios";
import { 
  Container, Row, Col, Form, Spinner, Card, 
  Table, Alert, Badge, Stack, ButtonGroup, Button
} from "react-bootstrap";
import moment from "moment";
import 'moment/locale/fr';
import { 
  FiCalendar, FiTrendingUp, FiCoffee, 
  FiPieChart, FiShoppingCart, FiDollarSign,
  FiBarChart2, FiDownload
} from "react-icons/fi";

// Création d'une instance axios spécifique pour ce composant
// const apiVenteBoissons = axios.create({
//   baseURL: "http://localhost:4000/api/vente-boissons"
// });


const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://192.168.52.216:4000'
  : `http://${window.location.hostname}:4000`;

const apiVenteBoissons = axios.create({
  baseURL: `${API_BASE_URL}/api/vente-boissons`,
  withCredentials: true
});


const RapportVente = () => {
  // États
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("month");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [mostSold, setMostSold] = useState([]);
  const [salesEvolution, setSalesEvolution] = useState([]);
  const [dailyReport, setDailyReport] = useState({ total: 0, nombre_ventes: 0 });
  const [monthlyReport, setMonthlyReport] = useState({ total: 0, nombre_ventes: 0 });
  const [yearlyReport, setYearlyReport] = useState({ total: 0, nombre_ventes: 0 });
  const [salesByProduct, setSalesByProduct] = useState([]);
  const [chartType, setChartType] = useState("bar");

  // Palette de couleurs
  const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1"];

  // Formatage des montants
  const formatAmount = (value) => {
    const num = parseFloat(value || 0);
    return isNaN(num) ? '0.00' : num.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Calcul du pourcentage
  const calculatePercentage = (part, total) => {
    return total > 0 ? ((part / total * 100).toFixed(1)) : 0;
  };

  // Fonction unifiée de récupération des données
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Récupération des rapports
      const [dailyRes, periodRes, evolutionRes] = await Promise.all([
        apiVenteBoissons.get(`/rapports/journalier/${date}`),
        period === 'month' 
          ? apiVenteBoissons.get(`/rapports/mensuel/${year}/${month}`)
          : apiVenteBoissons.get(`/rapports/annuel/${year}`),
        apiVenteBoissons.get(`/statistiques/evolution-ventes/${year}`)
      ]);

      setDailyReport(dailyRes.data);
      if (period === 'month') {
        setMonthlyReport(periodRes.data);
      } else {
        setYearlyReport(periodRes.data);
      }
      setSalesEvolution(evolutionRes.data);

      // Récupération des statistiques
      const [mostSoldRes, salesProductRes] = await Promise.all([
        apiVenteBoissons.get(`/statistiques/boissons-plus-vendues/${period}/${year}${period === 'month' ? `/${month}` : ''}`),
        apiVenteBoissons.get(`/statistiques/ventes-par-produit/${period}/${year}${period === 'month' ? `/${month}` : ''}`)
      ]);

      setMostSold(mostSoldRes.data);
      setSalesByProduct(salesProductRes.data);

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.response?.data?.message || "Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };


  
  useEffect(() => {
    fetchData();
  }, [period, month, year, date]);

  // Gestion des changements de filtres
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleDateChange = (e) => setDate(e.target.value);

  // Calcul des totaux pour le tableau
  const totalQuantite = salesByProduct.reduce((sum, item) => sum + (item.total_ventes || 0), 0);
  const totalCA = salesByProduct.reduce((sum, item) => sum + (parseFloat(item.prix_total || item.chiffre_affaires) || 0), 0);

  // Préparation des données pour les graphiques
  const prepareChartData = () => {
    return salesByProduct.slice(0, 7).map((item, index) => ({
      name: item.nom,
      quantité: item.total_ventes,
      CA: parseFloat(item.prix_total || item.chiffre_affaires) || 0,
      color: COLORS[index % COLORS.length]
    }));
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid="lg" className="py-4">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1 text-primary">
            <FiCoffee className="me-2" />
            Rapports des ventes de boissons
          </h1>
          <p className="text-muted mb-0">Analyse et visualisation des performances de vente</p>
        </div>
        <Badge bg="light" text="dark" className="fs-6">
          <FiCalendar className="me-1" />
          {moment().format('LL')}
        </Badge>
      </div>

      {/* Message d'erreur */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
          <div className="d-flex align-items-center">
            <FiCoffee className="me-2" />
            {error}
          </div>
        </Alert>
      )}

      {/* Filtres */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-medium">Période</Form.Label>
                <Form.Select 
                  value={period} 
                  onChange={handlePeriodChange}
                  className="border-primary"
                >
                  <option value="month">Mensuel</option>
                  <option value="year">Annuel</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {period === 'month' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-medium">Mois</Form.Label>
                  <Form.Select 
                    value={month} 
                    onChange={handleMonthChange}
                    className="border-primary"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i+1} value={i+1}>
                        {moment().month(i).format('MMMM')}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            
            <Col md={period === 'month' ? 3 : 6}>
              <Form.Group>
                <Form.Label className="fw-medium">Année</Form.Label>
                <Form.Control 
                  type="number" 
                  value={year} 
                  onChange={handleYearChange}
                  min="2020" 
                  max={new Date().getFullYear()}
                  className="border-primary"
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-medium">Date journalière</Form.Label>
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={handleDateChange}
                  max={moment().format('YYYY-MM-DD')}
                  className="border-primary"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Cartes de résumé */}
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="h-100 border-start border-4 border-primary shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded">
                  <FiCalendar className="text-primary fs-4" />
                </div>
                <div>
                  <Card.Title className="mb-0">Journalier</Card.Title>
                  <Card.Text className="text-muted small">
                    {moment(date).format('LL')}
                  </Card.Text>
                </div>
              </Stack>
              <Card.Text className="display-6 fw-bold text-primary mb-1">
                {formatAmount(dailyReport?.total || 0)} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>{dailyReport?.nombre_ventes || 0} ventes</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-start border-4 border-success shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-success bg-opacity-10 p-2 rounded">
                  <FiTrendingUp className="text-success fs-4" />
                </div>
                <div>
                  <Card.Title className="mb-0">
                    {period === 'month' ? 'Mensuel' : 'Annuel'}
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    {period === 'month' 
                      ? moment().month(month-1).format('MMMM YYYY') 
                      : year}
                  </Card.Text>
                </div>
              </Stack>
              <Card.Text className="display-6 fw-bold text-success mb-1">
                {formatAmount(
                  period === 'month' 
                    ? monthlyReport?.total || 0 
                    : yearlyReport?.total || 0
                )} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>
                  {period === 'month' 
                    ? monthlyReport?.nombre_ventes || 0 
                    : yearlyReport?.nombre_ventes || 0} ventes
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-start border-4 border-info shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-info bg-opacity-10 p-2 rounded">
                  <FiTrendingUp className="text-info fs-4" />
                </div>
                <div>
                  <Card.Title className="mb-0">Évolution {period === 'month' ? 'mensuelle' : 'annuelle'}</Card.Title>
                  <Card.Text className="text-muted small">
                    Comparaison des performances
                  </Card.Text>
                </div>
              </Stack>
              <Card.Text className="display-6 fw-bold text-info mb-1">
                {formatAmount(salesEvolution.reduce((sum, item) => sum + (item?.total || 0), 0))} FCFA
              </Card.Text>
              <Card.Text className="text-muted">
                <small>Sur {salesEvolution.length} {period === 'month' ? 'mois' : 'années'}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques */}
      <Row className="mb-4 g-4">
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <FiShoppingCart className="text-warning me-2 fs-4" />
                  <Card.Title className="mb-0">Top boissons</Card.Title>
                </div>
                <ButtonGroup size="sm">
                  <Button 
                    variant={chartType === 'bar' ? 'primary' : 'outline-primary'}
                    onClick={() => setChartType('bar')}
                  >
                    <FiBarChart2 />
                  </Button>
                  <Button 
                    variant={chartType === 'line' ? 'primary' : 'outline-primary'}
                    onClick={() => setChartType('line')}
                  >
                    <FiTrendingUp />
                  </Button>
                </ButtonGroup>
              </div>
              
              {mostSold.length > 0 ? (
                <div style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <ComposedChart data={mostSold.slice(0, 7)}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis 
                          dataKey="nom" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'Quantité vendue') return [value, name];
                            return [`${formatAmount(value)} FCFA`, name];
                          }}
                        />
                        <Legend />
                        <Bar 
                          yAxisId="left"
                          dataKey="total_ventes" 
                          name="Quantité vendue" 
                          fill="#4E79A7"
                          radius={[4, 4, 0, 0]}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="prix" 
                          name="Prix moyen" 
                          stroke="#E15759"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </ComposedChart>
                    ) : (
                      <LineChart data={mostSold.slice(0, 7)}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis 
                          dataKey="nom" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}`, "Quantité vendue"]}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="total_ventes" 
                          name="Quantité vendue" 
                          stroke="#4E79A7"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <FiCoffee className="fs-1 opacity-25" />
                  <p className="mt-2">Aucune donnée disponible</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <FiPieChart className="text-danger me-2 fs-4" />
                  <Card.Title className="mb-0">Répartition des ventes</Card.Title>
                </div>
                <Button variant="outline-primary" size="sm">
                  <FiDownload className="me-1" /> Exporter
                </Button>
              </div>
              
              {chartData.length > 0 ? (
                <Row>
                  <Col md={7}>
                    <div style={{ height: '350px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            dataKey="CA"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={60}
                            paddingAngle={5}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${formatAmount(value)} FCFA`, "Chiffre d'affaires"]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="h-100 d-flex flex-column justify-content-center">
                      <div className="mb-3">
                        <h6 className="fw-bold mb-3">Légende</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {chartData.map((item, index) => (
                            <div key={index} className="d-flex align-items-center me-3 mb-2">
                              <div 
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  backgroundColor: item.color,
                                  borderRadius: '2px',
                                  marginRight: '6px'
                                }}
                              />
                              <span className="small">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto pt-3">
                        <h6 className="fw-bold mb-2">Totaux</h6>
                        <div className="d-flex justify-content-between small">
                          <span>Quantité totale:</span>
                          <span className="fw-bold">{totalQuantite}</span>
                        </div>
                        <div className="d-flex justify-content-between small">
                          <span>CA total:</span>
                          <span className="fw-bold text-primary">{formatAmount(totalCA)} FCFA</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="text-center py-5 text-muted">
                  <FiCoffee className="fs-1 opacity-25" />
                  <p className="mt-2">Aucune donnée disponible</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau des ventes */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-0">
          <div className="p-3 bg-light bg-opacity-10 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FiDollarSign className="text-primary me-2 fs-5" />
                <Card.Title className="mb-0">Détail des ventes par produit</Card.Title>
              </div>
              <Button variant="outline-primary" size="sm">
                <FiDownload className="me-1" /> Exporter en CSV
              </Button>
            </div>
          </div>
          
          {salesByProduct.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light bg-opacity-10">
                  <tr>
                    <th className="py-3 ps-4">Produit</th>
                    <th className="py-3 text-end">Quantité vendue</th>
                    <th className="py-3 text-end">% du total</th>
                    <th className="py-3 pe-4 text-end">Chiffre d'affaires</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByProduct.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 ps-4 align-middle">
                        <div className="d-flex align-items-center">
                          <div 
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: COLORS[index % COLORS.length],
                              borderRadius: '2px',
                              marginRight: '12px'
                            }}
                          />
                          <span>{item.nom || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3 align-middle text-end">
                        {item.total_ventes || 0}
                      </td>
                      <td className="py-3 align-middle text-end">
                        {calculatePercentage(item.total_ventes, totalQuantite)}%
                      </td>
                      <td className="py-3 pe-4 align-middle text-end fw-bold text-primary">
                        {formatAmount(item.prix_total || item.chiffre_affaires)} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-light bg-opacity-10">
                  <tr>
                    <th className="py-3 ps-4">Total</th>
                    <th className="py-3 text-end fw-bold">
                      {totalQuantite}
                    </th>
                    <th className="py-3 text-end fw-bold">
                      100%
                    </th>
                    <th className="py-3 pe-4 text-end fw-bold text-primary">
                      {formatAmount(totalCA)} FCFA
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <FiCoffee className="fs-1 opacity-25" />
              <p className="mt-2">Aucune donnée disponible</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Graphique d'évolution */}
      {salesEvolution.length > 0 && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <FiTrendingUp className="text-success me-2 fs-4" />
                <Card.Title className="mb-0">Évolution des ventes</Card.Title>
              </div>
              <ButtonGroup size="sm">
                <Button variant={period === 'month' ? 'primary' : 'outline-primary'} onClick={() => setPeriod('month')}>
                  Mensuel
                </Button>
                <Button variant={period === 'year' ? 'primary' : 'outline-primary'} onClick={() => setPeriod('year')}>
                  Annuel
                </Button>
              </ButtonGroup>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesEvolution}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey={period === 'month' ? 'month' : 'year'} 
                    tickFormatter={(value) => 
                      period === 'month' 
                        ? moment().month(value-1).format('MMM') 
                        : value
                    }
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${formatAmount(value)} FCFA`, "Total"]}
                    labelFormatter={(value) => 
                      period === 'month' 
                        ? `Mois: ${moment().month(value-1).format('MMMM')}` 
                        : `Année: ${value}`
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    name="Ventes" 
                    stroke="#59A14F" 
                    fill="#59A14F" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default RapportVente;