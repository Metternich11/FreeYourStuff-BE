const App = require('./app');
const app = App.create();
const request = require('supertest');
const mocks = require('./tests/mocks');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  App.close()
});

describe('ROUTES', () => {

  test('/getStuff should respond with HTTP 200', async () => {
    await request(app)
      .get('/getStuff')
      .expect(200)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true)
      })
  });

  test('/create should respond with HTTP 200', async () => {
    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(mocks.stuff)
      })

  });

  test('/update should respond with HTTP 204', async () => {
    let idNumber;

    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => idNumber = res.body._id)

    await request(app)
      .put(`/update/${idNumber}`)
      .set('Content-Type', 'application/json')
      .expect(204)
      // make sure we send the body in the put here.


    // do a get to check that the update actually worked as intended.
  });

  test('/delete should respond with HTTP 204', async () => {
    let idNumber;

    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => res.body._id)
      .then(id => idNumber = id)

    await request(app)
      .delete(`/delete/${idNumber}`)
      .set('Content-Type', 'application/json')
      .expect(204)
  });



});
