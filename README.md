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
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```
