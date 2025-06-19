// // import { useState } from "react";
// // import axios from "axios";
// // import { Form, Button, Container } from "react-bootstrap";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // export default function CreationDossier() {
// //   const [form, setForm] = useState({
// //     nom_dossier: "",
// //     nom_proprietaire: "",
// //     id_nature: 1,
// //     id_type: 1,
// //   });

// //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await axios.post("http://localhost:3000/api/dossiers", form);
// //     alert("Dossier créé !");
// //   };

  
// //   const fetchDossier = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:3000/api/dossiers");
// //       setChambres(response.data);
// //       setError(null);
// //     } catch (error) {
// //       console.error("Erreur lors du chargement des dossiers", error);
// //       setError("Erreur lors du chargement des dossiers");
// //     }
// //   };


// //   return (
// //     <Container className="shadow-sm">
// //       <h3 >Créer un nouveau dossier</h3>
// //       <Form  className="bg-red  mb-3"onSubmit={handleSubmit} >
// //         <Form.Group className="mb-3">
// //           <Form.Label>Nom du dossier</Form.Label>
// //           <Form.Control name="nom_dossier" onChange={handleChange} required />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Propriétaire</Form.Label>
// //           <Form.Control name="nom_proprietaire" onChange={handleChange} required />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Nature</Form.Label>
// //           <Form.Select name="id_nature" onChange={handleChange}>
// //             <option value={1}>Marchandise</option>
// //             <option value={2}>Contrat</option>
// //           </Form.Select>
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label>Type</Form.Label>
// //           <Form.Select name="id_type" onChange={handleChange}>
// //             <option value={1}>Entrée</option>
// //             <option value={2}>Urgent</option>
            
// //           </Form.Select>
// //         </Form.Group>
// //         <Button type="submit" variant="primary" className=" me-2 ">Enregistrer</Button>
// //       </Form>
// //     </Container>
// //   );
// // }


// import { useState } from "react"; 
// import axios from "axios";
// import { Form, Button, Container } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function CreationDossier() {
//   const [form, setForm] = useState({
//     nom_dossier: "",
//     nom_proprietaire: "",
//     id_nature: 1,
//     id_type: 1,
//   });
//   const [fichier, setFichier] = useState(null);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFichier = (e) => setFichier(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 1. Créer le dossier
//       const res = await axios.post("http://localhost:3000/api/dossiers", form);
//       const dossier = res.data;

//       // 2. Uploader le fichier
//       if (fichier) {
//         const formData = new FormData();
//         formData.append("fichier", fichier);
//         await axios.post(`http://localhost:3000/api/dossiers/${dossier.id_dossier}/upload`, formData);
//       }

//       alert("Dossier créé avec succès !");
//     } catch (err) {
//       alert("Erreur lors de la création du dossier.");
//       console.error(err);
//     }
//   };

//   return (
//     <Container className="shadow-sm mt-4 p-4 bg-light rounded">
//       <h3>Créer un nouveau dossier</h3>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Nom du dossier</Form.Label>
//           <Form.Control name="nom_dossier" onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Propriétaire</Form.Label>
//           <Form.Control name="nom_proprietaire" onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Nature</Form.Label>
//           <Form.Select name="id_nature" onChange={handleChange}>
//             <option value={1}>Marchandise</option>
//             <option value={2}>Contrat</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Type</Form.Label>
//           <Form.Select name="id_type" onChange={handleChange}>
//             <option value={1}>Entrée</option>
//             <option value={2}>Urgent</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Fichier numérique (PDF, image...)</Form.Label>
//           <Form.Control type="file" onChange={handleFichier} />
//         </Form.Group>
//         <Button type="submit" variant="primary">Enregistrer</Button>
//       </Form>
//     </Container>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tabs, Tab, Form, Button, Table, Alert, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreationDossier() {
  // États pour les onglets
  const [activeTab, setActiveTab] = useState("liste");
  
  // États pour la création de dossier
  const [form, setForm] = useState({
    nom_dossier: "",
    nom_proprietaire: "",
    id_nature: 1,
    id_type: 1,
  });
  const [fichier, setFichier] = useState(null);
  
  // États pour la liste des dossiers
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // États pour la recherche
  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState([]);

  // Charger les dossiers au montage
  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/list");
        setDossiers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchDossiers();
  }, []);

  // Création de dossier
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/dossiers", form);
      const dossier = res.data;

      if (fichier) {
        const formData = new FormData();
        formData.append("fichier", fichier);
        await axios.post(`http://localhost:3000/api/dossiers/${dossier.id_dossier}/upload`, formData);
      }

      setSuccess("Dossier créé avec succès !");
      setForm({ nom_dossier: "", nom_proprietaire: "", id_nature: 1, id_type: 1 });
      setFichier(null);
      // Recharger la liste
      const updated = await axios.get("http://localhost:3000/api/list");
      setDossiers(updated.data);
      setActiveTab("liste");
    } catch (err) {
      setError("Erreur lors de la création");
    }
  };

  // Envoyer à la dépense
  const envoyerADepense = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/dossiers/${id}/envoyer-depense`);
      setSuccess("Dossier envoyé à la dépense");
      setDossiers(dossiers.map(d => 
        d.id_dossier === id ? {...d, etape_actuelle: "Dépense"} : d
      ));
    } catch (err) {
      setError("Échec de l'envoi");
    }
  };

  // Recherche de dossiers
  const search = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/dossiers/recherche?query=${query}`);
      setResultats(res.data);
    } catch (err) {
      setError("Erreur de recherche");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gestion des dossiers</h2>
      
      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="liste" title="📋 Liste des dossiers">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Propriétaire</th>
                <th>Étape</th>
                <th>Statut</th>
                <th>Fichier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">Chargement...</td>
                </tr>
              ) : dossiers.map((d) => (
                <tr key={d.id_dossier}>
                  <td>{d.nom_dossier}</td>
                  <td>{d.nom_proprietaire}</td>
                  <td>{d.etape_actuelle || "Non défini"}</td>
                  <td>{d.statut || "En cours"}</td>
                  <td>
                    {d.fichier_url ? (
                      <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer">
                        📄 Voir
                      </a>
                    ) : "Aucun"}
                  </td>
                  <td>
                    {/secr[eé]tariat/i.test(d.etape_actuelle) && (
                      <Button size="sm" onClick={() => envoyerADepense(d.id_dossier)}>
                        ➡️ Dépense
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="creation" title="➕ Créer un dossier">
          <Form onSubmit={handleSubmit} className="shadow-sm p-4 bg-light rounded">
            <Form.Group className="mb-3">
              <Form.Label>Nom du dossier *</Form.Label>
              <Form.Control 
                name="nom_dossier" 
                value={form.nom_dossier}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Propriétaire *</Form.Label>
              <Form.Control 
                name="nom_proprietaire" 
                value={form.nom_proprietaire}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nature</Form.Label>
              <Form.Select 
                name="id_nature" 
                value={form.id_nature}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
              >
                <option value={1}>Marchandise</option>
                <option value={2}>Contrat</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select 
                name="id_type" 
                value={form.id_type}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
              >
                <option value={1}>Entrée</option>
                <option value={2}>Urgent</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fichier (PDF, image...)</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => setFichier(e.target.files[0])} 
              />
            </Form.Group>
            <Button type="submit" variant="primary">Enregistrer</Button>
          </Form>
        </Tab>

        <Tab eventKey="recherche" title="🔍 Rechercher">
          <Form className="d-flex mb-3">
            <Form.Control 
              placeholder="Nom ou propriétaire" 
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
            />
            <Button onClick={search} className="ms-2">Chercher</Button>
          </Form>
          <ListGroup>
            {resultats.map((d) => (
              <ListGroup.Item key={d.id_dossier}>
                <strong>{d.nom_dossier}</strong> - {d.nom_proprietaire} | 
                Étape : {d.etape_actuelle} | 
                Statut : {d.statut || "En cours"}
                {d.fichier_url && (
                  <a href={`http://localhost:3000/uploads/${d.fichier_url}`} target="_blank" rel="noreferrer" className="ms-2">
                    📄 Fichier
                  </a>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </Container>
  );
}