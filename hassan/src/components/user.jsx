import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Configurer Axios pour inclure le token dans les en-têtes
axios.defaults.baseURL = "http://localhost:3000";

const User = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ nom: "", email: "", mot_de_passe: "", role: "admin" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors du chargement des utilisateurs. Veuillez réessayer.";
      console.error("Erreur lors du chargement des utilisateurs", errorMessage);
      setError(errorMessage);
    }
  };

  // Ouvrir la modale pour ajouter/modifier un utilisateur
  const handleShow = (user = null) => {
    if (user) {
      setFormData(user);
      setEditId(user.id);
    } else {
      setFormData({ nom: "", email: "", mot_de_passe: "", role: "admin" });
      setEditId(null);
    }
    setShow(true);
  };

  // Fermer la modale
  const handleClose = () => {
    setShow(false);
    setError(null);
    setSuccess(null);
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire (ajouter ou modifier un utilisateur)
  const handleSubmit = async () => {
    if (!formData.nom || !formData.email || !formData.role) {
      setError("Tous les champs sont requis !");
      return;
    }

    const dataToSend = {
      nom: formData.nom,
      email: formData.email,
      mot_de_passe: formData.mot_de_passe,
      role: formData.role,
    };

    try {
      if (editId) {
        // Mettre à jour un utilisateur existant
        await axios.put(`/users/${editId}`, dataToSend);
        setSuccess("Utilisateur modifié avec succès !");
      } else {
        // Créer un nouvel utilisateur
        await axios.post("/users", dataToSend);
        setSuccess("Utilisateur ajouté avec succès !");
      }
      setError(null);
      fetchUsers();
      handleClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Une erreur s'est produite. Veuillez réessayer.";
      console.error("Erreur lors de l'ajout/modification de l'utilisateur", errorMessage);
      setError(errorMessage);
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setSuccess("Utilisateur supprimé avec succès !");
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Une erreur s'est produite. Veuillez réessayer.";
      console.error("Erreur lors de la suppression de l'utilisateur", errorMessage);
      setError(errorMessage);
    }
  };

  // Gestion de la pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2>Gestion des Utilisateurs</h2>

      {/* Affichage des messages d'erreur et de succès */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={handleShow}>
          Ajouter un Utilisateur
        </Button>
      </div>

      {users.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Date de Création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nom}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.date_creation).toLocaleDateString()}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(user)} className="me-2">
                      Modifier
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <span className="mx-3">Page {currentPage}</span>
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastUser >= users.length}
            >
              Suivant
            </Button>
          </div>
        </>
      ) : (
        <p>Aucun utilisateur disponible</p>
      )}

      {/* Modale pour ajouter/modifier un utilisateur */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Modifier" : "Ajouter"} un Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rôle</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="reception">Réception</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;