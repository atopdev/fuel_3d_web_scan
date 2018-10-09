const express = require('express');
const controller = require('../../controllers/face.controller');

const router = express.Router();

router.route('/load')
  .get(controller.load);

module.exports = router;
