import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:4000/api/clients"; // Définition propre de l'URL API

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ nom: "", email: "", telephone: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setClients(response.data);
      console.log("Données clients chargées :", response.data); // Debug
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
      alert("Impossible de charger les clients. Vérifiez le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (client = null) => {
    if (client) {
      setFormData({
        nom: client.nom || "",
        email: client.email || "",
        telephone: client.telephone || "",
      });
      setEditId(client.id);
    } else {
      setFormData({ nom: "", email: "", telephone: "" });
      setEditId(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.email || !formData.telephone) {
      alert("Tous les champs sont requis !");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Client modifié avec succès !");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Client ajouté avec succès !");
      }
      fetchClients();
      handleClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification du client :", error);
      alert("Une erreur s'est produite. Vérifiez le serveur.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Client supprimé avec succès !");
      fetchClients();
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
      alert("Impossible de supprimer le client.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Clients</h2>
      <Button variant="primary" onClick={() => handleShow()} className="mb-3">
        Ajouter un client
      </Button>

      {loading ? (
        <p>Chargement des clients...</p>
      ) : clients.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.nom}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShow(client)} className="me-2">
                    Modifier
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(client.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aucun client disponible</p>
      )}

      {/* Modal pour ajouter/modifier un client */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Modifier" : "Ajouter"} un client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>Sauvegarder</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Clients;
