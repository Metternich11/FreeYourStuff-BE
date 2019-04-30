const User = require('../db/userModel');

module.exports.signUp = async (ctx, next) => {
  let user = await new User(ctx.request.body);
  user.save();
  ctx.body = user;
  ctx.status = 200;
  await next();
};
