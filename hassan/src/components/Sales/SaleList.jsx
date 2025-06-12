import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { FaPlus, FaShoppingBag, FaSearch, FaFilter, FaSync, FaShoppingBasket } from 'react-icons/fa';
import { Container, Button, Table, InputGroup, Form, Row, Col, Alert, Spinner, Card, Modal } from 'react-bootstrap';
import SaleForm from './SaleForm.jsx'; // Importez le composant SaleForm
import SaleItem from './SaleItem.jsx'

const SaleList = () => {
  const { sales, loading, error, fetchSales } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSaleForm, setShowSaleForm] = useState(false); // État pour contrôler l'affichage du formulaire

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sale.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getSalesCountByStatus = (status) => {
    return sales.filter(s => s.status === status).length;
  };

  // Fonction pour fermer le modal et rafraîchir la liste
  const handleClose = () => {
    setShowSaleForm(false);
    fetchSales(); // Rafraîchir la liste après une nouvelle vente
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
      <Row className="mb-4 d-flex gap-4 md:!gap-0 align-items-center justify-content-between">
        <Col md={6} className='!w-[fit-content] '> 
          <h2 className="mb-0  !w-full uppercase flex items-center !text-persimmon !font-bold">
            <FaShoppingBag className="me-2 text-persimmon  " />
            Historique des Ventes
          </h2>
        </Col>
        <Col md={6} className="text-md-end flex items-center justify-content-end !w-full md:!w-[fit-content] ">
          <Button 
            className="ms-2 !flex items-center !py-2 !px-6 !border-0 !bg-persimmon shadow-md !shadow-black/60 "
            onClick={() => setShowSaleForm(true)} // Ouvrir le modal au lieu de naviguer
          >
            <FaPlus className="me-2" />
            Nouvelle Vente
          </Button>
        </Col>
      </Row>

      {/* Filtres et statistiques */}
      <Card className="mb-4 !bg-transparent border-0 shadow-sm">
        <Card.Body className=''>
          <Row >
            <Col md={6} className="mb-3 mb-md-0 ">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Rechercher par client ou n° de vente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <div className="d-flex justify-content-between items-center mt-2">
            <Col md={3} >
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Complétées</option>
                  <option value="cancelled">Annulées</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Button  onClick={fetchSales} className="w-[fit-content] !bg-red-500 border-0 shadow-md shadow-black/60 !p-2 !px-8 d-flex gap-3 items-center  ">
                <FaSync /> Actualiser
              </Button>
            </Col>
          </div>
          </Row>
        </Card.Body>
      </Card>

      {/* Statistiques */}
      <Row className="mb-4  d-flex  gap-2 md:!gap-0">
        <Col md={4}>
          <Card className="text-center  !bg-persimmon/10 !shadow-md !shadow-black/30 border-0 hover:translate-y-[-5px] transition-all duration-500 ">
            <Card.Body className=''>
              <Card.Title className='text-persimmon'>Total Ventes</Card.Title>
              <Card.Text className="display-6 text-persimmon">
                {sales.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center !bg-green-50 !shadow-md !shadow-black/30 border-0 hover:translate-y-[-5px] transition-all duration-500">
            <Card.Body>
              <Card.Title className='text-success'>Complétées</Card.Title>
              <Card.Text className="display-6 text-success">
                {getSalesCountByStatus('confirmed')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center !bg-red-50 !shadow-md !shadow-black/30 border-0 hover:translate-y-[-5px] transition-all duration-500">
            <Card.Body>
              <Card.Title className='text-danger'>Annulées</Card.Title>
              <Card.Text className="display-6 text-danger">
                {getSalesCountByStatus('cancelled')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Liste des ventes */}
      {filteredSales.length === 0 ? (
        <Card className="text-center py-5 !shadow-md !border-0 shadow-black/20 ">
          <Card.Body className='d-flex flex-column items-center '>
            <FaShoppingBasket size={100} className="text-orange-300 rotate-12 mb-3" />
            <h1 className='!text-2xl md:!text-3xl lg:!text-4xl'>Aucune vente trouvée</h1>
            <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            <Button 
              variant="primary" 
              className="mt-3 d-flex items-center p-2 !bg-persimmon !border-persimmon-dark px-4 animate-pulse shadow-md shadow-black/30 "
              onClick={() => setShowSaleForm(true)}
            >
              <FaPlus className="me-2 " />
              Créer une nouvelle vente
            </Button>
          </Card.Body>
        </Card>
      ) : (
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
              {filteredSales.map((sale) => (
                <SaleItem key={sale.id} sale={sale} />
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal pour le formulaire de vente */}
      <Modal 
        show={showSaleForm} 
        onHide={handleClose}
        size="xl"
        fullscreen="lg-down"
        backdrop="static"
      >
        <Modal.Header closeButton className="!bg-persimmon text-white  ">
          <Modal.Title className='d-flex items-center '>
            <FaShoppingBag className="me-2" />
            Nouvelle Vente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleForm 
            onClose={handleClose} // Passez la fonction de fermeture au formulaire
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SaleList;