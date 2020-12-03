const Comment = require("../models/comment.model");

// create a new  comment
exports.comments = (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.userData.userId,
    username: req.userData.username,
  });
  // console.log(comment);
  comment
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json({
        message: "something went wrong!",
      });
    });
};

//get comment by postid
exports.getCommentByPostId = (req, res) => {
  const { id } = req.params;
  Comment.find({ postId: id }).then(
    (comments) => {
      if (!comments) {
        return res.status(500).json({
          message: "no comment found",
        });
      }
      //console.log(comments);
      return res.status(200).json({ comments: comments });
    },
    (err) => {
      return res.status(500).json({
        msg: "something went wrong!",
      });
    }
  );
};

//get count
exports.getCount = (req, res) => {
  const { id } = req.params;
  Comment.count({ postId: id }).then((count) => {
    return res.json(count);
  });
};

//get a comment
exports.getComment = (req, res) => {
  const { id } = req.params;
  Comment.findById(id)
    .then((comment) => {
      if (!comment) {
        return res.status(500).json({
          message: "no comment found!",
        });
      }
      return res.status(200).json(comment);
    })
    .catch((err) => {
      res.json(err);
    });
};

//update a comment
exports.updateComment = (req, res) => {
  const comment = new Comment({
    _id: req.params.id,
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.userData.userId,
    username: req.userData.username,
  });
  Comment.updateOne({ _id: req.params.id }, comment)
    .then((comment) => {
      return res.status(200).json({
        comment: comment,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//deleting one

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Comment.findOneAndDelete({ _id: id })
    .then((comment) => {
      if (!comment) {
        return res.status(500).json({
          message: "comment not found",
        });
      }
      return res.status(200).json(comment);
    })
    .catch((err) => {
      return res.statuse(500).json(err);
    });
};
