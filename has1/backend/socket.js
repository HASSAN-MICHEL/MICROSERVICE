import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const setupSocket = (setNotifications) => {
  socket.on('new_notification', (notification) => {
    setNotifications(prev => [notification, ...prev]);
  });

  return () => {
    socket.off('new_notification');
  };
};

export default socket;



import app from "./app.js";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
//import * from "../dist/"

// Configuration pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Express existante
app.use(express.json());
app.use(cors());

// Servir les fichiers statiques du frontend React (dossier dist)
app.use(express.static(path.join(__dirname, "../dist")));

// Route de fallback pour le frontend React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Création du serveur HTTP
const server = createServer(app);

// Configuration WebSocket
const wss = new WebSocketServer({ server });

// Stockage des clients connectés
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Nouveau client WebSocket connecté');

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client WebSocket déconnecté');
  });

  ws.on('error', (error) => {
    console.error('Erreur WebSocket:', error);
  });
});

// Fonction de broadcast
const broadcast = (data) => {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

// Exportation de la fonction broadcast
export { broadcast, server };

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Serveur HTTP démarré sur le port ${PORT}`);
  console.log(`✅ Serveur WebSocket démarré sur le port ${PORT}`);
  console.log(`✅ Frontend React servi depuis /dist`);
});