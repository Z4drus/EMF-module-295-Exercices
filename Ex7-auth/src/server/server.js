/**
 * Serveur pour l'application d'authentification JWT
 */

// Charger les variables d'environnement du fichier .env
require('dotenv').config();

// Importer les dépendances
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const villesRoutes = require('./routes/villesRoutes');

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Configuration de CORS pour permettre au client de communiquer avec l'API
app.use(cors());

// Servir les fichiers statiques du client
app.use(express.static(path.join(__dirname, '../client')));

// Utiliser les routes
app.use(authRoutes);
app.use(villesRoutes);

// Route par défaut pour servir l'application client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
