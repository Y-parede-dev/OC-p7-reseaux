const express = require('express');
const router = express.Router();
const postCtrl = require('../controleurs/post');

router.post('/', postCtrl.newPost);
router.get('/', postCtrl.getAllPost);
router.get('/user', postCtrl.getOneUserPost);
router.put('/:id',postCtrl.modifyPost);
router.delete('/:id',postCtrl.deletePost);


module.exports = router;