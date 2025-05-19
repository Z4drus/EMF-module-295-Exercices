/**
 * Routes des joueurs
 * Gère les routes liées aux joueurs
 */

const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/JoueurController');
const validateAuthentification = require('../middlewares/ValidateAuthentification');
const validateJoueur = require('../middlewares/ValidateJoueur');

// Application du middleware d'authentification sur toutes les routes de joueurs
router.use(validateAuthentification);

/**
 * @route GET /api/joueurs/:id
 * @desc Récupérer un joueur par son ID
 * @access Privé (avec authentification)
 */
router.get('/:id', joueurController.getJoueurById);

/**
 * @route POST /api/joueurs
 * @desc Créer un nouveau joueur
 * @access Privé (avec authentification + validation)
 */
router.post('/', validateJoueur, joueurController.createJoueur);

/**
 * @route DELETE /api/joueurs/:id
 * @desc Supprimer un joueur
 * @access Privé (avec authentification)
 */
router.delete('/:id', joueurController.deleteJoueur);

module.exports = router; 