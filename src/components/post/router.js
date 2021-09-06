const express = require('express');
const router = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middlewares/auth');
const postMiddleware = require('../../middlewares/post');

router.post('/post', authMiddleware, controller.create);
router.get('/posts', authMiddleware, controller.list);
router.get(
  '/post/:id',
  authMiddleware,
  controller.find,
  postMiddleware.show,
  controller.show,
);
router.put(
  '/post/:id',
  authMiddleware,
  controller.find,
  postMiddleware.update,
  controller.update,
);
router.delete(
  '/post/:id',
  authMiddleware,
  controller.find,
  postMiddleware.delete,
  controller.delete,
);

module.exports = router;
