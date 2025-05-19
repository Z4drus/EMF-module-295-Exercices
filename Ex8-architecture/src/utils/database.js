/**
 * Module de connexion à la base de données
 * Établit une connexion MySQL et la rend disponible pour l'application
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la connexion
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création du pool de connexions
const pool = mysql.createPool(dbConfig);

// Test de la connexion
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error.message);
    return false;
  }
};

// Exécuter le test de connexion au démarrage
testConnection();

module.exports = pool; 