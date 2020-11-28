const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/user.controller");

userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.findUser);

module.exports = userRouter;
