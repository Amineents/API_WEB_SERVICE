const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.addLike);
router.delete('/', likeController.removeLike);

module.exports = router;
