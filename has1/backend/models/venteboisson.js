// ;




// import pool from "../config/db.js";

// const VenteBoisson = {
//   async getAll() {
//     const result = await pool.query("SELECT * FROM ventes_boissons");
//     return result.rows;
//   },

//   async getById(id) {
//     const result = await pool.query("SELECT * FROM ventes_boissons WHERE id = $1", [id]);
//     return result.rows[0];
//   },

//   async getSalesStats(period = 'day') {
//     let query;
//     if (period === 'day') {
//       query = `
//         SELECT 
//           DATE(date_vente) as date,
//           SUM(montant_total) as total
//         FROM ventes_boissons
//         GROUP BY DATE(date_vente)
//         ORDER BY DATE(date_vente)
//       `;
//     } else {
//       query = `
//         SELECT 
//           DATE_TRUNC('month', date_vente) as month,
//           SUM(montant_total) as total
//         FROM ventes_boissons
//         GROUP BY DATE_TRUNC('month', date_vente)
//         ORDER BY DATE_TRUNC('month', date_vente)
//       `;
//     }
//     const result = await pool.query(query);
//     return result.rows;
//   },

//   async create({ client_id, boisson_id, quantite }) {
//     const boissonResult = await pool.query("SELECT prix, stock FROM boissons WHERE id = $1", [boisson_id]);
//     const boisson = boissonResult.rows[0];

//     if (!boisson || boisson.stock < quantite) {
//       throw new Error("Boisson non disponible ou stock insuffisant.");
//     }

//     const montant_total =  (boisson.prix / boisson.stock ) * quantite;

//     const venteResult = await pool.query(
//       "INSERT INTO ventes_boissons (client_id, boisson_id, quantite, montant_total) VALUES ($1, $2, $3, $4) RETURNING *",
//       [client_id, boisson_id, quantite, montant_total]
//     );

//     await pool.query(
//       "UPDATE boissons SET stock = stock - $1 WHERE id = $2",
//       [quantite, boisson_id]
//     );
//     const nouveauStock = boisson.stock - quantite;
//     const nouveauPrixUnitaire = (boisson.prix / boisson.stock) * nouveauStock;

//     await pool.query(
//       "UPDATE boissons SET prix = $1 WHERE id = $2",
//       [nouveauPrixUnitaire, boisson_id]
//     );

//     const vente = venteResult.rows[0];
//     const factureResult = await pool.query(
//       "INSERT INTO factures (client_id, vente_boisson_id, montant_total) VALUES ($1, $2, $3) RETURNING *",
//       [client_id, vente.id, montant_total]
//     );

//     return { vente, facture: factureResult.rows[0] };
//   },

//   async delete(id) {
//     const vente = await pool.query("DELETE FROM ventes_boissons WHERE id = $1 RETURNING *", [id]);
//     await pool.query("DELETE FROM factures WHERE vente_boisson_id = $1", [id]);
//     return vente.rows[0];
//   },

//   async getDailyReport(date) {
//     const result = await pool.query(
//       `SELECT DATE(date_vente) AS jour, SUM(montant_total) AS total_ventes
//        FROM ventes_boissons
//        WHERE DATE(date_vente) = $1
//        GROUP BY DATE(date_vente)`,
//       [date]
//     );
//     return result.rows[0];
//   },
//   async getMostSoldByMonth(month, year) {
//     const result = await pool.query(
//       `SELECT b.nom, b.prix, SUM(vb.quantite) AS total_ventes
//        FROM ventes_boissons vb
//        JOIN boissons b ON vb.boisson_id = b.id
//        WHERE EXTRACT(MONTH FROM vb.date_vente) = $1 AND EXTRACT(YEAR FROM vb.date_vente) = $2
//        GROUP BY b.nom, b.prix
//        ORDER BY total_ventes DESC
//        LIMIT 5`,
//       [month, year]
//     );
//     return result.rows;
//   },

//    async getSalesByProduct(month, year) {
//      const result = await pool.query(
//        `SELECT b.nom, SUM(vb.quantite) AS total_ventes, SUM(vb.quantite * b.prix) AS prix_total
//         FROM ventes_boissons vb
//        JOIN boissons b ON vb.boisson_id = b.id
//        WHERE EXTRACT(MONTH FROM vb.date_vente) = $1 AND EXTRACT(YEAR FROM vb.date_vente) = $2
//         GROUP BY b.nom
//         ORDER BY total_ventes DESC`,
//        [month, year]
//      );
//      return result.rows;
//    },
//    async getMonthlySalesEvolution(year) {
//      const result = await pool.query(
//        `SELECT EXTRACT(MONTH FROM date_vente) AS month, SUM(montant_total) AS total
//         FROM ventes_boissons
//         WHERE EXTRACT(YEAR FROM date_vente) = $1
//         GROUP BY month
//         ORDER BY month`,
//        [year]
//      );
//      return result.rows;
//    },

//    async getMonthlyReport(year, month) {
//      const result = await pool.query(
//        `SELECT DATE_TRUNC('month', date_vente) AS mois, SUM(montant_total) AS total_ventes
//         FROM ventes_boissons
//         WHERE EXTRACT(YEAR FROM date_vente) = $1 AND EXTRACT(MONTH FROM date_vente) = $2
//         GROUP BY DATE_TRUNC('month', date_vente)`,
//        [year, month]
//      );
//      return result.rows[0];
//    },
  
//  async getYearlyReport(year) {
//    const result = await pool.query(
//        `SELECT DATE_TRUNC('year', date_vente) AS annee, 
//                SUM(montant_total) AS total_ventes,
//                COUNT(*) AS nombre_ventes
//         FROM ventes_boissons
//         WHERE EXTRACT(YEAR FROM date_vente) = $1
//         GROUP BY DATE_TRUNC('year', date_vente)`,
//        [year]
//    );
//    return result.rows[0];
//  },

//  async getMostSoldByYear(year) {
//    const result = await pool.query(
//        `SELECT b.nom, b.prix, SUM(vb.quantite) AS total_ventes
//         FROM ventes_boissons vb
//         JOIN boissons b ON vb.boisson_id = b.id
//         WHERE EXTRACT(YEAR FROM vb.date_vente) = $1
//         GROUP BY b.nom, b.prix
//         ORDER BY total_ventes DESC
//         LIMIT 5`,
//        [year]
//    );
//    return result.rows;
//  },

//  async getSalesByProductForYear(year) {
//    const result = await pool.query(
//        `SELECT b.nom, SUM(vb.quantite) AS total_ventes, 
//                SUM(vb.montant_total) AS chiffre_affaires
//         FROM ventes_boissons vb
//        JOIN boissons b ON vb.boisson_id = b.id
//         WHERE EXTRACT(YEAR FROM vb.date_vente) = $1
//        GROUP BY b.nom
//         ORDER BY total_ventes DESC`,
//       [year]
// );
//    return result.rows;
//  }
// };

// export default VenteBoisson;



// models/venteboisson.js
import pool from "../config/db.js";
import { generatePDF } from "../utils/pdfGenerator.js";

const VenteBoisson = {
  async getAll() {
    const result = await pool.query("SELECT * FROM ventes_boissons");
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query("SELECT * FROM ventes_boissons WHERE id = $1", [id]);
    return result.rows[0];
  },

  async getSalesStats(period = 'day') {
    let query;
    if (period === 'day') {
      query = `
        SELECT 
          DATE(date_vente) as date,
          SUM(montant_total) as total
        FROM ventes_boissons
        GROUP BY DATE(date_vente)
        ORDER BY DATE(date_vente)
      `;
    } else if (period === 'month') {
      query = `
        SELECT 
          DATE_TRUNC('month', date_vente) as month,
          SUM(montant_total) as total
        FROM ventes_boissons
        GROUP BY DATE_TRUNC('month', date_vente)
        ORDER BY DATE_TRUNC('month', date_vente)
      `;
    } else {
      query = `
        SELECT 
          DATE_TRUNC('year', date_vente) as year,
          SUM(montant_total) as total
        FROM ventes_boissons
        GROUP BY DATE_TRUNC('year', date_vente)
        ORDER BY DATE_TRUNC('year', date_vente)
      `;
    }
    const result = await pool.query(query);
    return result.rows;
  },

  async create({ client_id, boisson_id, quantite }) {
    const boissonResult = await pool.query("SELECT prix, stock FROM boissons WHERE id = $1", [boisson_id]);
    const boisson = boissonResult.rows[0];

    if (!boisson || boisson.stock < quantite) {
      throw new Error("Boisson non disponible ou stock insuffisant.");
    }

    const montant_total = (boisson.prix * quantite);

    const venteResult = await pool.query(
      "INSERT INTO ventes_boissons (client_id, boisson_id, quantite, montant_total) VALUES ($1, $2, $3, $4) RETURNING *",
      [client_id, boisson_id, quantite, montant_total]
    );

    await pool.query(
      "UPDATE boissons SET stock = stock - $1 WHERE id = $2",
      [quantite, boisson_id]
    );

    const nouveauStock = boisson.stock - quantite;
    // const nouveauPrixUnitaire = (boisson.prix / boisson.stock) * nouveauStock;
    const nouveauPrixUnitaire = boisson.prix ;


    await pool.query(
      "UPDATE boissons SET prix = $1 WHERE id = $2",
      [nouveauPrixUnitaire, boisson_id]
    );

    const vente = venteResult.rows[0];
    const factureResult = await pool.query(
      "INSERT INTO factures (client_id, vente_boisson_id, montant_total) VALUES ($1, $2, $3) RETURNING *",
      [client_id, vente.id, montant_total]
    );

    return { vente, facture: factureResult.rows[0] };
  },

  async delete(id) {
    const vente = await pool.query("DELETE FROM ventes_boissons WHERE id = $1 RETURNING *", [id]);
    await pool.query("DELETE FROM factures WHERE vente_boisson_id = $1", [id]);
    return vente.rows[0];
  },

  async getDetailedDailyReport(date) {
    const result = await pool.query(
      `SELECT 
        vb.id,
        b.nom as boisson_nom,
        b.prix as prix_unitaire,
        vb.quantite,
        vb.montant_total as prix_total,
        vb.date_vente,
        c.nom as client_nom
      FROM ventes_boissons vb
      JOIN boissons b ON vb.boisson_id = b.id
      LEFT JOIN clients c ON vb.client_id = c.id
      WHERE DATE(vb.date_vente) = $1
      ORDER BY vb.date_vente`,
      [date]
    );
    
    const totalResult = await pool.query(
      `SELECT SUM(montant_total) as total_jour
       FROM ventes_boissons
       WHERE DATE(date_vente) = $1`,
      [date]
    );
    
    return {
      details: result.rows,
      total: totalResult.rows[0].total_jour || 0
    };
  },

  async getDetailedMonthlyReport(year, month) {
    const result = await pool.query(
      `SELECT 
        DATE(vb.date_vente) as date,
        b.nom as boisson_nom,
        b.prix as prix_unitaire,
        SUM(vb.quantite) as quantite_totale,
        SUM(vb.montant_total) as prix_total
      FROM ventes_boissons vb
      JOIN boissons b ON vb.boisson_id = b.id
      WHERE EXTRACT(YEAR FROM vb.date_vente) = $1 
      AND EXTRACT(MONTH FROM vb.date_vente) = $2
      GROUP BY DATE(vb.date_vente), b.nom, b.prix
      ORDER BY DATE(vb.date_vente), b.nom`,
      [year, month]
    );
    
    const totalResult = await pool.query(
      `SELECT SUM(montant_total) as total_mois
       FROM ventes_boissons
       WHERE EXTRACT(YEAR FROM date_vente) = $1 
       AND EXTRACT(MONTH FROM date_vente) = $2`,
      [year, month]
    );
    
    return {
      details: result.rows,
      total: totalResult.rows[0].total_mois || 0
    };
  },

  async getDetailedYearlyReport(year) {
    const monthlyTotals = await pool.query(
      `SELECT 
        EXTRACT(MONTH FROM date_vente) as mois,
        SUM(montant_total) as total_mois
      FROM ventes_boissons
      WHERE EXTRACT(YEAR FROM date_vente) = $1
      GROUP BY EXTRACT(MONTH FROM date_vente)
      ORDER BY mois`,
      [year]
    );
    
    const productTotals = await pool.query(
      `SELECT 
        b.nom as boisson_nom,
        SUM(vb.quantite) as quantite_totale,
        SUM(vb.montant_total) as chiffre_affaires
      FROM ventes_boissons vb
      JOIN boissons b ON vb.boisson_id = b.id
      WHERE EXTRACT(YEAR FROM vb.date_vente) = $1
      GROUP BY b.nom
      ORDER BY chiffre_affaires DESC`,
      [year]
    );
    
    const annualTotal = await pool.query(
      `SELECT SUM(montant_total) as total_annee
       FROM ventes_boissons
       WHERE EXTRACT(YEAR FROM date_vente) = $1`,
      [year]
    );
    
    return {
      monthly_totals: monthlyTotals.rows,
      product_totals: productTotals.rows,
      total: annualTotal.rows[0].total_annee || 0
    };
  },

  async getMostSoldByMonth(month, year) {
    const result = await pool.query(
      `SELECT b.nom, b.prix, SUM(vb.quantite) AS total_ventes
       FROM ventes_boissons vb
       JOIN boissons b ON vb.boisson_id = b.id
       WHERE EXTRACT(MONTH FROM vb.date_vente) = $1 AND EXTRACT(YEAR FROM vb.date_vente) = $2
       GROUP BY b.nom, b.prix
       ORDER BY total_ventes DESC
       LIMIT 5`,
      [month, year]
    );
    return result.rows;
  },

  async getSalesByProduct(month, year) {
    const result = await pool.query(
      `SELECT b.nom, SUM(vb.quantite) AS total_ventes, SUM(vb.montant_total) AS prix_total
       FROM ventes_boissons vb
       JOIN boissons b ON vb.boisson_id = b.id
       WHERE EXTRACT(MONTH FROM vb.date_vente) = $1 AND EXTRACT(YEAR FROM vb.date_vente) = $2
       GROUP BY b.nom
       ORDER BY total_ventes DESC`,
      [month, year]
    );
    return result.rows;
  },

  async getMonthlySalesEvolution(year) {
    const result = await pool.query(
      `SELECT EXTRACT(MONTH FROM date_vente) AS month, SUM(montant_total) AS total
       FROM ventes_boissons
       WHERE EXTRACT(YEAR FROM date_vente) = $1
       GROUP BY month
       ORDER BY month`,
      [year]
    );
    return result.rows;
  },

  async getSalesByClient(year) {
    const result = await pool.query(
      `SELECT 
        c.nom as client_nom,
        COUNT(vb.id) as nombre_achats,
        SUM(vb.montant_total) as montant_total
      FROM ventes_boissons vb
      JOIN clients c ON vb.client_id = c.id
      WHERE EXTRACT(YEAR FROM vb.date_vente) = $1
      GROUP BY c.nom
      ORDER BY montant_total DESC`,
      [year]
    );
    return result.rows;
  },

  async getSalesTrends() {
    const dailyTrends = await pool.query(
      `SELECT 
        DATE(date_vente) as date,
        SUM(montant_total) as total
      FROM ventes_boissons
      WHERE date_vente >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(date_vente)
      ORDER BY DATE(date_vente)`
    );
    
    const monthlyTrends = await pool.query(
      `SELECT 
        DATE_TRUNC('month', date_vente) as month,
        SUM(montant_total) as total
      FROM ventes_boissons
      WHERE date_vente >= CURRENT_DATE - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', date_vente)
      ORDER BY DATE_TRUNC('month', date_vente)`
    );
    
    return {
      daily: dailyTrends.rows,
      monthly: monthlyTrends.rows
    };
  },

  async generateReportPDF(type, data, dateParams) {
    let title, filename;
    let content = [];
    
    if (type === 'daily') {
      const { date } = dateParams;
      title = `Rapport Journalier - ${date}`;
      filename = `rapport_journalier_${date}.pdf`;
      
      const reportData = await this.getDetailedDailyReport(date);
      content = [
        { text: 'Détail des ventes', style: 'header' },
        ...reportData.details.map(item => ({
          text: `${item.boisson_nom} - ${item.quantite} x ${item.prix_unitaire} = ${item.prix_total}`,
          margin: [0, 5]
        })),
        { text: `Total: ${reportData.total}`, style: 'total' }
      ];
    } 
    else if (type === 'monthly') {
      const { year, month } = dateParams;
      title = `Rapport Mensuel - ${month}/${year}`;
      filename = `rapport_mensuel_${month}_${year}.pdf`;
      
      const reportData = await this.getDetailedMonthlyReport(year, month);
      content = [
        { text: 'Détail des ventes par jour', style: 'header' },
        ...reportData.details.map(item => ({
          text: `${item.date}: ${item.boisson_nom} - ${item.quantite_totale} x ${item.prix_unitaire} = ${item.prix_total}`,
          margin: [0, 5]
        })),
        { text: `Total: ${reportData.total}`, style: 'total' }
      ];
    } 
    else {
      const { year } = dateParams;
      title = `Rapport Annuel - ${year}`;
      filename = `rapport_annuel_${year}.pdf`;
      
      const reportData = await this.getDetailedYearlyReport(year);
      content = [
        { text: 'Ventes par mois', style: 'header' },
        ...reportData.monthly_totals.map(item => ({
          text: `Mois ${item.mois}: ${item.total_mois}`,
          margin: [0, 5]
        })),
        { text: 'Produits les plus vendus', style: 'header' },
        ...reportData.product_totals.map(item => ({
          text: `${item.boisson_nom}: ${item.quantite_totale} ventes - CA: ${item.chiffre_affaires}`,
          margin: [0, 5]
        })),
        { text: `Total annuel: ${reportData.total}`, style: 'total' }
      ];
    }
    
    return generatePDF(title, content, filename);
  }
};

export default VenteBoisson;