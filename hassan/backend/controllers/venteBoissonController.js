

// import VenteBoisson from "../models/venteboisson.js";
// import { broadcast } from "../server.js";

// const venteBoissonController = {
//   async getAll(req, res) {
//     try {
//       const ventes = await VenteBoisson.getAll();
//       res.json(ventes);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   async getById(req, res) {
//     try {
//       const vente = await VenteBoisson.getById(req.params.id);
//       if (!vente) {
//         return res.status(404).json({ message: "Vente non trouvée" });
//       }
//       res.json(vente);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   },

//   async create(req, res) {
//     try {
//       const { client_id, boisson_id, quantite } = req.body;
//       const result = await VenteBoisson.create({ client_id, boisson_id, quantite });

//       broadcast('vente', {
//         type: 'boisson',
//         montant_total: result.vente.montant_total,
//         timestamp: Date.now()
//       });

//       res.status(201).json(result);
//     } catch (err) {
//       console.error("Erreur création vente:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async delete(req, res) {
//     try {
//       const deletedVente = await VenteBoisson.delete(req.params.id);
//       if (!deletedVente) {
//         return res.status(404).json({ message: "Vente non trouvée" });
//       }
//       res.status(204).send();
//     } catch (err) {
//       console.error("Erreur suppression vente:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
//   },

//   async getDailyReport(req, res) {
//     try {
//         const { date } = req.params;
//         const report = await VenteBoisson.getDailyReport(date);
//         res.json(report);
//     } catch (err) {
//         console.error("Erreur rapport journalier:", err);
//         res.status(500).json({ message: "Erreur serveur", error: err.message });
//     }
// },

// async getMonthlyReport(req, res) {
//   try {
//       const { year, month } = req.params;
//       const report = await VenteBoisson.getMonthlyReport(year, month);
//       res.json(report);
//   } catch (err) {
//       console.error("Erreur rapport mensuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getYearlyReport(req, res) {
//   try {
//       const { year } = req.params;
//       const report = await VenteBoisson.getYearlyReport(year);
//       res.json(report);
//   } catch (err) {
//       console.error("Erreur rapport annuel:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getMostSold(req, res) {
//   try {
//       const { period, year, month } = req.params;
//       let result;
      
//       if (period === 'month' && month) {
//           result = await VenteBoisson.getMostSoldByMonth(month, year);
//       } else {
//           result = await VenteBoisson.getMostSoldByYear(year);
//       }
      
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur produits plus vendus:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getSalesEvolution(req, res) {
//   try {
//       const { year } = req.params;
//       const result = await VenteBoisson.getMonthlySalesEvolution(year);
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur évolution ventes:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// },

// async getSalesByProduct(req, res) {
//   try {
//       const { period, year, month } = req.params;
//       let result;
      
//       if (period === 'month' && month) {
//           result = await VenteBoisson.getSalesByProduct(month, year);
//       } else {
//           result = await VenteBoisson.getSalesByProductForYear(year);
//       }
      
//       res.json(result);
//   } catch (err) {
//       console.error("Erreur ventes par produit:", err);
//       res.status(500).json({ message: "Erreur serveur", error: err.message });
//   }
// }
// };

// export default venteBoissonController;

// controllers/venteBoissonController.js
import VenteBoisson from "../models/venteboisson.js";
import { broadcast } from "../server.js";

const venteBoissonController = {
  async getAll(req, res) {
    try {
      const ventes = await VenteBoisson.getAll();
      res.json(ventes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const vente = await VenteBoisson.getById(req.params.id);
      if (!vente) {
        return res.status(404).json({ message: "Vente non trouvée" });
      }
      res.json(vente);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const { client_id, boisson_id, quantite } = req.body;
      const result = await VenteBoisson.create({ client_id, boisson_id, quantite });

      broadcast('vente', {
        type: 'boisson',
        montant_total: result.vente.montant_total,
        timestamp: Date.now()
      });

      res.status(201).json(result);
    } catch (err) {
      console.error("Erreur création vente:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedVente = await VenteBoisson.delete(req.params.id);
      if (!deletedVente) {
        return res.status(404).json({ message: "Vente non trouvée" });
      }
      res.status(204).send();
    } catch (err) {
      console.error("Erreur suppression vente:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedDailyReport(req, res) {
    try {
      const { date } = req.params;
      const report = await VenteBoisson.getDetailedDailyReport(date);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport journalier détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedMonthlyReport(req, res) {
    try {
      const { year, month } = req.params;
      const report = await VenteBoisson.getDetailedMonthlyReport(year, month);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport mensuel détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getDetailedYearlyReport(req, res) {
    try {
      const { year } = req.params;
      const report = await VenteBoisson.getDetailedYearlyReport(year);
      res.json(report);
    } catch (err) {
      console.error("Erreur rapport annuel détaillé:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getMostSold(req, res) {
    try {
      const { period, year, month } = req.params;
      let result;
      
      if (period === 'month' && month) {
        result = await VenteBoisson.getMostSoldByMonth(month, year);
      } else {
        result = await VenteBoisson.getMostSoldByYear(year);
      }
      
      res.json(result);
    } catch (err) {
      console.error("Erreur produits plus vendus:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesEvolution(req, res) {
    try {
      const { year } = req.params;
      const result = await VenteBoisson.getMonthlySalesEvolution(year);
      res.json(result);
    } catch (err) {
      console.error("Erreur évolution ventes:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesByProduct(req, res) {
    try {
      const { period, year, month } = req.params;
      let result;
      
      if (period === 'month' && month) {
        result = await VenteBoisson.getSalesByProduct(month, year);
      } else {
        result = await VenteBoisson.getSalesByProductForYear(year);
      }
      
      res.json(result);
    } catch (err) {
      console.error("Erreur ventes par produit:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesByClient(req, res) {
    try {
      const { year } = req.params;
      const result = await VenteBoisson.getSalesByClient(year);
      res.json(result);
    } catch (err) {
      console.error("Erreur ventes par client:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async getSalesTrends(req, res) {
    try {
      const result = await VenteBoisson.getSalesTrends();
      res.json(result);
    } catch (err) {
      console.error("Erreur tendances des ventes:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  async downloadReportPDF(req, res) {
    try {
      const { type } = req.params;
      const dateParams = req.query;
      
      const pdfBuffer = await VenteBoisson.generateReportPDF(type, null, dateParams);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=rapport_${type}.pdf`);
      res.send(pdfBuffer);
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }
};

export default venteBoissonController;