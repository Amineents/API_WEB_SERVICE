const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    userName: { type: String, required: true }
}, { timestamps: true });

likeSchema.index({ postId: 1, userName: 1 }, { unique: true }); // un utilisateur ne peut liker un post qu'une seule fois

module.exports = mongoose.model('Like', likeSchema);
