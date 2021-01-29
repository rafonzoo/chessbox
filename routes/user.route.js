const user = require('../controllers/user.controller');
const post = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();

router.post('/', user.create);
router.get('/', user.findAll);
router.get('/:id', user.findOne);

router.post('/post/:id', post.create);
router.delete('/post/:id', post.delete);

module.exports = router;