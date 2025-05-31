import { useState, useEffect } from 'react';
//import InvoiceList from '../components/Invoices/InvoiceList';
import { getInvoices } from '../services/invoiceService';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="invoices-page">
      <h2>Mes Factures</h2>
      {loading ? (
        <p>Chargement des factures...</p>
      ) : (
        <InvoiceList invoices={invoices} />
      )}
    </div>
  );
};

export default InvoicesPage;