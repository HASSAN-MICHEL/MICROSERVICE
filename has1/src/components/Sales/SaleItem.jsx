import React from 'react';
import { Link } from 'react-router-dom';

const SaleItem = ({ sale }) => {
  return (
    <tr>
      <td>{sale.id}</td>
      <td>{sale.client_name}</td>
      <td>{new Date(sale.created_at).toLocaleDateString()}</td>
      <td>{sale.total_amount}</td>
      <td>
        <span className={`status ${sale.status}`}>{sale.status}</span>
      </td>
      <td>
        <Link to={`/sales/${sale.id}`} className="btn btn-sm btn-info">
          View
        </Link>
      </td>
    </tr>
  );
};

export default SaleItem;