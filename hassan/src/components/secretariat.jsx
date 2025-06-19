

// // src/pages/Secretariat.jsx
// import { useState } from "react";
// import { Card, CardContent } from "./ui/card";
// import { Input } from "./ui/Input";
// import { Button } from "./ui/Button";
// import { Label } from "./ui/Label";
// import { Search } from "react-bootstrap-icons";

// const Secretariat = () => {
//   const [dossiers, setDossiers] = useState([]);
//   const [form, setForm] = useState({
//     nom: "",
//     proprietaire: "",
//     nature: "",
//     type: "",
//     fichier: null,
//   });
//   const [search, setSearch] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ ...form, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const nouveauDossier = {
//       ...form,
//       id: Date.now(),
//       date: new Date().toLocaleDateString(),
//       statut: "Enregistré",
//     };
//     setDossiers([...dossiers, nouveauDossier]);
//     setForm({ nom: "", proprietaire: "", nature: "", type: "", fichier: null });
//   };

//   const dossiersFiltres = dossiers.filter((d) =>
//     [d.nom, d.proprietaire].some((field) =>
//       field.toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Secrétariat - Enregistrement des Dossiers</h1>

//       <Card className="mb-6">
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label>Nom du Dossier</Label>
//               <Input name="nom" value={form.nom} onChange={handleChange} required />
//             </div>
//             <div>
//               <Label>Nom du Propriétaire</Label>
//               <Input name="proprietaire" value={form.proprietaire} onChange={handleChange} required />
//             </div>
//             <div>
//               <Label>Nature du Dossier</Label>
//               <Input name="nature" value={form.nature} onChange={handleChange} required />
//             </div>
//             <div>
//               <Label>Type de Dossier</Label>
//               <Input name="type" value={form.type} onChange={handleChange} required />
//             </div>
//             <div className="md:col-span-2">
//               <Label>Fichier Numérique</Label>
//               <Input type="file" name="fichier" onChange={handleChange} />
//             </div>
//             <div className="md:col-span-2 text-right">
//               <Button type="submit">Enregistrer</Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="mb-4 flex items-center gap-2">
//         <Search />
//         <Input
//           type="text"
//           placeholder="Rechercher par nom ou propriétaire"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <Card>
//         <CardContent>
//           <h2 className="text-lg font-semibold mb-2">Dossiers enregistrés</h2>
//           <ul className="space-y-2">
//             {dossiersFiltres.length === 0 && <p>Aucun dossier trouvé.</p>}
//             {dossiersFiltres.map((dossier) => (
//               <li key={dossier.id} className="border p-2 rounded shadow-sm">
//                 <p><strong>{dossier.nom}</strong> - {dossier.proprietaire}</p>
//                 <p>Nature: {dossier.nature} | Type: {dossier.type}</p>
//                 <p>Date: {dossier.date} | Statut: {dossier.statut}</p>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Secretariat;


import { useState } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Secretariat = () => {
  const [dossiers, setDossiers] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    proprietaire: "",
    nature: "",
    type: "",
    fichier: null,
  });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouveauDossier = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      statut: "Enregistré",
    };
    setDossiers([...dossiers, nouveauDossier]);
    setForm({ nom: "", proprietaire: "", nature: "", type: "", fichier: null });
  };

  const dossiersFiltres = dossiers.filter((d) =>
    [d.nom, d.proprietaire].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Secrétariat - Enregistrement des Dossiers</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nom">
                  <Form.Label>Nom du Dossier</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="proprietaire">
                  <Form.Label>Nom du Propriétaire</Form.Label>
                  <Form.Control
                    type="text"
                    name="proprietaire"
                    value={form.proprietaire}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nature">
                  <Form.Label>Nature du Dossier</Form.Label>
                  <Form.Control
                    type="text"
                    name="nature"
                    value={form.nature}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="type">
                  <Form.Label>Type de Dossier</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="fichier" className="mb-3">
              <Form.Label>Fichier Numérique</Form.Label>
              <Form.Control
                type="file"
                name="fichier"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          placeholder="Rechercher par nom ou propriétaire"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Card>
        <Card.Body>
          <h5>Dossiers enregistrés</h5>
          <ul className="list-group mt-3">
            {dossiersFiltres.length === 0 && (
              <li className="list-group-item">Aucun dossier trouvé.</li>
            )}
            {dossiersFiltres.map((dossier) => (
              <li key={dossier.id} className="list-group-item">
                <strong>{dossier.nom}</strong> - {dossier.proprietaire}
                <br />
                <small>
                  Nature : {dossier.nature} | Type : {dossier.type} <br />
                  Date : {dossier.date} | Statut : {dossier.statut}
                </small>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Secretariat;
