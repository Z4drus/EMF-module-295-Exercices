/**
 * Routes des équipes
 * Gère les routes liées aux équipes
 */

const express = require('express');
const router = express.Router();
const equipeController = require('../controllers/EquipeController');
const validateAuthentification = require('../middlewares/ValidateAuthentification');

// Application du middleware d'authentification sur toutes les routes d'équipes
router.use(validateAuthentification);

/**
 * @route GET /api/equipes/:id
 * @desc Récupérer une équipe par son ID
 * @access Privé (avec authentification)
 */
router.get('/:id', equipeController.getEquipeById);

/**
 * @route POST /api/equipes
 * @desc Créer une nouvelle équipe
 * @access Privé (avec authentification)
 */
router.post('/', equipeController.createEquipe);

/**
 * @route PUT /api/equipes/:id
 * @desc Mettre à jour une équipe
 * @access Privé (avec authentification)
 */
router.put('/:id', equipeController.updateEquipe);

/**
 * @route DELETE /api/equipes/:id
 * @desc Supprimer une équipe
 * @access Privé (avec authentification)
 */
router.delete('/:id', equipeController.deleteEquipe);

module.exports = router; 