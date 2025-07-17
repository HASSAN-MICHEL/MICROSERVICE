import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

// 🔓 Servir le dossier invoices/ comme dossier public
const __dirname = path.resolve(); // Nécessaire avec ES modules
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'erreur server  wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});