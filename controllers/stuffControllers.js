const Stuff = require('../db/stuffModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.getAll = async (ctx, next) => {
  let stuffs = await Stuff.find();
  ctx.body = stuffs;
  ctx.status = 200;
  await next();
};

module.exports.create = async (ctx, next) => {
  try {
    const token = ctx.request.header.auth;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    ctx.request.body.userID = decoded.userID;
    let stuff = await new Stuff(ctx.request.body);

    stuff.save();
    ctx.body = stuff;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 401;
  }
  await next();
};

module.exports.update = async (ctx, next) => {
  try {
    const token = ctx.request.header.auth;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.userID;

    const _id = ctx.params.id;
    const stuff = ctx.request.body;

    await Stuff.findOneAndUpdate(
      { _id, userID },
      {
        $set: {
          time: stuff.time,
          picture: stuff.picture,
          tags: stuff.tags
        }
      },
      { new: true }
    );
    ctx.status = 204;
  } catch (err) {
    ctx.status = 401;
  }
  await next();
};

module.exports.delete = async (ctx, next) => {
  try {
    const token = ctx.request.header.auth;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.userID;

    const _id = ctx.params.id;
    await Stuff.remove({ _id, userID });
    ctx.status = 204;
  } catch (err) {
    ctx.status = 403;
  }
  await next();
};
