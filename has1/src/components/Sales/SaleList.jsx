import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { Link } from 'react-router-dom';
import SaleItem from './SaleItem.jsx';

const SaleList = () => {
  const { sales, loading, error } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header">
        <h1>Sales</h1>
        <Link to="/sales/new" className="btn btn-primary">
        Nouvelle Vente
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <SaleItem key={sale.id} sale={sale} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleList;