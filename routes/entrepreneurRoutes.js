const express = require('express');
const router = express.Router();
const entrepreneurController = require('../controllers/entrepreneurController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: Entrepreneurs
 *   description: API pour la gestion des inscriptions des entrepreneurs
 *
 * components:
 *   schemas:
 *     Entrepreneur:
 *       type: object
 *       required:
 *         - fullName
 *         - birthDate
 *         - nationality
 *         - gender
 *         - email
 *         - phoneNumber
 *         - status
 *         - sector
 *         - experience
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de l'entrepreneur
 *         fullName:
 *           type: string
 *           description: Nom complet de l'entrepreneur
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date de naissance de l'entrepreneur
 *         nationality:
 *           type: string
 *           description: Nationalité de l'entrepreneur
 *         gender:
 *           type: string
 *           description: Sexe de l'entrepreneur
 *         email:
 *           type: string
 *           description: E-mail de l'entrepreneur
 *         phoneNumber:
 *           type: string
 *           description: Numéro de téléphone de l'entrepreneur
 *         status:
 *           type: string
 *           description: Statut d'activité de l'entrepreneur
 *         sector:
 *           type: string
 *           description: Secteur d'activité de l'entrepreneur
 *         experience:
 *           type: number
 *           description: Expérience dans le business en années
 */

/**
 * @swagger
 * /entrepreneurs/register:
 *   post:
 *     summary: Inscrit un nouvel entrepreneur à la file d'attente
 *     tags: [Entrepreneurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entrepreneur'
 *     responses:
 *       201:
 *         description: Inscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrepreneur'
 *       500:
 *         description: Erreur lors de l'inscription
 */
router.post('/register', entrepreneurController.registerEntrepreneur);

/**
 * @swagger
 * /entrepreneurs:
 *   get:
 *     summary: Liste de tous les entrepreneurs (accès administrateur uniquement)
 *     tags: [Entrepreneurs]
 *     responses:
 *       200:
 *         description: Liste des entrepreneurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrepreneur'
 *       403:
 *         description: Accès interdit
 */
router.get('/', auth, admin, entrepreneurController.getEntrepreneurs);

module.exports = router;