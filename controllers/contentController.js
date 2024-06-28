const Content = require('../models/Content');

// Crée un nouveau contenu
const createContent = async (req, res) => {
    try {
        const { title, body } = req.body;
        const content = new Content({
            title,
            body,
            author: req.user.id,
        });
        await content.save();
        res.status(201).json(content);
    } catch (err) {
        res.status(500).json({ error: 'Erreur de création du contenu' });
    }
};

// Récupère tous les contenus
const getAllContent = async (req, res) => {
    try {
        const contents = await Content.find().populate('author', 'username');
        res.status(200).json(contents);
    } catch (err) {
        res.status(500).json({ error: 'Erreur de récupération des contenus' });
    }
};

// Récupère un contenu par ID
const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id).populate('author', 'username');
        if (!content) {
            return res.status(404).json({ error: 'Contenu non trouvé' });
        }
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ error: 'Erreur de récupération du contenu' });
    }
};

// Met à jour un contenu par ID
const updateContent = async (req, res) => {
    try {
        const { title, body } = req.body;
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ error: 'Contenu non trouvé' });
        }
        if (content.author.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Non autorisé' });
        }
        content.title = title || content.title;
        content.body = body || content.body;
        await content.save();
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ error: 'Erreur de mise à jour du contenu' });
    }
};

// Supprime un contenu par ID
const deleteContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ error: 'Contenu non trouvé' });
        }
        if (content.author.toString() !== req.user.id || req.user.role !== 'admin') {
            return res.status(401).json({ error: 'Non autorisé' });
        }
        await content.remove();
        res.status(200).json({ message: 'Contenu supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur de suppression du contenu' });
    }
};

module.exports = {
    createContent,
    getAllContent,
    getContentById,
    updateContent,
    deleteContent
};