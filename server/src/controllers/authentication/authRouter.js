const express = require('express');
const { loginHandler, showLogin } = require('./authController');
const router = express.Router();

router.post('/login', loginHandler);
router.get('/', showLogin);


module.exports = router;
