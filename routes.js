const express = require("express");
const Post = require("./models/Post");
const Food = require("./models/Food")
const router = express.Router();
const handleError = require("./common/handleError")
const { register, login, logout } = require("./api/controller/UserControllers")
const { UserValidator } = require("./api/validates/auth")
const {requiresLogout, requiresLogin}  = require("./common/checkSession")

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title , 
    content: req.body.content 
  });
  await post.save();
  res.send(post);
});

router.get("/posts/:id", async (req, res) => { 
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.get("/foods", async (req, res) => {
  const foods = await Food.find();
  res.send(foods);
});

//auth
router.post('/register', UserValidator, register)
router.post('/login', requiresLogout, login)
router.post('/logout', requiresLogin, logout)

module.exports = router;
