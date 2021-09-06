const { Post } = require('../../models/index');

// Post CRUD
const postController = {
  create: async (req, res) => {
    let result, post;
    try {
      post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
      });
      result = {
        success: true,
        msg: 'Publicación creada',
        post: post,
      };
      return res.status(201).json(result);
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
  list: async (req, res) => {
    let result, posts;
    try {
      posts = await Post.findAll();
      result = { success: true, posts: posts };
      return res.status(200).json(posts);
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
  show: async (req, res) => {
    let result;
    try {
      result = { success: true, post: req.post };
      return res.status(200).json(result);
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
  update: async (req, res) => {
    let result;
    try {
      req.post.title = req.body.title;
      req.post.body = req.body.body;
      req.post = await req.post.save();
      result = { success: true, post: req.post };
      return res.status(200).json(result);
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
  delete: async (req, res) => {
    let result;
    try {
      req.post.destroy();
      result = { success: true, msg: 'La publicación ha sido eliminada' };
      return res.status(200).json(result);
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
  // Find funciona como un middleware
  find: async (req, res, next) => {
    let post, result;
    try {
      post = await Post.findByPk(req.params.id);
      if (!post) {
        result = { success: false, msg: 'No se encontró la publicación' };
        return res.status(404).json(result);
      }
      req.post = post;
      next();
    } catch (err) {
      result = { success: false, msg: err };
      return res.status(500).json(result);
    }
  },
};

module.exports = postController;
