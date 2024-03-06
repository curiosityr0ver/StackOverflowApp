const express = require('express');
const router = express.Router();
const { fetchUsers, fetchSingleUser, createUser, updateUser, deleteUser } = require('./userController');
const validateUser = require('./usersSchema');
const verifyToken = require('../../middleware/verifyToken');

// getSingleUser, createUser, updateUser,deleteUser
router.get('/', fetchUsers);
router.get('/:id', fetchSingleUser);
router.post('/', validateUser, verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);


module.exports = router;