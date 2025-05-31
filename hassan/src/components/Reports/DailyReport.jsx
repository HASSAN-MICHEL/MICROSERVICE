import React, { useState, useContext } from 'react';
import api from '../../services/api.js';
import { AppContext } from '../../context/AppContext.jsx';

const DailyReport = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  const { fetchSales } = useContext(AppContext);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const generateReport = async () => {
    try {
      const response = await api.get(`/reports/daily?date=${date}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div>
      <h1>Daily Report</h1>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={generateReport} className="btn btn-primary">
          Generé
        </button>
      </div>

      {report && (
        <div>
          <h2>Vente du  {date}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {report.sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.client_name}</td>
                  <td>{sale.total_amount}</td>
                  <td>{sale.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Historique mouvement</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Vendu</th>
                <th>Retour</th>
                <th>en stock</th>
              </tr>
            </thead>
            <tbody>
              {report.stockMovements.map((movement) => (
                <tr key={movement.product_id}>
                  <td>{movement.product_name}</td>
                  <td>{movement.sold_quantity}</td>
                  <td>{movement.returned_quantity}</td>
                  <td>{movement.sold_quantity - movement.returned_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DailyReport;

