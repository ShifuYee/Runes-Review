'use strict';
const router = require('express').Router();

router.get('/hello', (req, res) => res.send({ hello: 'world' }));

module.exports = router;
