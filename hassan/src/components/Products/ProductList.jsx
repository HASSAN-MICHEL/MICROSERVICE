// import React, { useContext } from 'react';
// import { AppContext } from '../../context/AppContext.jsx';
// import { Link } from 'react-router-dom';
// import ProductItem from './ProductItem.jsx';

// const ProductList = () => {
//   const { products, loading, error } = useContext(AppContext);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div className="header">
//         <h1>Products</h1>
//         <Link to="/products/new" className="btn btn-primary">
//           Add Product
//         </Link>
//       </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Unit</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <ProductItem key={product.id} product={product} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;

import  { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { Link } from 'react-router-dom';
// import ProductItem from './ProductItem.jsx';
import { 
  Container, Button, InputGroup, Form, 
  Row, Col, Card, Badge, Pagination,
  Dropdown, Spinner, Alert,
  DropdownToggle,
  DropdownMenu,
  DropdownItemText
} from 'react-bootstrap';
import { 
  FaPlus, FaSearch, FaFilter, FaBoxOpen,
  FaSort, FaSortUp, FaSortDown,
  FaEllipsisH
} from 'react-icons/fa';

const ProductList = () => {
  const { products, loading, error } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filtrage et tri
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      categoryFilter === 'all' || product.category === categoryFilter
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Gestion du tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Catégories uniques pour le filtre
  const categories = [...new Set(products.map(p => p.category))];

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Chargement des produits...</p>
    </Container>
  );

  if (error) return (
    <Container>
      <Alert variant="danger">
        Erreur lors du chargement des produits: {error}
      </Alert>
    </Container>
  );

  return (
    <Container className="py-4">
      {/* Header avec bouton d'ajout */}
      <Row className="mb-4 d-flex w-full  justify-content-center items-center">
        <Col md={6} className='!w-full '>
          <h2 className="mb-0 d-flex align-items-center !font-bold uppercase !text-2xl lg:!text-3xl !text-gray-600">
            <FaBoxOpen className="me-3 text-persimmon " />
            Inventaire des Produits
          </h2>
          <small className="text-muted font-bold">
            {filteredProducts.length} produits trouvés
          </small>
        </Col>
        <Col md={6} className="text-md-end flex justify-content-end !w-full">
          <Button  
            variant="primary" 
            as={Link}
            to="/products/new"
            className="ms-2 d-flex !bg-persimmon !border-0 items-center !w-[200px] shadow-md shadow-black/30  !px-4 !py-2 gap-2 lg:!py-3 lg:!px-5 "
          >
            <FaPlus  />
            Ajouter un produit
          </Button>
        </Col>
      </Row>

      {/* Filtres et recherche */}
      <Card className="mb-4 !bg-transparent border-0 shadow-sm">
        <Card.Body>
          <Row >
          <div className="flex flex-col lg:flex-row ">
            <Col md={6} className="mb-3 mb-md-0 ">
              <InputGroup >
                <InputGroup.Text className='!bg-persimmon border !border-persimmon ' >
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                className='!border-persimmon'
                  type="text"
                  placeholder="Rechercher par nom ou catégorie..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </InputGroup>
            </Col>
            <div className="d-flex gap-4 w-full justify-content-around space-x-6 ">
                    <Col md={3}>
                      <Dropdown>
                        <Dropdown.Toggle className='!border-persimmon/30 focus:!border-persimmon hover:border-1  !text-persimmon-dark !bg-persimmon/20 focus:!bg-persimmon/25 d-flex align-items-center gap-1  '  id="category-filter">
                          <FaFilter className=" !w-full" />
                          {categoryFilter === 'all' ? 'Toutes catégories' : categoryFilter}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='!bg-persimmon border/20 !border-persimmon backdrop-blur-sm' >
                          <Dropdown.Item className='!text-persimmon' onClick={() => setCategoryFilter('all')}>
                            Toutes catégories
                          </Dropdown.Item>
                          {categories.map(category => (
                            <Dropdown.Item 
                              key={category} 
                              onClick={() => setCategoryFilter(category)}
                            >
                              {category}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col md={3}>
                      <Dropdown>
                        <Dropdown.Toggle className='!border-persimmon/30 focus:!border-persimmon !text-persimmon-dark !bg-persimmon/20 focus:!bg-persimmon/25 d-flex align-items-center gap-1' id="sort-dropdown">
                          <FaSort className=" !w-full" />
                          Trier par
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='!bg-white/20 !border-persimmon backdrop-blur-sm' >
                          <Dropdown.Item className='hover:!bg-permmison' onClick={() => requestSort('name')}>
                            <div className="d-flex align-items-center text-persimmon">
                              Nom 
                              {sortConfig.key === 'name' && (
                                sortConfig.direction === 'asc' ? 
                                  <FaSortUp className="ms-2" /> : 
                                  <FaSortDown className="ms-2" />
                              )}
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => requestSort('price')}>
                            <div className="d-flex align-items-center text-persimmon">
                              Prix
                              {sortConfig.key === 'price' && (
                                sortConfig.direction === 'asc' ? 
                                  <FaSortUp className="ms-2" /> : 
                                  <FaSortDown className="ms-2" />
                              )}
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => requestSort('stock')}>
                            <div className="d-flex align-items-center text-persimmon">
                              Stock
                              {sortConfig.key === 'stock' && (
                                sortConfig.direction === 'asc' ? 
                                  <FaSortUp className="ms-2" /> : 
                                  <FaSortDown className="ms-2" />
                              )}
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    </div>
                </div>
          </Row>
        </Card.Body>
      </Card>

      {/* Liste des produits sous forme de tableau moderne */}
      <Card className="shadow-sm border-0">
        <div className="table-responsive ">
          <table className="table table-hover !h-70   mb-0">
            <thead className=" !w-full">
              <tr>
                <th className='!bg-persimmon  rounded-ss-md text-gray-300 text-end' style={{ width: '30%' }} onClick={() => requestSort('name')}>
                  <div className="d-flex align-items-center cursor-pointer">
                    Produit
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? 
                        <FaSortUp className="ms-2" /> : 
                        <FaSortDown className="ms-2" />
                    )}
                  </div>
                </th>
                <th className='!bg-persimmon  text-gray-300 text-end' style={{ width: '15%' }} onClick={() => requestSort('category')}>
                  <div className="d-flex align-items-center justify-content-center cursor-pointer">
                    Catégorie
                    {sortConfig.key === 'category' && (
                      sortConfig.direction === 'asc' ? 
                        <FaSortUp className="ms-2" /> : 
                        <FaSortDown className="ms-2" />
                    )}
                  </div>
                </th>
                <th className='!bg-persimmon  text-gray-300 text-end' style={{ width: '15%' }}  onClick={() => requestSort('price')}>
                  <div className="d-flex align-items-center justify-content-center cursor-pointer">
                    Prix
                    {sortConfig.key === 'price' && (
                      sortConfig.direction === 'asc' ? 
                        <FaSortUp className="ms-2" /> : 
                        <FaSortDown className="ms-2" />
                    )}
                  </div>
                </th>
                <th className='!bg-persimmon  text-gray-300 !text-center' style={{ width: '15%' }}  onClick={() => requestSort('stock')}>
                  <div className="d-flex align-items-center justify-content-center cursor-pointer">
                    Stock
                    {sortConfig.key === 'stock' && (
                      sortConfig.direction === 'asc' ? 
                        <FaSortUp className="ms-2" /> : 
                        <FaSortDown className="ms-2" />
                    )}
                  </div>
                </th>
                <th className='!bg-persimmon  rounded-se-md text-gray-300 text-end' style={{ width: '25%' }} >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                currentItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex justify-content-start ">
                        <FaBoxOpen className="text-primary me-3" />
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td className='flex justify-center border'>
                      <Badge bg="info" className="text-capitalize">
                        {product.category}
                      </Badge>
                    </td>
                    <td  className='text-center'>
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'XOF'
                      }).format(product.price)}
                    </td>
                    <td className='text-center'>
                      <span className={product.stock <= 5 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                        {product.stock} {product.unit}
                      </span>
                    </td>
                    <td>
                    <Dropdown 
                    className='d-flex justify-content-end '  >
                        <DropdownToggle
                            variant='outline-secondary'
                             className=' d-flex items-center'>
                          <FaEllipsisH />
                        </DropdownToggle>
                        <DropdownMenu className='!bg-transparent backdrop-blur-[3px] !border-persimmon '>
                            <DropdownItemText className='d-flex'>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    as={Link}
                                    to={`/products/${product.id}`}
                                    className=" !w-full"
                                  >
                                    Détails
                                  </Button>
                            </DropdownItemText>
                            <DropdownItemText className='d-flex'>
                                  <Button
                                    variant="outline-warning"
                                    size="sm"
                                    as={Link}
                                    to={`/products/${product.id}/edit`}
                                    className=" !w-full"
                                  >
                                    Modifier
                                  </Button>

                            </DropdownItemText>
                            <DropdownItemText className='d-flex'>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className='!w-full'
                                    // onClick={() => onDelete(product.id)}
                                  >
                                    Supprimer
                                  </Button>
                            </DropdownItemText>
                        </DropdownMenu>
                    </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1} 
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
            />
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}
            
            <Pagination.Next 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages} 
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default ProductList;