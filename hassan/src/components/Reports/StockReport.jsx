import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';

const StockReport = () => {
  const { products, loading, error } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Rapport Stock</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Categories</th>
            <th>Prix </th>
            <th>Stock</th>
            <th>Unité</th>
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