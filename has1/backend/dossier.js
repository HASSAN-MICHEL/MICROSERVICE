
// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dossierRoutes from './routes/dossierRoutes.js';

// // Configuration des chemins
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Servir les fichiers statiques
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api', dossierRoutes);

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dossierRoutes from './routes/dossierRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Chemin absolu pour les fichiers statiques
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/api', dossierRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});