// src/pages/DossierDetail.jsx
const DossierDetail = () => {
  const { user } = useAuth();
  const [dossier, setDossier] = useState(null);

  const handleValidation = (statut) => {
    axios.put(`/api/dossiers/${dossier._id}/valider`, { 
      etape: user.role, 
      statut 
    });
  };

  return (
    <Container>
      {/* ... Affichage du dossier ... */}

      {user?.role === "Depenses" && dossier?.etapes[1]?.statut === "En attente" && (
        <ButtonGroup>
          <Button variant="success" onClick={() => handleValidation("Validé")}>
            Valider
          </Button>
          <Button variant="danger" onClick={() => handleValidation("Rejeté")}>
            Rejeter
          </Button>
        </ButtonGroup>
      )}

      {user?.role === "Paiement" && (
        <Button variant="primary" onClick={() => handleValidation("Payé")}>
          Finaliser le paiement
        </Button>
      )}
    </Container>
  );
};