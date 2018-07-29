'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({version: 'v1'});
});



router.use('/fetch', require('./fetch.api'));
router.use('/download', require('./download.api'));

module.exports = router;