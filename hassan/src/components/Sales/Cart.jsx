// import React from 'react';

// const Cart = ({ items, onRemove, onUpdateQuantity }) => {
//   return (
//     <div>
//       <h3>Cart</h3>
//       {items.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.product_id}>
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       onUpdateQuantity(item.product_id, parseInt(e.target.value))
//                     }
//                     min="1"
//                   />
//                 </td>
//                 <td>{(item.price * item.quantity).toLocaleString()}</td>
//                 <td>
//                   <button
//                     onClick={() => onRemove(item.product_id)}
//                     className="btn btn-sm btn-danger"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Cart;


// // Nombre emballage (pour les bière) et nbre pallete dans la facture avec le nombre total de colie( = total casier + total palette)

import { Save, ShoppingBasket } from 'lucide-react';
import { Card, Button, Badge, Table,  Form } from 'react-bootstrap';
import { FaTrashAlt, FaCheck, FaTimes, } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Cart = ({ 
  items = [], 
  onRemove, 
  onUpdateQuantity, 
  totalAmount = 0, 
  saleStatus,
  onConfirm,
  onCancel,
  isEdit,
  packagingIncluded,
  packagingPrice = 0
}) => {
  // Fonction sécurisée pour formater les nombres
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return '0 FCFA';
    }
    return value.toLocaleString('fr-FR') + ' FCFA';
  };

  const packagingAmount = packagingIncluded ? packagingPrice : 0;
  const finalAmount = totalAmount + packagingAmount;

  return (
    <Card className="shadow-md shadow-black/20 sticky-top !border-persimmon" style={{ top: '20px' }}>
      <Card.Header className="!bg-persimmon  text-white">
        <h5 className="mb-0 d-flex align-items-center">
          <ShoppingBasket className="me-2" />
          Panier
          {items.length > 0 && (
            <Badge bg="light" text="dark" className="ms-2">
              {items.reduce((sum, item) => sum + (item.quantity || 0), 0)}
            </Badge>
          )}
        </h5>
      </Card.Header>
      
      <Card.Body className="p-0">
        {items.length === 0 ? (
          <div className="text-center py-4 d-flex flex-col items-center justify-center  text-muted">
              <ShoppingBasket size={78} className="opacity-25" />
              Votre panier est vide
          </div>
        ) : (
          <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <Table hover className="mb-0">
              <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
                <tr>
                  <th>Produit</th>
                  <th className="text-end">Prix</th>
                  <th className="text-center">Qté</th>
                  <th className="text-end">Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product_id}>
                    <td>
                      <div className="fw-semibold">{item.name || 'Produit sans nom'}</div>
                      <small className="text-muted">{item.category || ''}</small>
                    </td>
                    <td className="text-end">
                      {formatCurrency(item.price || 0)}
                    </td>
                    <td className="text-center">
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.maxQuantity || 99}
                        value={item.quantity || 1}
                        onChange={(e) => onUpdateQuantity(item.product_id, parseInt(e.target.value || 1))}
                        style={{ width: '70px' }}
                        size="sm"
                      />
                    </td>
                    <td className="text-end">
                      {formatCurrency((item.price || 0) * (item.quantity || 1))}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onRemove(item.product_id)}
                        title="Supprimer"
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
      
      <Card.Footer className="bg-white">
        {/* Packaging */}
        {packagingIncluded && (
          <div className="d-flex justify-content-between mb-2">
            <span>Emballage:</span>
            <span className="fw-semibold text-persimmon-dark">{formatCurrency(packagingPrice)}</span>
          </div>
        )}
        
        {/* Subtotal */}
        <div className="d-flex justify-content-between mb-2">
          <span>Sous-total:</span>
          <span className='text-persimmon-dark'>{formatCurrency(totalAmount)}</span>
        </div>
        
        {/* Total */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Total:</h5>
          <h4 className="mb-0 !text-persimmon-dark">
            {formatCurrency(finalAmount)}
          </h4>
        </div>
        
        {/* Buttons */}
        <Button
          type="submit"
          className="w-100 mb-2 !bg-persimmon !border-persimmon shadow-md shadow-black/40 d-flex items-center justify-content-center py-2 "
          disabled={items.length === 0}
        >
          <Save className="me-2" />
          {isEdit ? 'Mettre à jour' : 'Enregistrer'}
        </Button>
        
        {isEdit && saleStatus === 'pending' && (
          <>
            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={onConfirm}
              disabled={items.length === 0}
            >
              <FaCheck className="me-2" />
              Confirmer
            </Button>
            <Button
              variant="outline-danger"
              className="w-100"
              onClick={onCancel}
            >
              <FaTimes className="me-2" />
              Annuler
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  );
};
Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      maxQuantity: PropTypes.number,
      category: PropTypes.string,
    })
  ),
  onRemove: PropTypes.func,
  onUpdateQuantity: PropTypes.func,
  totalAmount: PropTypes.number,
  saleStatus: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isEdit: PropTypes.bool,
  packagingIncluded: PropTypes.bool,
  packagingPrice: PropTypes.number,
};

export default Cart;
