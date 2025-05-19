const express = require('express');
const router = express.Router();
const villes = require('../data/villes');
const authMiddleware = require('../middleware/authMiddleware');

// Appliquer le middleware d'authentification à toutes les routes
router.use(authMiddleware);

// Route pour récupérer la liste des villes
router.get('/villes', (req, res) => {
    // Renvoyer la liste des villes
    res.status(200).json(villes);
});

module.exports = router; 