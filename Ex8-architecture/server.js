/**
 * Serveur principal de l'application
 * Définit la configuration Express et lance le serveur
 */

// Import des dépendances
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import de la route principale
const apiRoute = require('./src/routes/ApiRoute');

// Configuration du serveur
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares généraux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route principale "/api"
app.use('/api', apiRoute);

// Route par défaut pour gérer les erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

module.exports = app; 