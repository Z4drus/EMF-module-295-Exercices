const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier l'authentification JWT
 * Vérifie si le token JWT est présent et valide dans l'en-tête Authorization
 */
const authMiddleware = (req, res, next) => {
    // Récupérer l'en-tête d'autorisation
    const authHeader = req.headers.authorization;
    
    // Vérifier si l'en-tête est présent et contient un token Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token d\'autorisation manquant ou invalide' });
    }
    
    // Extraire le token (supprimer "Bearer " du début)
    const token = authHeader.split(' ')[1];
    
    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ajouter les informations de l'utilisateur à la requête pour une utilisation ultérieure
        req.user = decoded;
        
        // Passer à la prochaine middleware ou route
        next();
    } catch (error) {
        // En cas d'erreur de vérification du token
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports = authMiddleware; 