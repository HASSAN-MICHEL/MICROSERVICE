// import { useState, useEffect } from "react";
// import { Card, CardContent } from "./ui/card";
// import { Input } from "./ui/Input";
// import { Button } from "./ui/Button";
// import { Label } from "./ui/Label";

// export default function SecretairePage() {
//   const [dossiers, setDossiers] = useState([]);
//   const [newDossier, setNewDossier] = useState({
//     nom: "",
//     proprietaire: "",
//     nature: "",
//     date: ""
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResult, setSearchResult] = useState(null);

//   useEffect(() => {
//     fetch("/api/dossiers")
//       .then((res) => res.json())
//       .then(setDossiers);
//   }, []);

//   const handleCreateDossier = () => {
//     fetch("/api/dossiers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...newDossier, etape: "Secrétariat" })
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setDossiers([...dossiers, data]);
//         setNewDossier({ nom: "", proprietaire: "", nature: "", date: "" });
//       });
//   };

//   const handleSearch = () => {
//     const found = dossiers.find((d) => d.nom === searchTerm);
//     setSearchResult(found);
//   };

//   const handleTransmettre = (id) => {
//     fetch(`/api/dossiers/${id}/transmettre`, {
//       method: "PUT"
//     }).then(() => {
//       setDossiers(
//         dossiers.map((d) =>
//           d.id === id ? { ...d, etape: "Dépenses" } : d
//         )
//       );
//     });
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Espace Secrétariat</h1>

//       <Card>
//         <CardContent className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold">Créer un dossier</h2>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label>Nom du Dossier</Label>
//               <Input
//                 value={newDossier.nom}
//                 onChange={(e) =>
//                   setNewDossier({ ...newDossier, nom: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Propriétaire</Label>
//               <Input
//                 value={newDossier.proprietaire}
//                 onChange={(e) =>
//                   setNewDossier({ ...newDossier, proprietaire: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Nature</Label>
//               <Input
//                 value={newDossier.nature}
//                 onChange={(e) =>
//                   setNewDossier({ ...newDossier, nature: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Date</Label>
//               <Input
//                 type="date"
//                 value={newDossier.date}
//                 onChange={(e) =>
//                   setNewDossier({ ...newDossier, date: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <Button className="mt-2" onClick={handleCreateDossier}>
//             Enregistrer le dossier
//           </Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold">Rechercher un dossier</h2>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Nom du dossier"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Button onClick={handleSearch}>Rechercher</Button>
//           </div>
//           {searchResult && (
//             <div className="mt-4">
//               <p><strong>Nom:</strong> {searchResult.nom}</p>
//               <p><strong>Propriétaire:</strong> {searchResult.proprietaire}</p>
//               <p><strong>Nature:</strong> {searchResult.nature}</p>
//               <p><strong>Étape actuelle:</strong> {searchResult.etape}</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold">Dossiers en attente</h2>
//           {dossiers.filter((d) => d.etape === "Secrétariat").map((d) => (
//             <div key={d.id} className="border p-2 rounded shadow-sm">
//               <p><strong>{d.nom}</strong> - {d.proprietaire}</p>
//               <Button
//                 className="mt-2"
//                 onClick={() => handleTransmettre(d.id)}
//               >
//                 Transmettre à Dépenses
//               </Button>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// src/pages/Secretariat.jsx
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secrétariat - Enregistrement des Dossiers</h1>

      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nom du Dossier</Label>
              <Input name="nom" value={form.nom} onChange={handleChange} required />
            </div>
            <div>
              <Label>Nom du Propriétaire</Label>
              <Input name="proprietaire" value={form.proprietaire} onChange={handleChange} required />
            </div>
            <div>
              <Label>Nature du Dossier</Label>
              <Input name="nature" value={form.nature} onChange={handleChange} required />
            </div>
            <div>
              <Label>Type de Dossier</Label>
              <Input name="type" value={form.type} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Fichier Numérique</Label>
              <Input type="file" name="fichier" onChange={handleChange} />
            </div>
            <div className="md:col-span-2 text-right">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mb-4 flex items-center gap-2">
        <Search />
        <Input
          type="text"
          placeholder="Rechercher par nom ou propriétaire"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Dossiers enregistrés</h2>
          <ul className="space-y-2">
            {dossiersFiltres.length === 0 && <p>Aucun dossier trouvé.</p>}
            {dossiersFiltres.map((dossier) => (
              <li key={dossier.id} className="border p-2 rounded shadow-sm">
                <p><strong>{dossier.nom}</strong> - {dossier.proprietaire}</p>
                <p>Nature: {dossier.nature} | Type: {dossier.type}</p>
                <p>Date: {dossier.date} | Statut: {dossier.statut}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Secretariat;
