const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//all importing file congiguration
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

const PORT = 9000;
const app = express();

//datbase configuration
mongoose
  .connect(
    "mongodb+srv://Sid:jBWcaYOiVj9oZw9M@cluster0.xz4rb.mongodb.net/comment-app-db?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//incoming data parser ith body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,OPTIONS"
  );
  next();
});

//definging end points
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);

app.listen(PORT, () => {
  console.log(`server is listing port: ${PORT}`);
});
