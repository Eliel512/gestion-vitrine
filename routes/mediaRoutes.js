const express = require('express');
const router = express.Router();
const multer = require('multer');
const mediaController = require('../controllers/mediaController');
const auth = require('../middleware/auth');

// Configuration de multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: API pour la gestion des médias
 * 
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       required:
 *         - filename
 *         - path
 *         - mimetype
 *         - size
 *       properties:
 *         _id:
 *           type: string
 *           description: ID du média
 *         name:
 *           type: string
 *           description: Nom personnalisé du média
 *         filename:
 *           type: string
 *           description: Nom de fichier d'origine
 *         path:
 *           type: string
 *           description: Chemin du fichier sur le serveur
 *         mimetype:
 *           type: string
 *           description: Type MIME du fichier
 *         size:
 *           type: number
 *           description: Taille du fichier en octets
 *         uploadedBy:
 *           type: string
 *           description: ID de l'utilisateur ayant téléchargé le média
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du média
 */

/**
 * @swagger
 * /media/upload:
 *   post:
 *     summary: Télécharge un fichier média
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fichier média téléchargé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       500:
 *         description: Erreur lors du téléchargement du média
 */
router.post('/upload', auth, upload.single('file'), mediaController.uploadMedia);

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Supprime un média par ID
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du média à supprimer
 *     responses:
 *       200:
 *         description: Média supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Média non trouvé
 *       500:
 *         description: Erreur lors de la suppression du média
 */
router.delete('/:id', auth, mediaController.deleteMediaById);

module.exports = router;