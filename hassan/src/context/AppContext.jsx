import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await api.get('/sales');
      setSales(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        sales,
        loading,
        error,
        fetchProducts,
        fetchSales,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};