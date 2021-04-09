const express = require('express');
const router = express.Router();
const likeCtrl = require('../controleurs/likes');

router.post('/post/:id/like', likeCtrl.like);
router.get('/:id', likeCtrl.Getlike);

module.exports = router;