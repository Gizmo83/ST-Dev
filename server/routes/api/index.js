const router = require('express').Router();

// Require routes
const userRoutes = require('./user');

// Initialize routes
router.use('/user', userRoutes);

module.exports = router;