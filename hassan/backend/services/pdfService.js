

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
//   let beerBoxes = 0;
//   let beerBottles = 0;
//   let beerCartons = 0;
//   let totalProducts = 0;

//   // Largeur uniforme pour tous les tableaux
//   const uniformTableWidth = 500;
//   const columnWidths = [200, 80, 80, 140]; // Largeurs des colonnes

//   // 1. TABLEAU PRINCIPAL DES PRODUITS
//   const productsTable = {
//     title: "DÉTAIL DES PRODUITS",
//     headers: ['Produit', 'Qté', 'P.U', 'Montant'],
//     widths: columnWidths,
//     rows: items.map(item => {
//       const amount = item.quantity * item.unit_price;
//       totalProducts += amount;
      
//       if (item.product_category === 'bière') {
//         if (item.product_unit === 'casier-12') beerCases12 += item.quantity;
//         if (item.product_unit === 'casier-24') beerCases24 += item.quantity;
//         if (item.product_unit === 'boite') beerBoxes += item.quantity;
//         if (item.product_unit === 'bouteille') beerBottles += item.quantity;
//         if (item.product_unit === 'carton') beerCartons += item.quantity;
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
//   const totalPacks = Math.ceil(totalCases / 60);
//   const totalColis = beerCases12 + beerCases24 + beerBoxes + beerBottles + beerCartons + totalPacks;
  
//   // 2. TABLEAU RÉCAPITULATIF DES COLIS
//   const summaryTable = {
//     title: "RÉCAPITULATIF DES COLIS",
//     headers: ['Type de Colis', 'Quantité', 'Unité', 'Sous-Total'],
//     widths: columnWidths,
//     rows: [
//       ['Casiers 12 bouteilles', beerCases12, 'pce', beerCases12],
//       ['Casiers 24 bouteilles', beerCases24, 'pce', beerCases24],
//       ['Boîtes individuelles', beerBoxes, 'pce', beerBoxes],
//       ['Bouteilles seules', beerBottles, 'pce', beerBottles],
//       ['Cartons spéciaux', beerCartons, 'pce', beerCartons],
//       ['Palettes complètes', totalPacks, 'pce', totalPacks],
//       ['', '', 'TOTAL COLIS:', totalColis + ' pce']
//     ]
//   };

//   // 3. TABLEAU DES EMBALLAGES
//   if (sale.packaging_included) {
//     packagingCost = totalCases * 3500;
//   }
//   const packagingTable = sale.packaging_included ? {
//     title: "FRAIS D'EMBALLAGE",
//     headers: ['Description', 'Quantité', 'Prix Unitaire', 'Montant'],
//     widths: columnWidths,
//     rows: [
//       ['Casiers standards', totalCases, '3 500 FCFA', formatNumber(packagingCost) + ' FCFA'],
//       ['', '', 'TOTAL:', formatNumber(packagingCost) + ' FCFA']
//     ]
//   } : null;

//   // 4. TABLEAU DES FRAIS D'ENLÈVEMENT
//   removalCost = (beerCases12 * 600) + (beerCases24 * 1200) + (beerBoxes * 300) + (beerBottles * 50) + (beerCartons * 200);
//   const removalTable = removalCost > 0 ? {
//     title: "FRAIS D'ENLÈVEMENT",
//     headers: ['Type de Colis', 'Quantité', 'Prix Unitaire', 'Montant'],
//     widths: columnWidths,
//     rows: [
//       ...(beerCases12 > 0 ? [['Casiers 12 bouteilles', beerCases12, '600 FCFA', formatNumber(beerCases12 * 600) + ' FCFA']] : []),
//       ...(beerCases24 > 0 ? [['Casiers 24 bouteilles', beerCases24, '1 200 FCFA', formatNumber(beerCases24 * 1200) + ' FCFA']] : []),
//       ...(beerBoxes > 0 ? [['Boîtes individuelles', beerBoxes, '300 FCFA', formatNumber(beerBoxes * 300) + ' FCFA']] : []),
//       ...(beerBottles > 0 ? [['Bouteilles seules', beerBottles, '50 FCFA', formatNumber(beerBottles * 50) + ' FCFA']] : []),
//       ...(beerCartons > 0 ? [['Cartons spéciaux', beerCartons, '200 FCFA', formatNumber(beerCartons * 200) + ' FCFA']] : []),
//       ['', '', 'TOTAL:', formatNumber(removalCost) + ' FCFA']
//     ]
//   } : null;

//   // 5. TABLEAU FINAL DU TOTAL GÉNÉRAL
//   const grandTotal = totalProducts + packagingCost + removalCost;
//   const totalTable = {
//     title: "TOTAL GÉNÉRAL",
//     headers: ['Libellé', 'Montant'],
//     widths: [240, 130],
//     rows: [
//       ['Total produits', formatNumber(totalProducts) + ' FCFA'],
//       ...(sale.packaging_included ? [['Frais emballage', formatNumber(packagingCost) + ' FCFA']] : []),
//       ...(removalCost > 0 ? [['Frais enlèvement', formatNumber(removalCost) + ' FCFA']] : []),
//       ['MONTANT TOTAL', formatNumber(grandTotal) + ' FCFA']
//     ]
//   };

//   // CRÉATION DU PDF
//   const doc = new PDFDocument({ 
//     margin: 70,
//     size: 'A4',
//     font: 'Helvetica'
//   });
  
//   const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  
//   if (!fs.existsSync(path.dirname(invoicePath))) {
//     fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
//   }
  
//   console.log('📄 Chemin du fichier PDF :', invoicePath);


//   doc.pipe(fs.createWriteStream(invoicePath));

//   // En-tête
//   generateHeader(doc, invoiceNumber, date, time, sale.client_name);

//   // Contenu principal
//   let yPosition = 150;

//   // 1. Produits
//   yPosition = generateTable(doc, productsTable, yPosition);

//   // 2. Récapitulatif des colis
//   yPosition = generateTable(doc, summaryTable, yPosition + 20);

//   // Note explicative
//   doc.fontSize(8).fillColor(colors.black)
//      .text('* Les palettes et bouteilles individuelles sont incluses dans le total des colis', 
//            35, yPosition + 5, { width: uniformTableWidth });
//   yPosition += 20;

//   // 3. Emballages (si applicable)
//   if (packagingTable) {
//     yPosition = generateTable(doc, packagingTable, yPosition + 10);
//   }

//   // 4. Frais d'enlèvement (si applicable)
//   if (removalTable) {
//     yPosition = generateTable(doc, removalTable, yPosition + 10);
//   }

//   // 5. Total général
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


// // ✅ Attendre que le fichier soit bien écrit
// await new Promise((resolve, reject) => {
//   doc.on('finish', resolve);
//   doc.on('error', reject);
// });

// console.log('✅ PDF généré avec succès à :', invoicePath);
// return invoicePath;
  
  
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


import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';

// === Couleurs personnalisées ===
const colors = {
  primary: '#1E88E5',
  primaryLight: '#64B5F6',
  primaryLighter: '#E3F2FD',
  white: '#FFFFFF',
  black: '#000000',
  border: '#1E88E5'
};

export const generateInvoice = async (saleId) => {
  const sale = await Sale.findById(saleId);
  const items = await SaleItem.findBySaleId(saleId);

  if (!sale || !items || items.length === 0) {
    throw new Error('Vente ou articles introuvables pour l’ID fourni.');
  }

  const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
  const date = new Date(sale.confirmed_at).toLocaleDateString('fr-FR');
  const time = new Date(sale.confirmed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  // === Calculs ===
  let packagingCost = 0;
  let removalCost = 0;
  let beerCases12 = 0, beerCases24 = 0, beerBoxes = 0, beerBottles = 0, beerCartons = 0, totalProducts = 0;

  const uniformTableWidth = 500;
  const columnWidths = [200, 80, 80, 140];

  const productsTable = {
    title: "DÉTAIL DES PRODUITS",
    headers: ['Produit', 'Qté', 'P.U', 'Montant'],
    widths: columnWidths,
    rows: items.map(item => {
      const amount = item.quantity * item.unit_price;
      totalProducts += amount;

      if (item.product_category === 'bière') {
        switch (item.product_unit) {
          case 'casier-12': beerCases12 += item.quantity; break;
          case 'casier-24': beerCases24 += item.quantity; break;
          case 'boite': beerBoxes += item.quantity; break;
          case 'bouteille': beerBottles += item.quantity; break;
          case 'palette': beerCartons += item.quantity; break;
        }
      }

      return [
        item.product_name,
        item.quantity.toString(),
        formatNumber(item.unit_price) + ' FCFA',
        formatNumber(amount) + ' FCFA'
      ];
    })
  };

  const totalCases = beerCases12 + beerCases24;
  const totalPacks = Math.ceil(totalCases / 60);
  const totalColis = totalCases + beerBoxes + beerBottles + beerCartons + totalPacks;

  const summaryTable = {
    title: "RÉCAPITULATIF DES COLIS",
    headers: ['Type de Colis', 'Quantité', 'Unité', 'Sous-Total'],
    widths: columnWidths,
    rows: [
      ['Casiers 12 bouteilles', beerCases12, 'pce', beerCases12],
      ['Casiers 24 bouteilles', beerCases24, 'pce', beerCases24],
      ['Boîtes individuelles', beerBoxes, 'pce', beerBoxes],
      ['Bouteilles seules', beerBottles, 'pce', beerBottles],
      ['Cartons spéciaux', beerCartons, 'pce', beerCartons],
      ['Palettes complètes', totalPacks, 'pce', totalPacks],
      ['', '', 'TOTAL COLIS:', `${totalColis} pce`]
    ]
  };

  if (sale.packaging_included) {
    packagingCost = totalCases * 3500;
  }

  const packagingTable = sale.packaging_included ? {
    title: "FRAIS D'EMBALLAGE",
    headers: ['Description', 'Quantité', 'Prix Unitaire', 'Montant'],
    widths: columnWidths,
    rows: [
      ['Casiers standards', totalCases, '3 500 FCFA', formatNumber(packagingCost) + ' FCFA'],
      ['', '', 'TOTAL:', formatNumber(packagingCost) + ' FCFA']
    ]
  } : null;

  removalCost = (beerCases12 * 600) + (beerCases24 * 1200) + (beerBoxes * 300) + (beerBottles * 50) + (beerCartons * 200);
  const removalTable = removalCost > 0 ? {
    title: "FRAIS D'ENLÈVEMENT",
    headers: ['Type de Colis', 'Quantité', 'Prix Unitaire', 'Montant'],
    widths: columnWidths,
    rows: [
      ...(beerCases12 > 0 ? [['Casiers 12 bouteilles', beerCases12, '600 FCFA', formatNumber(beerCases12 * 600) + ' FCFA']] : []),
      ...(beerCases24 > 0 ? [['Casiers 24 bouteilles', beerCases24, '1 200 FCFA', formatNumber(beerCases24 * 1200) + ' FCFA']] : []),
      ...(beerBoxes > 0 ? [['Boîtes individuelles', beerBoxes, '300 FCFA', formatNumber(beerBoxes * 300) + ' FCFA']] : []),
      ...(beerBottles > 0 ? [['Bouteilles seules', beerBottles, '50 FCFA', formatNumber(beerBottles * 50) + ' FCFA']] : []),
      ...(beerCartons > 0 ? [['Cartons spéciaux', beerCartons, '200 FCFA', formatNumber(beerCartons * 200) + ' FCFA']] : []),
      ['', '', 'TOTAL:', formatNumber(removalCost) + ' FCFA']
    ]
  } : null;

  const grandTotal = totalProducts + packagingCost + removalCost;
  const totalTable = {
    title: "TOTAL GÉNÉRAL",
    headers: ['Libellé', 'Montant'],
    widths: [240, 130],
    rows: [
      ['Total produits', formatNumber(totalProducts) + ' FCFA'],
      ...(sale.packaging_included ? [['Frais emballage', formatNumber(packagingCost) + ' FCFA']] : []),
      ...(removalCost > 0 ? [['Frais enlèvement', formatNumber(removalCost) + ' FCFA']] : []),
      ['MONTANT TOTAL', formatNumber(grandTotal) + ' FCFA']
    ]
  };

  // === CRÉATION PDF ===
  const doc = new PDFDocument({ margin: 70, size: 'A4', font: 'Helvetica' });
  const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);

  if (!fs.existsSync(path.dirname(invoicePath))) {
    fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
  }

  doc.pipe(fs.createWriteStream(invoicePath));

  generateHeader(doc, invoiceNumber, date, time, sale.client_name);
  let y = 150;
  y = generateTable(doc, productsTable, y);
  y = generateTable(doc, summaryTable, y + 20);

  doc.fontSize(8).fillColor(colors.black)
     .text('* Les palettes et bouteilles individuelles sont incluses dans le total des colis', 35, y + 5, { width: uniformTableWidth });
  y += 20;

  if (packagingTable) y = generateTable(doc, packagingTable, y + 10);
  if (removalTable) y = generateTable(doc, removalTable, y + 10);
  if ((750 - y) < 100) {
    doc.addPage();
    y = 50;
  }

  generateTable(doc, totalTable, y + 20);

  doc.fontSize(9).fillColor(colors.primary)
     .text('Merci pour votre confiance!', { align: 'center' })
     .text('Conditions de paiement: 30 jours nets', { align: 'center' })
     .text('TVA non applicable, article 293 B du CGI', { align: 'center' });

  doc.end();

  await new Promise((resolve, reject) => {
    doc.on('finish', resolve);
    doc.on('error', reject);
  });

  return invoicePath;
};

// === Fonctions Utilitaires ===
function generateHeader(doc, invoiceNumber, date, time, clientName) {
  doc.rect(0, 0, 612, 80).fill(colors.primary);

  doc.image(path.join(process.cwd(), 'public', 'logo.png'), 40, 20, { width: 60 })
     .fontSize(16).font('Helvetica-Bold').fillColor(colors.white)
     .text('BOUTIQUE DE BOISSONS', 120, 30)
     .fontSize(10)
     .text('Bonaberie : Bessecke', 120, 50)
     .text('Douala, Cameroun | Tél: +237 688990022', 120, 65);

  doc.rect(30, 90, 550, 40).fill(colors.primaryLighter).stroke(colors.border)
     .fontSize(10).font('Helvetica-Bold').fillColor(colors.black)
     .text(`Facture N°: ${invoiceNumber}`, 35, 100)
     .text(`Date: ${date} à ${time}`, 35, 120)
     .text(`Client: ${clientName}`, 300, 100)
     .moveDown(1);
}

function generateTable(doc, table, y) {
  const rowHeight = 22;
  const tableWidth = 500;
  const columnCount = table.headers.length;

  doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.primary)
     .text(table.title, 35, y);
  y += 15;

  doc.rect(30, y, tableWidth, rowHeight).fill(colors.primary).stroke(colors.border);
  let x = 30;

  table.headers.forEach((header, i) => {
    doc.fontSize(9).fillColor(colors.white)
       .text(header, x + 10, y + 6, {
         width: table.widths[i],
         align: i === columnCount - 1 ? 'right' : 'left'
       });
    x += table.widths[i];
  });

  y += rowHeight;

  table.rows.forEach((row, index) => {
    const isTotal = row[0].toString().includes('TOTAL') || row[0].toString().includes('MONTANT');
    const fill = isTotal ? colors.primaryLight : (index % 2 === 0 ? colors.white : colors.primaryLighter);

    doc.rect(30, y, tableWidth, rowHeight).fill(fill).stroke(colors.border, 0.5);

    x = 30;
    row.forEach((cell, i) => {
      doc.fillColor(isTotal ? colors.white : colors.black)
         .font(isTotal ? 'Helvetica-Bold' : 'Helvetica')
         .text(cell.toString(), x + 10, y + 6, {
           width: table.widths[i] - 15,
           align: i === columnCount - 1 ? 'right' : 'left'
         });
      x += table.widths[i];
    });

    y += rowHeight;
  });

  return y + 10;
}

function formatNumber(n) {
  return new Intl.NumberFormat('fr-FR').format(n);
}
