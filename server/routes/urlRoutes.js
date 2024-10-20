const express = require('express');
const { getUrl, shortenUrl } = require('../controllers/url');
const router = express.Router();
// const urlController = require('../controllers/url');

router.post('/shorten', shortenUrl);
router.get('/:shortCode',getUrl);

module.exports = router;