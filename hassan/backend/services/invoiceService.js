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