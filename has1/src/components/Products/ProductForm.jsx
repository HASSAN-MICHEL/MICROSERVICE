import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import { AppContext } from '../../context/AppContext.jsx';


const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useContext(AppContext);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    unit: '',
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post('/products', product);
      }
      fetchProducts();
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="bière">Bière</option>
            <option value="vin">Vin</option>
            <option value="spiritueux">Spiritueux</option>
            <option value="soft">Soft</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Unit</label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
            required
          >
            <option value="">Select unit</option>
            <option value="bouteille">Bouteille</option>
            <option value="casier-12">Casier 12</option>
            <option value="casier-24">Casier 24</option>
            <option value="palette">Palette</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;