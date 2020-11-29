const Post = require("../models/post.model");

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
