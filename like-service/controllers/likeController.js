const Like = require('../models/Like'); // ← Cette ligne manque !
const axios = require('axios');

// Ajouter un like
exports.addLike = async (req, res) => {
    try {
        const { postId, userName } = req.body;

        const like = new Like({ postId, userName });
        await like.save();

        try {
            await axios.put(`${process.env.POSTS}/api/posts/${postId}/increment-likes`, { amount: 1 });
        } catch (err) {
            // Si le postId est invalide, annuler le like ajouté et renvoyer l'erreur
            await Like.deleteOne({ postId, userName });
            const status = err.response?.status || 500;
            const message = err.response?.data?.message || 'Erreur lors de l’incrémentation des likes.';
            return res.status(status).json({ message });
        }

        res.status(201).json({ message: 'Like ajouté.' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Déjà liké.' });
        }
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};

// Supprimer un like
exports.removeLike = async (req, res) => {
    try {
        const { postId, userName } = req.body;

        const result = await Like.findOneAndDelete({ postId, userName });
        if (!result) return res.status(404).json({ message: 'Like non trouvé.' });

        try {
            await axios.put(`${process.env.POSTS}/api/posts/${postId}/increment-likes`, { amount: -1 });
        } catch (err) {
            // On ignore ici l’échec d’incrémentation, mais on peut aussi logguer ou annuler la suppression si besoin
            const status = err.response?.status || 500;
            const message = err.response?.data?.message || 'Erreur lors de la décrémentation des likes.';
            return res.status(status).json({ message });
        }

        res.status(200).json({ message: 'Like supprimé.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};
