import { useState } from 'react';
import { addPaymentAccount } from '../../services/accountService';
//import PaymentMethodIcon from './PaymentMethodIcon';

const AddAccountForm = ({ onAccountAdded }) => {
  const [formData, setFormData] = useState({
    type: 'orange_money',
    accountDetails: {}
  });
  const [details, setDetails] = useState({
    numero: '',
    nom: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const account = {
        type: formData.type,
        accountDetails: getAccountDetails(formData.type, details)
      };
      
      const result = await addPaymentAccount(account);
      onAccountAdded(result);
      setFormData({
        type: 'orange_money',
        accountDetails: {}
      });
      setDetails({
        numero: '',
        nom: ''
      });
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'ajout du compte');
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetails = (type, details) => {
    switch(type) {
      case 'orange_money':
        return { phone: details.numero, name: details.nom };
      case 'mtn_momo':
        return { phone: details.numero, name: details.nom };
      case 'paypal':
        return { email: details.numero, name: details.nom };
      default:
        return {};
    }
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value
    });
  };

  const handleDetailChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <h3>Ajouter un Compte de Paiement</h3>
      
      <div className="form-group">
        <label>Type de Compte</label>
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleTypeChange}
        >
          <option value="orange_money">Orange Money</option>
          <option value="mtn_momo">MTN Mobile Money</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>
          {formData.type === 'paypal' ? 'Email PayPal' : 'Numéro de Téléphone'}
        </label>
        <input
          type="text"
          name="numero"
          value={details.numero}
          onChange={handleDetailChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Nom sur le Compte</label>
        <input
          type="text"
          name="nom"
          value={details.nom}
          onChange={handleDetailChange}
          required
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Ajout en cours...' : 'Ajouter le Compte'}
      </button>
    </form>
  );
};

export default AddAccountForm;