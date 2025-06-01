const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recoveryHint: { type: String }, // pour rappel de mot de passe
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
