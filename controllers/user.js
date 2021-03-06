const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//importing user model

const User = require("../models/user.model");

//signup controller
exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user created!",
          username: result.username,
          userId: result._id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

//login controller
exports.findUser = (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }

      //setting token
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          username: fetchedUser.username,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "user found",
        username: fetchedUser.username,
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth Failed!",
        erorr: err,
      });
    });
};
