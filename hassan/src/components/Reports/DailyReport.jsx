
// // // // // // import React, { useState, useContext } from 'react';
// // // // // // import api from '../../services/api.js';
// // // // // // import { AppContext } from '../../context/AppContext.jsx';

// // // // // // const DailyReport = () => {
// // // // // //   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // //   const [report, setReport] = useState(null);
// // // // // //   const { fetchSales } = useContext(AppContext);

// // // // // //   const handleDateChange = (e) => { 
// // // // // //     setDate(e.target.value);
// // // // // //   };

// // // // // //   const generateReport = async () => {
// // // // // //     try {
// // // // // //       const response = await api.get(`/reports/daily?date=${date}`);
// // // // // //       setReport(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error generating report:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1>Daily Report</h1>
// // // // // //       <div className="form-group">
// // // // // //         <label>Date</label>
// // // // // //         <input
// // // // // //           type="date"
// // // // // //           value={date}
// // // // // //           onChange={handleDateChange}
// // // // // //         />
// // // // // //         <button onClick={generateReport} className="btn btn-primary">
// // // // // //           Generé
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {report && (
// // // // // //         <div>
// // // // // //           <h2>Vente du  {date}</h2>
// // // // // //           <table className="table">
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>ID</th>
// // // // // //                 <th>Client</th>
// // // // // //                 <th>Total</th>
// // // // // //                 <th>Status</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody>
// // // // // //               {report.sales.map((sale) => (
// // // // // //                 <tr key={sale.id}>
// // // // // //                   <td>{sale.id}</td>
// // // // // //                   <td>{sale.client_name}</td>
// // // // // //                   <td>{sale.total_amount}</td>
// // // // // //                   <td>{sale.status}</td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </table>

// // // // // //           <h2>Historique mouvement</h2>
// // // // // //           <table className="table">
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>Product</th>
// // // // // //                 <th>Vendu</th>
// // // // // //                 <th>Retour</th>
// // // // // //                 <th>en stock</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody>
// // // // // //               {report.stockMovements.map((movement) => (
// // // // // //                 <tr key={movement.product_id}>
// // // // // //                   <td>{movement.product_name}</td>
// // // // // //                   <td>{movement.sold_quantity}</td>
// // // // // //                   <td>{movement.returned_quantity}</td>
// // // // // //                   <td>{movement.sold_quantity - movement.returned_quantity}</td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default DailyReport;




// // // // // import React, { useEffect } from 'react';
// // // // // import { format, parseISO } from 'date-fns';
// // // // // import api from '../../services/api.js';
// // // // // import { saveAs } from 'file-saver';

// // // // // import { useState,  } from 'react';
// // // // // import api from '../../services/api.js';
// // // // // import { AppContext } from '../../context/AppContext.jsx';


// // // // // const DailyReport = () => {
// // // // //   const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
// // // // //   const [report, setReport] = useState(null);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     // Charger le rapport du jour par défaut au montage
// // // // //     generateReport();
// // // // //   }, []);
// // // // //   // const { fetchSales } = useContext(AppContext);


// // // // //   const handleDateChange = (e) => {
// // // // //     setDate(e.target.value);
// // // // //   };

// // // // //   const generateReport = async () => {
// // // // //     setLoading(true);
// // // // //     setError(null);
    
// // // // //     try {
// // // // //       const response = await api.get(`reports/sales/daily?date=${date}`);
      
// // // // //       if (!response.data.success) {
// // // // //         throw new Error(response.data.error || 'Erreur inconnue');
// // // // //       }
      
// // // // //       setReport(response.data);
// // // // //     } catch (error) {
// // // // //       console.error('Error generating report:', error);
// // // // //       setError(error.message || 'Erreur lors de la génération du rapport');
// // // // //       setReport(null);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const downloadPDF = async () => {
// // // // //     try {
// // // // //       const response = await api.get(`/sales/daily/download?date=${date}`, {
// // // // //         responseType: 'blob'
// // // // //       });
      
// // // // //       const blob = new Blob([response.data], { type: 'application/pdf' });
// // // // //       saveAs(blob, `rapport_journalier_${date}.pdf`);
// // // // //     } catch (error) {
// // // // //       console.error('Error downloading report:', error);
// // // // //       setError('Erreur lors du téléchargement du PDF');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="container mt-4">
// // // // //       <h1 className="mb-4">Rapport Journalier</h1>
      
// // // // //       <div className="card mb-4">
// // // // //         <div className="card-body">
// // // // //           <div className="row align-items-center">
// // // // //             <div className="col-md-4">
// // // // //               <div className="form-group">
// // // // //                 <label htmlFor="reportDate" className="form-label">Date du rapport</label>
// // // // //                 <input
// // // // //                   id="reportDate"
// // // // //                   type="date"
// // // // //                   className="form-control"
// // // // //                   value={date}
// // // // //                   onChange={handleDateChange}
// // // // //                   max={format(new Date(), 'yyyy-MM-dd')}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="col-md-4 d-flex align-items-end">
// // // // //               <button 
// // // // //                 onClick={generateReport} 
// // // // //                 className="btn btn-primary me-2"
// // // // //                 disabled={loading}
// // // // //               >
// // // // //                 {loading ? 'Génération...' : 'Générer le rapport'}
// // // // //               </button>
// // // // //               {report && (
// // // // //                 <button 
// // // // //                   onClick={downloadPDF} 
// // // // //                   className="btn btn-success"
// // // // //                 >
// // // // //                   Télécharger PDF
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //     <div className='flex flex-col gap-4'>
// // // // //       <div>
// // // // //       <h1 className='!text-gray-500'>Daily Report</h1>
// // // // //       <p className='md:text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis obcaecati non solut.</p>
// // // // //       </div>
// // // // //       <div className="form-group f rounded-md bg-white shadow-md shadow-black/40 flex flex-col gap-4 items-center p-2 w-[fit-content] px-4">
// // // // //         <div className="space-x-3">
// // // // //         <label>Date :</label>
// // // // //         <input
// // // // //           type="date"
// // // // //           value={date}
// // // // //           onChange={handleDateChange}
// // // // //           className='border bg-gray-200 cursor-pointer  outline-0 p-2 rounded-md active:!border-1 active:!border-blue-600'
// // // // //         />
// // // // //         </div>
// // // // //         <button onClick={generateReport} className="btn btn-primary w-full">
// // // // //           Generé
// // // // //         </button>
// // // // //       </div>

// // // // //       {error && (
// // // // //         <div className="alert alert-danger">
// // // // //           {error}
// // // // //         </div>
// // // // //       )}

// // // // //       {loading && (
// // // // //         <div className="text-center my-4">
// // // // //           <div className="spinner-border text-primary" role="status">
// // // // //             <span className="visually-hidden">Chargement...</span>
// // // // //           </div>
// // // // //           <p>Génération du rapport en cours...</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {report && !loading && (
// // // // //         <div className="report-content">
// // // // //           <div className="card mb-4">
// // // // //             <div className="card-header bg-primary text-white">
// // // // //               <h2 className="h5 mb-0">Résumé des ventes du {format(parseISO(date), 'dd/MM/yyyy')}</h2>
// // // // //             </div>
// // // // //             <div className="card-body">
// // // // //               <div className="row mb-4">
// // // // //                 <div className="col-md-4">
// // // // //                   <div className="card text-white bg-success mb-3">
// // // // //                     <div className="card-body">
// // // // //                       <h3 className="card-title">Total des ventes</h3>
// // // // //                       <p className="card-text display-6">
// // // // //                         {report.daily_total.toLocaleString('fr-FR', {
// // // // //                           style: 'currency',
// // // // //                           currency: 'XOF'
// // // // //                         })}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="col-md-4">
// // // // //                   <div className="card text-white bg-info mb-3">
// // // // //                     <div className="card-body">
// // // // //                       <h3 className="card-title">Nombre de ventes</h3>
// // // // //                       <p className="card-text display-6">{report.sales_count}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="col-md-4">
// // // // //                   <div className="card text-white bg-warning mb-3">
// // // // //                     <div className="card-body">
// // // // //                       <h3 className="card-title">Catégorie la plus vendue</h3>
// // // // //                       <p className="card-text display-6">
// // // // //                         {report.top_category || 'Aucune donnée'}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <h3 className="h4 mb-3">Détail des produits vendus</h3>
// // // // //               <div className="table-responsive">
// // // // //                 <table className="table table-striped table-hover">
// // // // //                   <thead className="table-dark">
// // // // //                     <tr>
// // // // //                       <th>Produit</th>
// // // // //                       <th className="text-end">Quantité</th>
// // // // //                       <th className="text-end">Prix unitaire</th>
// // // // //                       <th className="text-end">Total</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {report.products.map((product, index) => (
// // // // //                       <tr key={index}>
// // // // //                         <td>{product.product_name}</td>
// // // // //                         <td className="text-end">{product.total_quantity}</td>
// // // // //                         <td className="text-end">
// // // // //                           {product.unit_price.toLocaleString('fr-FR', {
// // // // //                             style: 'currency',
// // // // //                             currency: 'XOF'
// // // // //                           })}
// // // // //                         </td>
// // // // //                         <td className="text-end fw-bold">
// // // // //                           {product.total_amount.toLocaleString('fr-FR', {
// // // // //                             style: 'currency',
// // // // //                             currency: 'XOF'
// // // // //                           })}
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))}
// // // // //                   </tbody>
// // // // //                   <tfoot>
// // // // //                     <tr className="table-active">
// // // // //                       <td colSpan="3" className="text-end fw-bold">Total général</td>
// // // // //                       <td className="text-end fw-bold">
// // // // //                         {report.daily_total.toLocaleString('fr-FR', {
// // // // //                           style: 'currency',
// // // // //                           currency: 'XOF'
// // // // //                         })}
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   </tfoot>
// // // // //                 </table>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DailyReport;



// // import { useState,  useRef } from 'react';
// // //import ReactToPrint  from 'react-to-print';
// // import { FaPrint } from 'react-icons/fa';
// // import api from '../../services/api.js';
// // // import { AppContext } from '../../context/AppContext.jsx';

// // const DailyReport = () => {
// //   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [report, setReport] = useState(null);
// //   // const { fetchSales } = useContext(AppContext);

// //   const handleDateChange = (e) => {
// //     setDate(e.target.value);
// //   };

// //   //const tablea = useRef();

// //   const handlePrint = () => {
// //     console.log('impression en cours')
// //     window.print();
// //     };

// //   const generateReport = async () => {
// //     try {
// //       const response = await api.get(`/reports/daily?date=${date}`);
// //       setReport(response.data);
// //     } catch (error) {
// //       console.error('Error generating report:', error);
// //     }
// //   };

// //   return (
// //     <div className='flex flex-col gap-4'>
// //       <div>
// //       <h1 className='!text-gray-500'>Rapport Journalier</h1>
// //       </div>
// //       <div className="form-group f rounded-md bg-white shadow-md shadow-black/40 flex flex-col gap-4 items-center p-2 w-[fit-content] px-4">
// //         <div className="space-x-3"> <h3>Cherché vos rapport par date</h3>
// //         <label>Date :</label>
// //         <input
// //           type="date"
// //           value={date}
// //           onChange={handleDateChange}
// //           className='border bg-gray-200 cursor-pointer  outline-0 p-2 rounded-md active:!border-1 active:!border-blue-600'
// //         />
// //         </div>
// //         <button onClick={generateReport} className="btn btn-primary w-full">
// //           Generé
// //         </button>
// //       </div>

// //       {report && (
// //         <div>
// //           <h2>Vente du  {date}</h2>
// //           <table className="table">
// //             <thead>
// //               <tr>
// //                 <th>ID</th>
// //                 <th>Client</th>
// //                 <th>Total</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {report.sales.map((sale) => (
// //                 <tr key={sale.id}>
// //                   <td>{sale.id}</td>
// //                   <td>{sale.client_name}</td>
// //                   <td>{sale.total_amount}</td>
// //                   <td>{sale.status}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //            <button className='btn btn-primary mb-3' onClick={handlePrint} ><FaPrint/> Imprimer </button>

           
// //             <h2>Historique mouvement</h2>
// //             <table className="table">
// //               <thead>
// //               <tr>
// //                 <th>Product</th>
// //                 <th>Vendu</th>
// //                 <th>Retour</th>
// //                 <th>en stock</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {report.stockMovements.map((movement) => (
// //                 <tr key={movement.product_id}>
// //                   <td>{movement.product_name}</td>
// //                   <td>{movement.sold_quantity}</td>
// //                   <td>{movement.returned_quantity}</td>
// //                   <td>{movement.disponible}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

          
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DailyReport;


// // // import { useState, useRef } from 'react';
// // // import { FaPrint, FaSearch, FaFileExport } from 'react-icons/fa';
// // // import api from '../../services/api.js';
// // // import html2canvas from 'html2canvas';
// // // import jsPDF from 'jspdf';
// // // import './PrintStyles.css'; // Import du fichier CSS

// // // const DailyReport = () => {
// // //   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
// // //   const [report, setReport] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const salesRef = useRef();
// // //   const stockRef = useRef();
// // //   const fullReportRef = useRef();

// // //   const handleDateChange = (e) => {
// // //     setDate(e.target.value);
// // //   };

// // //   const generatePDF = (contentRef, filename) => {
// // //     const input = contentRef.current;
// // //     html2canvas(input, {
// // //       scale: 2,
// // //       logging: true,
// // //       useCORS: true
// // //     }).then((canvas) => {
// // //       const imgData = canvas.toDataURL('image/png');
// // //       const pdf = new jsPDF('p', 'mm', 'a4');
// // //       const imgWidth = 210;
// // //       const imgHeight = canvas.height * imgWidth / canvas.width;
      
// // //       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
// // //       pdf.save(`${filename}_${date}.pdf`);
// // //     });
// // //   };

// // //   const handlePrintFullReport = () => {
// // //     generatePDF(fullReportRef, 'rapport_complet');
// // //   };

// // //   const handlePrintSales = () => {
// // //     generatePDF(salesRef, 'ventes');
// // //   };

// // //   const handlePrintStock = () => {
// // //     generatePDF(stockRef, 'mouvements_stock');
// // //   };

// // //   const generateReport = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await api.get(`/reports/daily?date=${date}`);
// // //       setReport(response.data);
// // //     } catch (error) {
// // //       console.error('Error generating report:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className='max-w-6xl mx-auto p-4'>
// // //       <div className='mb-8'>
// // //         <h1 className='text-2xl font-bold text-gray-700 mb-2'>Rapport Journalier</h1>
// // //         <p className='text-gray-500'>Générez et exportez vos rapports de vente et de stock</p>
// // //       </div>
      
// // //       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// // //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //           <div>
// // //             <h3 className='text-lg font-semibold text-gray-700 mb-1'>Recherche par date</h3>
// // //             <div className="flex items-center gap-3">
// // //               <input
// // //                 type="date"
// // //                 value={date}
// // //                 onChange={handleDateChange}
// // //                 className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
// // //               />
// // //               <button 
// // //                 onClick={generateReport} 
// // //                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// // //                 disabled={loading}
// // //               >
// // //                 {loading ? 'Chargement...' : (
// // //                   <>
// // //                     <FaSearch /> Générer
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
          
// // //           {report && (
// // //             <div className="flex flex-wrap gap-2">
// // //               <button 
// // //                 onClick={handlePrintFullReport}
// // //                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// // //               >
// // //                 <FaFileExport /> Export complet
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {report && (
// // //         <div ref={fullReportRef} className="print-container">
// // //           <div className="hidden print:block mb-8 text-center">
// // //             <h1 className="text-2xl font-bold">Rapport Journalier</h1>
// // //             <p className="text-gray-600">Date: {new Date(date).toLocaleDateString('fr-FR')}</p>
// // //             <p className="text-gray-600">Généré le: {new Date().toLocaleDateString('fr-FR')}</p>
// // //           </div>

// // //           <div ref={salesRef} className="bg-white rounded-lg shadow-md p-6 mb-8">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h2 className="text-xl font-semibold text-gray-800">Ventes du {new Date(date).toLocaleDateString('fr-FR')}</h2>
// // //               <button 
// // //                 onClick={handlePrintSales}
// // //                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors"
// // //               >
// // //                 <FaPrint /> Imprimer
// // //               </button>
// // //             </div>
            
// // //             <div className="overflow-x-auto">
// // //               <table className="min-w-full divide-y divide-gray-200">
// // //                 {/* ... (le reste du tableau des ventes) ... */}


// // //                  <thead className="bg-gray-50">
// // //                   <tr>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="bg-white divide-y divide-gray-200">
// // //                   {report.sales.map((sale, index) => (
// // //                     <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.id}</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.client_name || 'Non spécifié'}</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.total_amount} €</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
// // //                           ${sale.status === 'completed' ? 'bg-green-100 text-green-800' : 
// // //                             sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
// // //                             'bg-red-100 text-red-800'}`}>
// // //                           {sale.status === 'completed' ? 'Complété' : 
// // //                            sale.status === 'pending' ? 'En attente' : 'Annulé'}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //                 <tfoot className="bg-gray-100">
// // //                   <tr>
// // //                     <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">Total:</td>
// // //                     <td className="px-6 py-3 text-sm font-semibold text-gray-900">
// // //                       {report.sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0).toFixed(2)} €
// // //                     </td>
// // //                     <td></td>
// // //                   </tr>
// // //                 </tfoot>
// // //               </table>
// // //             </div>
// // //           </div>

// // //           <div ref={stockRef} className="bg-white rounded-lg shadow-md p-6">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h2 className="text-xl font-semibold text-gray-800">Mouvements de stock</h2>
// // //               <button 
// // //                 onClick={handlePrintStock}
// // //                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors"
// // //               >
// // //                 <FaPrint /> Imprimer
// // //               </button>
// // //             </div>
            
// // //             <div className="overflow-x-auto">
// // //               <table className="min-w-full divide-y divide-gray-200">
// // //                 {/* ... (le reste du tableau des mouvements de stock) ... */}



// // //                  <thead className="bg-gray-50">
// // //                   <tr>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendu</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retour</th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock final</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="bg-white divide-y divide-gray-200">
// // //                   {report.stockMovements.map((movement, index) => (
// // //                     <tr key={movement.product_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movement.product_name}</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.sold_quantity}</td>
// // //                       <td className="px-10 py-10 whitespace-nowrap text-sm text-gray-900">{movement.returned_quantity}</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
// // //                         <span className={`${movement.disponible < 5 ? 'text-red-600' : 'text-green-600'}`}>
// // //                           {movement.disponible}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DailyReport;





// import { useState, useRef } from 'react';
// import { FaPrint, FaSearch, FaFileExport } from 'react-icons/fa';
// import api from '../../services/api.js';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import './PrintStyles.css';

// const DailyReport = () => {
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const salesRef = useRef();
//   const stockRef = useRef();
//   const fullReportRef = useRef();

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//   };

//   const generatePDF = async (contentRef, filename) => {
//     const input = contentRef.current;
    
//     // Créer un clone du nœud pour manipulation
//     const clone = input.cloneNode(true);
//     clone.style.position = 'absolute';
//     clone.style.left = '-9999px';
//     clone.style.visibility = 'visible';
//     document.body.appendChild(clone);

//     // Convertir les styles problématiques
//     convertProblematicStyles(clone);

//     try {
//       const canvas = await html2canvas(clone, {
//         scale: 2,
//         logging: true,
//         useCORS: true,
//         backgroundColor: null,
//         ignoreElements: (el) => {
//           // Ignorer les boutons d'impression dans le PDF
//           return el.tagName === 'BUTTON' && el.textContent.includes('Imprimer');
//         }
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`${filename}_${date}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       // Nettoyer le clone
//       document.body.removeChild(clone);
//     }
//   };

//   const convertProblematicStyles = (element) => {
//     // Remplacer les couleurs problématiques
//     const elements = element.querySelectorAll('*');
//     elements.forEach(el => {
//       const styles = window.getComputedStyle(el);
      
//       // Vérifier et remplacer les couleurs de texte
//       if (styles.color.includes('oklch')) {
//         el.style.color = '#000000'; // Noir par défaut
//       }
      
//       // Vérifier et remplacer les couleurs de fond
//       if (styles.backgroundColor.includes('oklch')) {
//         if (el.classList.contains('bg-green-100')) {
//           el.style.backgroundColor = '#dcfce7';
//         } else if (el.classList.contains('bg-yellow-100')) {
//           el.style.backgroundColor = '#fef9c3';
//         } else if (el.classList.contains('bg-red-100')) {
//           el.style.backgroundColor = '#fee2e2';
//         } else {
//           el.style.backgroundColor = '#ffffff';
//         }
//       }
//     });
//   };

//   const handlePrintFullReport = () => {
//     generatePDF(fullReportRef, 'rapport_complet');
//   };

//   const handlePrintSales = () => {
//     generatePDF(salesRef, 'ventes');
//   };

//   const handlePrintStock = () => {
//     generatePDF(stockRef, 'mouvements_stock');
//   };

//   const generateReport = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/reports/daily?date=${date}`);
//       setReport(response.data);
//     } catch (error) {
//       console.error('Error generating report:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='max-w-6xl mx-auto p-4'>
//       <div className='mb-8'>
//         <h1 className='text-2xl font-bold text-gray-700 mb-2'>Rapport Journalier</h1>
//         <p className='text-gray-500'>Générez et exportez vos rapports de vente et de stock</p>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h3 className='text-lg font-semibold text-gray-700 mb-1'>Recherche par date</h3>
//             <div className="flex items-center gap-3">
//               <input
//                 type="date"
//                 value={date}
//                 onChange={handleDateChange}
//                 className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
//               />
//               <button 
//                 onClick={generateReport} 
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
//                 disabled={loading}
//               >
//                 {loading ? 'Chargement...' : (
//                   <>
//                     <FaSearch /> Générer
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           {report && (
//             <div className="flex flex-wrap gap-2">
//               <button 
//                 onClick={handlePrintFullReport}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
//               >
//                 <FaFileExport /> Export complet
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {report && (
//         <div ref={fullReportRef} className="print-container">
//           <div className="hidden print:block mb-8 text-center">
//             <h1 className="text-2xl font-bold">Rapport Journalier</h1>
//             <p className="text-gray-600">Date: {new Date(date).toLocaleDateString('fr-FR')}</p>
//             <p className="text-gray-600">Généré le: {new Date().toLocaleDateString('fr-FR')}</p>
//           </div>

//           <div ref={salesRef} className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Ventes du {new Date(date).toLocaleDateString('fr-FR')}</h2>
//               <button 
//                 onClick={handlePrintSales}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors print:hidden"
//               >
//                 <FaPrint /> Imprimer
//               </button>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {report.sales.map((sale, index) => (
//                     <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.id}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.client_name || 'Non spécifié'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.total_amount} €</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${sale.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
//                             sale.status === 'cancelled' ? 'bg-yellow-100 text-yellow-800' : 
//                             'bg-red-100 text-red-800'}`}>
//                           {sale.status === 'confirmed' ? 'Confimé' : 
//                            sale.status === 'cancelled' ? 'Annulé' : 'Annulé'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="bg-gray-100">
//                   <tr>
//                     <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900 text-right">Total:</td>
//                     <td className="px-6 py-3 text-sm font-semibold text-gray-900">
//                       {report.sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0).toFixed(2)} €
//                     </td>
//                     <td></td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           <div ref={stockRef} className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Mouvements de stock</h2>
//               <button 
//                 onClick={handlePrintStock}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors print:hidden"
//               >
//                 <FaPrint /> Imprimer
//               </button>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendu</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retour</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock final</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {report.stockMovements.map((movement, index) => (
//                     <tr key={movement.product_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movement.product_name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.sold_quantity}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.returned_quantity}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                         <span className={`${movement.disponible < 5 ? 'text-red-600' : 'text-green-600'}`}>
//                           {movement.disponible}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyReport;


import { useState, useRef } from 'react';
import { FaPrint, FaSearch, FaFileExport } from 'react-icons/fa';
import api from '../../services/api.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './PrintStyles.css';

const DailyReport = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const salesRef = useRef();
  const stockRef = useRef();
  const fullReportRef = useRef();

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const generatePDF = async (contentRef, filename) => {
    const input = contentRef.current;
    
    const clone = input.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.visibility = 'visible';
    document.body.appendChild(clone);

    convertProblematicStyles(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true,
        useCORS: true,
        backgroundColor: null,
        ignoreElements: (el) => {
          return el.tagName === 'BUTTON' && el.textContent.includes('Imprimer');
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${filename}_${date}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(clone);
    }
  };

  const convertProblematicStyles = (element) => {
    const elements = element.querySelectorAll('*');
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      
      if (styles.color.includes('oklch')) {
        el.style.color = '#000000';
      }
      
      if (styles.backgroundColor.includes('oklch')) {
        if (el.classList.contains('bg-green-100')) {
          el.style.backgroundColor = '#dcfce7';
        } else if (el.classList.contains('bg-yellow-100')) {
          el.style.backgroundColor = '#fef9c3';
        } else if (el.classList.contains('bg-red-100')) {
          el.style.backgroundColor = '#fee2e2';
        } else {
          el.style.backgroundColor = '#ffffff';
        }
      }
    });
  };

  const handlePrintFullReport = () => {
    generatePDF(fullReportRef, 'rapport_complet');
  };

  const handlePrintSales = () => {
    generatePDF(salesRef, 'ventes');
  };

  const handlePrintStock = () => {
    generatePDF(stockRef, 'mouvements_stock');
  };

  const generateReport = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reports/daily?date=${date}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-700 mb-2'>Rapport Journalier</h1>
        <p className='text-gray-500'>Générez et exportez vos rapports de vente et de stock</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className='text-lg font-semibold text-gray-700 mb-1'>Recherche par date</h3>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
              />
              <button 
                onClick={generateReport} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                disabled={loading}
              >
                {loading ? 'Chargement...' : (
                  <>
                    <FaSearch /> Générer
                  </>
                )}
              </button>
            </div>
          </div>
          
          {report && (
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handlePrintFullReport}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <FaFileExport /> Export complet
              </button>
            </div>
          )}
        </div>
      </div>

      {report && (
        <div ref={fullReportRef} className="print-container">
          <div className="hidden print:block mb-8 text-center border-b border-gray-300 pb-4">
            <h1 className="text-2xl font-bold">Rapport Journalier</h1>
            <p className="text-gray-600">Date: {new Date(date).toLocaleDateString('fr-FR')}</p>
            <p className="text-gray-600">Généré le: {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div ref={salesRef} className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Ventes du {new Date(date).toLocaleDateString('fr-FR')}</h2>
              <button 
                onClick={handlePrintSales}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors print:hidden"
              >
                <FaPrint /> Imprimer
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Statut</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.sales.map((sale, index) => (
                    <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{sale.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{sale.client_name || 'Non spécifié'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{sale.total_amount} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm border border-gray-200">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${sale.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            sale.status === 'cancelled' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {sale.status === 'confirmed' ? 'confimé' : 
                           sale.status === 'cancelled' ? 'Annulé' : 'Annulé'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100">
                  <tr>
                    <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900 text-right border border-gray-200">Total:</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900 border border-gray-200">
                      {report.sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0).toFixed(2)} €
                    </td>
                    <td className="border border-gray-200"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div ref={stockRef} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Mouvements de stock</h2>
              <button 
                onClick={handlePrintStock}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-colors print:hidden"
              >
                <FaPrint /> Imprimer
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Vendu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Retour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Stock final</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.stockMovements.map((movement, index) => (
                    <tr key={movement.product_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">{movement.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{movement.sold_quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{movement.returned_quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 border border-gray-200">
                        <span className={`${movement.disponible < 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {movement.disponible}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReport;