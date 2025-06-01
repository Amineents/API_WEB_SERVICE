const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userName: { type: String, required: true }, // L'utilisateur qui a créé le post
    content: { type: String, required: true },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
