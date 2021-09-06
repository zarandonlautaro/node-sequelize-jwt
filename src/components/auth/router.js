const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/signin', controller.signIn);
router.post('/signup', controller.signUp);

module.exports = router;
