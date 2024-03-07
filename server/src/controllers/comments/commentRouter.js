const express = require('express');
const router = express.Router();
const { fetchComments, fetchSingleComment, createComment, updateComment, deleteComment } = require('./commentController');
// const validateComment = require('../../models/commentsSchema');
// const verifyToken = require('../utils/verification');
const verifyToken = require('../../middleware/verifyToken');
const validateComment = require('../comments/commentsSchema');



router.get('/', fetchComments);
router.get('/:id', fetchSingleComment);
router.post('/', verifyToken, createComment); //comment for answer

// router.post('/:id', verifyToken,validateComment, createCommentforComment); //comment for a comment

router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);



module.exports = router;