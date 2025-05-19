/**
 * Route principale de l'API
 * Gère les sous-routes : authentification, équipes et joueurs
 */

const express = require('express');
const router = express.Router();

// Import des sous-routes
const authRoutes = require('./AuthentificationRoutes');
const equipesRoutes = require('./EquipesRoutes');
const joueursRoutes = require('./JoueursRoutes');

// Configuration des sous-routes
router.use('/auth', authRoutes);
router.use('/equipes', equipesRoutes);
router.use('/joueurs', joueursRoutes);

// Route racine pour vérifier que l'API fonctionne
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API de gestion d\'équipes sportives opérationnelle' });
});

module.exports = router; 