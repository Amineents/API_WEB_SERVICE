# API_WEB_SERVICE  
## API Microservices – Réseau Social

Projet réalisé dans le cadre d’un TP EFREI – Architecture microservices avec Node.js et MongoDB.

---

## Description

Cette application est une API backend pour un réseau social, organisée en **trois microservices indépendants** :

- **Auth Service** : gestion des utilisateurs et de l’authentification.
- **Post Service** : gestion des publications.
- **Like Service** : gestion des likes.

Chaque service utilise **MongoDB** et communique avec les autres via des appels HTTP (`axios`). L’architecture est conçue pour être **modulaire**, **scalable** et **sécurisée**.

---

## Structure du projet

```
API_WEB_SERVICE/
├── auth-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── .env
├── post-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── .env
├── like-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── .env
├── package.json
├── README.md
```

---

## Technologies utilisées

- Node.js  
- Express  
- MongoDB (Mongoose)  
- Bcrypt (sécurisation des mots de passe)  
- Axios (communication inter-services)  
- Dotenv  
- Nodemon  
- Concurrently (lancement simultané des services)

---

## Installation & Lancement

### 1. Installation des dépendances

Dans **chaque dossier de microservice**, exécute :

```bash
npm install
```

### 2. Lancer tous les services en une seule commande

Depuis le dossier racine (`API_WEB_SERVICE/`), exécute :

```bash
npm run dev
```

Cela lance les trois services grâce à `concurrently`.

---

## Configuration des fichiers `.env`

Chaque microservice possède son propre fichier `.env` :

### auth-service/.env

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/social-auth
```

### post-service/.env

```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/social-posts
USERS=http://localhost:3001
```

### like-service/.env

```env
PORT=3003
MONGO_URI=mongodb://localhost:27017/social-likes
POSTS=http://localhost:3002
USERS=http://localhost:3001
```

---

## Endpoints de l’API

### Auth Service

| Méthode | Endpoint                     | Description                       |
|---------|------------------------------|-----------------------------------|
| POST    | `/api/auth/register`         | Créer un utilisateur              |
| POST    | `/api/auth/login`            | Connexion utilisateur             |
| POST    | `/api/auth/reset-password`   | Réinitialiser le mot de passe     |
| GET     | `/api/auth/:userName`        | Vérifie l’existence d’un utilisateur |

### Post Service

| Méthode | Endpoint                             | Description                    |
|---------|--------------------------------------|--------------------------------|
| GET     | `/api/posts`                         | Obtenir tous les posts         |
| POST    | `/api/posts`                         | Créer un nouveau post          |
| PUT     | `/api/posts/:id`                     | Modifier un post               |
| DELETE  | `/api/posts/:id`                     | Supprimer un post              |
| PUT     | `/api/posts/:id/increment-likes`     | Modifier le compteur de likes  |

### Like Service

| Méthode | Endpoint              | Description                    |
|---------|-----------------------|--------------------------------|
| POST    | `/api/likes`          | Ajouter un like à un post      |
| DELETE  | `/api/likes`          | Supprimer un like              |

---

## Fonctionnement des services

- Chaque microservice possède sa propre base MongoDB.
- `axios` est utilisé pour la communication inter-service.
- Le **compteur de likes** est géré par le Like Service qui envoie une requête vers le Post Service.
- Les mots de passe sont **hachés avec `bcrypt`** (conformité RGPD).
- L’authentification peut être étendue avec JWT (non utilisé ici volontairement).

---

## Tests API

Utilise Postman ou un outil équivalent pour tester les endpoints ci-dessus.  
Vérifie que chaque service tourne sur le bon port défini dans `.env` (3001, 3002, 3003).

---

## Auteur

**Amine Naitsidhoum**  
EFREI Paris – M1 Data Engineering & IA  
2025