
// // // // import express from 'express';
// // // // import cors from 'cors';
// // // // import path from 'path';
// // // // import { fileURLToPath } from 'url';
// // // // import dossierRoutes from './routes/dossierRoutes.js';

// // // // // Configuration des chemins
// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Servir les fichiers statiques
// // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // app.use('/api', dossierRoutes);

// // // // app.listen(3000, () => {
// // // //   console.log('Server running on http://localhost:3000');
// // // // });

// // // import express from 'express';
// // // import session from "express-session";  
// // // import cors from 'cors';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import dossierRoutes from './routes/dossierRoutes.js';
// // // import userRoute from './routes/UserRoute.js'

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // const app = express();

// // // app.use(cors({
// // //   origin: 'http://localhost:5173',  // ton frontend
// // //   credentials: true                // pour permettre les cookies/sessions
// // // }));
// // // app.use(express.json());

// // // // Chemin absolu pour les fichiers statiques
// // // const uploadsPath = path.join(__dirname, '../uploads');
// // // app.use('/uploads', express.static(uploadsPath));

// // // app.use('/api', dossierRoutes);
// // // app.use('/api' , userRoute);

// // // app.use(session({
// // //   secret:"Universite-de-douala",
// // //   resave:false,
// // //   saveUninitialized:false,
// // //  cookie: {
// // //     secure: false,
// // //     httpOnly: true,
// // //     maxAge: 8 * 60 * 60 * 1000 
// // //   }}));

// // // app.listen(3000, () => {
// // //   console.log('Server running on http://localhost:3000');
// // // });



import express from 'express';
import session from "express-session";
import pgSession from 'connect-pg-simple';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import dossierRoutes from './routes/dossierRoutes.js';
import userRoute from './routes/UserRoute.js';
import { pool } from './config/bibi.js'; // Assure-toi d’avoir exporté `pool`

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS : autoriser React à accéder avec cookie
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// JSON parser
app.use(express.json());

// Sessions (⚠️ doit être avant les routes !)
const PgSession = pgSession(session);
app.use(session({
  secret: "Universite-de-douala",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 8 * 60 * 60 * 1000
  }
}));

// Juste après app.use(session({...}))
app.use(async (req, res, next) => {
  if (!req.session.user) {
    // Récupère l'utilisateur par défaut depuis la base (admin avec id_role = 6)
    const result = await pool.query(`
      SELECT u.*, r.nom_role FROM utilisateurs u
      JOIN roles r ON u.id_role = r.id_role
      WHERE u.id_role = 7
      LIMIT 1
    `);

    if (result.rows.length > 0) {
      const admin = result.rows[0];
      req.session.user = {
        id_utilisateur: admin.id_utilisateur,
        nom: admin.nom,
        prenom: admin.prenom,
        id_role: admin.id_role,
        nom_role: admin.nom_role
      };
      console.log("✅ Connexion automatique de l'utilisateur :", admin.nom);
    }
  }
  next();
});


// Ensuite SEULEMENT maintenant les routes
app.use('/api', dossierRoutes);
app.use('/api', userRoute);

// Fichiers statiques pour les uploads
// const uploadsPath = path.join(__dirname, '../uploads');
// app.use('/uploads', express.static(uploadsPath));

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Démarrage 
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


// // // INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, id_role, actif) VALUES
// // // ('BABA', 'Michel', 'salade@gmail.com', 'salade237', 6, TRUE),


// LA VERSION POUR DEPLOYER EN RESEAUX EST DESSOUS 

// // dossier.js
// import express from 'express';
// import session from "express-session";
// import pgSession from 'connect-pg-simple';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dossierRoutes from './routes/dossierRoutes.js';
// import userRoute from './routes/UserRoute.js';
// import { pool } from './config/bibi.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// app.use(express.json());

// const PgSession = pgSession(session);
// app.use(session({
//   store: new PgSession({ pool }),
//   secret: "Universite-de-douala",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 8 * 60 * 60 * 1000
//   }
// }));

// app.use(async (req, res, next) => {
//   if (!req.session.user) {
//     const result = await pool.query(`
//       SELECT u.*, r.nom_role FROM utilisateur u
//       JOIN roles r ON u.id_role = r.id_role
//       WHERE u.id_role = 6
//       LIMIT 1
//     `);

//     if (result.rows.length > 0) {
//       const admin = result.rows[0];
//       req.session.user = {
//         id_utilisateur: admin.id_utilisateur,
//         nom: admin.nom,
//         prenom: admin.prenom,
//         id_role: admin.id_role,
//         nom_role: admin.nom_role
//       };
//       console.log("✅ Connexion automatique de l'utilisateur :", admin.nom);
//     }
//   }
//   next();
// });

// app.use('/api', dossierRoutes);
// app.use('/api', userRoute);

// const uploadsPath = path.join(__dirname, '../uploads');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ❌ Ne pas faire de app.listen ici
// // ✅ On exporte l’app
// export default app;
