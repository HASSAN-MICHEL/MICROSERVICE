import api from './api';

export const getInvoices = async () => {
  try {
    const response = await api.get('/factures');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await api.get(`/factures/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};