const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createContent, getAllContent, getContentById, updateContent, deleteContent } = require('../controllers/contentController');

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: API pour la gestion du contenu
 */

/**
 * @swagger
 * /content:
 *   post:
 *     summary: Crée un nouveau contenu
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contenu créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 author:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Non autorisé
 */
router.post('/', auth, createContent);

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Récupère tous les contenus
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Liste de contenus récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get('/', getAllContent);

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Récupère un contenu par ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contenu
 *     responses:
 *       200:
 *         description: Contenu récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Contenu non trouvé
 */
router.get('/:id', getContentById);

/**
 * @swagger
 * /content/{id}:
 *   put:
 *     summary: Met à jour un contenu par ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contenu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenu mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Contenu non trouvé
 */
router.put('/:id', auth, updateContent);

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Supprime un contenu par ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du contenu
 *     responses:
 *       200:
 *         description: Contenu supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Contenu non trouvé
 */
router.delete('/:id', auth, deleteContent);

module.exports = router;