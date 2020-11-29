const express = require("express");

const postRouter = express.Router();

const postController = require("../controllers/post.controller");

postRouter.post("/create-post", postController.createPost);
postRouter.get("/posts", postController.getPosts);

module.exports = postRouter;
