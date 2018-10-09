const express = require('express');
const faceRoutes = require('./face.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/faces', faceRoutes);

module.exports = router;
