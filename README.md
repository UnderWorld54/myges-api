# API MyGES

## Prérequis

- Node.js (version recommandée : 18 ou supérieure)
- npm ou yarn
- Docker et Docker Compose (pour l'environnement de développement)

## Installation

1. Clonez le repository :
```bash
git clone myges-api
cd myges-api
```

2. Installez les dépendances :
```bash
npm install
```

## Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:password123@localhost:27017/myapp?authSource=admin
JWT_SECRET=myges-2025
```

## Démarrage

### Développement

Pour lancer le serveur en mode développement :
```bash
npm run dev
```

### Docker

Pour lancer l'application avec Docker :
```bash
# Démarrer les conteneurs
npm run docker:up

# Voir les logs
npm run docker:logs

# Arrêter les conteneurs
npm run docker:down
```

## Scripts disponibles

- `npm run dev` : Lance le serveur en mode développement avec hot-reload
- `npm run build` : Compile le TypeScript en JavaScript
- `npm start` : Lance le serveur en mode production
- `npm run docker:up` : Démarre les conteneurs Docker
- `npm run docker:down` : Arrête les conteneurs Docker
- `npm run docker:logs` : Affiche les logs des conteneurs Docker
## Structure du projet

```
mon-api/
├── src/           
│   ├── config/         # Configuration (database, etc.)
│   ├── controllers/    # Contrôleurs pour la logique métier
│   ├── middleware/     # Middleware (auth, error handling)
│   ├── models/         # Modèles de données
│   ├── routes/         # Définition des routes
│   ├── services/       # Services métier
│   ├── types/          # Types TypeScript
│   ├── utils/          # Utilitaires
│   └── app.ts          # Point d'entrée de l'application
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Routes API

### Routes d'authentification (`/api/auth`)
- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/profile` - Récupérer le profil de l'utilisateur connecté (protégé)
- `PUT /api/auth/change-password` - Changer le mot de passe (protégé)

### Routes utilisateurs (`/api/users`)
- `GET /api/users` - Liste tous les utilisateurs (admin uniquement)
- `GET /api/users/:id` - Récupérer un utilisateur spécifique (protégé)
- `PUT /api/users/:id` - Mettre à jour un utilisateur (protégé)
- `DELETE /api/users/:id` - Supprimer un utilisateur (admin uniquement)

### Route de santé
- `GET /health` - Vérifier l'état de l'API

## Architecture

L'application suit une architecture en couches :

1. **Routes** (`/routes`) : Définition des endpoints API et routage des requêtes
2. **Middleware** (`/middleware`) : 
   - Authentification et autorisation
   - Gestion des erreurs
   - Validation des requêtes
3. **Contrôleurs** (`/controllers`) : Gestion des requêtes HTTP et des réponses
4. **Services** (`/services`) : Logique métier et interaction avec les modèles
5. **Modèles** (`/models`) : Définition des schémas de données et interaction avec la base de données
6. **Types** (`/types`) : Définitions TypeScript pour la typage statique
7. **Utils** (`/utils`) : Fonctions utilitaires réutilisables

L'API utilise :
- Express.js
- MongoDB
- JWT pour l'authentification
- TypeScript
- Docker
