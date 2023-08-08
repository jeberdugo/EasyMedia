var express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var app = express.Router();

/* GET users listing. */
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req)

  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating the user' + ' Error:' + err });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  

  try {
    // Find the user by username
    const user = await User.findOne({ where: { email } });

    // If the user is not found or the password is incorrect, send an error response
    if (!user || !(password === user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token
    const token = generateAccessToken({ userId: user.id, name: user.name });;

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error during login'  + err});
  }
});

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}



module.exports = app;
