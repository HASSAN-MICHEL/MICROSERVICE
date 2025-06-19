// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import pool from '../config/db.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export const generateDailyReportPDF = async (date) => {
//   try {
//     // 1. Récupérer les données du rapport
//     const reportData = await getDailyReportData(date);
    
//     // 2. Créer le document PDF
//     const doc = new PDFDocument({ margin: 50 });
//     const reportName = `rapport-journalier-${date.replace(/-/g, '')}.pdf`;
//     const reportPath = path.join(__dirname, '../../public/reports', reportName);
    
//     // Créer le dossier des rapports si inexistant
//     if (!fs.existsSync(path.dirname(reportPath))) {
//       fs.mkdirSync(path.dirname(reportPath), { recursive: true });
//     }
    
//     const writeStream = fs.createWriteStream(reportPath);
//     doc.pipe(writeStream);
    
//     // 3. En-tête du rapport
//     doc.fontSize(18).text('Rapport Journalier', { align: 'center' });
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(`Date: ${date}`, { align: 'center' });
//     doc.moveDown(2);
    
//     // 4. Tableau des mouvements de stock
//     doc.fontSize(14).text('Mouvements de Stock', { underline: true });
//     doc.moveDown(1);
    
//     // En-tête du tableau
//     const tableTop = doc.y;
//     const col1 = 50; // Produit
//     const col2 = 200; // Prix Unitaire
//     const col3 = 280; // Stock Initial
//     const col4 = 360; // Entrées
//     const col5 = 440; // Sorties
//     const col6 = 520; // Stock Final
    
//     doc.font('Helvetica-Bold')
//       .text('Produit', col1, tableTop)
//       .text('P.U', col2, tableTop)
//       .text('Stock Initial', col3, tableTop)
//       .text('Entrées', col4, tableTop)
//       .text('Sorties', col5, tableTop)
//       .text('Stock Final', col6, tableTop);
    
//     doc.font('Helvetica');
    
//     // Lignes des produits
//     let y = tableTop + 25;
//     reportData.stockMovements.forEach(item => {
//       const finalStock = item.initial_stock + item.entries - item.exits;
      
//       doc.text(item.product_name, col1, y)
//         .text(`${item.unit_price.toFixed(2)} FCFA`, col2, y)
//         .text(item.initial_stock.toString(), col3, y, { align: 'right' })
//         .text(item.entries.toString(), col4, y, { align: 'right' })
//         .text(item.exits.toString(), col5, y, { align: 'right' })
//         .text(finalStock.toString(), col6, y, { align: 'right' });
      
//       y += 20;
//     });
    
//     // 5. Résumé des ventes
//     doc.moveDown(2);
//     doc.fontSize(14).text('Résumé des Ventes', { underline: true });
//     doc.moveDown(1);
    
//     doc.text(`Nombre de ventes: ${reportData.sales.length}`);
//     doc.text(`Montant total des ventes: ${reportData.totalSales.toFixed(2)} FCFA`);
    
//     // 6. Pied de page
//     doc.moveDown(3);
//     doc.fontSize(10)
//       .text(`Généré le: ${new Date().toLocaleString()}`, { align: 'right' });
    
//     doc.end();
    
//     return {
//       path: `/reports/${reportName}`,
//       name: reportName
//     };
    
//   } catch (error) {
//     throw error;
//   }
// };

// export const generateMonthlyReportPDF = async (year, month) => {
//   try {
//     // 1. Récupérer les données du rapport
//     const reportData = await getMonthlyReportData(year, month);
    
//     // 2. Créer le document PDF
//     const doc = new PDFDocument({ margin: 50 });
//     const reportName = `rapport-mensuel-${year}${month.toString().padStart(2, '0')}.pdf`;
//     const reportPath = path.join(__dirname, '../../public/reports', reportName);
    
//     // Créer le dossier des rapports si inexistant
//     if (!fs.existsSync(path.dirname(reportPath))) {
//       fs.mkdirSync(path.dirname(reportPath), { recursive: true });
//     }
    
//     const writeStream = fs.createWriteStream(reportPath);
//     doc.pipe(writeStream);
    
//     // 3. En-tête du rapport
//     doc.fontSize(18).text('Rapport Mensuel', { align: 'center' });
//     doc.moveDown(0.5);
//     doc.fontSize(12).text(`Période: ${month}/${year}`, { align: 'center' });
//     doc.moveDown(2);
    
//     // 4. Tableau des mouvements de stock
//     doc.fontSize(14).text('Mouvements de Stock', { underline: true });
//     doc.moveDown(1);
    
//     // En-tête du tableau
//     const tableTop = doc.y;
//     const col1 = 50; // Produit
//     const col2 = 200; // Prix Unitaire
//     const col3 = 280; // Stock Initial
//     const col4 = 360; // Entrées
//     const col5 = 440; // Sorties
//     const col6 = 520; // Stock Final
    
//     doc.font('Helvetica-Bold')
//       .text('Produit', col1, tableTop)
//       .text('P.U', col2, tableTop)
//       .text('Stock Initial', col3, tableTop)
//       .text('Entrées', col4, tableTop)
//       .text('Sorties', col5, tableTop)
//       .text('Stock Final', col6, tableTop);
    
//     doc.font('Helvetica');
    
//     // Lignes des produits
//     let y = tableTop + 25;
//     reportData.stockMovements.forEach(item => {
//       const finalStock = item.initial_stock + item.entries - item.exits;
      
//       doc.text(item.product_name, col1, y)
//         .text(`${item.unit_price.toFixed(2)} FCFA`, col2, y)
//         .text(item.initial_stock.toString(), col3, y, { align: 'right' })
//         .text(item.entries.toString(), col4, y, { align: 'right' })
//         .text(item.exits.toString(), col5, y, { align: 'right' })
//         .text(finalStock.toString(), col6, y, { align: 'right' });
      
//       y += 20;
//     });
    
//     // 5. Résumé des ventes
//     doc.moveDown(2);
//     doc.fontSize(14).text('Résumé des Ventes', { underline: true });
//     doc.moveDown(1);
    
//     doc.text(`Nombre total de ventes: ${reportData.totalSalesCount}`);
//     doc.text(`Montant total des ventes: ${reportData.totalSalesAmount.toFixed(2)} FCFA`);
//     doc.text(`Moyenne quotidienne: ${(reportData.totalSalesAmount / reportData.daysInMonth).toFixed(2)} FCFA`);
    
//     // 6. Graphique des ventes par jour (optionnel)
//     // ...
    
//     // 7. Pied de page
//     doc.moveDown(3);
//     doc.fontSize(10)
//       .text(`Généré le: ${new Date().toLocaleString()}`, { align: 'right' });
    
//     doc.end();
    
//     return {
//       path: `/reports/${reportName}`,
//       name: reportName
//     };
    
//   } catch (error) {
//     throw error;
//   }
// };

// // Fonction pour récupérer les données du rapport journalier
// async function getDailyReportData(date) {
//   // 1. Récupérer les ventes du jour
//   const salesQuery = `
//     SELECT id, customer_name, grand_total, created_at 
//     FROM sales 
//     WHERE DATE(created_at) = $1
//     ORDER BY created_at
//   `;
//   const { rows: sales } = await pool.query(salesQuery, [date]);
  
//   // 2. Calculer le total des ventes
//   const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.grand_total), 0);
  
//   // 3. Récupérer les mouvements de stock
//   const stockQuery = `
//     WITH initial_stocks AS (
//       SELECT 
//         p.id as product_id,
//         p.name as product_name,
//         p.price as unit_price,
//         COALESCE((
//           SELECT stock 
//           FROM product_stock_history psh
//           WHERE psh.product_id = p.id
//           AND DATE(psh.date) < $1
//           ORDER BY psh.date DESC
//           LIMIT 1
//         ), p.stock) as initial_stock
//       FROM products p
//     ),
//     daily_entries AS (
//       SELECT 
//         product_id,
//         SUM(CASE WHEN movement_type = 'entry' THEN quantity ELSE 0 END) as entries,
//         SUM(CASE WHEN movement_type = 'exit' THEN quantity ELSE 0 END) as exits
//       FROM stock_movements
//       WHERE DATE(date) = $1
//       GROUP BY product_id
//     )
//     SELECT 
//       is.product_id,
//       is.product_name,
//       is.unit_price,
//       is.initial_stock,
//       COALESCE(de.entries, 0) as entries,
//       COALESCE(de.exits, 0) as exits
//     FROM initial_stocks is
//     LEFT JOIN daily_entries de ON is.product_id = de.product_id
//     ORDER BY is.product_name
//   `;
  
//   const { rows: stockMovements } = await pool.query(stockQuery, [date]);
  
//   return {
//     date,
//     sales,
//     totalSales,
//     stockMovements
//   };
// }

// // Fonction pour récupérer les données du rapport mensuel
// async function getMonthlyReportData(year, month) {
//   const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
//   const endDate = `${year}-${month.toString().padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;
  
//   // 1. Récupérer les statistiques des ventes
//   const salesQuery = `
//     SELECT 
//       COUNT(*) as total_sales,
//       SUM(grand_total) as total_amount
//     FROM sales
//     WHERE DATE(created_at) BETWEEN $1 AND $2
//   `;
//   const { rows: [{ total_sales, total_amount }] } = await pool.query(salesQuery, [startDate, endDate]);
  
//   // 2. Récupérer les mouvements de stock
//   const stockQuery = `
//     WITH initial_stocks AS (
//       SELECT 
//         p.id as product_id,
//         p.name as product_name,
//         p.price as unit_price,
//         COALESCE((
//           SELECT stock 
//           FROM product_stock_history psh
//           WHERE psh.product_id = p.id
//           AND DATE(psh.date) < $1
//           ORDER BY psh.date DESC
//           LIMIT 1
//         ), p.stock) as initial_stock
//       FROM products p
//     ),
//     monthly_movements AS (
//       SELECT 
//         product_id,
//         SUM(CASE WHEN movement_type = 'entry' THEN quantity ELSE 0 END) as entries,
//         SUM(CASE WHEN movement_type = 'exit' THEN quantity ELSE 0 END) as exits
//       FROM stock_movements
//       WHERE DATE(date) BETWEEN $1 AND $2
//       GROUP BY product_id
//     )
//     SELECT 
//       is.product_id,
//       is.product_name,
//       is.unit_price,
//       is.initial_stock,
//       COALESCE(mm.entries, 0) as entries,
//       COALESCE(mm.exits, 0) as exits
//     FROM initial_stocks is
//     LEFT JOIN monthly_movements mm ON is.product_id = mm.product_id
//     ORDER BY is.product_name
//   `;
  
//   const { rows: stockMovements } = await pool.query(stockQuery, [startDate, endDate]);
  
//   return {
//     year,
//     month,
//     totalSalesCount: parseInt(total_sales) || 0,
//     totalSalesAmount: parseFloat(total_amount) || 0,
//     stockMovements,
//     daysInMonth: new Date(year, month, 0).getDate()
//   };
// }


import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { body ,  query , validationResult } from 'express-validator';

export const generateDailyReport = async (date, salesData, dailyTotal) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const reportPath = path.join(process.cwd(), 'reports', `daily_${date}.pdf`);
  
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  doc.pipe(fs.createWriteStream(reportPath));

  // En-tête
  doc.fontSize(20).text('Rapport Journalier des Ventes', { align: 'center' });
  doc.fontSize(12).text(`Date: ${date}`, { align: 'center' });
  doc.moveDown(2);

  // Tableau des produits
  const tableTop = 150;
  const headers = ['Produit', 'Quantité', 'Prix Unitaire', 'Montant'];
  const colWidths = [250, 100, 100, 100];
  const tableX = 50;

  // En-tête du tableau
  doc.font('Helvetica-Bold');
  headers.forEach((header, i) => {
    doc.text(
      header,
      tableX + (i > 0 ? colWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0),
      tableTop,
      { width: colWidths[i], align: 'left' }
    );
  });

  // Lignes du tableau
  doc.font('Helvetica');
  let y = tableTop + 25;
  
  salesData.forEach(item => {
    doc.text(item.product_name, tableX, y, { width: colWidths[0] });
    doc.text(item.total_quantity.toString(), tableX + colWidths[0], y, { width: colWidths[1] });
    doc.text(item.unit_price.toLocaleString(), tableX + colWidths[0] + colWidths[1], y, { width: colWidths[2] });
    doc.text(item.total_amount.toLocaleString(), tableX + colWidths[0] + colWidths[1] + colWidths[2], y, { width: colWidths[3] });
    y += 20;
  });

  // Total
  doc.moveTo(tableX, y + 10).lineTo(tableX + colWidths.reduce((a, b) => a + b, 0), y + 10).stroke();
  
  doc.font('Helvetica-Bold')
     .text('Total:', tableX + colWidths[0] + colWidths[1], y + 20, { width: colWidths[2] })
     .text(dailyTotal.toLocaleString(), tableX + colWidths[0] + colWidths[1] + colWidths[2], y + 20, { width: colWidths[3] });

  doc.end();
  return reportPath;
};

export const generateMonthlyReport = async (year, month, salesData, monthlyTotal) => {
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const reportPath = path.join(process.cwd(), 'reports', `monthly_${year}_${month}.pdf`);
  
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  doc.pipe(fs.createWriteStream(reportPath));

  // En-tête
  doc.fontSize(20).text('Rapport Mensuel des Ventes', { align: 'center' });
  doc.fontSize(12).text(`${monthNames[month - 1]} ${year}`, { align: 'center' });
  doc.moveDown(2);

  // Tableau des produits
  const tableTop = 150;
  const headers = ['Produit', 'Quantité', 'Prix Unitaire', 'Montant'];
  const colWidths = [250, 100, 100, 100];
  const tableX = 50;

  // En-tête du tableau
  doc.font('Helvetica-Bold');
  headers.forEach((header, i) => {
    doc.text(
      header,
      tableX + (i > 0 ? colWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0),
      tableTop,
      { width: colWidths[i], align: 'left' }
    );
  });

  // Lignes du tableau
  doc.font('Helvetica');
  let y = tableTop + 25;
  
  salesData.forEach(item => {
    doc.text(item.product_name, tableX, y, { width: colWidths[0] });
    doc.text(item.total_quantity.toString(), tableX + colWidths[0], y, { width: colWidths[1] });
    doc.text(item.unit_price.toLocaleString(), tableX + colWidths[0] + colWidths[1], y, { width: colWidths[2] });
    doc.text(item.total_amount.toLocaleString(), tableX + colWidths[0] + colWidths[1] + colWidths[2], y, { width: colWidths[3] });
    y += 20;
  });

  // Total
  doc.moveTo(tableX, y + 10).lineTo(tableX + colWidths.reduce((a, b) => a + b, 0), y + 10).stroke();
  
  doc.font('Helvetica-Bold')
     .text('Total:', tableX + colWidths[0] + colWidths[1], y + 20, { width: colWidths[2] })
     .text(monthlyTotal.toLocaleString(), tableX + colWidths[0] + colWidths[1] + colWidths[2], y + 20, { width: colWidths[3] });

  doc.end();
  return reportPath;
};
export const validateDailyReport = [
  query('date').isISO8601().withMessage('La date doit être au format YYYY-MM-DD')
];

// Validation middleware pour les rapports mensuels
export const validateMonthlyReport = [
  query('year').isInt({ min: 2000, max: 2100 }).withMessage('L\'année doit être entre 2000 et 2100'),
  query('month').isInt({ min: 1, max: 12 }).withMessage('Le mois doit être entre 1 et 12')
];