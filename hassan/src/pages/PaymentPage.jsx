import { useState, useEffect } from 'react';
import PaymentForm from '../components/payments/PaymentForm';
//import PaymentHistory from '../components/Payments/PaymentHistory';
import { getPaymentHistory } from '../services/paymentService';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentHistory();
        setPayments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handlePaymentSuccess = (newPayment) => {
    setPayments([newPayment, ...payments]);
  };

  return (
    <div className="payment-page">
      <h2>Effectuer un Paiement</h2>
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
      
      <h2>Historique des Paiements</h2>
      {loading ? (
        <p>Chargement de l'historique...</p>
      ) : (
        <PaymentHistory payments={payments} />
      )}
    </div>
  );
};

export default PaymentPage;