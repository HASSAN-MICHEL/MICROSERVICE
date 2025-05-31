import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem.jsx';

const ProductList = () => {
  const { products, loading, error } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header">
        <h1>Products</h1>
        <Link to="/products/new" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;