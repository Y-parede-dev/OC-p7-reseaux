const express = require("express");
const router = express.Router();
const commentCtrl = require("../controleurs/comment");

router.post('/:id', commentCtrl.postComment);
router.get('/',commentCtrl.getComment);
//router.get('/:post_id', commentCtrl.getCommentOnePost);

module.exports = router;