const MultiComment = require("../models/multiComment.model");

// create a new nested comment comment
exports.multiComments = (req, res) => {
  const comment = new MultiComment({
    comment: req.body.comment,
    postId: req.body.postId,
    commentId: req.body.commentId,
    userId: req.userData.userId,
    username: req.userData.username,
  });
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

// get nested comments with post id
exports.getComments = (req, res) => {
  const { id } = req.params;
  MultiComment.find({ postId: id }).then(
    (comments) => {
      if (!comments) {
        return res.status(500).json({
          message: "no comment found",
        });
      }
      console.log(comments);
      return res.status(200).json({ comments: comments });
    },
    (err) => {
      return res.status(500).json({
        msg: "something went wrong!",
      });
    }
  );
};

//get one nested comment by id

exports.getOneComment = (req, res) => {
  const { id } = req.params;
  console.log(id);
  MultiComment.findById(id)
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

//delete handler here
exports.deleteComments = (req, res) => {
  const { id } = req.params;
  MultiComment.findOneAndDelete({ _id: id })
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

//update nested comment
exports.updateNestComment = (req, res) => {
  const comment = new MultiComment({
    _id: req.params.id,
    commentId: req.body.commentId,
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.userData.userId,
    username: req.userData.username,
  });
  console.log(comment);
  MultiComment.updateOne({ _id: req.params.id }, comment)
    .then((comment) => {
      return res.status(200).json({
        comment: comment,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
