import { useState, useEffect } from 'react';
import AddAccountForm from '../components/PaymentAccounts/AddAccountForm';
//import AccountList from '../components/PaymentAccounts/AccountList';
import { getPaymentAccounts } from '../services/accountService';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getPaymentAccounts();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountAdded = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  const handleAccountDeleted = (accountId) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  const handleDefaultChanged = (accountId) => {
    setAccounts(accounts.map(account => ({
      ...account,
      isDefault: account.id === accountId
    })));
  };

  return (
    <div className="accounts-page">
      <h2>Comptes de Paiement</h2>
      <AddAccountForm onAccountAdded={handleAccountAdded} />
      
      <h3>Mes Comptes</h3>
      {loading ? (
        <p>Chargement des comptes...</p>
      ) : (
        <AccountList 
          accounts={accounts} 
          onAccountDeleted={handleAccountDeleted}
          onDefaultChanged={handleDefaultChanged}
        />
      )}
    </div>
  );
};

export default AccountsPage;