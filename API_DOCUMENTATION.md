# Documentation de l'API

## Base URL
La base URL pour toutes les requêtes est : `http://localhost:5000/api`

## Authentification

### Inscription

- **URL** : `/auth/register`
- **Méthode** : `POST`
- **Description** : Crée un nouvel utilisateur.
- **Corps de la requête** :
    ```json
    {
        "username": "exampleuser",
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Réponse réussie** :
    ```json
    {
        "token": "JWT_TOKEN"
    }
    ```

### Connexion

- **URL** : `/auth/login`
- **Méthode** : `POST`
- **Description** : Authentifie un utilisateur et renvoie un token JWT.
- **Corps de la requête** :
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Réponse réussie** :
    ```json
    {
        "token": "JWT_TOKEN"
    }
    ```

## Contenu

### Créer un contenu

- **URL** : `/content`
- **Méthode** : `POST`
- **Description** : Crée un nouveau contenu.
- **En-tête** : `Authorization: Bearer JWT_TOKEN`
- **Corps de la requête** :
    ```json
    {
        "title": "Titre du contenu",
        "body": "Contenu détaillé"
    }
    ```
- **Réponse réussie** :
    ```json
    {
        "title": "Titre du contenu",
        "body": "Contenu détaillé",
        "author": "AUTHOR_ID",
        "createdAt": "2024-06-28T00:00:00.000Z",
        "updatedAt": "2024-06-28T00:00:00.000Z",
        "_id": "CONTENT_ID"
    }
    ```

### Récupérer les contenus

- **URL** : `/content`
- **Méthode** : `GET`
- **Description** : Récupère tous les contenus.
- **Réponse réussie** :
    ```json
    [
        {
            "_id": "CONTENT_ID",
            "title": "Titre du contenu",
            "body": "Contenu détaillé",
            "author": {
                "_id": "AUTHOR_ID",
                "username": "exampleuser"
            },
            "createdAt": "2024-06-28T00:00:00.000Z",
            "updatedAt": "2024-06-28T00:00:00.000Z"
        }
    ]
    ```

## Médias

### Télécharger un fichier

- **URL** : `/media/upload`
- **Méthode** : `POST`
- **Description** : Télécharge un fichier.
- **En-tête** : `Authorization: Bearer JWT_TOKEN`
- **Formulaire multipart** :
    - `file` : fichier à télécharger
- **Réponse réussie** :
    ```json
    {
        "file": {
            "fieldname": "file",
            "originalname": "example.jpg",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "destination": "uploads/",
            "filename": "file-1625162471930.jpg",
            "path": "uploads/file-1625162471930.jpg",
            "size": 12345
        }
    }
    ```

## Configuration de l'environnement

Pour démarrer le backend, assurez-vous que le fichier `.env` est correctement configuré avec les informations suivantes :

```
PORT=5000
DB_URI=mongodb://localhost:27017/my_vitrine_site
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

### Démarrer le serveur

Exécutez les commandes suivantes pour démarrer le serveur :

```bash
npm install
npm start
```

Le serveur sera accessible à `http://localhost:5000`.

## Dépendances du projet

- `express` : Framework web pour Node.js
- `mongoose` : ODM pour MongoDB
- `bcryptjs` : Cryptage des mots de passe
- `jsonwebtoken` : Génération et vérification des tokens JWT
- `dotenv` : Chargement des variables d'environnement
- `multer` : Téléchargement de fichiers
- `winston` : Journalisation
- `morgan` : Journalisation des requêtes HTTP
- `cors` : Partage des ressources entre origines multiples
- `body-parser` : Analyse des corps de requêtes

Pour toute question ou problème, veuillez contacter l'équipe backend.