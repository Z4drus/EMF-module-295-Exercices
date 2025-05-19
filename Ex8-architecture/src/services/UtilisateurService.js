/**
 * Service de gestion des utilisateurs
 * Fournit les fonctions d'accès aux données des utilisateurs
 */

const db = require('../utils/database');
const bcrypt = require('bcrypt');

class UtilisateurService {
  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async createUtilisateur(userData) {
    try {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Insertion dans la base de données
      const [result] = await db.execute(
        'INSERT INTO t_utilisateur (email, nom, prenom, password) VALUES (?, ?, ?, ?)',
        [userData.email, userData.nom, userData.prenom, hashedPassword]
      );
      
      // Récupération de l'utilisateur créé (sans le mot de passe)
      if (result.insertId) {
        const [user] = await db.execute(
          'SELECT pk_utilisateur, email, nom, prenom FROM t_utilisateur WHERE pk_utilisateur = ?',
          [result.insertId]
        );
        
        return user[0];
      }
      
      throw new Error('Erreur lors de la création de l\'utilisateur');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime un utilisateur par son ID
   * @param {number} id - ID de l'utilisateur à supprimer
   * @returns {Promise<boolean>} - true si suppression réussie
   */
  async deleteUtilisateur(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM t_utilisateur WHERE pk_utilisateur = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authentifie un utilisateur avec son email et mot de passe
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe à vérifier
   * @returns {Promise<Object|null>} - Utilisateur authentifié ou null
   */
  async authenticateUtilisateur(email, password) {
    try {
      // Récupération de l'utilisateur par email
      const [users] = await db.execute(
        'SELECT * FROM t_utilisateur WHERE email = ?',
        [email]
      );
      
      if (users.length === 0) {
        return null;
      }
      
      const user = users[0];
      
      // Vérification du mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return null;
      }
      
      // Retourner l'utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère un utilisateur par son ID
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<Object|null>} - Utilisateur trouvé ou null
   */
  async getUtilisateurById(id) {
    try {
      const [users] = await db.execute(
        'SELECT pk_utilisateur, email, nom, prenom FROM t_utilisateur WHERE pk_utilisateur = ?',
        [id]
      );
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UtilisateurService(); 