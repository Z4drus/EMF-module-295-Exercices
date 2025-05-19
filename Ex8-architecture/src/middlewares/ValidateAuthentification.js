/**
 * Middleware de validation d'authentification
 * Vérifie la validité du token JWT fourni dans les entêtes
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Vérifie que le token JWT est valide
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @param {Function} next - Fonction de passage au middleware suivant
 */
const validateAuthentification = (req, res, next) => {
  // Récupération du token depuis l'en-tête Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé: token manquant' });
  }

  // Format attendu: "Bearer [token]"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Format de token invalide' });
  }

  const token = parts[1];

  try {
    // Vérification du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Stockage des données de l'utilisateur dans la requête pour usage ultérieur
    req.user = decoded;
    
    // Passage au middleware suivant
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = validateAuthentification; 