var express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const Post = require('../models/Post');
var app = express.Router();

const verifyToken = (req, res, next) => {
  const token2 = req.header('Authorization');
  const token = token2.split(' ')[1]
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }


  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' + err });
    }

    req.userId = decodedToken.userId;
    next();
  });
};

app.get('/', verifyToken , async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['timestamp', 'DESC']] });
    for(post in posts){
      const user = await User.findByPk(posts[post].author);
      posts[post].author = user.name;
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
});

app.get('/fecha/:date', verifyToken, async (req, res) => {
  const date = req.params.date;
  const user = await User.findByPk(req.userId);

  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  const author = user.id;

  if (date !== "null") {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    console.log(startDate);

    try {
      const posts = await Post.findAll({
        where: {
          author,
          timestamp: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          },
        },
        order: [['timestamp', 'DESC']],
      });
      for(post in posts){
        const user = await User.findByPk(posts[post].author);
        posts[post].author = user.name;
      }

      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving user posts' + err });
    }
  } else {
    try {
      const posts = await Post.findAll({ where: { author }, order: [['timestamp', 'DESC']] });
      for(post in posts){
        const user = await User.findByPk(posts[post].author);
        posts[post].author = user.name;
      }
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving user posts' + err });
    }
  }
});

app.get('/:word/:date', verifyToken, async (req, res) => {
  const keyword = req.params.word;
  const date = req.params.date
  const whereClause = {};

  if (keyword) {
    whereClause.content = { [Op.substring]: keyword };
  }

  if(date !== "null"){
    
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    try {
      const posts = await Post.findAll({
        where: {
          
          timestamp: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          }
        },
        order: [['timestamp', 'DESC']],
      },whereClause);
      for(post in posts){
        const user = await User.findByPk(posts[post].author);
        posts[post].author = user.name;
      }
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving user posts' + err });
    }
  }
  else{
    try {
      const posts = await Post.findAll({ where: whereClause });
      for(post in posts){
        const user = await User.findByPk(posts[post].author);
        posts[post].author = user.name;
      }
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving posts.' + err});
    }
  }
});

app.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if the authenticated user exists in the database
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    const author = user.id;
    const newPost = await Post.create({ author, title, content });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error creating the post' + err });
  }
});


module.exports = app;
