const express = require("express");

const postRouter = express.Router();

const checkAuth = require("../middleware/auth-check");

const postController = require("../controllers/post.controller");

postRouter.post("/create-post", checkAuth, postController.createPost);
postRouter.get("/posts", postController.getPosts);
postRouter.get("/post/:id", postController.getPostById);

module.exports = postRouter;
