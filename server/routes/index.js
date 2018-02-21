'use strict';
const router = require('express').Router();

router.use('/summoners', require('./summoners'));
router.use('/matches', require('./match'));

router.use((req, res) => res.status(404).end());

module.exports = router;
