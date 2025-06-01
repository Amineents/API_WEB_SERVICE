const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/', postController.getAllPosts);

router.put('/:id/increment-likes', postController.incrementLikes);

module.exports = router;
