// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Table, Container } from "react-bootstrap";

// // export default function Statistiques() {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     axios.get("http://localhost:3000/api/dossiers/statistiques/etapes")
// //       .then(res => setData(res.data));
// //   }, []);

// //   return (
// //     <Container>
// //       <h3>Statistiques par étape</h3>
// //       <Table striped bordered>
// //         <thead>
// //           <tr>
// //             <th>Étape</th>
// //             <th>Nombre de dossiers</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((row, i) => (
// //             <tr key={i}>
// //               <td>{row.etape_actuelle}</td>
// //               <td>{row.total}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </Container>
// //   );
// // }



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Container } from "react-bootstrap";

// export default function AdminUtilisateurs() {
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     mot_de_passe: "",
//     id_role: 1,
//     actif: true
//   });
//   const [editId, setEditId] = useState(null);

//   const fetchUtilisateurs = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/utilisateurs", { withCredentials: true });
//       setUtilisateurs(res.data);
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs", err);
//     }
//   };

//   useEffect(() => {
//     fetchUtilisateurs();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value
//     });
//   };

//   const resetForm = () => {
//     setForm({
//       nom: "",
//       prenom: "",
//       email: "",
//       mot_de_passe: "",
//       id_role: 1,
//       actif: true
//     });
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { ...form };

//       if (editId && !form.mot_de_passe.trim()) {
//         delete payload.mot_de_passe;
//       }

//       if (editId) {
//         await axios.put(`http://localhost:3000/api/utilisateurs/${editId}`, payload, { withCredentials: true });
//       } else {
//         await axios.post("http://localhost:3000/api/utilisateurs", payload, { withCredentials: true });
//       }

//       setShowModal(false);
//       resetForm();
//       fetchUtilisateurs();
//     } catch (err) {
//       alert("Erreur : " + err.response?.data?.error || err.message);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditId(user.id_utilisateur);
//     setForm({
//       nom: user.nom,
//       prenom: user.prenom,
//       email: user.email,
//       mot_de_passe: "",
//       id_role: user.id_role,
//       actif: user.actif
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Supprimer cet utilisateur ?")) {
//       await axios.delete(`http://localhost:3000/api/utilisateurs/${id}`, { withCredentials: true });
//       fetchUtilisateurs();
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h3>👥 Gestion des Utilisateurs</h3>
//       <Button className="mb-3" onClick={() => { resetForm(); setShowModal(true); }}>
//         ➕ Ajouter un utilisateur
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Nom complet</th>
//             <th>Email</th>
//             <th>Rôle</th>
//             <th>Actif</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {utilisateurs.map((u) => (
//             <tr key={u.id_utilisateur}>
//               <td>{u.nom} {u.prenom}</td>
//               <td>{u.email}</td>
//               <td>{u.nom_role}</td>
//               <td>{u.actif ? "✅" : "❌"}</td>
//               <td>
//                 <Button size="sm" variant="warning" onClick={() => handleEdit(u)}>✏️ Modifier</Button>{" "}
//                 <Button size="sm" variant="danger" onClick={() => handleDelete(u.id_utilisateur)}>🗑 Supprimer</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal Formulaire */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Modifier" : "Ajouter"} un utilisateur</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-2">
//               <Form.Label>Nom</Form.Label>
//               <Form.Control name="nom" value={form.nom} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Prénom</Form.Label>
//               <Form.Control name="prenom" value={form.prenom} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Mot de passe {editId ? "(laissez vide pour ne pas modifier)" : ""}</Form.Label>
//               <Form.Control type="password" name="mot_de_passe" value={form.mot_de_passe} onChange={handleChange} required={!editId} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Rôle</Form.Label>
//               <Form.Select name="id_role" value={form.id_role} onChange={handleChange}>
//                 <option value={1}>Secrétariat</option>
//                 <option value={2}>Dépense</option>
//                 <option value={3}>Comptabilité</option>
//                 <option value={4}>Programmation</option>
//                 <option value={5}>Paiement</option>
//                 <option value={6}>Administrateur</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Check type="checkbox" label="Actif" name="actif" checked={form.actif} onChange={handleChange} />
//             </Form.Group>
//             <Button type="submit" className="mt-2">{editId ? "Modifier" : "Ajouter"}</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

// URL dynamique (même configuration que les autres pages)
const getApiBaseUrl = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:3000";
  }
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function AdminUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    mot_de_passe: "",
    id_role: 1,
    actif: true
  });
  const [editId, setEditId] = useState(null);

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/utilisateurs`, { withCredentials: true });
      setUtilisateurs(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs", err);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const resetForm = () => {
    setForm({
      nom: "",
      prenom: "",
      email: "",
      mot_de_passe: "",
      id_role: 1,
      actif: true
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };

      if (editId && !form.mot_de_passe.trim()) {
        delete payload.mot_de_passe;
      }

      if (editId) {
        await axios.put(`${API_BASE_URL}/api/utilisateurs/${editId}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${API_BASE_URL}/api/utilisateurs`, payload, { withCredentials: true });
      }

      setShowModal(false);
      resetForm();
      fetchUtilisateurs();
    } catch (err) {
      alert("Erreur : " + err.response?.data?.error || err.message);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id_utilisateur);
    setForm({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mot_de_passe: "",
      id_role: user.id_role,
      actif: user.actif
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await axios.delete(`${API_BASE_URL}/api/utilisateurs/${id}`, { withCredentials: true });
      fetchUtilisateurs();
    }
  };

  return (
    <Container className="mt-4">
      <h3>👥 Gestion des Utilisateurs</h3>
      <Button className="mb-3" onClick={() => { resetForm(); setShowModal(true); }}>
        ➕ Ajouter un utilisateur
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((u) => (
            <tr key={u.id_utilisateur}>
              <td>{u.nom} {u.prenom}</td>
              <td>{u.email}</td>
              <td>{u.nom_role}</td>
              <td>{u.actif ? "✅" : "❌"}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => handleEdit(u)}>✏️ Modifier</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(u.id_utilisateur)}>🗑 Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Formulaire */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Modifier" : "Ajouter"} un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nom</Form.Label>
              <Form.Control name="nom" value={form.nom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Prénom</Form.Label>
              <Form.Control name="prenom" value={form.prenom} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mot de passe {editId ? "(laissez vide pour ne pas modifier)" : ""}</Form.Label>
              <Form.Control type="password" name="mot_de_passe" value={form.mot_de_passe} onChange={handleChange} required={!editId} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Rôle</Form.Label>
              <Form.Select name="id_role" value={form.id_role} onChange={handleChange}>
                <option value={1}>Secrétariat</option>
                <option value={2}>Dépense</option>
                <option value={3}>Comptabilité</option>
                <option value={4}>Programmation</option>
                <option value={5}>Paiement</option>
                <option value={6}>Administrateur</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Actif" name="actif" checked={form.actif} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Modifier" : "Ajouter"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}