const Post = require("../models/post.model");

//creat a post
exports.createPost = (req, res) => {
  const post = new Post({
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
  });

  post
    .save()
    .then((result) => {
      res.status(200).json({
        message: "post created",
        username: result.username,
        useraid: result._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "something went wrong!",
      });
    });
};

//get all posts
exports.getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      res.status(200).json({
        posts: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

//get post by id
exports.getPostById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(500).json({
          message: "post not found",
        });
      }
      return res.status(200).json(post);
    })
    .catch((err) => {
      return res.status(401).json({
        message: "you are not authenticated!",
      });
    });
};
