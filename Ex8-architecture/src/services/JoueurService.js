/**
 * Service de gestion des joueurs
 * Fournit les fonctions d'accès aux données des joueurs
 */

const db = require('../utils/database');

class JoueurService {
  /**
   * Récupère un joueur par son ID
   * @param {number} id - ID du joueur
   * @returns {Promise<Object|null>} - Joueur trouvé ou null
   */
  async getJoueurById(id) {
    try {
      // Requête avec jointure pour récupérer les informations de l'équipe
      const [joueurs] = await db.execute(
        `SELECT j.*, e.nom as nom_equipe 
         FROM t_joueur j 
         LEFT JOIN t_equipe e ON j.fk_equipe = e.pk_equipe 
         WHERE j.pk_joueur = ?`,
        [id]
      );
      
      return joueurs.length > 0 ? joueurs[0] : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crée un nouveau joueur
   * @param {Object} joueurData - Données du joueur
   * @returns {Promise<Object>} - Joueur créé
   */
  async createJoueur(joueurData) {
    try {
      const [result] = await db.execute(
        'INSERT INTO t_joueur (nom, prenom, numero, fk_equipe) VALUES (?, ?, ?, ?)',
        [joueurData.nom, joueurData.prenom, joueurData.numero, joueurData.fk_equipe]
      );
      
      if (result.insertId) {
        return this.getJoueurById(result.insertId);
      }
      
      throw new Error('Erreur lors de la création du joueur');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime un joueur
   * @param {number} id - ID du joueur à supprimer
   * @returns {Promise<boolean>} - true si suppression réussie
   */
  async deleteJoueur(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM t_joueur WHERE pk_joueur = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Met à jour un joueur
   * @param {number} id - ID du joueur à mettre à jour
   * @param {Object} joueurData - Nouvelles données du joueur
   * @returns {Promise<Object|null>} - Joueur mis à jour ou null
   */
  async updateJoueur(id, joueurData) {
    try {
      const [result] = await db.execute(
        'UPDATE t_joueur SET nom = ?, prenom = ?, numero = ?, fk_equipe = ? WHERE pk_joueur = ?',
        [joueurData.nom, joueurData.prenom, joueurData.numero, joueurData.fk_equipe, id]
      );
      
      if (result.affectedRows > 0) {
        return this.getJoueurById(id);
      }
      
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère tous les joueurs d'une équipe
   * @param {number} equipeId - ID de l'équipe
   * @returns {Promise<Array>} - Liste des joueurs
   */
  async getJoueursByEquipe(equipeId) {
    try {
      const [joueurs] = await db.execute(
        'SELECT * FROM t_joueur WHERE fk_equipe = ?',
        [equipeId]
      );
      
      return joueurs;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new JoueurService(); 