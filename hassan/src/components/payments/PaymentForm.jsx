import { useState } from 'react';
import { processPayment } from '../../services/paymentService';
//import PaymentMethodIcon from '../PaymentAccounts/PaymentMethodIcon';

const PaymentForm = ({ onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    commandeId: '',
    methodePaiement: 'orange_money',
    comptePaiementId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await processPayment(formData);
      onPaymentSuccess(result.paiement);
      setSuccess(true);
      setFormData({
        commandeId: '',
        methodePaiement: 'orange_money',
        comptePaiementId: ''
      });
    } catch (err) {
      setError(err.message || 'Erreur lors du traitement du paiement');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label>ID de Commande</label>
        <input
          type="text"
          name="commandeId"
          value={formData.commandeId}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Méthode de Paiement</label>
        <div className="payment-methods">
          {['orange_money', 'mtn_momo', 'paypal'].map(method => (
            <label key={method} className="method-option">
              <input
                type="radio"
                name="methodePaiement"
                value={method}
                checked={formData.methodePaiement === method}
                onChange={handleChange}
              />
              <PaymentMethodIcon method={method} />
              {method === 'orange_money' && 'Orange Money'}
              {method === 'mtn_momo' && 'MTN Mobile Money'}
              {method === 'paypal' && 'PayPal'}
            </label>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Compte de Paiement (ID)</label>
        <input
          type="text"
          name="comptePaiementId"
          value={formData.comptePaiementId}
          onChange={handleChange}
          required
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Paiement effectué avec succès!</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Traitement...' : 'Effectuer le Paiement'}
      </button>
    </form>
  );
};

export default PaymentForm;