import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { PersonPlus, Pencil, Trash, ShieldShaded, PersonCheck } from 'react-bootstrap-icons';
import axios from 'axios';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [editMode, setEditMode] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admins', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setAdmins(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      };

      if (editMode) {
        await axios.put(`/api/admins/${currentAdminId}`, formData, config);
      } else {
        await axios.post('/api/admins', formData, config);
      }

      fetchAdmins();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmez la suppression de cet administrateur ?')) {
      try {
        await axios.delete(`/api/admins/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchAdmins();
      } catch (err) {
        setError(err.response?.data?.error || 'Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      nom: admin.nom,
      email: admin.email,
      password: '',
      role: admin.role
    });
    setEditMode(true);
    setCurrentAdminId(admin.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nom: '',
      email: '',
      password: '',
      role: 'admin'
    });
    setEditMode(false);
    setCurrentAdminId(null);
  };

  const getRoleBadge = (role) => {
    const variants = {
      superadmin: { bg: 'danger', text: 'Super Admin' },
      admin: { bg: 'primary', text: 'Admin' },
      support: { bg: 'info', text: 'Support' }
    };
    return <Badge bg={variants[role].bg}>{variants[role].text}</Badge>;
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <ShieldShaded className="me-2" />
          Gestion des Administrateurs
        </h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <PersonPlus className="me-2" />
          Ajouter un Admin
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.nom}</td>
              <td>{admin.email}</td>
              <td>{getRoleBadge(admin.role)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(admin)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(admin.id)}
                    disabled={admin.role === 'superadmin'}
                  >
                    <Trash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Modifier Admin' : 'Nouvel Admin'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editMode}
                placeholder={editMode ? "Laisser vide pour ne pas changer" : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rôle</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
                <option value="support">Support</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              {editMode ? 'Mettre à jour' : 'Créer'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminManagement;