const express = require('express');
const router = express.Router();
const { fetchQues, fetchMyQues, fetchSingleQues, createQues, updateQues, deleteQues } = require('./quesController');
// const validateQues = require('./quesSchema');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', fetchQues);
router.get('/my', verifyToken, fetchMyQues);
router.get('/:id', fetchSingleQues);
router.post('/', verifyToken, createQues);
router.put('/:id', verifyToken, updateQues);
router.delete('/:id', verifyToken, deleteQues);


module.exports = router;