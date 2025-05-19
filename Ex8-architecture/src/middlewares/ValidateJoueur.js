/**
 * Middleware de validation des données de joueur
 * Vérifie que les données fournies pour un joueur sont valides
 */

/**
 * Valide les données d'un joueur avant création/modification
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * @param {Function} next - Fonction de passage au middleware suivant
 */
const validateJoueur = (req, res, next) => {
  const { nom, prenom, numero, fk_equipe } = req.body;
  const errors = [];

  // Validation du nom
  if (!nom || typeof nom !== 'string' || nom.trim() === '') {
    errors.push('Le nom du joueur est requis');
  }

  // Validation du prénom
  if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
    errors.push('Le prénom du joueur est requis');
  }

  // Validation du numéro (optionnel mais si présent, doit être un nombre)
  if (numero !== undefined && numero !== null) {
    if (isNaN(numero) || numero < 0 || numero > 99) {
      errors.push('Le numéro du joueur doit être un nombre entre 0 et 99');
    }
  }

  // Validation de l'équipe (obligatoire et doit être un ID valide)
  if (!fk_equipe) {
    errors.push('L\'ID de l\'équipe est requis');
  } else if (isNaN(fk_equipe) || fk_equipe <= 0) {
    errors.push('L\'ID de l\'équipe doit être un nombre positif');
  }

  // Si des erreurs sont détectées, renvoyer une réponse avec les erreurs
  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Données de joueur invalides', 
      errors 
    });
  }

  // Si tout est valide, passer au middleware suivant
  next();
};

module.exports = validateJoueur; 