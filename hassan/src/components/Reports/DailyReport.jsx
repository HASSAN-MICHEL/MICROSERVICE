// import React, { useState, useContext } from 'react';
// import api from '../../services/api.js';
// import { AppContext } from '../../context/AppContext.jsx';

// const DailyReport = () => {
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [report, setReport] = useState(null);
//   const { fetchSales } = useContext(AppContext);

//   const handleDateChange = (e) => { 
//     setDate(e.target.value);
//   };

//   const generateReport = async () => {
//     try {
//       const response = await api.get(`/reports/daily?date=${date}`);
//       setReport(response.data);
//     } catch (error) {
//       console.error('Error generating report:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Daily Report</h1>
//       <div className="form-group">
//         <label>Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={handleDateChange}
//         />
//         <button onClick={generateReport} className="btn btn-primary">
//           Generé
//         </button>
//       </div>

//       {report && (
//         <div>
//           <h2>Vente du  {date}</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Client</th>
//                 <th>Total</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.sales.map((sale) => (
//                 <tr key={sale.id}>
//                   <td>{sale.id}</td>
//                   <td>{sale.client_name}</td>
//                   <td>{sale.total_amount}</td>
//                   <td>{sale.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <h2>Historique mouvement</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Vendu</th>
//                 <th>Retour</th>
//                 <th>en stock</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.stockMovements.map((movement) => (
//                 <tr key={movement.product_id}>
//                   <td>{movement.product_name}</td>
//                   <td>{movement.sold_quantity}</td>
//                   <td>{movement.returned_quantity}</td>
//                   <td>{movement.sold_quantity - movement.returned_quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyReport;




import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import api from '../../services/api.js';
import { saveAs } from 'file-saver';

const DailyReport = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger le rapport du jour par défaut au montage
    generateReport();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`reports/sales/daily?date=${date}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Erreur inconnue');
      }
      
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error.message || 'Erreur lors de la génération du rapport');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await api.get(`/sales/daily/download?date=${date}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `rapport_journalier_${date}.pdf`);
    } catch (error) {
      console.error('Error downloading report:', error);
      setError('Erreur lors du téléchargement du PDF');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Rapport Journalier</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="reportDate" className="form-label">Date du rapport</label>
                <input
                  id="reportDate"
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={handleDateChange}
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button 
                onClick={generateReport} 
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading ? 'Génération...' : 'Générer le rapport'}
              </button>
              {report && (
                <button 
                  onClick={downloadPDF} 
                  className="btn btn-success"
                >
                  Télécharger PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p>Génération du rapport en cours...</p>
        </div>
      )}

      {report && !loading && (
        <div className="report-content">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="h5 mb-0">Résumé des ventes du {format(parseISO(date), 'dd/MM/yyyy')}</h2>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h3 className="card-title">Total des ventes</h3>
                      <p className="card-text display-6">
                        {report.daily_total.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'XOF'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-info mb-3">
                    <div className="card-body">
                      <h3 className="card-title">Nombre de ventes</h3>
                      <p className="card-text display-6">{report.sales_count}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h3 className="card-title">Catégorie la plus vendue</h3>
                      <p className="card-text display-6">
                        {report.top_category || 'Aucune donnée'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="h4 mb-3">Détail des produits vendus</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Produit</th>
                      <th className="text-end">Quantité</th>
                      <th className="text-end">Prix unitaire</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.product_name}</td>
                        <td className="text-end">{product.total_quantity}</td>
                        <td className="text-end">
                          {product.unit_price.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'XOF'
                          })}
                        </td>
                        <td className="text-end fw-bold">
                          {product.total_amount.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'XOF'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="table-active">
                      <td colSpan="3" className="text-end fw-bold">Total général</td>
                      <td className="text-end fw-bold">
                        {report.daily_total.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'XOF'
                        })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReport;