import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import api from '../../services/api.js';
import { FaSave, FaArrowLeft, FaBoxOpen, FaTags, FaCoins, FaLayerGroup, FaWeight } from 'react-icons/fa';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useContext(AppContext);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    unit: '',
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Erreur de chargement des  produits:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post('/products', product);
      }
      fetchProducts();
      navigate('/products');
    } catch (error) {
      console.error('Erreur de sauvegarde de  produit:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <FaBoxOpen className="me-2" />
              {id ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
            </h3>
            <Button variant="light" onClick={() => navigate('/products')}>
              <FaArrowLeft className="me-2" />
              Retour
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Nom du produit */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FaTags className="me-2 text-primary" />
                    Nom du produit
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    placeholder="Entrez le nom du produit"
                  />
                </Form.Group>
              </Col>

              {/* Catégorie */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FaLayerGroup className="me-2 text-primary" />
                    Catégorie
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choisir une catégorie</option>
                    <option value="bière">Bière</option>
                    <option value="vin">Vin</option>
                    <option value="spiritueux">Spiritueux</option>
                    <option value="soft">Jus et Softs</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Prix unitaire */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FaCoins className="me-2 text-primary" />
                    Prix unitaire (FCFA)
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                    <span className="input-group-text">FCFA</span>
                  </div>
                </Form.Group>
              </Col>

              {/* Stock */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FaBoxOpen className="me-2 text-primary" />
                    Quantité en stock
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </Form.Group>
              </Col>

              {/* Unité de vente */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FaWeight className="me-2 text-primary" />
                    Unité de vente
                  </Form.Label>
                  <Form.Select
                    name="unit"
                    value={product.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner une unité</option>
                    <option value="bouteille">Bouteille</option>
                    <option value="casier-12">Casier 12</option>
                    <option value="casier-24">Casier 24</option>
                    <option value="palette">Palette</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit" size="lg">
                <FaSave className="me-2" />
                {id ? 'Mettre à jour' : 'Enregistrer'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductForm;