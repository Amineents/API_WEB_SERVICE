const Post = require('../models/Post');
const axios = require('axios');
 
//creer un post 
exports.createPost = async (req, res) => {
    try {
        const { userName, content } = req.body;

        //  Vérifie si l'utilisateur existe dans auth-service
        const response = await axios.get(`${process.env.USERS}/api/auth/exists/${userName}`);
        if (!response.data.exists) {
            return res.status(404).json({ message: "Utilisateur introuvable dans auth-service." });
        }

        //  Création du post si l'utilisateur existe
        const post = new Post({ userName, content });
        await post.save();

        res.status(201).json({ message: 'Post créé avec succès.', post });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};


// Mettre à jour un post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        console.log('Tentative de mise à jour avec ID :', id);


        const post = await Post.findByIdAndUpdate(id, { content }, { new: true });
        if (!post) return res.status(404).json({ message: 'Post non trouvé.' });

        res.status(200).json({ message: 'Post mis à jour.', post });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};

// Supprimer un post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);
        if (!post) return res.status(404).json({ message: 'Post non trouvé.' });

        res.status(200).json({ message: 'Post supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};

// Récupérer tous les posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};

exports.incrementLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const post = await Post.findByIdAndUpdate(
            id,
            { $inc: { likes: amount } },
            { new: true }
        ).select('-__v');

        if (!post) return res.status(404).json({ message: 'Post non trouvé.' });

        res.status(200).json({ message: 'Compteur de likes mis à jour.', post });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};
