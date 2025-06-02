# API MyGES

## Prérequis

- Node.js (version recommandée : 18 ou supérieure)
- npm ou yarn
- Docker et Docker Compose (pour l'environnement de développement)

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/UnderWorld54/myges-api
cd myges-api
```

## Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:password123@localhost:27017/myapp?authSource=admin
JWT_SECRET=myges-2025
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

2. Initialisez la base de données :
```bash
npx prisma generate
npx prisma db push
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

## Documentation des Routes API

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "nom": "Doe",
  "prenom": "John",
  "role": "ETUDIANT"
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Utilisateurs

#### Liste des utilisateurs (Admin uniquement)
```http
GET /api/users
Authorization: Bearer <token>
```

#### Détails d'un utilisateur
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Mise à jour d'un utilisateur
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Nouveau Nom",
  "prenom": "Nouveau Prénom"
}
```

#### Suppression d'un utilisateur (Admin uniquement)
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

### Matières

#### Liste des matières
```http
GET /api/matieres
Authorization: Bearer <token>
```

#### Création d'une matière (Admin uniquement)
```http
POST /api/matieres
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Mathématiques",
  "description": "Cours de mathématiques avancées",
  "coefficient": 4
}
```

#### Mise à jour d'une matière (Admin uniquement)
```http
PUT /api/matieres/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Nouvelle description",
  "coefficient": 5
}
```

### Groupes

#### Liste des groupes
```http
GET /api/groupes
Authorization: Bearer <token>
```

#### Création d'un groupe (Admin uniquement)
```http
POST /api/groupes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "B3 Info",
  "niveau": "Bachelor 3",
  "specialite": "Informatique"
}
```

### Cours

#### Liste des cours
```http
GET /api/cours
Authorization: Bearer <token>
```

#### Création d'un cours (Admin/Professeur)
```http
POST /api/cours
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-03-20T09:00:00Z",
  "duree": 120,
  "matiereId": "uuid-matiere",
  "groupeId": "uuid-groupe",
  "salle": "Salle 101"
}
```

### Notes

#### Liste des notes (Admin uniquement)
```http
GET /api/notes
Authorization: Bearer <token>
```

#### Détails d'une note
```http
GET /api/notes/:id
Authorization: Bearer <token>
```

#### Création d'une note (Admin uniquement)
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_utilisateur": "uuid-utilisateur",
  "id_matiere": "uuid-matiere",
  "id_groupe": "uuid-groupe",
  "note": 15.5
}
```

#### Mise à jour d'une note (Admin uniquement)
```http
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "note": 17.0
}
```

#### Suppression d'une note (Admin uniquement)
```http
DELETE /api/notes/:id
Authorization: Bearer <token>
```

### Absences

#### Liste des absences (Admin uniquement)
```http
GET /api/absences
Authorization: Bearer <token>
```

#### Détails d'une absence
```http
GET /api/absences/:id
Authorization: Bearer <token>
```

#### Création d'une absence (Admin uniquement)
```http
POST /api/absences
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_utilisateur": "uuid-utilisateur",
  "id_cours": "uuid-cours",
  "etat": false
}
```

#### Mise à jour d'une absence (Admin uniquement)
```http
PUT /api/absences/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "etat": true
}
```

#### Suppression d'une absence (Admin uniquement)
```http
DELETE /api/absences/:id
Authorization: Bearer <token>
```

### Utilitaires

#### Vérification de l'état de l'API
```http
GET /health
```

Retourne l'état de santé de l'API sans authentification requise.

## Tester l'API

### Avec cURL

1. Inscription d'un utilisateur :
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","nom":"Test","prenom":"User","role":"ETUDIANT"}'
```

2. Connexion :
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. Utiliser le token reçu pour les requêtes authentifiées :
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <votre-token>"
```

4. Tester l'état de l'API :
```bash
curl -X GET http://localhost:3000/health
```

5. Créer une note (Admin) :
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Authorization: Bearer <votre-token>" \
  -H "Content-Type: application/json" \
  -d '{"id_utilisateur":"uuid-utilisateur","id_matiere":"uuid-matiere","id_groupe":"uuid-groupe","note":15.5}'
```

6. Créer une absence (Admin) :
```bash
curl -X POST http://localhost:3000/api/absences \
  -H "Authorization: Bearer <votre-token>" \
  -H "Content-Type: application/json" \
  -d '{"id_utilisateur":"uuid-utilisateur","id_cours":"uuid-cours","etat":false}'
```

7. Lister les notes (Admin) :
```bash
curl -X GET http://localhost:3000/api/notes \
  -H "Authorization: Bearer <votre-token>"
```

8. Lister les absences (Admin) :
```bash
curl -X GET http://localhost:3000/api/absences \
  -H "Authorization: Bearer <votre-token>"
```

### Avec Postman

1. Importez la collection suivante dans Postman :
```json
{
  "info": {
    "name": "MyGES API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\",\"nom\":\"Test\",\"prenom\":\"User\",\"role\":\"ETUDIANT\"}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\"}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        }
      ]
    },
    {
      "name": "Notes",
      "item": [
        {
          "name": "Create Note",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/notes",
            "body": {
              "mode": "raw",
              "raw": "{\"id_utilisateur\":\"uuid-utilisateur\",\"id_matiere\":\"uuid-matiere\",\"id_groupe\":\"uuid-groupe\",\"note\":15.5}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        },
        {
          "name": "Get Notes",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/api/notes",
            "headers": {
              "Authorization": "Bearer {{token}}"
            }
          }
        }
      ]
    },
    {
      "name": "Absences",
      "item": [
        {
          "name": "Create Absence",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/absences",
            "body": {
              "mode": "raw",
              "raw": "{\"id_utilisateur\":\"uuid-utilisateur\",\"id_cours\":\"uuid-cours\",\"etat\":false}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        },
        {
          "name": "Get Absences",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/api/absences",
            "headers": {
              "Authorization": "Bearer {{token}}"
            }
          }
        }
      ]
    },
    {
      "name": "Health",
      "item": [
        {
          "name": "Get Health",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/health"
          }
        }
      ]
    }
  ]
}
```

2. Créez un environnement dans Postman avec la variable `token`
3. Après la connexion, stockez le token reçu dans cette variable
4. Utilisez la variable `{{token}}` dans les headers des requêtes authentifiées

### Avec Thunder Client (VS Code)

1. Installez l'extension Thunder Client
2. Créez une nouvelle collection "MyGES API"
3. Ajoutez les requêtes en suivant le même format que pour Postman
4. Utilisez l'onglet "Environment" pour gérer les variables d'environnement

## Structure du projet

```
mon-api/
├── src/           
│   ├── config/         # Configuration (database, etc.)
│   ├── controllers/    # Contrôleurs pour la logique
│   ├── middleware/     # Middleware (auth, error handling)
│   ├── models/         # Modèles de données
│   ├── routes/         # Définition des routes
│   ├── services/       # Services
│   ├── types/          # Types TypeScript
│   ├── utils/          # Utilitaires
│   └── app.ts          # Point d'entrée de l'application
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

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
- PostgreSQL avec Prisma
- JWT pour l'authentification
- TypeScript
- Docker
