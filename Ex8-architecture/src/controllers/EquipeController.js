/**
 * Contrôleur des équipes
 * Gère les opérations CRUD sur les équipes
 */

const equipeService = require('../services/EquipeService');

/**
 * Récupère une équipe par son ID
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.getEquipeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID d\'équipe invalide' });
    }
    
    // Récupération de l'équipe
    const equipe = await equipeService.getEquipeById(id);
    
    if (!equipe) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    
    res.status(200).json({ 
      message: 'Équipe récupérée avec succès',
      equipe
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'équipe',
      error: error.message
    });
  }
};

/**
 * Crée une nouvelle équipe
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.createEquipe = async (req, res) => {
  try {
    const { nom } = req.body;
    
    // Validation des données
    if (!nom || typeof nom !== 'string' || nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom de l\'équipe est requis' });
    }
    
    // Création de l'équipe
    const newEquipe = await equipeService.createEquipe({ nom });
    
    res.status(201).json({ 
      message: 'Équipe créée avec succès',
      equipe: newEquipe
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'équipe',
      error: error.message
    });
  }
};

/**
 * Met à jour une équipe existante
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.updateEquipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID d\'équipe invalide' });
    }
    
    // Validation des données
    if (!nom || typeof nom !== 'string' || nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom de l\'équipe est requis' });
    }
    
    // Mise à jour de l'équipe
    const updatedEquipe = await equipeService.updateEquipe(id, { nom });
    
    if (!updatedEquipe) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    
    res.status(200).json({ 
      message: 'Équipe mise à jour avec succès',
      equipe: updatedEquipe
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de l\'équipe',
      error: error.message
    });
  }
};

/**
 * Supprime une équipe
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
exports.deleteEquipe = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérification que l'ID est un nombre
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID d\'équipe invalide' });
    }
    
    // Suppression de l'équipe
    const deleted = await equipeService.deleteEquipe(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    
    res.status(200).json({ message: 'Équipe supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'équipe',
      error: error.message
    });
  }
}; 