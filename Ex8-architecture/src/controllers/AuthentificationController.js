/**
 * Contrôleur d'authentification
 * Gère les opérations liées aux utilisateurs et à l'authentification
 */

const jwt = require('jsonwebtoken');
const utilisateurService = require('../services/UtilisateurService');
require('dotenv').config();

/**
 * Crée un nouveau utilisateur
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.createUser = async (req, res) => {
  try {
    const { email, nom, prenom, password } = req.body;
    
    // Validation des données
    if (!email || !nom || !prenom || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    
    // Création de l'utilisateur
    const newUser = await utilisateurService.createUtilisateur({
      email, nom, prenom, password
    });
    
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: newUser
    });
  } catch (error) {
    // Gestion des erreurs de contraintes uniques (email déjà existant)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'utilisateur',
      error: error.message
    });
  }
};

/**
 * Supprime un utilisateur existant
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    
    // Suppression de l'utilisateur
    const deleted = await utilisateurService.deleteUtilisateur(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'utilisateur',
      error: error.message
    });
  }
};

/**
 * Authentifie un utilisateur et génère un token JWT
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation des données
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    
    // Authentification de l'utilisateur
    const user = await utilisateurService.authenticateUtilisateur(email, password);
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Génération du token JWT
    const token = jwt.sign(
      { 
        id: user.pk_utilisateur,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: 'Authentification réussie',
      token,
      user: {
        id: user.pk_utilisateur,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'authentification',
      error: error.message
    });
  }
}; 