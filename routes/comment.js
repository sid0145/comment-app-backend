const express = require("express");

const commentRouter = express.Router();

const checkAuth = require("../middleware/auth-check");

const postController = require("../controllers/post.controller");

// commentRouter.post("/comments", checkAuth, postController.comments);

module.exports = commentRouter;
