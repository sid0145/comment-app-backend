const express = require("express");
const multiCommentRouter = express.Router();

const checkAuth = require("../middleware/auth-check");
const multiCommentController = require("../controllers/multiComment");

//create new comment with postid , and comment data and commentId
multiCommentRouter.post(
  "/createMulti",
  checkAuth,
  multiCommentController.multiComments
);

//get comment with post id
multiCommentRouter.get(
  "/getComments/:id",
  checkAuth,
  multiCommentController.getComments
);

//get one nested comment
multiCommentRouter.get(
  "/getNestedComment/:id",
  checkAuth,
  multiCommentController.getOneComment
);

//update a comment
multiCommentRouter.put(
  "/updateNestedComment/:id",
  checkAuth,
  multiCommentController.updateNestComment
);

//delete a nested comment
multiCommentRouter.delete(
  "/multiComment/:id",
  checkAuth,
  multiCommentController.deleteComments
);

module.exports = multiCommentRouter;
