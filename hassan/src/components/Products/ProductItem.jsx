import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>{product.unit}</td>
      <td>
        <Link to={`/products/${product.id}`} className="btn btn-sm btn-info">
          View
        </Link>
        <Link
          to={`/products/${product.id}/edit`}
          className="btn btn-sm btn-warning ml-2"
        >
          Edit
        </Link>
        <button className="btn btn-sm btn-danger ml-2">Delete</button>
      </td>
    </tr>
  );
};

export default ProductItem; // Assurez-vous d'avoir cette ligne à la fin