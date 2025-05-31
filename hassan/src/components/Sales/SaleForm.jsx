// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../../context/AppContext.jsx';
// import api from '../../services/api.js';
// import Cart from './Cart.jsx';
// import { 
//   FaSave, FaArrowLeft, FaCheck, FaTimes, FaPlus, FaBoxOpen, 
//   FaUser, FaShoppingBag, FaSearch, FaDollarSign 
// } from 'react-icons/fa';
// import { 
//   Container, Row, Col, Form, Button, Card, Table, 
//   InputGroup, Badge, Alert, Spinner 
// } from 'react-bootstrap';

// const SaleForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { products, fetchSales } = useContext(AppContext);
//   const [sale, setSale] = useState({
//     client_name: '',
//     status: 'pending',
//     packaging_included: false,
//   });
//   const [cart, setCart] = useState([]);
//   const [availableProducts, setAvailableProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (products.length) {
//       setAvailableProducts(products);
//     }
//   }, [products]);

//   useEffect(() => {
//     if (id) {
//       const fetchSale = async () => {
//         setLoading(true);
//         try {
//           const response = await api.get(`/sales/${id}`);
//           setSale(response.data.sale);
//           setCart(response.data.items);
//         } catch (error) {
//           console.error('Error fetching sale:', error);
//           setError('Erreur lors du chargement de la vente');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchSale();
//     }
//   }, [id]);

//   const handleSaleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSale({
//       ...sale,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const addToCart = (product) => {
//     const existingItem = cart.find((item) => item.product_id === product.id);
//     if (existingItem) {
//       setCart(
//         cart.map((item) =>
//           item.product_id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([
//         ...cart,
//         {
//           product_id: product.id,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//           unit: product.unit,
//           category: product.category,
//         },
//       ]);
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter((item) => item.product_id !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//     } else {
//       setCart(
//         cart.map((item) =>
//           item.product_id === productId ? { ...item, quantity } : item
//         )
//       );
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const items = cart.map((item) => ({
//         product_id: item.product_id,
//         quantity: item.quantity,
//       }));

//       if (id) {
//         await api.put(`/sales/${id}`, {
//           client_name: sale.client_name,
//           packaging_included: sale.packaging_included,
//           items,
//         });
//       } else {
//         await api.post('/sales', {
//           client_name: sale.client_name,
//           packaging_included: sale.packaging_included,
//           items,
//         });
//       }
//       fetchSales();
//       navigate('/sales');
//     } catch (error) {
//       console.error('Error saving sale:', error);
//       setError('Erreur lors de la sauvegarde de la vente');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmSale = async () => {
//     if (window.confirm('Confirmer cette vente ?')) {
//       setLoading(true);
//       try {
//         await api.put(`/sales/${id}/confirm`);
//         fetchSales();
//         navigate('/sales');
//       } catch (error) {
//         console.error('Error confirming sale:', error);
//         setError('Erreur lors de la confirmation de la vente');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const cancelSale = async () => {
//     if (window.confirm('Annuler cette vente ?')) {
//       setLoading(true);
//       try {
//         await api.put(`/sales/${id}/cancel`);
//         fetchSales();
//         navigate('/sales');
//       } catch (error) {
//         console.error('Error cancelling sale:', error);
//         setError('Erreur lors de l\'annulation de la vente');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const filteredProducts = availableProducts.filter(product => 
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" variant="primary" />
//       <p className="mt-3">Chargement en cours...</p>
//     </Container>
//   );

//   return (
//     <Container className="py-4">
//       <Row className="mb-4 align-items-center">
//         <Col>
//           <h2 className="mb-0">
//             <FaShoppingBag className="me-2 text-primary" />
//             {id ? 'Modification de vente' : 'Nouvelle vente'}
//           </h2>
//         </Col>
//         <Col className="text-end">
//           <Button variant="outline-secondary" onClick={() => navigate('/sales')}>
//             <FaArrowLeft className="me-2" />
//             Retour
//           </Button>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={8}>
//             <Card className="mb-4 shadow-sm">
//               <Card.Header className="bg-light">
//                 <h5 className="mb-0">Informations client</h5>
//               </Card.Header>
//               <Card.Body>
//                 <Row>
//                   <Col md={8}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         <FaUser className="me-2 text-primary" />
//                         Nom du client
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="client_name"
//                         value={sale.client_name}
//                         onChange={handleSaleChange}
//                         required
//                         placeholder="Entrez le nom du client"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4} className="d-flex align-items-end">
//                     <Form.Group className="mb-3">
//                       <Form.Check
//                         type="checkbox"
//                         label="Emballage inclus"
//                         name="packaging_included"
//                         checked={sale.packaging_included}
//                         onChange={handleSaleChange}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             <Card className="shadow-sm">
//               <Card.Header className="bg-light">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h5 className="mb-0">Produits disponibles</h5>
//                   <div style={{ width: '300px' }}>
//                     <InputGroup size="sm">
//                       <InputGroup.Text>
//                         <FaSearch />
//                       </InputGroup.Text>
//                       <Form.Control
//                         type="text"
//                         placeholder="Rechercher un produit..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </InputGroup>
//                   </div>
//                 </div>
//               </Card.Header>
//               <Card.Body>
//                 <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                   <Table hover className="mb-0">
//                     <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
//                       <tr>
//                         <th>Produit</th>
//                         <th>Catégorie</th>
//                         <th className="text-end">Prix</th>
//                         <th className="text-end">Stock</th>
//                         <th className="text-center">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProducts.map((product) => (
//                         <tr key={product.id}>
//                           <td>
//                             <strong>{product.name}</strong>
//                             <br />
//                             <small className="text-muted">{product.unit}</small>
//                           </td>
//                           <td>
//                             <Badge bg="info">{product.category}</Badge>
//                           </td>
//                           <td className="text-end">
//                             {product.price.toLocaleString('fr-FR')} FCFA
//                           </td>
//                           <td className="text-end">
//                             <span className={product.stock <= 5 ? 'text-danger fw-bold' : 'text-success'}>
//                               {product.stock}
//                             </span>
//                           </td>
//                           <td className="text-center">
//                             <Button
//                               variant="outline-primary"
//                               size="sm"
//                               onClick={() => addToCart(product)}
//                               disabled={product.stock <= 0}
//                             >
//                               <FaPlus /> Ajouter
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={4}>
//             <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
//               <Card.Header className="bg-light">
//                 <h5 className="mb-0">Panier</h5>
//               </Card.Header>
//               <Card.Body>
//                 <Cart
//                   items={cart}
//                   onRemove={removeFromCart}
//                   onUpdateQuantity={updateQuantity}
//                 />
//               </Card.Body>
//               <Card.Footer className="bg-white">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h5 className="mb-0">Total:</h5>
//                   <h4 className="mb-0 text-primary">
//                     <FaDollarSign className="me-2" />
//                     {totalAmount.toLocaleString('fr-FR')} FCFA
//                   </h4>
//                 </div>
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 mb-2"
//                   disabled={cart.length === 0}
//                 >
//                   <FaSave className="me-2" />
//                   {id ? 'Mettre à jour' : 'Enregistrer la vente'}
//                 </Button>
//                 {id && sale.status === 'pending' && (
//                   <>
//                     <Button
//                       variant="success"
//                       className="w-100 mb-2"
//                       onClick={confirmSale}
//                     >
//                       <FaCheck className="me-2" />
//                       Confirmer la vente
//                     </Button>
//                     <Button
//                       variant="danger"
//                       className="w-100"
//                       onClick={cancelSale}
//                     >
//                       <FaTimes className="me-2" />
//                       Annuler la vente
//                     </Button>
//                   </>
//                 )}
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//       </Form>
//     </Container>
//   );
// };

// export default SaleForm;


import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import api from '../../services/api.js';
import Cart from './Cart.jsx';
import { 
  FaSave, FaArrowLeft, FaCheck, FaTimes, FaPlus, 
  FaUser, FaShoppingBag, FaSearch, FaDollarSign,
  FaBox, FaTrashAlt, FaEdit, FaInfoCircle
} from 'react-icons/fa';
import { 
  Container, Row, Col, Form, Button, Card, Table, 
  InputGroup, Badge, Alert, Spinner, Modal,
  Tooltip, OverlayTrigger, Toast
} from 'react-bootstrap';

const SaleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchSales } = useContext(AppContext);
  const [sale, setSale] = useState({
    client_name: '',
    status: 'pending',
    packaging_included: false,
    notes: ''
  });
  const [cart, setCart] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [stockErrors, setStockErrors] = useState({});

  useEffect(() => {
    if (products.length) {
      setAvailableProducts(products.map(p => ({
        ...p,
        disabled: p.stock <= 0
      })));
    }
  }, [products]);

  useEffect(() => {
    if (id) {
      const fetchSale = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/sales/${id}`);
          setSale(response.data.sale);
          setCart(response.data.items.map(item => ({
            ...item,
            maxQuantity: item.product_stock + item.quantity // Allow to reduce back to original
          })));
        } catch (error) {
          console.error('Error fetching sale:', error);
          setError('Erreur lors du chargement de la vente');
        } finally {
          setLoading(false);
        }
      };
      fetchSale();
    }
  }, [id]);

  const handleSaleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSale({
      ...sale,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product_id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        setStockErrors({
          ...stockErrors,
          [product.id]: `Stock insuffisant. Maximum: ${product.stock}`
        });
        return;
      }
      
      setCart(
        cart.map((item) =>
          item.product_id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                maxQuantity: product.stock
              }
            : item
        )
      );
    } else {
      if (product.stock < 1) {
        setStockErrors({
          ...stockErrors,
          [product.id]: 'Stock épuisé'
        });
        return;
      }
      
      setCart([
        ...cart,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          unit: product.unit,
          category: product.category,
          maxQuantity: product.stock
        },
      ]);
    }
    
    // Clear any previous error for this product
    const newErrors = {...stockErrors};
    delete newErrors[product.id];
    setStockErrors(newErrors);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (isNaN(quantity) || quantity < 1) {
      removeFromCart(productId);
    } else {
      const productInCart = cart.find(item => item.product_id === productId);
      if (quantity > productInCart.maxQuantity) {
        setStockErrors({
          ...stockErrors,
          [productId]: `Quantité maximale: ${productInCart.maxQuantity}`
        });
        return;
      }
      
      setCart(
        cart.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
      
      // Clear error if fixed
      if (stockErrors[productId]) {
        const newErrors = {...stockErrors};
        delete newErrors[productId];
        setStockErrors(newErrors);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const items = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const saleData = {
        client_name: sale.client_name,
        packaging_included: sale.packaging_included,
        notes: sale.notes,
        items
      };

      if (id) {
        await api.put(`/sales/${id}`, saleData);
        setSuccess('Vente mise à jour avec succès');
      } else {
        await api.post('/sales', saleData);
        setSuccess('Vente créée avec succès');
      }
      
      fetchSales();
      setTimeout(() => navigate('/sales'), 1500);
    } catch (error) {
      console.error('Error saving sale:', error);
      setError(error.response?.data?.message || 'Erreur lors de la sauvegarde de la vente');
    } finally {
      setLoading(false);
    }
  };

  const confirmSale = async () => {
    setLoading(true);
    try {
      await api.put(`/sales/${id}/confirm`);
      setSuccess('Vente confirmée avec succès');
      fetchSales();
      setTimeout(() => navigate('/sales'), 1500);
    } catch (error) {
      console.error('Error confirming sale:', error);
      setError(error.response?.data?.message || 'Erreur lors de la confirmation de la vente');
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  const cancelSale = async () => {
    setLoading(true);
    try {
      await api.put(`/sales/${id}/cancel`);
      setSuccess('Vente annulée avec succès');
      fetchSales();
      setTimeout(() => navigate('/sales'), 1500);
    } catch (error) {
      console.error('Error cancelling sale:', error);
      setError(error.response?.data?.message || 'Erreur lors de l\'annulation de la vente');
    } finally {
      setLoading(false);
      setShowCancelModal(false);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const filteredProducts = availableProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !showConfirmModal && !showCancelModal) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Chargement en cours...</p>
    </Container>
  );

  return (
    <Container className="py-4">
      {/* Success Toast */}
      {success && (
        <Toast 
          onClose={() => setSuccess(null)} 
          show={!!success} 
          delay={3000} 
          autohide
          className="position-fixed top-0 end-0 m-3"
          bg="success"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Succès</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{success}</Toast.Body>
        </Toast>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
          <FaInfoCircle className="me-2" />
          {error}
        </Alert>
      )}

      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-0 d-flex align-items-center">
            <FaShoppingBag className="me-3 text-primary" />
            {id ? `Vente #${id}` : 'Nouvelle vente'}
            {id && sale.status === 'confirmed' && (
              <Badge bg="success" className="ms-3">
                Confirmée
              </Badge>
            )}
          </h2>
          {id && (
            <small className="text-muted">
              Créée le {new Date(sale.created_at).toLocaleDateString()}
            </small>
          )}
        </Col>
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={() => navigate('/sales')}>
            <FaArrowLeft className="me-2" />
            Retour aux ventes
          </Button>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Left Column - Client Info & Products */}
          <Col lg={8}>
            {/* Client Information Card */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0 d-flex align-items-center">
                  <FaUser className="me-2" />
                  Informations client
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nom du client *</Form.Label>
                      <Form.Control
                        type="text"
                        name="client_name"
                        value={sale.client_name}
                        onChange={handleSaleChange}
                        required
                        placeholder="Nom complet ou entreprise"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Options</Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="Emballage inclus"
                        name="packaging_included"
                        checked={sale.packaging_included}
                        onChange={handleSaleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    value={sale.notes}
                    onChange={handleSaleChange}
                    placeholder="Informations supplémentaires..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Products Card */}
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h5 className="mb-0 d-flex align-items-center">
                      <FaBox className="me-2" />
                      Produits disponibles
                    </h5>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Rechercher par nom ou catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table hover className="mb-0">
                    <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
                      <tr>
                        <th width="30%">Produit</th>
                        <th width="20%">Catégorie</th>
                        <th width="15%" className="text-end">Prix unitaire</th>
                        <th width="15%" className="text-end">Stock</th>
                        <th width="20%" className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            Aucun produit trouvé
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product) => (
                          <tr key={product.id} className={product.disabled ? 'opacity-50' : ''}>
                            <td>
                              <strong>{product.name}</strong>
                              <br />
                              <small className="text-muted">{product.unit}</small>
                              {stockErrors[product.id] && (
                                <small className="d-block text-danger">{stockErrors[product.id]}</small>
                              )}
                            </td>
                            <td>
                              <Badge bg="info">{product.category}</Badge>
                            </td>
                            <td className="text-end">
                              {product.price.toLocaleString('fr-FR')} FCFA
                            </td>
                            <td className="text-end">
                              <span className={product.stock <= 5 ? 'text-danger fw-bold' : 'text-success'}>
                                {product.stock} {product.unit}
                              </span>
                            </td>
                            <td className="text-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => addToCart(product)}
                                disabled={product.disabled}
                              >
                                <FaPlus /> Ajouter
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Cart */}
          <Col lg={4} className="mt-4 mt-lg-0">
            <Cart
              items={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              totalAmount={totalAmount}
              saleStatus={sale.status}
              onConfirm={() => setShowConfirmModal(true)}
              onCancel={() => setShowCancelModal(true)}
              isEdit={!!id}
              packagingIncluded={sale.packaging_included}
              packagingPrice={500} // Example price
            />
          </Col>
        </Row>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la vente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir confirmer cette vente ? Cette action est irréversible.
          <div className="mt-3">
            <strong>Client:</strong> {sale.client_name}<br />
            <strong>Total:</strong> {totalAmount.toLocaleString('fr-FR')} FCFA<br />
            <strong>Articles:</strong> {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={loading}>
            Annuler
          </Button>
          <Button variant="success" onClick={confirmSale} disabled={loading}>
            {loading ? (
              <Spinner as="span" size="sm" animation="border" role="status" />
            ) : (
              <>
                <FaCheck className="me-2" />
                Confirmer
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancellation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Annuler la vente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir annuler cette vente ? Tous les articles seront remis en stock.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)} disabled={loading}>
            Retour
          </Button>
          <Button variant="danger" onClick={cancelSale} disabled={loading}>
            {loading ? (
              <Spinner as="span" size="sm" animation="border" role="status" />
            ) : (
              <>
                <FaTimes className="me-2" />
                Annuler la vente
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SaleForm;