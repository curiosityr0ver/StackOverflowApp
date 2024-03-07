const express = require('express');
const router = express.Router();
const { fetchAns, fetchSingleAns, fetchSingleQuesAns, fetchMyAns, createAns, updateAns, deleteAns } = require('./ansController');
const validateAns = require('./ansSchema');
const verifyToken = require('../../middleware/verifyToken');


router.get('/', fetchAns);
router.get('/my', verifyToken, fetchMyAns);
router.get('/ques/:id', fetchSingleQuesAns);
// router.post('/', validateAns, verifyToken, createAns);
router.post('/', verifyToken, createAns);

router.get('/:id', fetchSingleAns);
router.put('/:id', validateAns, verifyToken, updateAns);
router.delete('/:id', verifyToken, deleteAns);

module.exports = router;