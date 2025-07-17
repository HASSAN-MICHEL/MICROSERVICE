// // // // import React from 'react';

// // // // const Cart = ({ items, onRemove, onUpdateQuantity }) => {
// // // //   return (
// // // //     <div>
// // // //       <h3>Cart</h3>
// // // //       {items.length === 0 ? (
// // // //         <p>No items in cart</p>
// // // //       ) : (
// // // //         <table className="table">
// // // //           <thead>
// // // //             <tr>
// // // //               <th>Product</th>
// // // //               <th>Price</th>
// // // //               <th>Quantity</th>
// // // //               <th>Total</th>
// // // //               <th>Action</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {items.map((item) => (
// // // //               <tr key={item.product_id}>
// // // //                 <td>{item.name}</td>
// // // //                 <td>{item.price}</td>
// // // //                 <td>
// // // //                   <input
// // // //                     type="number"
// // // //                     value={item.quantity}
// // // //                     onChange={(e) =>
// // // //                       onUpdateQuantity(item.product_id, parseInt(e.target.value))
// // // //                     }
// // // //                     min="1"
// // // //                   />
// // // //                 </td>
// // // //                 <td>{(item.price * item.quantity).toLocaleString()}</td>
// // // //                 <td>
// // // //                   <button
// // // //                     onClick={() => onRemove(item.product_id)}
// // // //                     className="btn btn-sm btn-danger"
// // // //                   >
// // // //                     Remove
// // // //                   </button>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Cart;


// // // // // Nombre emballage (pour les bière) et nbre pallete dans la facture avec le nombre total de colie( = total casier + total palette)

// // // import React from 'react';
// // // import { Card, Button, Badge, Table, InputGroup, Form } from 'react-bootstrap';
// // // import { FaTrashAlt, FaCheck, FaTimes, FaEdit, FaBox, FaDollarSign } from 'react-icons/fa';

// // // const Cart = ({ 
// // //   items = [], 
// // //   onRemove, 
// // //   onUpdateQuantity, 
// // //   totalAmount = 0, 
// // //   saleStatus,
// // //   onConfirm,
// // //   onCancel,
// // //   isEdit,
// // //   packagingIncluded,
// // //   packagingPrice = 0
// // // }) => {
// // //   // Fonction sécurisée pour formater les nombres
// // //   const formatCurrency = (value) => {
// // //     if (typeof value !== 'number' || isNaN(value)) {
// // //       return '0 FCFA';
// // //     }
// // //     return value.toLocaleString('fr-FR') + ' FCFA';
// // //   };

// // //   const packagingAmount = packagingIncluded ? packagingPrice : 0;
// // //   const finalAmount = totalAmount + packagingAmount;

// // //   return (
// // //     <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
// // //       <Card.Header className="bg-primary text-white">
// // //         <h5 className="mb-0 d-flex align-items-center">
// // //           <FaBox className="me-2" />
// // //           Panier
// // //           {items.length > 0 && (
// // //             <Badge bg="light" text="dark" className="ms-2">
// // //               {items.reduce((sum, item) => sum + (item.quantity || 0), 0)}
// // //             </Badge>
// // //           )}
// // //         </h5>
// // //       </Card.Header>
      
// // //       <Card.Body className="p-0">
// // //         {items.length === 0 ? (
// // //           <div className="text-center py-4 text-muted">
// // //             Votre panier est vide
// // //             <div className="mt-2">
// // //               <FaBox size={48} className="opacity-25" />
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
// // //             <Table hover className="mb-0">
// // //               <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
// // //                 <tr>
// // //                   <th>Produit</th>
// // //                   <th className="text-end">Prix</th>
// // //                   <th className="text-center">Qté</th>
// // //                   <th className="text-end">Total</th>
// // //                   <th className="text-center">Action</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {items.map((item) => (
// // //                   <tr key={item.product_id}>
// // //                     <td>
// // //                       <div className="fw-semibold">{item.name || 'Produit sans nom'}</div>
// // //                       <small className="text-muted">{item.category || ''}</small>
// // //                     </td>
// // //                     <td className="text-end">
// // //                       {formatCurrency(item.price || 0)}
// // //                     </td>
// // //                     <td className="text-center">
// // //                       <Form.Control
// // //                         type="number"
// // //                         min="1"
// // //                         max={item.maxQuantity || 99}
// // //                         value={item.quantity || 1}
// // //                         onChange={(e) => onUpdateQuantity(item.product_id, parseInt(e.target.value || 1))}
// // //                         style={{ width: '70px' }}
// // //                         size="sm"
// // //                       />
// // //                     </td>
// // //                     <td className="text-end">
// // //                       {formatCurrency((item.price || 0) * (item.quantity || 1))}
// // //                     </td>
// // //                     <td className="text-center">
// // //                       <Button
// // //                         variant="outline-danger"
// // //                         size="sm"
// // //                         onClick={() => onRemove(item.product_id)}
// // //                         title="Supprimer"
// // //                       >
// // //                         <FaTrashAlt />
// // //                       </Button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </Table>
// // //           </div>
// // //         )}
// // //       </Card.Body>
      
// // //       <Card.Footer className="bg-white">
// // //         {/* Packaging */}
// // //         {packagingIncluded && (
// // //           <div className="d-flex justify-content-between mb-2">
// // //             <span>Emballage:</span>
// // //             <span className="fw-semibold">{formatCurrency(packagingPrice)}</span>
// // //           </div>
// // //         )}
        
// // //         {/* Subtotal */}
// // //         <div className="d-flex justify-content-between mb-2">
// // //           <span>Sous-total:</span>
// // //           <span>{formatCurrency(totalAmount)}</span>
// // //         </div>
        
// // //         {/* Total */}
// // //         <div className="d-flex justify-content-between align-items-center mb-3">
// // //           <h5 className="mb-0">Total:</h5>
// // //           <h4 className="mb-0 text-primary">
// // //             {formatCurrency(finalAmount)}
// // //           </h4>
// // //         </div>
        
// // //         {/* Buttons */}
// // //         <Button
// // //           variant="primary"
// // //           type="submit"
// // //           className="w-100 mb-2"
// // //           disabled={items.length === 0}
// // //         >
// // //           <FaEdit className="me-2" />
// // //           {isEdit ? 'Mettre à jour' : 'Enregistrer'}
// // //         </Button>
        
// // //         {isEdit && saleStatus === 'pending' && (
// // //           <>
// // //             <Button
// // //               variant="success"
// // //               className="w-100 mb-2"
// // //               onClick={onConfirm}
// // //               disabled={items.length === 0}
// // //             >
// // //               <FaCheck className="me-2" />
// // //               Confirmer
// // //             </Button>
// // //             <Button
// // //               variant="outline-danger"
// // //               className="w-100"
// // //               onClick={onCancel}
// // //             >
// // //               <FaTimes className="me-2" />
// // //               Annuler
// // //             </Button>
// // //           </>
// // //         )}
// // //       </Card.Footer>
// // //     </Card>
// // //   );
// // // };

// // // export default Cart;


// // import React, { useState, useEffect } from 'react';
// // import { Card, Button, Badge, Table, InputGroup, Form } from 'react-bootstrap';
// // import { FaTrashAlt, FaCheck, FaTimes, FaEdit, FaBox } from 'react-icons/fa';

// // const Cart = ({
// //   items = [],
// //   onRemove,
// //   onUpdateQuantity,
// //   totalAmount = 0,
// //   saleStatus,
// //   onConfirm,
// //   onCancel,
// //   isEdit,
// //   packagingIncluded,
// //   packagingPrice = 0,
// //   onPackagingChange // nouvelle prop pour informer le parent du nombre d’emballages choisi
// // }) => {
// //   const [packagingCount, setPackagingCount] = useState(0);

// //   // Si emballage est décoché, remettre le compteur à zéro
// //   useEffect(() => {
// //     if (!packagingIncluded) {
// //       setPackagingCount(0);
// //     }
// //   }, [packagingIncluded]);

// //   // Informer le parent à chaque changement
// //   useEffect(() => {
// //     if (typeof onPackagingChange === 'function') {
// //       onPackagingChange(packagingIncluded ? packagingCount : 0);
// //     }
// //   }, [packagingCount, packagingIncluded]);

// //   const formatCurrency = (value) => {
// //     if (typeof value !== 'number' || isNaN(value)) return '0 FCFA';
// //     return value.toLocaleString('fr-FR') + ' FCFA';
// //   };

// //   const packagingAmount = packagingIncluded ? packagingCount * packagingPrice : 0;
// //   const finalAmount = totalAmount + packagingAmount;

// //   return (
// //     <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
// //       <Card.Header className="bg-primary text-white">
// //         <h5 className="mb-0 d-flex align-items-center">
// //           <FaBox className="me-2" />
// //           Panier
// //           {items.length > 0 && (
// //             <Badge bg="light" text="dark" className="ms-2">
// //               {items.reduce((sum, item) => sum + (item.quantity || 0), 0)}
// //             </Badge>
// //           )}
// //         </h5>
// //       </Card.Header>

// //       <Card.Body className="p-0">
// //         {items.length === 0 ? (
// //           <div className="text-center py-4 text-muted">
// //             Votre panier est vide
// //             <div className="mt-2">
// //               <FaBox size={48} className="opacity-25" />
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
// //             <Table hover className="mb-0">
// //               <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
// //                 <tr>
// //                   <th>Produit</th>
// //                   <th className="text-end">Prix</th>
// //                   <th className="text-center">Qté</th>
// //                   <th className="text-end">Total</th>
// //                   <th className="text-center">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {items.map((item) => (
// //                   <tr key={item.product_id}>
// //                     <td>
// //                       <div className="fw-semibold">{item.name || 'Produit sans nom'}</div>
// //                       <small className="text-muted">{item.category || ''}</small>
// //                     </td>
// //                     <td className="text-end">{formatCurrency(item.price || 0)}</td>
// //                     <td className="text-center">
// //                       <Form.Control
// //                         type="number"
// //                         min="1"
// //                         max={item.maxQuantity || 99}
// //                         value={item.quantity || 1}
// //                         onChange={(e) => onUpdateQuantity(item.product_id, parseInt(e.target.value || 1))}
// //                         style={{ width: '70px' }}
// //                         size="sm"
// //                       />
// //                     </td>
// //                     <td className="text-end">
// //                       {formatCurrency((item.price || 0) * (item.quantity || 1))}
// //                     </td>
// //                     <td className="text-center">
// //                       <Button
// //                         variant="outline-danger"
// //                         size="sm"
// //                         onClick={() => onRemove(item.product_id)}
// //                         title="Supprimer"
// //                       >
// //                         <FaTrashAlt />
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           </div>
// //         )}
// //       </Card.Body>

// //       <Card.Footer className="bg-white">
// //         {packagingIncluded && (
// //           <>
// //             <div className="d-flex justify-content-between align-items-center mb-2">
// //               <span>Nombre d'emballages :</span>
// //               <Form.Control
// //                 type="number"
// //                 min="0"
// //                 max="50"
// //                 value={packagingCount}
// //                 onChange={(e) => setPackagingCount(parseInt(e.target.value || 0))}
// //                 size="sm"
// //                 style={{ width: '80px' }}
// //               />
// //             </div>

// //             <div className="d-flex justify-content-between mb-2">
// //               <span>Frais d'emballage :</span>
// //               <span className="fw-semibold">{formatCurrency(packagingAmount)}</span>
// //             </div>
// //           </>
// //         )}

// //         <div className="d-flex justify-content-between mb-2">
// //           <span>Sous-total:</span>
// //           <span>{formatCurrency(totalAmount)}</span>
// //         </div>

// //         <div className="d-flex justify-content-between align-items-center mb-3">
// //           <h5 className="mb-0">Total:</h5>
// //           <h4 className="mb-0 text-primary">{formatCurrency(finalAmount)}</h4>
// //         </div>

// //         <Button
// //           variant="primary"
// //           type="submit"
// //           className="w-100 mb-2"
// //           disabled={items.length === 0}
// //         >
// //           <FaEdit className="me-2" />
// //           {isEdit ? 'Mettre à jour' : 'Enregistrer'}
// //         </Button>

// //         {isEdit && saleStatus === 'pending' && (
// //           <>
// //             <Button
// //               variant="success"
// //               className="w-100 mb-2"
// //               onClick={onConfirm}
// //               disabled={items.length === 0}
// //             >
// //               <FaCheck className="me-2" />
// //               Confirmer
// //             </Button>
// //             <Button
// //               variant="outline-danger"
// //               className="w-100"
// //               onClick={onCancel}
// //             >
// //               <FaTimes className="me-2" />
// //               Annuler
// //             </Button>
// //           </>
// //         )}
// //       </Card.Footer>
// //     </Card>
// //   );
// // };

// // export default Cart;



// import React, { useState, useEffect } from 'react';
// import { Card, Button, Badge, Table, InputGroup, Form } from 'react-bootstrap';
// import { FaTrashAlt, FaCheck, FaTimes, FaEdit, FaBox } from 'react-icons/fa';

// const Cart = ({
//   items = [],
//   onRemove,
//   onUpdateQuantity,
//   totalAmount = 0,
//   saleStatus,
//   onConfirm,
//   onCancel,
//   isEdit,
//   packagingIncluded,
//   packagingPrice = 0,
//   onPackagingChange // ➕ nouvelle prop pour informer le parent
// }) => {
//   const [packagingCount, setPackagingCount] = useState(0);

//   // 🔄 Réinitialiser si emballage décoché
//   useEffect(() => {
//     if (!packagingIncluded) {
//       setPackagingCount(0);
//     }
//   }, [packagingIncluded]);

//   // 🔔 Remonter la valeur d'emballage vers le parent
//   useEffect(() => {
//     if (typeof onPackagingChange === 'function') {
//       onPackagingChange(packagingIncluded ? packagingCount : 0);
//     }
//   }, [packagingCount, packagingIncluded]);

//   const formatCurrency = (value) => {
//     if (typeof value !== 'number' || isNaN(value)) return '0 FCFA';
//     return value.toLocaleString('fr-FR') + ' FCFA';
//   };

//   const packagingAmount = packagingIncluded ? packagingCount * packagingPrice : 0;
//   const finalAmount = totalAmount + packagingAmount;

//   return (
//     <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
//       <Card.Header className="bg-primary text-white">
//         <h5 className="mb-0 d-flex align-items-center">
//           <FaBox className="me-2" />
//           Panier
//           {items.length > 0 && (
//             <Badge bg="light" text="dark" className="ms-2">
//               {items.reduce((sum, item) => sum + (item.quantity || 0), 0)}
//             </Badge>
//           )}
//         </h5>
//       </Card.Header>

//       <Card.Body className="p-0">
//         {items.length === 0 ? (
//           <div className="text-center py-4 text-muted">
//             Votre panier est vide
//             <div className="mt-2">
//               <FaBox size={48} className="opacity-25" />
//             </div>
//           </div>
//         ) : (
//           <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             <Table hover className="mb-0">
//               <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
//                 <tr>
//                   <th>Produit</th>
//                   <th className="text-end">Prix</th>
//                   <th className="text-center">Qté</th>
//                   <th className="text-end">Total</th>
//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item) => (
//                   <tr key={item.product_id || item.id}>
//                     <td>
//                       <div className="fw-semibold">{item.name || 'Produit sans nom'}</div>
//                       <small className="text-muted">{item.category || ''}</small>
//                     </td>
//                     <td className="text-end">{formatCurrency(item.price || 0)}</td>
//                     <td className="text-center">
//                       <Form.Control
//                         type="number"
//                         min="1"
//                         max={item.maxQuantity || 99}
//                         value={item.quantity || 1}
//                         onChange={(e) => {
//                           const qty = Math.max(1, parseInt(e.target.value || 1));
//                           onUpdateQuantity(item.product_id, qty);
//                         }}
//                         style={{ width: '70px' }}
//                         size="sm"
//                         aria-label="Quantité"
//                       />
//                     </td>
//                     <td className="text-end">
//                       {formatCurrency((item.price || 0) * (item.quantity || 1))}
//                     </td>
//                     <td className="text-center">
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={() => onRemove(item.product_id)}
//                         title="Supprimer ce produit"
//                         aria-label="Supprimer"
//                       >
//                         <FaTrashAlt />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </Card.Body>

//       <Card.Footer className="bg-white">
//         {packagingIncluded && (
//           <>
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <span>Nombre d'emballages :</span>
//               <Form.Control
//                 type="number"
//                 min="0"
//                 max="50"
//                 value={packagingCount}
//                 onChange={(e) => setPackagingCount(Math.max(0, parseInt(e.target.value || 0)))}
//                 size="sm"
//                 style={{ width: '80px' }}
//                 aria-label="Nombre d'emballages"
//               />
//             </div>

//             <div className="d-flex justify-content-between mb-2">
//               <span>Frais d'emballage :</span>
//               <span className="fw-semibold">{formatCurrency(packagingAmount)}</span>
//             </div>
//           </>
//         )}

//         <div className="d-flex justify-content-between mb-2">
//           <span>Sous-total :</span>
//           <span>{formatCurrency(totalAmount)}</span>
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="mb-0">Total :</h5>
//           <h4 className="mb-0 text-primary">{formatCurrency(finalAmount)}</h4>
//         </div>

//         <Button
//           variant="primary"
//           type="submit"
//           className="w-100 mb-2"
//           disabled={items.length === 0}
//           aria-label={isEdit ? 'Mettre à jour la vente' : 'Créer la vente'}
//         >
//           <FaEdit className="me-2" />
//           {isEdit ? 'Mettre à jour' : 'Enregistrer'}
//         </Button>

//         {isEdit && saleStatus === 'pending' && (
//           <>
//             <Button
//               variant="success"
//               className="w-100 mb-2"
//               onClick={onConfirm}
//               disabled={items.length === 0}
//               aria-label="Confirmer la vente"
//             >
//               <FaCheck className="me-2" />
//               Confirmer
//             </Button>

//             <Button
//               variant="outline-danger"
//               className="w-100"
//               onClick={onCancel}
//               aria-label="Annuler la vente"
//             >
//               <FaTimes className="me-2" />
//               Annuler
//             </Button>
//           </>
//         )}
//       </Card.Footer>
//     </Card>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Table, Form } from 'react-bootstrap';
import { FaTrashAlt, FaCheck, FaTimes, FaEdit, FaBox } from 'react-icons/fa';

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
  packagingPrice = 0,
  onPackagingChange, // callback vers parent pour emballages
}) => {
  const [packagingCount, setPackagingCount] = useState(0);

  // Réinitialiser le compteur emballages si emballage décoché
  useEffect(() => {
    if (!packagingIncluded) {
      setPackagingCount(0);
    }
  }, [packagingIncluded]);

  // Remonter le packagingCount au parent dès qu'il change
  useEffect(() => {
    if (typeof onPackagingChange === 'function') {
      onPackagingChange(packagingIncluded ? packagingCount : 0);
    }
  }, [packagingCount, packagingIncluded, onPackagingChange]);

  // Formatage monétaire
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0 FCFA';
    return value.toLocaleString('fr-FR') + ' FCFA';
  };

  const packagingAmount = packagingIncluded ? packagingCount * packagingPrice : 0;
  const finalAmount = totalAmount + packagingAmount;

  return (
    <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0 d-flex align-items-center">
          <FaBox className="me-2" />
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
          <div className="text-center py-4 text-muted">
            Votre panier est vide
            <div className="mt-2">
              <FaBox size={48} className="opacity-25" />
            </div>
          </div>
        ) : (
          <div
            className="table-responsive"
            style={{ maxHeight: '300px', overflowY: 'auto' }}
          >
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
                  <tr key={item.product_id || item.id}>
                    <td>
                      <div className="fw-semibold">{item.name || 'Produit sans nom'}</div>
                      <small className="text-muted">{item.category || ''}</small>
                    </td>
                    <td className="text-end">{formatCurrency(item.price || 0)}</td>
                    <td className="text-center">
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.maxQuantity || 99}
                        value={item.quantity || 1}
                        onChange={(e) => {
                          const qty = Math.max(1, parseInt(e.target.value || 1));
                          onUpdateQuantity(item.product_id, qty);
                        }}
                        style={{ width: '70px' }}
                        size="sm"
                        aria-label="Quantité"
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
                        title="Supprimer ce produit"
                        aria-label="Supprimer"
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
        {packagingIncluded && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Nombre d'emballages :</span>
              <Form.Control
                type="number"
                min="0"
                max="50"
                value={packagingCount}
                onChange={(e) =>
                  setPackagingCount(Math.max(0, parseInt(e.target.value || 0)))
                }
                size="sm"
                style={{ width: '80px' }}
                aria-label="Nombre d'emballages"
              />
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Frais d'emballage :</span>
              <span className="fw-semibold">{formatCurrency(packagingAmount)}</span>
            </div>
          </>
        )}

        <div className="d-flex justify-content-between mb-2">
          <span>Sous-total :</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Total :</h5>
          <h4 className="mb-0 text-primary">{formatCurrency(finalAmount)}</h4>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mb-2"
          disabled={items.length === 0}
          aria-label={isEdit ? 'Mettre à jour la vente' : 'Créer la vente'}
        >
          <FaEdit className="me-2" />
          {isEdit ? 'Mettre à jour' : 'Enregistrer'}
        </Button>

        {isEdit && saleStatus === 'pending' && (
          <>
            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={onConfirm}
              disabled={items.length === 0}
              aria-label="Confirmer la vente"
            >
              <FaCheck className="me-2" />
              Confirmer
            </Button>

            <Button
              variant="outline-danger"
              className="w-100"
              onClick={onCancel}
              aria-label="Annuler la vente"
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

export default Cart;
