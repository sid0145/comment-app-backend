const express = require("express");
const commentRouter = express.Router();
const checkAuth = require("../middleware/auth-check");
const commentController = require("../controllers/comment.controller");

//create new comment with postid , and comment data
commentRouter.post("/comments", checkAuth, commentController.comments);

//get comment according to the post
commentRouter.get(
  "/commentBypostId/:id",
  checkAuth,
  commentController.getCommentByPostId
);

//get a particular comment
commentRouter.get("/comment/:id", checkAuth, commentController.getComment);

//updating a comment
commentRouter.put("/comment/:id", checkAuth, commentController.updateComment);
commentRouter.delete(
  "/comments/:id",
  checkAuth,
  commentController.deleteComment
);

module.exports = commentRouter;
