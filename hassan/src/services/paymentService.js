import api from './api';

export const processPayment = async (paymentData) => {
  try {
    const response = await api.post('/paiements/process', paymentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await api.get('/paiements/history');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getInvoiceForPayment = async (paymentId) => {
  try {
    const response = await api.get(`/paiements/${paymentId}/facture`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};