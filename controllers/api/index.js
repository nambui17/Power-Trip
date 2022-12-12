const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const destinationRoutes = require('./destinationRoutes');
const imageRoutes = require('./imageRoutes');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/destinations', destinationRoutes);
router.use('/images', imageRoutes);

module.exports = router;