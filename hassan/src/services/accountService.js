import api from './api';

export const addPaymentAccount = async (accountData) => {
  try {
    const response = await api.post('/payment/accounts', accountData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPaymentAccounts = async () => {
  try {
    const response = await api.get('/payment/accounts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const setDefaultAccount = async (accountId) => {
  try {
    const response = await api.put(`/payment/accounts/${accountId}/default`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePaymentAccount = async (accountId) => {
  try {
    const response = await api.delete(`/payment/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};