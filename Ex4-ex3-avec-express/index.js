// Importation des modules nécessaires
const express = require('express');
const app = express();
const users = require('./users');

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Configuration des en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Pour les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Lire tous les utilisateurs (GET)
app.get('/', (req, res) => {
  res.json(users);
  console.log('Requête GET traitée avec succès');
});

// Ajouter un utilisateur (POST)
app.post('/', (req, res) => {
  try {
    const newUser = req.body;
    
    // Génération d'un nouvel ID (max ID + 1)
    const maxId = Math.max(...users.map(user => user.id), 0);
    newUser.id = maxId + 1;
    
    // Ajout du nouvel utilisateur
    users.push(newUser);
    
    // Retourne le statut "created"
    res.status(201).json(newUser);
    console.log('Requête POST traitée avec succès');
  } catch (error) {
    res.status(400).json({ error: 'Format JSON invalide' });
    console.log('Échec de la requête POST : Format JSON invalide');
  }
});

// Modifier un utilisateur (PUT)
app.put('/', (req, res) => {
  try {
    const updatedUser = req.body;
    
    // Recherche de l'index de l'utilisateur
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    
    // Vérification que l'utilisateur existe
    if (userIndex === -1) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      console.log('Échec de la requête PUT : Utilisateur non trouvé');
      return;
    }
    
    // Mise à jour de l'utilisateur
    users[userIndex].nom = updatedUser.nom;
    
    // Retourne un succès
    res.status(200).json(users[userIndex]);
    console.log('Requête PUT traitée avec succès');
  } catch (error) {
    res.status(400).json({ error: 'Format JSON invalide' });
    console.log('Échec de la requête PUT : Format JSON invalide');
  }
});

// Supprimer un utilisateur (DELETE)
app.delete('/', (req, res) => {
  try {
    const { id } = req.body;
    
    // Vérification que l'utilisateur existe
    const userToDelete = users.find(user => user.id === id);
    
    if (!userToDelete) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      console.log('Échec de la requête DELETE : Utilisateur non trouvé');
      return;
    }
    
    // Filtrage pour supprimer l'utilisateur
    const userIndex = users.findIndex(user => user.id === id);
    users.splice(userIndex, 1);
    
    // Retourne un succès
    res.status(200).json({ message: `Utilisateur ${userToDelete.nom} avec l'id ${id} supprimé` });
    console.log('Requête DELETE traitée avec succès');
  } catch (error) {
    res.status(400).json({ error: 'Format JSON invalide' });
    console.log('Échec de la requête DELETE : Format JSON invalide');
  }
});

// Bonus : Obtenir un utilisateur par son ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    res.status(404).json({ error: 'Utilisateur non trouvé' });
    console.log(`Échec de la requête GET /users/${id} : Utilisateur non trouvé`);
    return;
  }
  
  res.json(user);
  console.log(`Requête GET /users/${id} traitée avec succès`);
});

// Démarrage du serveur
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`\x1b[33mServeur démarré sur http://localhost:${PORT}\x1b[0m`);
}); 