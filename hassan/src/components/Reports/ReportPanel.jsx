import React, { useState } from 'react';
import { Button, Card, Row, Col, Form, Modal } from 'react-bootstrap';
import { FaFilePdf, FaCalendarDay, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import api from '../../services/api';

const ReportPanel = () => {
  const [showDailyModal, setShowDailyModal] = useState(false);
  const [showMonthlyModal, setShowMonthlyModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const downloadDailyReport = async () => {
    try {
      const response = await api.get(`/reports/daily/${date}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rapport-journalier-${date}.pdf`);
      document.body.appendChild(link);
      link.click();
      setShowDailyModal(false);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const downloadMonthlyReport = async () => {
    try {
      const response = await api.get(`/reports/monthly/${year}/${month}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rapport-mensuel-${year}-${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      setShowMonthlyModal(false);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const downloadCustomReport = async () => {
    try {
      const response = await api.get(`/reports/custom?startDate=${startDate}&endDate=${endDate}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rapport-personnalise-${startDate}-${endDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      setShowCustomModal(false);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <FaFilePdf className="me-2" />
          Rapports de Ventes
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4} className="mb-3">
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={() => setShowDailyModal(true)}
            >
              <FaCalendarDay className="me-2" />
              Journalier
            </Button>
          </Col>
          <Col md={4} className="mb-3">
            <Button 
              variant="outline-success" 
              className="w-100"
              onClick={() => setShowMonthlyModal(true)}
            >
              <FaCalendarAlt className="me-2" />
              Mensuel
            </Button>
          </Col>
          <Col md={4} className="mb-3">
            <Button 
              variant="outline-info" 
              className="w-100"
              onClick={() => setShowCustomModal(true)}
            >
              <FaFilter className="me-2" />
              Personnalisé
            </Button>
          </Col>
        </Row>
      </Card.Body>

      {/* Modal Rapport Journalier */}
      <Modal show={showDailyModal} onHide={() => setShowDailyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rapport Journalier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Date du rapport</Form.Label>
            <Form.Control 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDailyModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={downloadDailyReport} disabled={!date}>
            <FaFilePdf className="me-2" />
            Générer PDF
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Rapport Mensuel */}
      <Modal show={showMonthlyModal} onHide={() => setShowMonthlyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rapport Mensuel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mois</Form.Label>
                <Form.Control
                  as="select"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Sélectionner</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Année</Form.Label>
                <Form.Control
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="2020"
                  max={new Date().getFullYear()}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMonthlyModal(false)}>
            Annuler
          </Button>
          <Button 
            variant="success" 
            onClick={downloadMonthlyReport} 
            disabled={!month || !year}
          >
            <FaFilePdf className="me-2" />
            Générer PDF
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Rapport Personnalisé */}
      <Modal show={showCustomModal} onHide={() => setShowCustomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rapport Personnalisé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Date de début</Form.Label>
            <Form.Control 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date de fin</Form.Label>
            <Form.Control 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomModal(false)}>
            Annuler
          </Button>
          <Button 
            variant="info" 
            onClick={downloadCustomReport} 
            disabled={!startDate || !endDate}
          >
            <FaFilePdf className="me-2" />
            Générer PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ReportPanel;