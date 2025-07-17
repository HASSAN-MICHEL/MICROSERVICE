// // import app from "./app.js";
// // import cors from "cors";
// // import express from "express";
// // import { createServer } from "http";
// // import { WebSocketServer } from "ws";
// // import path from "path";
// // import { fileURLToPath } from "url";


// // // Configuration pour __dirname en ES modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Configuration Express existante
// // app.use(express.json());
// // app.use(cors());

// // // Servir les fichiers statiques du frontend React (dossier dist)
// // app.use(express.static(path.join(__dirname, "../dist")));

// // // Route de fallback pour le frontend React
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// // });

// // // Création du serveur HTTP
// // const server = createServer(app);

// // // Configuration WebSocket
// // const wss = new WebSocketServer({ server });

// // // Stockage des clients connectés
// // const clients = new Set();

// // wss.on('connection', (ws) => {
// //   clients.add(ws);
// //   console.log('Nouveau client WebSocket connecté');

// //   ws.on('close', () => {
// //     clients.delete(ws);
// //     console.log('Client WebSocket déconnecté');
// //   });

// //   ws.on('error', (error) => {
// //     console.error('Erreur WebSocket:', error);
// //   });
// // });

// // // Fonction de broadcast
// // const broadcast = (data) => {
// //   const message = JSON.stringify(data);
// //   clients.forEach(client => {
// //     if (client.readyState === client.OPEN) {
// //       client.send(message);
// //     }
// //   });
// // };

// // // Exportation de la fonction broadcast
// // export { broadcast, server };

// // // Démarrer le serveur
// // const PORT = process.env.PORT || 4000;
// // server.listen(PORT, () => {
// //   console.log(`✅ Serveur HTTP démarré sur le port ${PORT}`);
// //   console.log(`✅ Serveur WebSocket démarré sur le port ${PORT}`);
// //   console.log(`✅ Frontend React servi depuis /dist`);
// // });



// import app from "./dossier.js";
// import cors from "cors";
// import express from "express";
// import { createServer } from "http";
// import { WebSocketServer } from "ws";
// import path from "path";
// import { fileURLToPath } from "url";

// // Configuration pour __dirname en ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configuration CORS améliorée pour le réseau local
// const corsOptions = {
//   origin: [
//     "http://localhost:4000",
//     "http://localhost:3000",
//     "http://192.168.52.216:4000",
//     "http://192.168.52.216:3000",
//     /^http:\/\/192\.168\.52\.\d{1,3}(:\d+)?$/, // Toutes les IP du réseau 192.168.52.x
//     /^http:\/\/localhost(:\d+)?$/ // Tous les ports locaux
//   ],
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   optionsSuccessStatus: 200
// };

// // Middleware pour les logs des requêtes
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} from ${req.ip}`);
//   next();
// });

// // Configuration Express avec CORS en premier
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Pré-vol des requêtes OPTIONS
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Middleware pour headers personnalisés
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (corsOptions.origin.some(pattern => {
//     if (typeof pattern === 'string') {
//       return pattern === origin;
//     } else if (pattern instanceof RegExp) {
//       return pattern.test(origin);
//     }
//     return false;
//   })) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
//   res.header("Access-Control-Allow-Methods", corsOptions.methods);
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// // Servir les fichiers statiques du frontend React
// app.use(express.static(path.join(__dirname, "../dist"), {
//   setHeaders: (res, filePath) => {
//     // Désactive le cache pour les fichiers index et assets
//     if (filePath.includes("index.html") || filePath.includes("asset")) {
//       res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//       res.setHeader("Pragma", "no-cache");
//       res.setHeader("Expires", "0");
//     }
//   },
//   fallthrough: true // Continue vers les autres middlewares si fichier non trouvé
// }));

// // Gestion des erreurs pour les fichiers statiques
// app.use((err, req, res, next) => {
//   if (err) {
//     console.error("Erreur de fichier statique:", err);
//     if (!res.headersSent) {
//       res.status(500).json({ error: "Erreur interne du serveur" });
//     }
//   } else {
//     next();
//   }
// });

// // Création du serveur HTTP
// const server = createServer(app);

// // Configuration WebSocket améliorée
// const wss = new WebSocketServer({ 
//   server,
//   path: "/ws",
//   perMessageDeflate: {
//     zlibDeflateOptions: {
//       chunkSize: 1024,
//       memLevel: 7,
//       level: 3
//     },
//     zlibInflateOptions: {
//       chunkSize: 10 * 1024
//     },
//     clientNoContextTakeover: true,
//     serverNoContextTakeover: true,
//     concurrencyLimit: 10
//   },
//   verifyClient: (info, done) => {
//     // Vérification de l'origine pour les WebSockets
//     const origin = info.origin;
//     const isValidOrigin = corsOptions.origin.some(pattern => {
//       if (typeof pattern === 'string') return pattern.includes(origin);
//       if (pattern instanceof RegExp) return pattern.test(origin);
//       return false;
//     });
    
//     if (!isValidOrigin) {
//       console.warn(`Tentative de connexion WebSocket non autorisée depuis ${origin}`);
//       return done(false, 403, "Origin non autorisée");
//     }
//     return done(true);
//   }
// });

// // Gestion des clients WebSocket
// const clients = new Map();

// wss.on('connection', (ws, req) => {
//   const clientId = req.headers['sec-websocket-key'] || Date.now().toString();
//   const clientIp = req.socket.remoteAddress;
  
//   console.log(`Nouveau client WebSocket connecté (${clientId}) depuis ${clientIp}`);
//   clients.set(clientId, { ws, ip: clientIp });

//   ws.on('message', (message) => {
//     console.log(`Message reçu de ${clientId}: ${message}`);
//     try {
//       // Écho du message avec l'ID client
//       ws.send(`Server-${clientId}: ${message}`);
//     } catch (error) {
//       console.error(`Erreur d'envoi au client ${clientId}:`, error);
//     }
//   });

//   ws.on('close', () => {
//     clients.delete(clientId);
//     console.log(`Client déconnecté (${clientId})`);
//   });

//   ws.on('error', (error) => {
//     console.error(`Erreur WebSocket (${clientId}):`, error);
//     clients.delete(clientId);
//   });
// });

// // Route de santé pour vérifier que le serveur fonctionne
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     websocketClients: clients.size,
//     memoryUsage: process.memoryUsage()
//   });
// });

// // Route de fallback pour le frontend React (DOIT être après les autres routes API)
// app.get("*", (req, res, next) => {
//   // Ne pas intercepter les requêtes API ou WebSocket
//   if (req.path.startsWith("/api") || req.path.startsWith("/ws")) {
//     return next();
//   }
  
//   res.sendFile(path.join(__dirname, "../dist", "index.html"), (err) => {
//     if (err) {
//       console.error("Erreur d'envoi du fichier index.html:", err);
//       if (!res.headersSent) {
//         res.status(500).send("Erreur de chargement de l'application");
//       }
//     }
//   });
// });

// // Gestion des erreurs 404 pour les routes API
// app.use((req, res, next) => {
//   if (req.path.startsWith("/api")) {
//     res.status(404).json({ 
//       error: "Route API non trouvée",
//       path: req.path,
//       method: req.method
//     });
//   } else {
//     next();
//   }
// });

// // Middleware de gestion d'erreurs global
// app.use((err, req, res, next) => {
//   console.error('Erreur globale:', err.stack);
//   res.status(500).json({
//     error: "Erreur interne du serveur",
//     message: err.message,
//     timestamp: new Date().toISOString()
//   });
// });

// // Fonction de broadcast
// const broadcast = (data, senderId = null) => {
//   const message = typeof data === 'object' ? JSON.stringify(data) : data;
//   const timestamp = new Date().toISOString();
  
//   clients.forEach(({ ws }, clientId) => {
//     if (ws.readyState === ws.OPEN && clientId !== senderId) {
//       try {
//         ws.send(JSON.stringify({
//           data: message,
//           timestamp,
//           sender: senderId || 'server'
//         }));
//       } catch (error) {
//         console.error(`Erreur d'envoi au client ${clientId}:`, error);
//         clients.delete(clientId);
//       }
//     }
//   });
// };

// // Exportation
// export { broadcast, server, wss };

// // Démarrer le serveur
// const PORT = process.env.PORT || 3000;
// const HOST = '0.0.0.0'; // Écoute sur toutes les interfaces

// server.listen(PORT, HOST, () => {
//   console.log(`\nServeur démarré à ${new Date().toLocaleString()}`);
//   console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`\nServeur HTTP démarré sur http://${HOST}:${PORT}`);
//   console.log(`WebSocket actif sur ws://${HOST}:${PORT}/ws`);
//   console.log(`Frontend servi depuis ${path.join(__dirname, "../dist")}`);
  
//   console.log("\nAccès possible depuis:");
//   console.log(`- Local:        http://localhost:${PORT}`);
//   console.log(`- Réseau:       http://192.168.52.216:${PORT}`);
//   console.log(`- Autres IPs:   http://<votre-ip-locale>:${PORT}`);
  
//   console.log("\nRoutes disponibles:");
//   console.log(`- API Health:   http://localhost:${PORT}/api/health`);
//   console.log(`- WebSocket:    ws://localhost:${PORT}/ws`);
// });

// // Gestion des erreurs non capturées
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Rejet non géré:', reason, '\nAu niveau de:', promise);
// });

// process.on('uncaughtException', (err) => {
//   console.error('Exception non capturée:', err.stack);
//   process.exit(1);
// });

// // Gestion de la sortie propre
// const shutdown = (signal) => {
//   console.log(`\nReçu ${signal}, fermeture du serveur...`);
  
//   // Fermer les connexions WebSocket
//   wss.clients.forEach(client => {
//     if (client.readyState === client.OPEN) {
//       client.close(1001, 'Server shutdown');
//     }
//   });
  
//   // Fermer le serveur HTTP
//   server.close(() => {
//     console.log('Serveur fermé proprement');
//     process.exit(0);
//   });
  
//   // Forcer la fermeture après timeout
//   setTimeout(() => {
//     console.error('Forçant la fermeture...');
//     process.exit(1);
//   }, 5000);
// };

// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);


import app from "./dossier.js";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

// Configuration pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration CORS améliorée pour le réseau local
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.52.216:3000",
    /^http:\/\/192\.168\.52\.\d{1,3}(:\d+)?$/, // Toutes les IP du réseau 192.168.52.x
    /^http:\/\/localhost(:\d+)?$/ // Tous les ports locaux
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200
};

// Middleware pour les logs des requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Configuration Express avec CORS en premier
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pré-vol des requêtes OPTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour headers personnalisés
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.some(pattern => {
    if (typeof pattern === 'string') {
      return pattern === origin;
    } else if (pattern instanceof RegExp) {
      return pattern.test(origin);
    }
    return false;
  })) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  res.header("Access-Control-Allow-Methods", corsOptions.methods);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Servir les fichiers statiques du frontend React
app.use(express.static(path.join(__dirname, "../dist"), {
  setHeaders: (res, filePath) => {
    // Désactive le cache pour les fichiers index et assets
    if (filePath.includes("index.html") || filePath.includes("asset")) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
  },
  fallthrough: true // Continue vers les autres middlewares si fichier non trouvé
}));

// Gestion des erreurs pour les fichiers statiques
app.use((err, req, res, next) => {
  if (err) {
    console.error("Erreur de fichier statique:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  } else {
    next();
  }
});

// Création du serveur HTTP
const server = createServer(app);

// Configuration WebSocket améliorée
const wss = new WebSocketServer({ 
  server,
  path: "/ws",
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    concurrencyLimit: 10
  },
  verifyClient: (info, done) => {
    // Vérification de l'origine pour les WebSockets
    const origin = info.origin;
    const isValidOrigin = corsOptions.origin.some(pattern => {
      if (typeof pattern === 'string') return pattern.includes(origin);
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });
    
    if (!isValidOrigin) {
      console.warn(`Tentative de connexion WebSocket non autorisée depuis ${origin}`);
      return done(false, 403, "Origin non autorisée");
    }
    return done(true);
  }
});

// Gestion des clients WebSocket
const clients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = req.headers['sec-websocket-key'] || Date.now().toString();
  const clientIp = req.socket.remoteAddress;
  
  console.log(`Nouveau client WebSocket connecté (${clientId}) depuis ${clientIp}`);
  clients.set(clientId, { ws, ip: clientIp });

  ws.on('message', (message) => {
    console.log(`Message reçu de ${clientId}: ${message}`);
    try {
      // Écho du message avec l'ID client
      ws.send(`Server-${clientId}: ${message}`);
    } catch (error) {
      console.error(`Erreur d'envoi au client ${clientId}:`, error);
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`Client déconnecté (${clientId})`);
  });

  ws.on('error', (error) => {
    console.error(`Erreur WebSocket (${clientId}):`, error);
    clients.delete(clientId);
  });
});

// Route de santé pour vérifier que le serveur fonctionne
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    websocketClients: clients.size,
    memoryUsage: process.memoryUsage()
  });
});

// Route de fallback pour le frontend React (DOIT être après les autres routes API)
app.get("*", (req, res, next) => {
  // Ne pas intercepter les requêtes API ou WebSocket
  if (req.path.startsWith("/api") || req.path.startsWith("/ws")) {
    return next();
  }
  
  res.sendFile(path.join(__dirname, "../dist", "index.html"), (err) => {
    if (err) {
      console.error("Erreur d'envoi du fichier index.html:", err);
      if (!res.headersSent) {
        res.status(500).send("Erreur de chargement de l'application");
      }
    }
  });
});

// Gestion des erreurs 404 pour les routes API
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ 
      error: "Route API non trouvée",
      path: req.path,
      method: req.method
    });
  } else {
    next();
  }
});

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur globale:', err.stack);
  res.status(500).json({
    error: "Erreur interne du serveur",
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Fonction de broadcast
const broadcast = (data, senderId = null) => {
  const message = typeof data === 'object' ? JSON.stringify(data) : data;
  const timestamp = new Date().toISOString();
  
  clients.forEach(({ ws }, clientId) => {
    if (ws.readyState === ws.OPEN && clientId !== senderId) {
      try {
        ws.send(JSON.stringify({
          data: message,
          timestamp,
          sender: senderId || 'server'
        }));
      } catch (error) {
        console.error(`Erreur d'envoi au client ${clientId}:`, error);
        clients.delete(clientId);
      }
    }
  });
};

// Exportation
export { broadcast, server, wss };

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Écoute sur toutes les interfaces

server.listen(PORT, HOST, () => {
  console.log(`\nServeur démarré à ${new Date().toLocaleString()}`);
  console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\nServeur HTTP démarré sur http://${HOST}:${PORT}`);
  console.log(`WebSocket actif sur ws://${HOST}:${PORT}/ws`);
  console.log(`Frontend servi depuis ${path.join(__dirname, "../dist")}`);
  
  console.log("\nAccès possible depuis:");
  console.log(`- Local:        http://localhost:${PORT}`);
  console.log(`- Réseau:       http://192.168.52.216:${PORT}`);
  console.log(`- Autres IPs:   http://<votre-ip-locale>:${PORT}`);
  
  console.log("\nRoutes disponibles:");
  console.log(`- API Health:   http://localhost:${PORT}/api/health`);
  console.log(`- WebSocket:    ws://localhost:${PORT}/ws`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejet non géré:', reason, '\nAu niveau de:', promise);
});

process.on('uncaughtException', (err) => {
  console.error('Exception non capturée:', err.stack);
  process.exit(1);
});

// Gestion de la sortie propre
const shutdown = (signal) => {
  console.log(`\nReçu ${signal}, fermeture du serveur...`);
  
  // Fermer les connexions WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.close(1001, 'Server shutdown');
    }
  });
  
  // Fermer le serveur HTTP
  server.close(() => {
    console.log('Serveur fermé proprement');
    process.exit(0);
  });
  
  // Forcer la fermeture après timeout
  setTimeout(() => {
    console.error('Forçant la fermeture...');
    process.exit(1);
  }, 5000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);