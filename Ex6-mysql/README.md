# Application de Gestion des Tâches avec MySQL

Cette application permet de gérer des tâches et de les stocker dans une base de données MySQL.

## Prérequis

- Node.js
- MySQL

## Installation

1. Cloner ce dépôt
2. Installer les dépendances :
   ```
   npm install
   ```
3. Configurer la base de données :
   - Créer une base de données MySQL en exécutant le script SQL suivant :
   ```sql
   CREATE DATABASE db_task;
   USE db_task;

   CREATE TABLE t_task (
     pk_task INTEGER PRIMARY KEY AUTO_INCREMENT,
     nom TEXT NOT NULL,
     description TEXT NOT NULL,
     statut TEXT NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     due_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Insertion des tâches par défaut
   INSERT INTO t_task (nom, description, statut, createdAt, due_date) VALUES
   ('Création du endpoint utilisateur', 'Développer un endpoint pour gérer les utilisateurs dans l\'application.', 'En cours', '2025-04-01', '2025-04-10'),
   ('Correction du bug d\'affichage', 'Corriger le problème d\'affichage sur la page d\'accueil.', 'À faire', '2025-04-02', '2025-04-05'),
   ('Ajout de la fonctionnalité de recherche', 'Implémenter une barre de recherche pour filtrer les tâches.', 'En attente', '2025-04-03', '2025-04-15'),
   ('Mise à jour de la documentation technique', 'Ajouter les détails des nouvelles fonctionnalités dans la documentation.', 'Terminé', '2025-04-04', '2025-04-06'),
   ('Test des fonctionnalités principales', 'Effectuer des tests unitaires et d\'intégration pour les fonctionnalités principales.', 'En cours', '2025-04-05', '2025-04-12');
   ```
4. Configurer les variables d'environnement :
   - Modifier le fichier `.env` avec vos paramètres de connexion à la base de données

## Démarrage

Pour démarrer l'application :

```
npm run dev
```

## API Endpoints

- `GET /tasks` : Récupérer toutes les tâches
- `POST /task` : Créer une nouvelle tâche
- `PUT /task/:id` : Mettre à jour une tâche existante
- `DELETE /task/:id` : Supprimer une tâche

## Format des données

Exemple de format pour créer/mettre à jour une tâche :

```json
{
  "title": "Nouvelle tâche",
  "description": "Description de la tâche",
  "status": "À faire",
  "createdAt": "2025-04-10T00:00:00.000Z",
  "dueDate": "2025-04-15T00:00:00.000Z"
}
``` 