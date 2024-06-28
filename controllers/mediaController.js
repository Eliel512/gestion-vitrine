const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

// Télécharge un fichier média
const uploadMedia = async (req, res) => {
    try {
        const { filename, path: filePath, mimetype, size } = req.file;
        const { name } = req.body; // Le nom personnalisé du média (facultatif)

        const media = new Media({
            name: name || filename, // Utilise le nom personnalisé s'il est fourni, sinon utilise le nom de fichier
            filename,
            path: filePath,
            mimetype,
            size,
            uploadedBy: req.user.id // Supposons que vous ayez un middleware d'authentification qui ajoute req.user
        });

        await media.save();
        res.status(201).json(media);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors du téléchargement du média' });
    }
};

// Supprime un média par ID
const deleteMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ error: 'Média non trouvé' });
        }

        // Vérifie si l'utilisateur est autorisé à supprimer le média (ajoutez votre logique d'autorisation appropriée)
        if(media.uploadedBy.toString() !== req.user.id || req.user.role !== 'admin'){
            return res.status(401).json({ error: 'Non autorisé' });
        }

        // Supprime le fichier du système de fichiers
        fs.unlinkSync(path.join(__dirname, '..', media.path));

        // Supprime le média de la base de données
        await media.remove();

        res.status(200).json({ message: 'Média supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression du média' });
    }
};

module.exports = {
    uploadMedia,
    deleteMediaById
};