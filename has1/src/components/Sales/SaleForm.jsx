import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import { AppContext } from '../../context/AppContext.jsx';
import Cart from './Cart.jsx';

const SaleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchSales } = useContext(AppContext);
  const [sale, setSale] = useState({
    client_name: '',
    status: 'pending',
    packaging_included: false,
  });
  const [cart, setCart] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    if (products.length) {
      setAvailableProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (id) {
      const fetchSale = async () => {
        try {
          const response = await api.get(`/sales/${id}`);
          setSale(response.data.sale);
          setCart(response.data.items);
        } catch (error) {
          console.error('Error fetching sale:', error);
        }
      };
      fetchSale();
    }
  }, [id]);

  const handleSaleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSale({
      ...sale,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product_id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          unit: product.unit,
          category: product.category,
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const items = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      if (id) {
        await api.put(`/sales/${id}`, {
          client_name: sale.client_name,
          packaging_included: sale.packaging_included,
          items,
        });
      } else {
        await api.post('/sales', {
          client_name: sale.client_name,
          packaging_included: sale.packaging_included,
          items,
        });
      }
      fetchSales();
      navigate('/sales');
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const confirmSale = async () => {
    try {
      await api.put(`/sales/${id}/confirm`);
      fetchSales();
      navigate('/sales');
    } catch (error) {
      console.error('Error confirming sale:', error);
    }
  };

  const cancelSale = async () => {
    try {
      await api.put(`/sales/${id}/cancel`);
      fetchSales();
      navigate('/sales');
    } catch (error) {
      console.error('Error cancelling sale:', error);
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>{id ? 'Edit Sale' : 'New Sale'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client Name</label>
          <input
            type="text"
            name="client_name"
            value={sale.client_name}
            onChange={handleSaleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="packaging_included"
              checked={sale.packaging_included}
              onChange={handleSaleChange}
            />
            Include Packaging
          </label>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h3>Available Products</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="btn btn-sm btn-primary"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <Cart
              items={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
            <div className="total-amount">
              <h4>Total: {totalAmount.toLocaleString()}</h4>
            </div>
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          {id && sale.status === 'pending' && (
            <>
              <button
                type="button"
                onClick={confirmSale}
                className="btn btn-success"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={cancelSale}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SaleForm;