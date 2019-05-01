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
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  if (!username) return await next();

  const userFromDb = await User.findOne({ username: username });
  let result = await bcrypt.compare(password, userFromDb.password);
  console.log('🎁 RESULT: ', result);

  ctx.response.body = userFromDb;

  if (!ctx.response.body) {
    ctx.status = 401;
    return;
  }
  ctx.status = 200;

  await next();
};
