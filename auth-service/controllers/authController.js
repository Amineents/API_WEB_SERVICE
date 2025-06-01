const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { userName, password, recoveryHint } = req.body;

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'Nom d’utilisateur déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            password: hashedPassword,
            recoveryHint
        });

        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ message: 'Nom d’utilisateur ou mot de passe incorrect.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Nom d’utilisateur ou mot de passe incorrect.' });


        res.status(200).json({ message: 'Connexion réussie.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { userName, recoveryHint, newPassword } = req.body;

        const user = await User.findOne({ userName });
        if (!user || user.recoveryHint !== recoveryHint) {
            return res.status(400).json({ message: 'Informations de récupération incorrectes.' });
        }

        const sameAsOld = await bcrypt.compare(newPassword, user.password);
        if (sameAsOld) {
            return res.status(400).json({ message: 'Le nouveau mot de passe doit être différent de l’ancien.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
};

exports.checkUserExists = async (req, res) => {
    const { userName } = req.params;

    const user = await User.findOne({ userName });
    if (user) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
};
