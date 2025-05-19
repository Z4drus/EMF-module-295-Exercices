# API de Gestion d'Équipes Sportives

API REST pour la gestion d'équipes sportives, de joueurs et d'utilisateurs. Ce projet met en œuvre une architecture modulaire moderne avec des routes, contrôleurs, middlewares et services bien structurés.

## Fonctionnalités

- Authentification des utilisateurs avec JWT
- Gestion des équipes (création, lecture, mise à jour, suppression)
- Gestion des joueurs (création, lecture, suppression)
- Validation des données avec middlewares
- Sécurisation des routes avec authentification par token

## Structure du Projet

```
/
├── db/                  # Scripts de base de données
├── src/
│   ├── controllers/     # Contrôleurs
│   ├── middlewares/     # Middlewares
│   ├── models/          # Modèles
│   ├── routes/          # Routes
│   ├── services/        # Services
│   └── utils/           # Utilitaires
├── .env                 # Variables d'environnement
├── server.js            # Point d'entrée de l'application
└── package.json         # Dépendances
```

## Prérequis

- Node.js >= 14.x
- MySQL >= 8.0

## Installation

1. Cloner le dépôt :
   ```
   git clone <url-du-projet>
   cd Ex8-architecture
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Configurer les variables d'environnement :
   - Renommer `.env.example` en `.env` (ou créer un fichier `.env`)
   - Modifier les paramètres selon votre environnement

4. Créer la base de données :
   ```
   mysql -u root -p < db/insert.sql
   ```

## Démarrage

- En développement :
  ```
  npm run dev
  ```

- En production :
  ```
  npm start
  ```

## Utilisation de l'API

### Authentification

- **Créer un utilisateur** :
  ```
  POST /api/auth/register
  Body: { "email": "user@example.com", "nom": "Dupont", "prenom": "Jean", "password": "password123" }
  ```

- **Se connecter** :
  ```
  POST /api/auth/login
  Body: { "email": "user@example.com", "password": "password123" }
  ```

### Équipes

- **Créer une équipe** :
  ```
  POST /api/equipes
  Headers: { "Authorization": "Bearer <token>" }
  Body: { "nom": "Équipe A" }
  ```

- **Récupérer une équipe** :
  ```
  GET /api/equipes/:id
  Headers: { "Authorization": "Bearer <token>" }
  ```

- **Mettre à jour une équipe** :
  ```
  PUT /api/equipes/:id
  Headers: { "Authorization": "Bearer <token>" }
  Body: { "nom": "Nouvelle Équipe A" }
  ```

- **Supprimer une équipe** :
  ```
  DELETE /api/equipes/:id
  Headers: { "Authorization": "Bearer <token>" }
  ```

### Joueurs

- **Créer un joueur** :
  ```
  POST /api/joueurs
  Headers: { "Authorization": "Bearer <token>" }
  Body: { "nom": "Dubois", "prenom": "Pierre", "numero": 10, "fk_equipe": 1 }
  ```

- **Récupérer un joueur** :
  ```
  GET /api/joueurs/:id
  Headers: { "Authorization": "Bearer <token>" }
  ```

- **Supprimer un joueur** :
  ```
  DELETE /api/joueurs/:id
  Headers: { "Authorization": "Bearer <token>" }
  ``` 