const express = require('express');
const router = express.Router();

const fetchSearchedResults = require('./searchController')

router.get('/', fetchSearchedResults )


module.exports = router;