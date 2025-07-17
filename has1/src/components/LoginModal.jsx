// import { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import axios from "axios";

// export default function LoginModal({ show, handleClose, onSuccess, expectedRole }) {
//   const [nom, setNom] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:3000/api/user-check", { nom, email });
//       const user = res.data;

//       if (user.nom_role?.toLowerCase() === expectedRole.toLowerCase()) {
//         onSuccess();  // appel du parent pour rediriger
//       } else {
//         setError("Rôle non autorisé pour accéder à cette page.");
//       }
//     } catch (err) {
//       setError("Utilisateur introuvable.");
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Connexion requise</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {error && <div className="text-danger mb-2">{error}</div>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label>Nom</Form.Label>
//             <Form.Control value={nom} onChange={e => setNom(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mt-2">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
//           </Form.Group>
//           <Button type="submit" className="mt-3">Se connecter</Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }


import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

// Configuration robuste de l'URL de base
const getApiBaseUrl = () => {
  // Si on est en développement ou en test local
  if (process.env.NODE_ENV === 'development' || 
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1") {
    return `http://${window.location.hostname}:3000`;
  }
  // En production/réseau - deux options possibles :
  // 1. Si le front et le back sont servis depuis le même domaine/port
  // return window.location.origin;
  // 2. Si le back est sur un port spécifique (3000)
  return `http://${window.location.hostname}:3000`;
};

const API_BASE_URL = getApiBaseUrl();
console.log("URL de l'API détectée:", API_BASE_URL); // Pour débogage

export default function LoginModal({ show, handleClose, onSuccess, expectedRole }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Tentative de connexion à:", `${API_BASE_URL}/api/user-check`); // Debug
      const res = await axios.post(`${API_BASE_URL}/api/user-check`, { 
        nom, 
        email 
      }, {
        timeout: 5000, // Timeout de 5 secondes
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const user = res.data;
      console.log("Réponse du serveur:", user); // Debug

      if (user.nom_role?.toLowerCase() === expectedRole.toLowerCase()) {
        onSuccess();
      } else {
        setError("Rôle non autorisé pour accéder à cette page.");
      }
    } catch (err) {
      console.error("Erreur complète:", {
        url: `${API_BASE_URL}/api/user-check`,
        error: err,
        response: err.response,
        message: err.message
      });
      
      let errorMessage = "Erreur de connexion au serveur";
      if (err.code === "ECONNABORTED") {
        errorMessage = "Le serveur ne répond pas - temps écoulé";
      } else if (err.response) {
        errorMessage = err.response.data?.message || "Erreur d'authentification";
      } else if (err.request) {
        errorMessage = `Impossible de joindre le serveur à ${API_BASE_URL}`;
      }
      
      setError(`${errorMessage} (${err.message})`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connexion requise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
            <small className="d-block mt-2">
              URL du serveur: {API_BASE_URL}
            </small>
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control 
              value={nom} 
              onChange={e => setNom(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Se connecter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}