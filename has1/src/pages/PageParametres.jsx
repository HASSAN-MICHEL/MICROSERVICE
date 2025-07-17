// src/pages/PageParametres.jsx
import { useState } from 'react';
import { 
  Container, Card, Form, Button, 
  Row, Col, Accordion, Badge 
} from 'react-bootstrap';
import { 
   FiBell, FiUser, FiLock, FiDroplet ,  FiSettings ,
  FiGlobe, FiMoon, FiSun, FiSave 
} from 'react-icons/fi';


const PageParametres= () => {

  // États pour les paramètres
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#4e73df');
  const [notifications, setNotifications] = useState(true);
  const [langue, setLangue] = useState('fr');
  const [sauvegardeAuto, setSauvegardeAuto] = useState(true);

  // Options disponibles
  const themes = [
    { value: 'light', label: 'Clair', icon: <FiSun /> },
    { value: 'dark', label: 'Sombre', icon: <FiMoon /> },
    { value: 'system', label: 'Système', icon: <FiGlobe /> }
  ];

  const langues = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' }
  ];

  const couleurs = [
    '#4e73df', '#6610f2', '#6f42c1', 
    '#e83e8c', '#e74a3b', '#fd7e14', 
    '#f6c23e', '#1cc88a', '#36b9cc'
  ];

  const appliquerParametres = () => {
    // Appliquer les changements dans l'application
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--primary', primaryColor);
    
    // Ici vous pourriez sauvegarder en base de données
    console.log('Paramètres sauvegardés:', { 
      theme, primaryColor, notifications, langue, sauvegardeAuto 
    });
    
    alert('Paramètres enregistrés avec succès !');
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 d-flex align-items-center">
        <FiSettings className="me-2" />
        Paramètres de l'application
      </h2>

      <Accordion defaultActiveKey="0" flush>
        {/* Apparence */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
             <span className="d-flex align-items-center">
             <FiDroplet className="me-2" />  {/* Changed here */}
           Apparence
              </span>
            </Accordion.Header>
          <Accordion.Body>
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-4">
                  <Form.Label>Thème</Form.Label>
                  <div className="d-flex gap-3">
                    {themes.map((t) => (
                      <Button
                        key={t.value}
                        variant={theme === t.value ? 'primary' : 'outline-secondary'}
                        onClick={() => setTheme(t.value)}
                        className="d-flex flex-column align-items-center"
                        style={{ width: '100px' }}
                      >
                        <span className="mb-1">{t.icon}</span>
                        {t.label}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Couleur principale</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {couleurs.map((c) => (
                      <div
                        key={c}
                        onClick={() => setPrimaryColor(c)}
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: c,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border: primaryColor === c ? '3px solid #333' : 'none'
                        }}
                        title={c}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>

        {/* Préférences */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className="d-flex align-items-center">
              <FiUser className="me-2" />
              Préférences
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="mb-4">
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Langue</Form.Label>
                  <Form.Select 
                    value={langue}
                    onChange={(e) => setLangue(e.target.value)}
                  >
                    {langues.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="sauvegarde-auto"
                    label="Sauvegarde automatique"
                    checked={sauvegardeAuto}
                    onChange={(e) => setSauvegardeAuto(e.target.checked)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>

        {/* Notifications */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span className="d-flex align-items-center">
              <FiBell className="me-2" />
              Notifications
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="mb-4">
              <Card.Body>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="notifications"
                    label="Activer les notifications"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>

        {/* Sécurité */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <span className="d-flex align-items-center">
              <FiLock className="me-2" />
              Sécurité
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Changer le mot de passe</Form.Label>
                      <Form.Control type="password" placeholder="Nouveau mot de passe" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Confirmation</Form.Label>
                      <Form.Control type="password" placeholder="Confirmer le mot de passe" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="outline-primary" size="sm" className="mt-3">
                  Mettre à jour
                </Button>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="d-flex justify-content-end mt-4">
        <Button 
          variant="primary" 
          onClick={appliquerParametres}
          className="d-flex align-items-center"
        >
          <FiSave className="me-2" />
          Enregistrer les paramètres
        </Button>
      </div>
    </Container>
  );
}

export default PageParametres;