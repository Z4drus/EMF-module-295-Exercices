/**
 * Routes d'authentification
 * Gère les routes liées à l'authentification et aux utilisateurs
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthentificationController');

/**
 * @route POST /api/auth/register
 * @desc Créer un nouvel utilisateur
 * @access Public
 */
router.post('/register', authController.createUser);

/**
 * @route DELETE /api/auth/users/:id
 * @desc Supprimer un utilisateur par son ID
 * @access Public (normalement devrait être protégé, mais selon les spécifications)
 */
router.delete('/users/:id', authController.deleteUser);

/**
 * @route POST /api/auth/login
 * @desc Authentifier un utilisateur
 * @access Public
 */
router.post('/login', authController.login);

module.exports = router; 