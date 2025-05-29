import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';

export const generateInvoice = async (saleId) => {
  const sale = await Sale.findById(saleId);
  const items = await SaleItem.findBySaleId(saleId);
  
  const invoiceNumber = `FCT${String(sale.id).padStart(6, '0')}`;
  const date = new Date(sale.confirmed_at).toLocaleDateString();
  const time = new Date(sale.confirmed_at).toLocaleTimeString();
  
  // Calculate packaging and removal costs
  let packagingCost = 0;
  let removalCost = 0;
  let beerCases12 = 0;
  let beerCases24 = 0;
  
  for (const item of items) {
    if (item.product_category === 'bière') {
      if (item.product_unit === 'casier-12') {
        beerCases12 += item.quantity;
      } else if (item.product_unit === 'casier-24') {
        beerCases24 += item.quantity;
      }
    }
  }
  
  if (sale.packaging_included) {
    packagingCost = (beerCases12 + beerCases24) * 3500;
  }
  
  removalCost = (beerCases12 * 600) + (beerCases24 * 1200);
  
  const doc = new PDFDocument({ margin: 50 });
  
  const invoicePath = path.join(process.cwd(), 'invoices', `${invoiceNumber}.pdf`);
  if (!fs.existsSync(path.dirname(invoicePath))) {
    fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
  }
  
  doc.pipe(fs.createWriteStream(invoicePath));
  
  // Header
  doc.fontSize(20).text('BOUTIQUE DE BOISSONS', { align: 'center' });
  doc.fontSize(10).text('Bonaberie : Bessecke', { align: 'center' });
  doc.fontSize(10).text('Douala, Cameroun | Tél: +237 688990022', { align: 'center' });
  doc.moveDown(2);
  
  // Invoice info
  doc.fontSize(14).text(`Facture N°: ${invoiceNumber}`, { align: 'right' });
  doc.fontSize(10).text(`Date: ${date}`, { align: 'right' });
  doc.fontSize(10).text(`Heure: ${time}`, { align: 'right' });
  doc.moveDown();
  
  // Client info
  doc.fontSize(12).text(`Client: ${sale.client_name}`);
  doc.moveDown();
  
  // Items table
  const tableTop = doc.y;
  const itemWidth = 250;
  const quantityWidth = 100;
  const priceWidth = 100;
  const amountWidth = 100;
  
  // Table header
  doc.font('Helvetica-Bold');
  doc.text('Produit', 50, tableTop);
  doc.text('Quantité', itemWidth + 50, tableTop);
  doc.text('P.U', itemWidth + quantityWidth + 50, tableTop);
  doc.text('Montant', itemWidth + quantityWidth + priceWidth + 50, tableTop);
  doc.font('Helvetica');
  
  // Table rows
  let y = tableTop + 25;
  let productsTotal = 0;
  
  for (const item of items) {
    const amount = item.quantity * item.unit_price;
    productsTotal += amount;
    
    doc.text(item.product_name, 50, y);
    doc.text(item.quantity.toString(), itemWidth + 50, y);
    doc.text(item.unit_price.toLocaleString(), itemWidth + quantityWidth + 50, y);
    doc.text(amount.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
    y += 20;
  }
  
  // Packaging and removal tables
  y += 20;
  
  // Packaging table
  if (sale.packaging_included) {
    doc.font('Helvetica-Bold').text('Emballages:', 50, y);
    doc.font('Helvetica');
    y += 20;
    
    doc.text('Casiers (12+24):', 50, y);
    doc.text((beerCases12 + beerCases24).toString(), itemWidth + 50, y);
    doc.text('3500', itemWidth + quantityWidth + 50, y);
    doc.text(packagingCost.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
    y += 30;
  }
  
  // Removal table
  if (beerCases12 > 0 || beerCases24 > 0) {
    doc.font('Helvetica-Bold').text('Frais d\'enlèvement:', 50, y);
    doc.font('Helvetica');
    y += 20;
    
    if (beerCases12 > 0) {
      doc.text('Casiers 12:', 50, y);
      doc.text(beerCases12.toString(), itemWidth + 50, y);
      doc.text('600', itemWidth + quantityWidth + 50, y);
      doc.text((beerCases12 * 600).toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
      y += 20;
    }
    
    if (beerCases24 > 0) {
      doc.text('Casiers 24:', 50, y);
      doc.text(beerCases24.toString(), itemWidth + 50, y);
      doc.text('1200', itemWidth + quantityWidth + 50, y);
      doc.text((beerCases24 * 1200).toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
      y += 20;
    }
    
    doc.text('Total frais:', 50, y);
    doc.text(removalCost.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
    y += 30;
  }
  
  // Total
  doc.font('Helvetica-Bold');
  doc.text('Total produits:', itemWidth + quantityWidth + 50, y);
  doc.text(productsTotal.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
  y += 20;
  
  if (sale.packaging_included) {
    doc.text('Total emballages:', itemWidth + quantityWidth + 50, y);
    doc.text(packagingCost.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
    y += 20;
  }
  
  if (beerCases12 > 0 || beerCases24 > 0) {
    doc.text('Total frais:', itemWidth + quantityWidth + 50, y);
    doc.text(removalCost.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
    y += 20;
  }
  
  doc.text('TOTAL GENERAL:', itemWidth + quantityWidth + 50, y);
  const grandTotal = productsTotal + (sale.packaging_included ? packagingCost : 0) + removalCost;
  doc.text(grandTotal.toLocaleString(), itemWidth + quantityWidth + priceWidth + 50, y);
  
  doc.end();
  
  return invoicePath;
};