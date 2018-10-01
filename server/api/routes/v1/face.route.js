const express = require('express');
const controller = require('../../controllers/face.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.route('/load')
  .get(controller.load);

module.exports = router;
