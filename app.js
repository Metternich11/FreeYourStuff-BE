require('dotenv').config();
const http = require('http');

const Koa = require('koa');
const app = new Koa();

const cors = require('kcors');
const bodyparser = require('koa-body');
const errorHandler = require('./errorHandler');
const router = require('./router');

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
let server;

function create () {
  const options = {
    useNewUrlParser: true
  };

  mongoose.connect(
    process.env.DATABASE,
    options
  );

  app
    .use(cors())
    .use(bodyparser())
    .use(errorHandler)
    .use(router.routes());

  return (server = app.listen(port, () => {
    console.log(`🚀 Server Running on ${port}`);
  }));
}

async function close () {
  await mongoose.disconnect();
  await new Promise(resolve => server.close(resolve));
}

module.exports = {
  create,
  close
};
