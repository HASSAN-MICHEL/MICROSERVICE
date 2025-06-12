import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import api from '../../services/api.js';
import { FaSave, FaBoxOpen, FaTags, FaCoins, FaLayerGroup, FaWeight } from 'react-icons/fa';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { X } from 'lucide-react';

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
          console.error('Error fetching product:', error);
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
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container className="mt-4 ">
      <Card className="shadow-lg border !shadow-black">
        
        <Card.Header className="!bg-persimmon text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0 flex items-center">
              <FaBoxOpen className="me-2 " />
              {id ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
            </h3>
          </div>
        </Card.Header>
        
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Nom du produit */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className='d-flex items-center font-bold !text-persimmon ' >
                    <FaTags className="me-2 !text-persimmon" />
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
                  <Form.Label className='d-flex items-center font-bold !text-persimmon ' >
                    <FaLayerGroup className="me-2 !text-persimmon" />
                    Catégorie
                  </Form.Label>
                  <Form.Select 
                  
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option className='bg-gray-300 !text-gray-800' value="">Choisir une catégorie</option>
                    <option className='bg-gray-300 !text-gray-800' value="bière">Bière</option>
                    <option className='bg-gray-300 !text-gray-800' value="vin">Vin</option>
                    <option className='bg-gray-300 !text-gray-800' value="spiritueux">Spiritueux</option>
                    <option className='bg-gray-300 !text-gray-800' value="soft">Jus et Softs</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Prix unitaire */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className='d-flex items-center font-bold !text-persimmon ' >
                    <FaCoins className="me-2 !text-persimmon" />
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
                    <span className="input-group-text !bg-persimmon text-white ">FCFA</span>
                  </div>
                </Form.Group>
              </Col>

              {/* Stock */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className='d-flex items-center font-bold !text-persimmon ' >
                    <FaBoxOpen className="me-2 !text-persimmon" />
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
                  <Form.Label className='d-flex items-center font-bold !text-persimmon ' >
                    <FaWeight className="me-2 !text-persimmon" />
                    Unité de vente
                  </Form.Label>
                  <Form.Select 
                  
                    name="unit"
                    value={product.unit}
                    onChange={handleChange}
                    required
                  >
                    <option className='bg-gray-300 !text-gray-800' value="">Sélectionner une unité</option>
                    <option className='bg-gray-300 !text-gray-800' value="bouteille">Bouteille</option>
                    <option className='bg-gray-300 !text-gray-800' value="casier-12">Casier 12</option>
                    <option className='bg-gray-300 !text-gray-800' value="casier-24">Casier 24</option>
                    <option className='bg-gray-300 !text-gray-800' value="palette">Palette</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4 gap-6">
            <Button
              className=" !flex items-center justify-content-center transition-all duration-300  border-0 hover:!bg-red-600 w-[150px] !bg-red-500 shadow-md shadow-black/40"
               onClick={() => navigate('/products')}>
              <X className="me-2" />
              Annuler
            </Button>
              <Button variant="primary" type="submit" className='!flex  items-center gap-2 shadow-md !bg-persimmon !border-persimmon shadow-black/40' size="lg">
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