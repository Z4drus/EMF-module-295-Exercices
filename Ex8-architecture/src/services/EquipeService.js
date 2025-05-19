/**
 * Service de gestion des équipes
 * Fournit les fonctions d'accès aux données des équipes
 */

const db = require('../utils/database');

class EquipeService {
  /**
   * Récupère une équipe par son ID
   * @param {number} id - ID de l'équipe
   * @returns {Promise<Object|null>} - Équipe trouvée ou null
   */
  async getEquipeById(id) {
    try {
      const [equipes] = await db.execute(
        'SELECT * FROM t_equipe WHERE pk_equipe = ?',
        [id]
      );
      
      return equipes.length > 0 ? equipes[0] : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crée une nouvelle équipe
   * @param {Object} equipeData - Données de l'équipe
   * @returns {Promise<Object>} - Équipe créée
   */
  async createEquipe(equipeData) {
    try {
      const [result] = await db.execute(
        'INSERT INTO t_equipe (nom) VALUES (?)',
        [equipeData.nom]
      );
      
      if (result.insertId) {
        return this.getEquipeById(result.insertId);
      }
      
      throw new Error('Erreur lors de la création de l\'équipe');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Met à jour une équipe
   * @param {number} id - ID de l'équipe à mettre à jour
   * @param {Object} equipeData - Nouvelles données de l'équipe
   * @returns {Promise<Object|null>} - Équipe mise à jour ou null
   */
  async updateEquipe(id, equipeData) {
    try {
      const [result] = await db.execute(
        'UPDATE t_equipe SET nom = ? WHERE pk_equipe = ?',
        [equipeData.nom, id]
      );
      
      if (result.affectedRows > 0) {
        return this.getEquipeById(id);
      }
      
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime une équipe
   * @param {number} id - ID de l'équipe à supprimer
   * @returns {Promise<boolean>} - true si suppression réussie
   */
  async deleteEquipe(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM t_equipe WHERE pk_equipe = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère toutes les équipes
   * @returns {Promise<Array>} - Liste des équipes
   */
  async getAllEquipes() {
    try {
      const [equipes] = await db.execute('SELECT * FROM t_equipe');
      return equipes;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EquipeService(); 