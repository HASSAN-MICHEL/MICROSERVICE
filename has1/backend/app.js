import express from "express";
import cors from "cors"; 
import chambreRoutes from "./routes/chambreRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import boissonRoutes from "./routes/boissonRoutes.js";
import venteBoissonRoutes from "./routes/venteBoissonRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; 
 // Import des nouvelles routes de tableau de bord
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import statsRoutes from "./routes/statsRoutes.js"; // Import des nouvelles routes de statistiques
import notificationController from "./controllers/notificationController.js"; // Pour les notifications

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes existantes
app.use("/api/chambres", chambreRoutes);
app.use("/api/restaurant/menu", menuRoutes);
app.use("/api/restaurant/order", orderRoutes); 
app.use("/api/vente-boissons", venteBoissonRoutes);
app.use("/api/boissons", boissonRoutes);
app.use("/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/reservations", reservationRoutes);

// Nouvelle route pour les statistiques
app.use("/api/stats", statsRoutes); // Toutes les routes de stats commencent par /api/stats

// Route pour vérifier et mettre à jour le statut des chambres
app.post("/api/reservations/check-status", async (req, res) => {
  try {
    await reservationController.checkAndUpdateChambreStatus();
    res.status(200).json({ message: "Statut des chambres et réservations mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut des chambres :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut des chambres", error: error.message });
  }
});

// Route pour récupérer les notifications (pour le frontend)
app.get("/api/notifications", (req, res) => {
  res.json(notificationController.getNotifications());
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

export default app;




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



// import express from 'express';
// import session from "express-session";
// import pgSession from 'connect-pg-simple';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dossierRoutes from './routes/dossierRoutes.js';
// import userRoute from './routes/UserRoute.js';
// import { pool } from './config/bibi.js'; // Assure-toi d’avoir exporté `pool`

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // CORS : autoriser React à accéder avec cookie
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// // JSON parser
// app.use(express.json());

// // Sessions (⚠️ doit être avant les routes !)
// const PgSession = pgSession(session);
// app.use(session({
//   secret: "Universite-de-douala",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 8 * 60 * 60 * 1000
//   }
// }));

// // Juste après app.use(session({...}))
// app.use(async (req, res, next) => {
//   if (!req.session.user) {
//     // Récupère l'utilisateur par défaut depuis la base (admin avec id_role = 6)
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


// // Ensuite SEULEMENT maintenant les routes
// app.use('/api', dossierRoutes);
// app.use('/api', userRoute);

// // Fichiers statiques pour les uploads
// // const uploadsPath = path.join(__dirname, '../uploads');
// // app.use('/uploads', express.static(uploadsPath));

// const uploadsPath = path.join(__dirname, '../uploads');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Démarrage 
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


// // // INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, id_role, actif) VALUES
// // // ('BABA', 'Michel', 'salade@gmail.com', 'salade237', 6, TRUE),


// // LA VERSION POUR DEPLOYER EN RESEAUX EST DESSOUS 

// // // dossier.js
// // import express from 'express';
// // import session from "express-session";
// // import pgSession from 'connect-pg-simple';
// // import cors from 'cors';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import dossierRoutes from './routes/dossierRoutes.js';
// // import userRoute from './routes/UserRoute.js';
// // import { pool } from './config/bibi.js';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const app = express();

// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   credentials: true
// // }));

// // app.use(express.json());

// // const PgSession = pgSession(session);
// // app.use(session({
// //   store: new PgSession({ pool }),
// //   secret: "Universite-de-douala",
// //   resave: false,
// //   saveUninitialized: false,
// //   cookie: {
// //     secure: false,
// //     httpOnly: true,
// //     maxAge: 8 * 60 * 60 * 1000
// //   }
// // }));

// // app.use(async (req, res, next) => {
// //   if (!req.session.user) {
// //     const result = await pool.query(`
// //       SELECT u.*, r.nom_role FROM utilisateur u
// //       JOIN roles r ON u.id_role = r.id_role
// //       WHERE u.id_role = 6
// //       LIMIT 1
// //     `);

// //     if (result.rows.length > 0) {
// //       const admin = result.rows[0];
// //       req.session.user = {
// //         id_utilisateur: admin.id_utilisateur,
// //         nom: admin.nom,
// //         prenom: admin.prenom,
// //         id_role: admin.id_role,
// //         nom_role: admin.nom_role
// //       };
// //       console.log("✅ Connexion automatique de l'utilisateur :", admin.nom);
// //     }
// //   }
// //   next();
// // });

// // app.use('/api', dossierRoutes);
// // app.use('/api', userRoute);

// // const uploadsPath = path.join(__dirname, '../uploads');
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // ❌ Ne pas faire de app.listen ici
// // // ✅ On exporte l’app
// // export default app;
