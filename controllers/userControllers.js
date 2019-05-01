const User = require('../db/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Required for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signUp = async (ctx, next) => {
  const user = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  };
  const password = await bcrypt.hash(user.password, saltRounds);
  user.password = password;
  let newUser = await new User(user);
  await newUser.save();
  ctx.status = 201;
  await next();
};

module.exports.signIn = async (ctx, next) => {
  const userDb = await User.findOne({ username: ctx.request.body.username });
  if (!userDb) {
    ctx.status = 404;
    ctx.response.body = { message: 'not found' };
  } else {
    let result = await bcrypt.compare(
      ctx.request.body.password,
      userDb.password
    );
    if (result) {
      ctx.status = 200;

      const token = await jwt.sign(
        { userID: userDb._id },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
      );
      ctx.response.body = { token: token };
    } else {
      ctx.status = 404;
      ctx.response.body = { message: 'wrong password' };
    }
  }
  await next();
};

module.exports.myStuff = async (ctx, next) => {
  const token = ctx.header.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    ctx.status = err ? 401 : 200;
  });
};
