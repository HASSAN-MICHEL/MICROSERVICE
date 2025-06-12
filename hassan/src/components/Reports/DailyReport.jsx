import { useState,  } from 'react';
import api from '../../services/api.js';
// import { AppContext } from '../../context/AppContext.jsx';

const DailyReport = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  // const { fetchSales } = useContext(AppContext);

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
    <div className='flex flex-col gap-4 '>
      <div>
      <h1 className='!text-persimmon-dark'>Daily Report</h1>
      <p className='md:text-lg'>Veillez inserer une date pour generé le raport</p>
      </div>
      <div className="form-group f rounded-md p-4 bg-white shadow-md shadow-black/40 flex flex-col gap-4 items-center !px-8 w-[fit-content] ">
        <div className="space-x-3">
        <label>Date :</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className='border bg-persimmon/10 !border-persimmon cursor-pointer  outline-0 p-2 rounded-md active:!border-1 focus:!border-persimmon'
        />
        </div>
        <button onClick={generateReport}  className="btn shadow-md shadow-black/40  !bg-persimmon/80  w-full">
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

