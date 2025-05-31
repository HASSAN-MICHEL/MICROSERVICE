

// // import PDFDocument from 'pdfkit';
// // import fs from 'fs';
// // import path from 'path';
// // import Sale from '../models/Sale.js';
// // import SaleItem from '../models/SaleItem.js';

// // export const generateInvoice = async (saleId) => {
// //   const sale = await Sale.findById(saleId);
// //   const items = await SaleItem.findBySaleId(saleId);
  
// //   // Configuration de base
// //   const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
// //   const date = new Date(sale.confirmed_at).toLocaleDateString('fr-FR');
// //   const time = new Date(sale.confirmed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
// //   // Calcul des éléments
// //   let packagingCost = 0;
// //   let removalCost = 0;
// //   let beerCases12 = 0;
// //   let beerCases24 = 0;
// //   let totalProducts = 0;

// //   // 1. TABLEAU DES PRODUITS
// //   const productsRows = items.map(item => {
// //     const amount = item.quantity * item.unit_price;
// //     totalProducts += amount;
    
// //     if (item.product_category === 'bière') {
// //       if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
// //       if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
// //     }
    
// //     return [
// //       item.product_name,
// //       item.quantity.toString(),
// //       item.unit_price.toLocaleString('fr-FR'),
// //       amount.toLocaleString('fr-FR')
// //     ];
// //   });

// //   // 2. RÉCAPITULATIF DES PRODUITS (sous forme de tableau)
// //   const totalCases = beerCases12 + beerCases24;
// //   const summaryRows = [
// //     ['Désignation', 'Valeur'],
// //     ['Total produits', totalProducts.toLocaleString('fr-FR') + ' FCFA'],
// //     ['Total casiers (12+24)', totalCases.toString()],
// //     ['Total palettes', Math.ceil(totalCases / 60).toString()]
// //   ];

// //   // 3. TABLEAU DES EMBALLAGES (si applicable)
// //   if (sale.packaging_included) {
// //     packagingCost = totalCases * 3500;
// //   }
// //   const packagingRows = sale.packaging_included ? [
// //     ['Désignation', 'Quantité', 'P.U', 'Montant'],
// //     ['Casiers (12+24)', totalCases.toString(), '3 500', packagingCost.toLocaleString('fr-FR')],
// //     ['Total emballages', '', '', packagingCost.toLocaleString('fr-FR')]
// //   ] : [];

// //   // 4. FRAIS D'ENLÈVEMENT (sous forme de tableau)
// //   removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
// //   const removalRows = [];
  
// //   if (beerCases12 > 0 || beerCases24 > 0) {
// //     removalRows.push(['Désignation', 'Quantité', 'P.U', 'Montant']);
    
// //     if (beerCases12 > 0) {
// //       removalRows.push(['Casiers 12', beerCases12.toString(), '600', (beerCases12 * 600).toLocaleString('fr-FR')]);
// //     }
// //     if (beerCases24 > 0) {
// //       removalRows.push(['Casiers 24', beerCases24.toString(), '1 200', (beerCases24 * 1200).toLocaleString('fr-FR')]);
// //     }
    
// //     removalRows.push(['Total frais', '', '', removalCost.toLocaleString('fr-FR')]);
// //   }

// //   // 5. TOTAL GÉNÉRAL (sous forme de tableau)
// //   const grandTotal = totalProducts + packagingCost + removalCost;
// //   const totalRows = [
// //     ['Désignation', 'Montant'],
// //     ['Total produits', totalProducts.toLocaleString('fr-FR') + ' FCFA']
// //   ];
  
// //   if (sale.packaging_included) {
// //     totalRows.push(['Frais emballage', packagingCost.toLocaleString('fr-FR') + ' FCFA']);
// //   }
  
// //   totalRows.push(
// //     ['Frais d\'enlèvement', removalCost.toLocaleString('fr-FR') + ' FCFA'],
// //     ['TOTAL À PAYER', grandTotal.toLocaleString('fr-FR') + ' FCFA']
// //   );

// //   // CRÉATION DU PDF
// //   const doc = new PDFDocument({ margin: 50, size: 'A4' });
// //   const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
// //   if (!fs.existsSync(path.dirname(invoicePath))) {
// //     fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
// //   }
  
// //   doc.pipe(fs.createWriteStream(invoicePath));

// //   // En-tête
// //   generateHeader(doc, invoiceNumber, date, time, sale.client_name);

// //   // Contenu principal
// //   let yPosition = 180;
  
// //   // 1. Tableau des produits
// //   yPosition = generateTableSection(
// //     doc, 
// //     'DÉTAIL DES PRODUITS', 
// //     ['Produit', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'], 
// //     [200, 80, 100, 120], 
// //     productsRows, 
// //     yPosition
// //   );

// //   // 2. Tableau récapitulatif produits
// //   yPosition = generateTableSection(
// //     doc,
// //     'RÉCAPITULATIF PRODUITS',
// //     summaryRows[0],
// //     [250, 250],
// //     summaryRows.slice(1),
// //     yPosition + 20
// //   );

// //   // 3. Tableau des emballages (si applicable)
// //   if (packagingRows.length > 0) {
// //     yPosition = generateTableSection(
// //       doc,
// //       'EMBALLAGES',
// //       packagingRows[0],
// //       [200, 80, 100, 120],
// //       packagingRows.slice(1),
// //       yPosition + 20
// //     );
// //   }

// //   // 4. Tableau des frais d'enlèvement (si applicable)
// //   if (removalRows.length > 0) {
// //     yPosition = generateTableSection(
// //       doc,
// //       "FRAIS D'ENLÈVEMENT",
// //       removalRows[0],
// //       [200, 80, 100, 120],
// //       removalRows.slice(1),
// //       yPosition + 20
// //     );
// //   }

// //   // 5. Tableau du total général
// //   generateTableSection(
// //     doc,
// //     'TOTAL GÉNÉRAL',
// //     totalRows[0],
// //     [300, 200],
// //     totalRows.slice(1),
// //     yPosition + 20
// //   );

// //   // Pied de page
// //   doc.fontSize(10).text('Merci pour votre confiance!', { align: 'center' });
// //   doc.end();
  
// //   return invoicePath;
// // };

// // // ===== FONCTIONS UTILITAIRES =====

// // function generateHeader(doc, invoiceNumber, date, time, clientName) {
// //   doc.image(path.join(process.cwd(), 'public', 'logo.png'), 50, 45, { width: 100 })
// //      .fontSize(20).text('BOUTIQUE DE BOISSONS', { align: 'center' })
// //      .fontSize(10).text('123 Rue du Commerce', { align: 'center' })
// //      .fontSize(10).text('Ville, Pays | Tél: +123 456 789', { align: 'center' })
// //      .moveDown(2)
// //      .fontSize(14).text(`Facture N°: ${invoiceNumber}`, { align: 'right' })
// //      .fontSize(10).text(`Date: ${date}`, { align: 'right' })
// //      .fontSize(10).text(`Heure: ${time}`, { align: 'right' })
// //      .moveDown()
// //      .fontSize(12).text(`Client: ${clientName}`)
// //      .moveDown();
// // }

// // function generateTableSection(doc, title, headers, widths, rows, yPosition) {
// //   // Titre de la section
// //   doc.fontSize(12).font('Helvetica-Bold').text(title, 50, yPosition);
// //   yPosition += 20;

// //   // En-têtes du tableau
// //   doc.font('Helvetica-Bold');
// //   let xPosition = 50;
// //   headers.forEach((header, i) => {
// //     doc.text(header, xPosition, yPosition, {
// //       width: widths[i],
// //       align: i === headers.length - 1 ? 'right' : 'left'
// //     });
// //     xPosition += widths[i];
// //   });

// //   // Lignes du tableau
// //   doc.font('Helvetica');
// //   rows.forEach(row => {
// //     yPosition += 20;
// //     xPosition = 50;
// //     row.forEach((cell, i) => {
// //       const isLastCell = i === row.length - 1;
// //       const isTotalRow = row[0].toLowerCase().includes('total');
      
// //       if (isTotalRow) doc.font('Helvetica-Bold');
      
// //       doc.text(cell, xPosition, yPosition, {
// //         width: widths[i],
// //         align: isLastCell ? 'right' : 'left'
// //       });
      
// //       if (isTotalRow) doc.font('Helvetica');
// //       xPosition += widths[i];
// //     });
// //   });

// //   // Retourne la nouvelle position Y
// //   return yPosition + 20;
// // }


// // import PDFDocument from 'pdfkit';
// // import fs from 'fs';
// // import path from 'path';
// // import Sale from '../models/Sale.js';
// // import SaleItem from '../models/SaleItem.js';

// // export const generateInvoice = async (saleId) => {
// //   const sale = await Sale.findById(saleId);
// //   const items = await SaleItem.findBySaleId(saleId);
  
// //   // Configuration de base
// //   const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
// //   const date = new Date(sale.confirmed_at).toLocaleDateString('fr-FR');
// //   const time = new Date(sale.confirmed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
// //   // Calcul des éléments
// //   let packagingCost = 0;
// //   let removalCost = 0;
// //   let beerCases12 = 0;
// //   let beerCases24 = 0;
// //   let totalProducts = 0;

// //   // 1. TABLEAU PRINCIPAL DES PRODUITS
// //   const productsTable = {
// //     title: "DÉTAIL DES PRODUITS",
// //     headers: ['Produit', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
// //     widths: [220, 70, 100, 110],
// //     rows: items.map(item => {
// //       const amount = item.quantity * item.unit_price;
// //       totalProducts += amount;
      
// //       if (item.product_category === 'bière') {
// //         if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
// //         if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
// //       }
      
// //       return [
// //         item.product_name,
// //         item.quantity.toString(),
// //         formatNumber(item.unit_price),
// //         formatNumber(amount)
// //       ];
// //     })
// //   };

// //   const totalCases = beerCases12 + beerCases24;
  
// //   // 2. TABLEAU RÉCAPITULATIF DES PRODUITS
// //   const summaryTable = {
// //     title: "RÉCAPITULATIF DES PRODUITS",
// //     headers: ['Désignation', 'Valeur'],
// //     widths: [250, 250],
// //     rows: [
// //       ['Total produits', formatCurrency(totalProducts)],
// //       ['Total casiers (12+24)', totalCases],
// //       ['Total palettes', Math.ceil(totalCases / 60)]
// //     ]
// //   };

// //   // 3. TABLEAU DES EMBALLAGES (conditionnel)
// //   if (sale.packaging_included) {
// //     packagingCost = totalCases * 3500;
// //   }
// //   const packagingTable = sale.packaging_included ? {
// //     title: "DÉTAIL DES EMBALLAGES",
// //     headers: ['Type', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
// //     widths: [220, 70, 100, 110],
// //     rows: [
// //       ['Casiers (12+24)', totalCases, '3 500', formatNumber(packagingCost)],
// //       ['TOTAL EMBALLAGES', '', '', formatNumber(packagingCost)]
// //     ]
// //   } : null;

// //   // 4. TABLEAU DES FRAIS D'ENLÈVEMENT (conditionnel)
// //   removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
// //   const removalTable = (beerCases12 > 0 || beerCases24 > 0) ? {
// //     title: "FRAIS D'ENLÈVEMENT",
// //     headers: ['Type', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
// //     widths: [220, 70, 100, 110],
// //     rows: [
// //       ...(beerCases12 > 0 ? [['Casiers 12', beerCases12, '600', formatNumber(beerCases12 * 600)]] : []),
// //       ...(beerCases24 > 0 ? [['Casiers 24', beerCases24, '1 200', formatNumber(beerCases24 * 1200)]] : []),
// //       ['TOTAL FRAIS', '', '', formatNumber(removalCost)]
// //     ]
// //   } : null;

// //   // 5. TABLEAU FINAL DU TOTAL GÉNÉRAL
// //   const grandTotal = totalProducts + packagingCost + removalCost;
// //   const totalTable = {
// //     title: "TOTAL GÉNÉRAL",
// //     headers: ['Libellé', 'Montant (FCFA)'],
// //     widths: [300, 200],
// //     rows: [
// //       ['Total produits', formatCurrency(totalProducts)],
// //       ...(sale.packaging_included ? [['Frais emballage', formatCurrency(packagingCost)]] : []),
// //       ['Frais d\'enlèvement', formatCurrency(removalCost)],
// //       ['MONTANT TOTAL', formatCurrency(grandTotal)]
// //     ]
// //   };

// //   // CRÉATION DU PDF
// //   const doc = new PDFDocument({ margin: 50, size: 'A4' });
// //   const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
// //   if (!fs.existsSync(path.dirname(invoicePath))) {
// //     fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
// //   }
  
// //   doc.pipe(fs.createWriteStream(invoicePath));

// //   // En-tête
// //   generateHeader(doc, invoiceNumber, date, time, sale.client_name);

// //   // Contenu principal
// //   let yPosition = 180;
  
// //   // 1. Produits
// //   yPosition = generateTable(doc, productsTable, yPosition);

// //   // 2. Récapitulatif
// //   yPosition = generateTable(doc, summaryTable, yPosition + 15);

// //   // 3. Emballages (si applicable)
// //   if (packagingTable) {
// //     yPosition = generateTable(doc, packagingTable, yPosition + 15);
// //   }

// //   // 4. Frais d'enlèvement (si applicable)
// //   if (removalTable) {
// //     yPosition = generateTable(doc, removalTable, yPosition + 15);
// //   }

// //   // 5. Total général
// //   generateTable(doc, totalTable, yPosition + 15);

// //   // Pied de page
// //   doc.fontSize(10).text('Merci pour votre confiance!', { align: 'center' });
// //   doc.end();
  
// //   return invoicePath;
// // };

// // // ===== FONCTIONS UTILITAIRES =====

// // function generateHeader(doc, invoiceNumber, date, time, clientName) {
// //   doc.image(path.join(process.cwd(), 'public', 'logo.png'), 50, 45, { width: 100 })
// //      .fontSize(20).text('BOUTIQUE DE BOISSONS', { align: 'center' })
// //      .fontSize(10).text('123 Rue du Commerce', { align: 'center' })
// //      .fontSize(10).text('Ville, Pays | Tél: +123 456 789', { align: 'center' })
// //      .moveDown(2)
// //      .fontSize(14).text(`Facture N°: ${invoiceNumber}`, { align: 'right' })
// //      .fontSize(10).text(`Date: ${date}`, { align: 'right' })
// //      .fontSize(10).text(`Heure: ${time}`, { align: 'right' })
// //      .moveDown()
// //      .fontSize(12).text(`Client: ${clientName}`)
// //      .moveDown();
// // }

// // function generateTable(doc, table, yPosition) {
// //   // Titre de la section
// //   doc.fontSize(12).font('Helvetica-Bold').text(table.title, 50, yPosition);
// //   yPosition += 20;

// //   // En-têtes du tableau
// //   doc.font('Helvetica-Bold');
// //   let xPosition = 50;
// //   table.headers.forEach((header, i) => {
// //     doc.text(header, xPosition, yPosition, {
// //       width: table.widths[i],
// //       align: i === table.headers.length - 1 ? 'right' : 'left'
// //     });
// //     xPosition += table.widths[i];
// //   });

// //   // Lignes du tableau
// //   doc.font('Helvetica');
// //   table.rows.forEach((row, rowIndex) => {
// //     yPosition += 20;
// //     xPosition = 50;
// //     const isTotalRow = row[0].toUpperCase().includes('TOTAL') || row[0].toUpperCase().includes('MONTANT');
    
// //     if (isTotalRow) doc.font('Helvetica-Bold');
    
// //     row.forEach((cell, cellIndex) => {
// //       const isLastCell = cellIndex === row.length - 1;
// //       doc.text(cell.toString(), xPosition, yPosition, {
// //         width: table.widths[cellIndex],
// //         align: isLastCell ? 'right' : 'left'
// //       });
// //       xPosition += table.widths[cellIndex];
// //     });
    
// //     if (isTotalRow) doc.font('Helvetica');
// //   });

// //   return yPosition + 20;
// // }

// // function formatNumber(number) {
// //   return new Intl.NumberFormat('fr-FR').format(number);
// // }

// // function formatCurrency(number) {
// //   return `${formatNumber(number)} FCFA`;
// // }

// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import Sale from '../models/Sale.js';
// import SaleItem from '../models/SaleItem.js';

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

//   // 1. Données des produits
//   const productsData = items.map(item => {
//     const amount = item.quantity * item.unit_price;
//     totalProducts += amount;
    
//     if (item.product_category === 'bière') {
//       if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
//       if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
//     }
    
//     return {
//       name: item.product_name,
//       quantity: item.quantity,
//       unitPrice: item.unit_price,
//       amount: amount
//     };
//   });

//   const totalCases = beerCases12 + beerCases24;
//   if (sale.packaging_included) {
//     packagingCost = totalCases * 3500;
//   }
//   removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
//   const grandTotal = totalProducts + packagingCost + removalCost;

//   // Création du PDF
//   const doc = new PDFDocument({ margin: 50, size: 'A4' });
//   const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
//   if (!fs.existsSync(path.dirname(invoicePath))) {
//     fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
//   }
  
//   doc.pipe(fs.createWriteStream(invoicePath));

//   // En-tête
//   generateHeader(doc, invoiceNumber, date, time, sale.client_name);

//   // Position initiale pour le tableau principal
//   const startY = 180;
//   let currentY = startY;

//   // Configuration du tableau principal
//   const tableConfig = {
//     headers: ['Description', 'Quantité', 'P.U', 'Montant'],
//     widths: [220, 80, 100, 100],
//     padding: 10,
//     lineHeight: 20,
//     margin: 50
//   };

//   // Dessiner l'en-tête du tableau
//   currentY = drawTableHeader(doc, tableConfig, currentY);

//   // Section 1: Produits
//   currentY = drawSectionTitle(doc, 'PRODUITS', tableConfig.margin, currentY);
//   productsData.forEach(product => {
//     currentY = drawTableRow(doc, tableConfig, [
//       product.name,
//       product.quantity,
//       formatNumber(product.unitPrice),
//       formatNumber(product.amount)
//     ], currentY);
//   });

//   // Ligne de sous-total produits
//   currentY = drawTableRow(doc, tableConfig, [
//     'SOUS-TOTAL PRODUITS',
//     '',
//     '',
//     formatNumber(totalProducts)
//   ], currentY, true);

//   // Section 2: Emballages (si applicable)
//   if (sale.packaging_included) {
//     currentY = drawSectionTitle(doc, 'EMBALLAGES', tableConfig.margin, currentY + 10);
//     currentY = drawTableRow(doc, tableConfig, [
//       'Casiers (12+24)',
//       totalCases,
//       '3 500',
//       formatNumber(packagingCost)
//     ], currentY);
    
//     currentY = drawTableRow(doc, tableConfig, [
//       'TOTAL EMBALLAGES',
//       '',
//       '',
//       formatNumber(packagingCost)
//     ], currentY, true);
//   }

//   // Section 3: Frais d'enlèvement (si applicable)
//   if (beerCases12 > 0 || beerCases24 > 0) {
//     currentY = drawSectionTitle(doc, "FRAIS D'ENLÈVEMENT", tableConfig.margin, currentY + 10);
    
//     if (beerCases12 > 0) {
//       currentY = drawTableRow(doc, tableConfig, [
//         'Casiers 12',
//         beerCases12,
//         '600',
//         formatNumber(beerCases12 * 600)
//       ], currentY);
//     }
    
//     if (beerCases24 > 0) {
//       currentY = drawTableRow(doc, tableConfig, [
//         'Casiers 24',
//         beerCases24,
//         '1 200',
//         formatNumber(beerCases24 * 1200)
//       ], currentY);
//     }
    
//     currentY = drawTableRow(doc, tableConfig, [
//       'TOTAL FRAIS',
//       '',
//       '',
//       formatNumber(removalCost)
//     ], currentY, true);
//   }

//   // Section 4: Total général
//   currentY = drawSectionTitle(doc, 'TOTAL GÉNÉRAL', tableConfig.margin, currentY + 15);
  
//   // Ligne de séparation
//   currentY = drawDividerLine(doc, tableConfig, currentY);
  
//   currentY = drawTableRow(doc, tableConfig, [
//     'Montant produits',
//     '',
//     '',
//     formatNumber(totalProducts)
//   ], currentY);
  
//   if (sale.packaging_included) {
//     currentY = drawTableRow(doc, tableConfig, [
//       'Frais emballage',
//       '',
//       '',
//       formatNumber(packagingCost)
//     ], currentY);
//   }
  
//   currentY = drawTableRow(doc, tableConfig, [
//     'Frais d\'enlèvement',
//     '',
//     '',
//     formatNumber(removalCost)
//   ], currentY);
  
//   // Ligne de séparation avant total final
//   currentY = drawDividerLine(doc, tableConfig, currentY);
  
//   // Total final
//   currentY = drawTableRow(doc, tableConfig, [
//     'MONTANT TOTAL',
//     '',
//     '',
//     formatNumber(grandTotal)
//   ], currentY, true);

//   // Pied de page
//   doc.fontSize(10).text('Merci pour votre confiance!', { align: 'center' });
//   doc.end();
  
//   return invoicePath;
// };

// // ===== FONCTIONS UTILITAIRES =====

// function generateHeader(doc, invoiceNumber, date, time, clientName) {
//   doc.image(path.join(process.cwd(), 'public', 'logo.png'), 50, 45, { width: 100 })
//      .fontSize(20).text('BOUTIQUE DE BOISSONS', { align: 'center' })
//      .fontSize(10).text('123 Rue du Commerce', { align: 'center' })
//      .fontSize(10).text('Ville, Pays | Tél: +123 456 789', { align: 'center' })
//      .moveDown(2)
//      .fontSize(14).text(`Facture N°: ${invoiceNumber}`, { align: 'right' })
//      .fontSize(10).text(`Date: ${date}`, { align: 'right' })
//      .fontSize(10).text(`Heure: ${time}`, { align: 'right' })
//      .moveDown()
//      .fontSize(12).text(`Client: ${clientName}`)
//      .moveDown();
// }

// function drawTableHeader(doc, config, y) {
//   doc.font('Helvetica-Bold');
//   let x = config.margin;
  
//   config.headers.forEach((header, i) => {
//     doc.text(header, x, y, {
//       width: config.widths[i],
//       align: i === config.headers.length - 1 ? 'right' : 'left'
//     });
//     x += config.widths[i];
//   });
  
//   // Ligne de séparation sous l'en-tête
//   doc.moveTo(config.margin, y + config.lineHeight)
//      .lineTo(config.margin + config.widths.reduce((a, b) => a + b, 0), y + config.lineHeight)
//      .stroke();
  
//   return y + config.lineHeight + 5;
// }

// function drawTableRow(doc, config, cells, y, isBold = false) {
//   if (isBold) doc.font('Helvetica-Bold');
//   else doc.font('Helvetica');
  
//   let x = config.margin;
  
//   cells.forEach((cell, i) => {
//     doc.text(cell.toString(), x, y, {
//       width: config.widths[i],
//       align: i === cells.length - 1 ? 'right' : 'left'
//     });
//     x += config.widths[i];
//   });
  
//   return y + config.lineHeight;
// }

// function drawSectionTitle(doc, title, margin, y) {
//   doc.font('Helvetica-Bold').fontSize(12).text(title, margin, y);
//   return y + 20;
// }

// function drawDividerLine(doc, config, y) {
//   doc.moveTo(config.margin, y + 5)
//      .lineTo(config.margin + config.widths.reduce((a, b) => a + b, 0), y + 5)
//      .lineWidth(0.5)
//      .stroke();
//   return y + 10;
// }

// function formatNumber(number) {
//   return new Intl.NumberFormat('fr-FR').format(number);
// }


import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';

export const generateInvoice = async (saleId) => {
  const sale = await Sale.findById(saleId);
  const items = await SaleItem.findBySaleId(saleId);

  // Configuration de base
  const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
  const date = new Date(sale.confirmed_at).toLocaleDateString('fr-FR');
  const time = new Date(sale.confirmed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  // Formatage des nombres avec virgule décimale
  const formatPrice = (number) => {
    return number.toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                .replace('.', ',');
  };

  // Calcul des éléments
  let packagingCost = 0;
  let removalCost = 0;
  let beerCases12 = 0;
  let beerCases24 = 0;
  let totalProducts = 0;

  // 1. Données des produits
  const productsData = items.map(item => {
    const amount = item.quantity * item.unit_price;
    totalProducts += amount;
    
    if (item.product_category === 'bière') {
      if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
      if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
    }
    
    return {
      name: item.product_name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      amount: amount
    };
  });

  const totalCases = beerCases12 + beerCases24;
  if (sale.packaging_included) {
    packagingCost = totalCases * 3500;
  }
  removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
  const grandTotal = totalProducts + packagingCost + removalCost;

  // Création du PDF
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
  if (!fs.existsSync(path.dirname(invoicePath))) {
    fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
  }
  
  doc.pipe(fs.createWriteStream(invoicePath));

  // En-tête
  generateHeader(doc, invoiceNumber, date, time, sale.client_name);

  // Position initiale pour le contenu
  let currentY = 180;

  // ======================
  // TABLEAU 1: PRODUITS
  // ======================
  currentY = drawTableSection(
    doc,
    'DÉTAIL DES PRODUITS',
    ['Produit', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
    [220, 70, 100, 110],
    productsData.map(p => [
      p.name,
      p.quantity,
      formatPrice(p.unitPrice),
      formatPrice(p.amount)
    ]),
    currentY
  );

  // Ajout du sous-total
  currentY = drawTableRow(
    doc,
    ['SOUS-TOTAL PRODUITS', '', '', formatPrice(totalProducts)],
    currentY,
    true
  );

  // ======================
  // TABLEAU 2: EMBALLAGES
  // ======================
  if (sale.packaging_included) {
    currentY += 15;
    currentY = drawTableSection(
      doc,
      'DÉTAIL DES EMBALLAGES',
      ['Type', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
      [220, 70, 100, 110],
      [
        ['Casiers (12+24)', totalCases, '3 500,00', formatPrice(packagingCost)],
        ['TOTAL EMBALLAGES', '', '', formatPrice(packagingCost)]
      ],
      currentY
    );
  }

  // ======================
  // TABLEAU 3: FRAIS D'ENLÈVEMENT
  // ======================
  if (beerCases12 > 0 || beerCases24 > 0) {
    currentY += 15;
    const removalRows = [];
    
    if (beerCases12 > 0) {
      removalRows.push(['Casiers 12', beerCases12, '600,00', formatPrice(beerCases12 * 600)]);
    }
    
    if (beerCases24 > 0) {
      removalRows.push(['Casiers 24', beerCases24, '1 200,00', formatPrice(beerCases24 * 1200)]);
    }
    
    removalRows.push(['TOTAL FRAIS', '', '', formatPrice(removalCost)]);

    currentY = drawTableSection(
      doc,
      "FRAIS D'ENLÈVEMENT",
      ['Type', 'Qté', 'P.U (FCFA)', 'Montant (FCFA)'],
      [220, 70, 100, 110],
      removalRows,
      currentY
    );
  }

  // ======================
  // TABLEAU 4: TOTAL GÉNÉRAL
  // ======================
  currentY += 15;
  const totalRows = [
    ['Montant produits', formatPrice(totalProducts)],
    ...(sale.packaging_included ? [['Frais emballage', formatPrice(packagingCost)]] : []),
    ["Frais d'enlèvement", formatPrice(removalCost)],
    ['MONTANT TOTAL', formatPrice(grandTotal)]
  ];

  drawTableSection(
    doc,
    'TOTAL GÉNÉRAL',
    ['Désignation', 'Montant (FCFA)'],
    [300, 200],
    totalRows,
    currentY
  );

  // Pied de page
  doc.fontSize(10).text('Merci pour votre confiance!', { align: 'center' });
  doc.end();
  
  return invoicePath;
};

// ===== FONCTIONS UTILITAIRES =====

function generateHeader(doc, invoiceNumber, date, time, clientName) {
  doc.image(path.join(process.cwd(), 'public', 'logo.png'), 50, 45, { width: 100 })
     .fontSize(20).text('BOUTIQUE DE BOISSONS', { align: 'center' })
     .fontSize(10).text('123 Rue du Commerce', { align: 'center' })
     .fontSize(10).text('Ville, Pays | Tél: +123 456 789', { align: 'center' })
     .moveDown(2)
     .fontSize(14).text(`Facture N°: ${invoiceNumber}`, { align: 'right' })
     .fontSize(10).text(`Date: ${date}`, { align: 'right' })
     .fontSize(10).text(`Heure: ${time}`, { align: 'right' })
     .moveDown()
     .fontSize(12).text(`Client: ${clientName}`)
     .moveDown();
}

function drawTableSection(doc, title, headers, widths, rows, y) {
  // Titre de la section
  doc.fontSize(12).font('Helvetica-Bold').text(title, 50, y);
  y += 20;

  // En-têtes du tableau
  doc.font('Helvetica-Bold');
  let x = 50;
  headers.forEach((header, i) => {
    doc.text(header, x, y, {
      width: widths[i],
      align: i === headers.length - 1 ? 'right' : 'left'
    });
    x += widths[i];
  });

  // Lignes du tableau
  doc.font('Helvetica');
  rows.forEach(row => {
    y += 20;
    x = 50;
    const isTotalRow = row[0].toUpperCase().includes('TOTAL') || row[0].toUpperCase().includes('MONTANT');
    
    if (isTotalRow) doc.font('Helvetica-Bold');
    
    row.forEach((cell, i) => {
      doc.text(cell.toString(), x, y, {
        width: widths[i],
        align: i === row.length - 1 ? 'right' : 'left'
      });
      x += widths[i];
    });
    
    if (isTotalRow) doc.font('Helvetica');
  });

  return y + 20;
}

function drawTableRow(doc, cells, y, isBold = false) {
  if (isBold) doc.font('Helvetica-Bold');
  else doc.font('Helvetica');
  
  const widths = [220, 70, 100, 110];
  let x = 50;
  
  cells.forEach((cell, i) => {
    doc.text(cell.toString(), x, y, {
      width: widths[i],
      align: i === cells.length - 1 ? 'right' : 'left'
    });
    x += widths[i];
  });
  
  return y + 20;
}