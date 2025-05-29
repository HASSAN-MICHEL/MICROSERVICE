import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';

const StockReport = () => {
  const { products, loading, error } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Stock Report</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReport;