import Chambre from "../models/chambre.js";
import { broadcast } from "../server.js";

const chambreController = {
  async getAll(req, res) {
    try {
      const chambres = await Chambre.getAll();
      res.json(chambres);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const chambre = await Chambre.getById(req.params.id);
      if (!chambre) {
        return res.status(404).json({ message: "Chambre non trouvée" });
      }
      res.json(chambre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { numero, type, prix, statut } = req.body;
      const newChambre = await Chambre.create({ numero, type, prix, statut });
      
      broadcast('chambre', {
        type: 'creation',
        chambre_id: newChambre.id,
        statut: newChambre.statut
      });
      
      res.status(201).json(newChambre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { numero, type, prix, statut } = req.body;
      const updatedChambre = await Chambre.update(req.params.id, { numero, type, prix, statut });
      
      if (!updatedChambre) {
        return res.status(404).json({ message: "Chambre non trouvée" });
      }
      
      broadcastUpdate('chambre', {
        type: 'modification',
        chambre_id: updatedChambre.id,
        statut: updatedChambre.statut
      });
      
      res.json(updatedChambre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Chambre.delete(req.params.id);
      broadcastUpdate('chambre', {
        type: 'suppression',
        chambre_id: req.params.id
      });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getStats(req, res) {
    try {
      const chambres = await Chambre.getAll();
      const stats = {
        disponible: chambres.filter(c => c.statut === 'disponible').length,
        occupee: chambres.filter(c => c.statut === 'occupée').length,
        maintenance: chambres.filter(c => c.statut === 'maintenance').length,
        total: chambres.length
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAvailable(req, res) {
    try {
      const chambres = await Chambre.getAll();
      const available = chambres.filter(c => c.statut === 'disponible');
      res.json(available);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default chambreController;