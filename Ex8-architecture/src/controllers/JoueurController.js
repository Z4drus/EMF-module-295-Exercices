/**
 * Contrôleur des joueurs
 * Gère les opérations CRUD sur les joueurs
 */

const joueurService = require('../services/JoueurService');
const equipeService = require('../services/EquipeService');

/**
 * Récupère un joueur par son ID
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.getJoueurById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID de joueur invalide' });
    }
    
    // Récupération du joueur
    const joueur = await joueurService.getJoueurById(id);
    
    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    
    res.status(200).json({ 
      message: 'Joueur récupéré avec succès',
      joueur
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du joueur',
      error: error.message
    });
  }
};

/**
 * Crée un nouveau joueur
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 * (La validation des données est déjà gérée par le middleware ValidateJoueur)
 */
exports.createJoueur = async (req, res) => {
  try {
    const { nom, prenom, numero, fk_equipe } = req.body;
    
    // Vérification que l'équipe existe
    const equipe = await equipeService.getEquipeById(fk_equipe);
    if (!equipe) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    
    // Création du joueur
    const newJoueur = await joueurService.createJoueur({
      nom, prenom, numero, fk_equipe
    });
    
    res.status(201).json({ 
      message: 'Joueur créé avec succès',
      joueur: newJoueur
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création du joueur',
      error: error.message
    });
  }
};

/**
 * Supprime un joueur
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.deleteJoueur = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID de joueur invalide' });
    }
    
    // Suppression du joueur
    const deleted = await joueurService.deleteJoueur(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    
    res.status(200).json({ message: 'Joueur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du joueur',
      error: error.message
    });
  }
}; 