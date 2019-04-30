const User = require('../db/userModel');
const jwt = require('jsonwebtoken');

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
  newUser.save();
  ctx.status = 201;
  await next();
};

module.exports.signIn = async (ctx, next) => {
  const findUser = async function (params) {
    try {
      return await User.findOne(params);
    } catch (err) {
      console.log(err);
    }
  };
  const userDb = findUser({ username: ctx.request.body.username });
  console.log('USERDB: ', userDb);
  let result = bcrypt.compare(ctx.request.body.password, userDb.password);
  console.log('IS IT THE SAME?:', result);
  ctx.status = 200;
};
