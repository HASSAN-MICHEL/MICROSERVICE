import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateInvoice = async (sale) => {
  // Récupérer les détails complets de la vente
  const saleDetails = await Sale.findById(sale.id);
  
  // Créer le document PDF
  const doc = new PDFDocument({ margin: 50 });
  const invoiceNumber = `FCT-${sale.id}-${Date.now()}`;
  const invoiceDate = new Date();
  
  // Créer le dossier des factures si inexistant
  const invoicesDir = path.join(__dirname, '../../public/invoices');
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }
  
  const filePath = path.join(invoicesDir, `${invoiceNumber}.pdf`);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  
  // En-tête de la facture
  doc.fontSize(20).text('FACTURE', { align: 'center' });
  doc.moveDown(0.5);
  
  // Informations de l'entreprise
  doc.fontSize(10)
    .text('NOM DE VOTRE BOUTIQUE', { align: 'center' })
    .text('Adresse: Rue, Ville', { align: 'center' })
    .text('Tél: +225 XX XX XX XX', { align: 'center' });
  
  doc.moveDown(2);
  
  // Informations client et facture
  doc.fontSize(10)
    .text(`Client: ${sale.customer_name || 'Non spécifié'}`, { continued: true })
    .text(`Facture N°: ${invoiceNumber}`, { align: 'right' })
    .text(`Date: ${invoiceDate.toLocaleDateString()}`, { align: 'right' })
    .text(`Heure: ${invoiceDate.toLocaleTimeString()}`, { align: 'right' });
  
  doc.moveDown(2);
  
  // Tableau des produits
  const productsTableTop = doc.y;
  
  // En-tête du tableau
  doc.font('Helvetica-Bold')
    .text('Produit', 50, productsTableTop)
    .text('Qté', 250, productsTableTop, { width: 50, align: 'right' })
    .text('P.U', 300, productsTableTop, { width: 80, align: 'right' })
    .text('Montant', 380, productsTableTop, { width: 100, align: 'right' });
  
  doc.font('Helvetica');
  
  // Lignes des produits
  let y = productsTableTop + 20;
  saleDetails.items.forEach(item => {
    doc.text(item.product_name, 50, y)
      .text(item.quantity.toString(), 250, y, { width: 50, align: 'right' })
      .text(`${item.unit_price.toFixed(2)} FCFA`, 300, y, { width: 80, align: 'right' })
      .text(`${item.total_price.toFixed(2)} FCFA`, 380, y, { width: 100, align: 'right' });
    y += 20;
  });
  
  // Tableau des emballages
  if (sale.with_packaging) {
    const packaging = calculatePackaging(saleDetails.items);
    
    doc.moveDown();
    const packagingTableTop = doc.y;
    
    doc.font('Helvetica-Bold')
      .text('Emballages', 50, packagingTableTop);
    
    doc.font('Helvetica')
      .text(`Casiers: ${packaging.casiers}`, 50, packagingTableTop + 20)
      .text(`Palettes: ${packaging.palettes}`, 50, packagingTableTop + 40)
      .text(`Boîtes: ${packaging.boites}`, 50, packagingTableTop + 60)
      .text(`Total Emballage: ${sale.total_packaging.toFixed(2)} FCFA`, 300, packagingTableTop + 60, { align: 'right' });
  }
  
  // Frais d'enlèvement
  doc.moveDown();
  doc.font('Helvetica-Bold')
    .text('Frais d\'enlèvement', 50, doc.y)
    .text(`${sale.total_removal_fees.toFixed(2)} FCFA`, 380, doc.y, { align: 'right' });
  
  // Total général
  doc.moveDown();
  doc.font('Helvetica-Bold')
    .text('TOTAL GENERAL:', 250, doc.y, { align: 'right' })
    .text(`${sale.grand_total.toFixed(2)} FCFA`, 380, doc.y, { align: 'right' });
  
  // Pied de page
  doc.moveDown(3);
  doc.fontSize(8)
    .text('Merci pour votre confiance!', { align: 'center' });
  
  doc.end();
  
  // Enregistrer le chemin de la facture en base
  await pool.query(
    'UPDATE sales SET invoice_path = $1 WHERE id = $2',
    [`/invoices/${invoiceNumber}.pdf`, sale.id]
  );
  
  return invoiceNumber;
};




//pdfService : 

// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import Sale from '../models/Sale.js';
// import SaleItem from '../models/SaleItem.js';

// // Couleurs personnalisées
// const colors = {
//   primary: '#1E88E5',
//   primaryLight: '#64B5F6',
//   primaryLighter: '#E3F2FD',
//   white: '#FFFFFF',
//   black: '#000000',
//   border: '#1E88E5'
// };

// export const generateInvoice = async (saleId) => {
//   const sale = await Sale.findById(saleId);
//   const items = await SaleItem.findBySaleId(saleId);
  
//   // Configuration de base
//   const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
//   const date = new Date(sale.confirmed_at).toLocaleDateString('fr-FR');
//   const time = new Date(sale.confirmed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
//   // Calcul des éléments
//   let packagingCost = 0;
//   let removalCost = 0;
//   let beerCases12 = 0;
//   let beerCases24 = 0;
//   let totalProducts = 0;

//   // 1. TABLEAU PRINCIPAL DES PRODUITS
//   const productsTable = {
//     title: "DÉTAIL DES PRODUITS",
//     headers: ['Produit', 'Qté', 'P.U', 'Montant'],
//     widths: [200, 80, 80, 140],
//     rows: items.map(item => {
//       const amount = item.quantity * item.unit_price;
//       totalProducts += amount;
      
//       if (item.product_category === 'bière') {
//         if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
//         if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
//       }
      
//       return [
//         item.product_name,
//         item.quantity.toString(),
//         formatNumber(item.unit_price) + ' FCFA',
//         formatNumber(amount) + ' FCFA'
//       ];
//     })
//   };

//   const totalCases = beerCases12 + beerCases24;
  
//   // 2. TABLEAU DES EMBALLAGES
//   if (sale.packaging_included) {
//     packagingCost = totalCases * 3500;
//   }
//   const packagingTable = sale.packaging_included ? {
//     title: "FRAIS D'EMBALLAGE",
//     headers: ['Description', 'Quantité', 'Prix Unitaire', 'Montant'],
//     widths: [200, 80, 80, 140],
//     rows: [
//       ['Casiers standards', totalCases, '3 500 FCFA', formatNumber(packagingCost) + ' FCFA'],
//       ['', '', 'TOTAL:', formatNumber(packagingCost) + ' FCFA']
//     ]
//   } : null;

//   // 3. TABLEAU DES FRAIS D'ENLÈVEMENT
//   removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
//   const removalTable = removalCost > 0 ? {
//     title: "FRAIS D'ENLÈVEMENT",
//     headers: ['Type de Colis', 'Quantité', 'Prix Unitaire', 'Montant'],
//     widths: [200, 80, 80, 140],
//     rows: [
//       ...(beerCases12 > 0 ? [['Casiers 12 bouteilles', beerCases12, '600 FCFA', formatNumber(beerCases12 * 600) + ' FCFA']] : []),
//       ...(beerCases24 > 0 ? [['Casiers 24 bouteilles', beerCases24, '1 200 FCFA', formatNumber(beerCases24 * 1200) + ' FCFA']] : []),
//       ['', '', 'TOTAL:', formatNumber(removalCost) + ' FCFA']
//     ]
//   } : null;

//   // 4. TABLEAU FINAL DU TOTAL GÉNÉRAL
//   const grandTotal = totalProducts + packagingCost + removalCost;
//   const totalTable = {
//     title: "TOTAL GÉNÉRAL",
//     headers: ['Libellé', 'Montant'],
//     widths: [340, 160],
//     rows: [
//       ['Total produits', formatNumber(totalProducts) + ' FCFA'],
//       ...(sale.packaging_included ? [['Frais emballage', formatNumber(packagingCost) + ' FCFA']] : []),
//       ...(removalCost > 0 ? [['Frais enlèvement', formatNumber(removalCost) + ' FCFA']] : []),
//       ['MONTANT TOTAL', formatNumber(grandTotal) + ' FCFA']
//     ]
//   };

//   // CRÉATION DU PDF
//   const doc = new PDFDocument({ 
//     margin: 30,
//     size: 'A4',
//     font: 'Helvetica'
//   });
  
//   const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
//   if (!fs.existsSync(path.dirname(invoicePath))) {
//     fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
//   }
  
//   doc.pipe(fs.createWriteStream(invoicePath));

//   // En-tête
//   generateHeader(doc, invoiceNumber, date, time, sale.client_name);

//   // Contenu principal
//   let yPosition = 150;

//   // 1. Produits
//   yPosition = generateTable(doc, productsTable, yPosition);

//   // 2. Emballages (si applicable)
//   if (packagingTable) {
//     yPosition = generateTable(doc, packagingTable, yPosition + 20);
//   }

//   // 3. Frais d'enlèvement (si applicable)
//   if (removalTable) {
//     yPosition = generateTable(doc, removalTable, yPosition + 20);
//   }

//   // 4. Total général
//   const remainingSpace = 750 - yPosition;
//   if (remainingSpace < 100) {
//     doc.addPage();
//     yPosition = 50;
//   }
//   generateTable(doc, totalTable, yPosition + 20);

//   // Pied de page
//   doc.fontSize(9).fillColor(colors.primary)
//      .text('Merci pour votre confiance!', { align: 'center' })
//      .text('Conditions de paiement: 30 jours nets', { align: 'center' })
//      .text('TVA non applicable, article 293 B du CGI', { align: 'center' });
  
//   doc.end();
  
//   return invoicePath;
// };

// // ===== FONCTIONS UTILITAIRES =====

// function generateHeader(doc, invoiceNumber, date, time, clientName) {
//   // Bandeau bleu en haut
//   doc.rect(0, 0, 612, 80).fill(colors.primary);
  
//   // Logo et informations
//   doc.image(path.join(process.cwd(), 'public', 'logo.png'), 40, 20, { width: 60 })
//      .fontSize(16).font('Helvetica-Bold').fillColor(colors.white)
//      .text('BOUTIQUE DE BOISSONS', 120, 30)
//      .fontSize(10)
//      .text('Bonaberie : Bessecke', 120, 50)
//      .text('Douala, Cameroun | Tél: +237 688990022', 120, 65);
  
//   // Informations de facturation
//   doc.rect(30, 90, 550, 40).fill(colors.primaryLighter).stroke(colors.border)
//      .fontSize(10).font('Helvetica-Bold').fillColor(colors.black)
//      .text(`Facture N°: ${invoiceNumber}`, 35, 100)
//      .text(`Date: ${date} à ${time}`, 35, 120)
//      .text(`Client: ${clientName}`, 300, 100)
//      .moveDown(1);
// }

// function generateTable(doc, table, yPosition) {
//   const tableWidth = 500;
//   const rowHeight = 22;
//   const columnCount = table.headers.length;
  
//   // Titre de la section
//   doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.primary)
//      .text(table.title, 35, yPosition);
//   yPosition += 15;

//   // En-têtes du tableau
//   doc.rect(30, yPosition, tableWidth, rowHeight).fill(colors.primary).stroke(colors.border);
//   let xPosition = 30;
  
//   table.headers.forEach((header, i) => {
//     doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.white)
//        .text(header, xPosition + 10, yPosition + 6, {
//          width: table.widths[i],
//          align: i === columnCount - 1 ? 'right' : 'left'
//        });
    
//     if (i < columnCount - 1) {
//       doc.moveTo(xPosition + table.widths[i], yPosition)
//          .lineTo(xPosition + table.widths[i], yPosition + rowHeight)
//          .stroke(colors.white, 0.5);
//     }
    
//     xPosition += table.widths[i];
//   });
  
//   yPosition += rowHeight;

//   // Lignes du tableau
//   doc.font('Helvetica').fontSize(9).fillColor(colors.black);
  
//   table.rows.forEach((row, rowIndex) => {
//     const fillColor = rowIndex % 2 === 0 ? colors.white : colors.primaryLighter;
//     doc.rect(30, yPosition, tableWidth, rowHeight).fill(fillColor).stroke(colors.border, 0.5);
    
//     xPosition = 30;
//     const isTotalRow = row[0].includes('TOTAL') || row[0].includes('MONTANT');
    
//     if (isTotalRow) {
//       doc.font('Helvetica-Bold')
//          .rect(30, yPosition, tableWidth, rowHeight).fill(colors.primaryLight).stroke(colors.border);
//     }
    
//     row.forEach((cell, cellIndex) => {
//       const isLastCell = cellIndex === columnCount - 1;
//       doc.fillColor(isTotalRow ? colors.white : colors.black)
//          .text(cell.toString(), xPosition + 10, yPosition + 6, {
//            width: table.widths[cellIndex] - 15,
//            align: isLastCell ? 'right' : 'left'
//          });
      
//       if (cellIndex < columnCount - 1) {
//         doc.moveTo(xPosition + table.widths[cellIndex], yPosition)
//            .lineTo(xPosition + table.widths[cellIndex], yPosition + rowHeight)
//            .stroke(colors.border, 0.5);
//       }
      
//       xPosition += table.widths[cellIndex];
//     });
    
//     yPosition += rowHeight;
//   });

//   // Bordure finale
//   doc.rect(30, yPosition - (rowHeight * table.rows.length), tableWidth, rowHeight * table.rows.length)
//      .stroke(colors.border);
  
//   return yPosition + 10;
// }

// function formatNumber(number) {
//   return new Intl.NumberFormat('fr-FR').format(number);
// }
