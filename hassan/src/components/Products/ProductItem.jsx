import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaBoxOpen, FaTag, FaMoneyBillWave, FaLayerGroup, FaBalanceScale } from 'react-icons/fa';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';

const ProductItem = ({ product, onDelete }) => {
  const getCategoryBadge = (category) => {
    const variants = {
      'bière': 'primary',
      'vin': 'success',
      'spiritueux': 'danger',
      'soft': 'info'
    };
    return variants[category] || 'secondary';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          {/* Produit Info */}
          <Col md={4}>
            <div className="d-flex align-items-center">
              <FaBoxOpen className="text-primary me-3" size={24} />
              <div>
                <h5 className="mb-1">{product.name}</h5>
                <Badge bg={getCategoryBadge(product.category)} className="me-2">
                  {product.category}
                </Badge>
                <Badge bg="light" text="dark">
                  <FaBalanceScale className="me-1" />
                  {product.unit}
                </Badge>
              </div>
            </div>
          </Col>

          {/* Stock Info */}
          <Col md={2} className="text-center">
            <div className="d-flex flex-column">
              <span className="text-muted small">Stock</span>
              <span className={product.stock <= 5 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                {product.stock}
              </span>
            </div>
          </Col>

          {/* Price Info */}
          <Col md={2} className="text-center">
            <div className="d-flex flex-column">
              <span className="text-muted small">Prix</span>
              <span className="text-primary fw-bold">
                {formatPrice(product.price)}
              </span>
            </div>
          </Col>

          {/* Actions */}
          <Col md={4} className="d-flex justify-content-end">
            <Button
              variant="outline-primary"
              size="sm"
              as={Link}
              to={`/products/${product.id}`}
              className="me-2 d-flex align-items-center"
            >
              <FaEye className="me-1" />
              Détails
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              as={Link}
              to={`/products/${product.id}/edit`}
              className="me-2 d-flex align-items-center"
            >
              <FaEdit className="me-1" />
              Modifier
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="d-flex align-items-center"
            >
              <FaTrash className="me-1" />
              Supprimer
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;