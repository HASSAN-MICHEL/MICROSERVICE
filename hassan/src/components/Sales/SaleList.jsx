import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { FaPlus, FaShoppingBag, FaSearch, FaFilter, FaSync } from 'react-icons/fa';
import { Container, Button, Table, InputGroup, Form, Row, Col, Alert, Spinner, Card, Modal, Pagination } from 'react-bootstrap';
import SaleForm from './SaleForm.jsx';
import SaleItem from './SaleItem.jsx';

const SaleList = () => {
  const { sales, loading, error, fetchSales } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSaleForm, setShowSaleForm] = useState(false);
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrage des ventes (conservé comme avant)
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sale.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calcul des données paginées
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  const getSalesCountByStatus = (status) => {
    return sales.filter(s => s.status === status).length;
  };

  const handleClose = () => {
    setShowSaleForm(false);
    fetchSales();
    setCurrentPage(1); // Réinitialiser à la première page après une nouvelle vente
  };

  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Chargement des ventes...</p>
    </Container>
  );

  if (error) return (
    <Container>
      <Alert variant="danger">
        Erreur lors du chargement des ventes: {error}
        <Button variant="outline-danger" onClick={fetchSales} className="ms-3">
          <FaSync /> Réessayer
        </Button>
      </Alert>
    </Container>
  );

  return (
    <Container className="py-4">
      {/* Entête avec boutons et recherche (inchangé) */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h2 className="mb-0">
            <FaShoppingBag className="me-2 text-primary" />
            Historique des Ventes
          </h2>
        </Col>
        <Col md={6} className="text-md-end">
          <Button 
            variant="primary" 
            className="ms-2"
            onClick={() => setShowSaleForm(true)}
          >
            <FaPlus className="me-2" />
            Nouvelle Vente
          </Button>
        </Col>
      </Row>

      {/* Filtres et recherche (inchangé) */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Rechercher par client ou n° de vente..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset à la page 1 quand on recherche
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1); // Reset à la page 1 quand on filtre
                  }}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Complétées</option>
                  <option value="cancelled">Annulées</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" onClick={() => {
                fetchSales();
                setCurrentPage(1); // Reset à la page 1 quand on actualise
              }} className="w-100">
                <FaSync /> Actualiser
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Statistiques (inchangé) */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Ventes</Card.Title>
              <Card.Text className="display-6 text-primary">
                {sales.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Complétées</Card.Title>
              <Card.Text className="display-6 text-success">
                {getSalesCountByStatus('confirmed')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Annulées</Card.Title>
              <Card.Text className="display-6 text-danger">
                {getSalesCountByStatus('cancelled')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Liste des ventes AVEC PAGINATION */}
      {filteredSales.length === 0 ? (
        <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            <FaShoppingBag size={48} className="text-muted mb-3" />
            <h4>Aucune vente trouvée</h4>
            <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            <Button 
              variant="primary" 
              className="mt-3"
              onClick={() => setShowSaleForm(true)}
            >
              <FaPlus className="me-2" />
              Créer une nouvelle vente
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>N° Vente</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Montant( FCFA)</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((sale) => (
                  <SaleItem key={sale.id} sale={sale} />
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.First 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1} 
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
              />
              
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
              />
              <Pagination.Last 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages} 
              />
            </Pagination>
          </div>
        </>
      )}

      {/* Modal pour le formulaire de vente (inchangé) */}
      <Modal 
        show={showSaleForm} 
        onHide={handleClose}
        size="xl"
        fullscreen="lg-down"
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaShoppingBag className="me-2" />
            Nouvelle Vente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleForm onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SaleList;