// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Badge } from 'react-bootstrap';
// // import { FaEye, FaEdit, FaBoxOpen } from 'react-icons/fa';

// // const SaleItem = ({ sale }) => {
// //   // Fonction pour déterminer la couleur du badge selon le statut
// //   const getStatusVariant = () => {
// //     switch(sale.status) {
// //       case 'confirmed':
// //         return 'success';
// //       case 'cancelled':
// //         return 'danger';
// //       case 'pending':
// //         return 'warning';
// //       default:
// //         return 'secondary';
// //     }
// //   };

// //   // Formatage de la date
// //   const formatDate = (dateString) => {
// //     const options = { 
// //       year: 'numeric', 
// //       month: 'short', 
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     };
// //     return new Date(dateString).toLocaleDateString('fr-FR', options);
// //   };

// //   // Formatage du montant
// //   const formatAmount = (amount) => {
// //     return new Intl.NumberFormat('fr-FR', {
// //       style: 'currency',
// //       currency: 'XOF'
// //     }).format(amount);
// //   };

// //   return (
// //     <tr>
// //       <td>
// //         <span className="text-muted">#{sale.id}</span>
// //       </td>
// //       <td>
// //         <strong>{sale.client_name || 'Non spécifié'}</strong>
// //       </td>
// //       <td>
// //         <small>{formatDate(sale.created_at)}</small>
// //       </td>
// //       <td className="text-end">
// //         <strong>{formatAmount(sale.total_amount)}</strong>
// //       </td>
// //       <td>
// //         <Badge bg={getStatusVariant()} className="text-capitalize">
// //           {sale.status}
// //         </Badge>
// //         {sale.packaging_included && (
// //           <Badge bg="info" className="ms-2">
// //             <FaBoxOpen className="me-1" />
// //             Emballage
// //           </Badge>
// //         )}
// //       </td>
// //       <td className="text-end">
// //         <Link 
// //           to={`/sales/${sale.id}`} 
// //           className="btn btn-sm btn-outline-primary me-2"
// //           title="Voir les détails"
// //         >
// //           <FaEye />
// //         </Link>
// //         {sale.status === 'pending' && (
// //           <Link
// //             to={`/sales/${sale.id}/edit`}
// //             className="btn btn-sm btn-outline-secondary"
// //             title="Modifier"
// //           >
// //             <FaEdit />
// //           </Link>
// //         )}
// //       </td>
// //     </tr>
// //   );
// // };

// // export default SaleItem;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Badge, Button } from 'react-bootstrap';
// import { FaEye, FaEdit, FaBoxOpen, FaFileDownload } from 'react-icons/fa';
// import api from '../../services/api.js';

// const SaleItem = ({ sale }) => {
//   const getStatusVariant = () => {
//     switch(sale.status) {
//       case 'confirmed': return 'success';
//       case 'cancelled': return 'danger';
//       case 'pending': return 'warning';
//       default: return 'secondary';
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('fr-FR', options);
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat('fr-FR', {
//       style: 'currency',
//       currency: 'XOF'
//     }).format(amount);
//   };

//   const downloadInvoice = async () => {
//     try {
//       const response = await api.get(`/sales/${sale.id}/invoice`, {
//         responseType: 'blob'
//       });
      
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Facture_${sale.id}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error downloading invoice:', error);
//     }
//   };

//   return (
//     <tr>
//       <td>
//         <span className="text-muted">#{sale.id}</span>
//       </td>
//       <td>
//         <strong>{sale.client_name || 'Non spécifié'}</strong>
//       </td>
//       <td>
//         <small>{formatDate(sale.created_at)}</small>
//       </td>
//       <td className="text-end">
//         <strong>{formatAmount(sale.total_amount)}</strong>
//       </td>
//       <td>
//         <Badge bg={getStatusVariant()} className="text-capitalize">
//           {sale.status}
//         </Badge>
//         {sale.packaging_included && (
//           <Badge bg="info" className="ms-2">
//             <FaBoxOpen className="me-1" />
//             Emballage
//           </Badge>
//         )}
//       </td>
//       <td className="text-end">
//         <Link 
//           to={`/sales/${sale.id}`} 
//           className="btn btn-sm btn-outline-primary me-2"
//           title="Voir les détails"
//         >
//           <FaEye />
//         </Link>
        
//         {sale.status === 'confirmed' && (
//           <Button
//             variant="outline-success"
//             size="sm"
//             className="me-2"
//             onClick={downloadInvoice}
//             title="Télécharger la facture"
//           >
//             <FaFileDownload />
//           </Button>
//         )}
        
//         {sale.status === 'pending' && (
//           <Link
//             to={`/sales/${sale.id}/edit`}
//             className="btn btn-sm btn-outline-secondary"
//             title="Modifier"
//           >
//             <FaEdit />
//           </Link>
//         )}
//       </td>
//     </tr>
//   );
// };

// export default SaleItem;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaFileDownload, FaPrint } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import api from '../../services/api';

const SaleItem = ({ sale }) => {
  const downloadInvoice = async () => {
    try {
      const response = await api.get(`/sales/${sale.id}/invoice`, {
        responseType: 'blob' // Important pour les fichiers binaires
      });
      
      // Créer un URL pour le blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Créer un lien et déclencher le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facture_${sale.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Impossible de télécharger la facture');
    }
  };

  const getStatusBadge = () => {
    switch(sale.status) {
      case 'confirmed':
        return <span className="badge bg-success">Confirmée</span>;
      case 'pending':
        return <span className="badge bg-warning text-dark">En attente</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Annulée</span>;
      default:
        return <span className="badge bg-secondary">{sale.status}</span>;
    }
  };

  return (
    <tr>
      <td>#{sale.id}</td>
      <td>{sale.client_name}</td>
      <td>{new Date(sale.created_at).toLocaleDateString()}</td>
      <td>{sale.total_amount?.toLocaleString()}</td>
      <td>{getStatusBadge()}</td>
      <td>
        <div className="d-flex gap-2">
          <Button 
            as={Link} 
            to={`/sales/${sale.id}`} 
            variant="outline-primary" 
            size="sm"
            title="Voir détails"
          >
            <FaEye />
          </Button>
          
          {sale.status === 'confirmed' && (
            <Button 
              variant="outline-success" 
              size="sm"
              onClick={downloadInvoice}
              title="Télécharger facture"
            >
              <FaFileDownload />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SaleItem;