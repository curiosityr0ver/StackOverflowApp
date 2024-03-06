const express = require('express');
const router = express.Router();
const { fetchAns, fetchSingleAns, fetchMyAns, createAns, updateAns, deleteAns } = require('./ansController');
const validateAns = require('./ansSchema');
const verifyToken = require('../../middleware/verifyToken');


router.get('/', fetchAns);
router.get('/my', verifyToken, fetchMyAns);
router.get('/:id', fetchSingleAns);
router.post('/', validateAns, verifyToken, createAns);
router.put('/:id', validateAns, verifyToken, updateAns);
router.delete('/:id', verifyToken, deleteAns);

module.exports = router;