const fs = require('fs');
const path = require('path');

const router = require('express').Router();
const userRoutes = require('./api/user');

router.use(userRoutes);

module.exports = router;