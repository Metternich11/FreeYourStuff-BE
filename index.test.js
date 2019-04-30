const App = require('./app');
const app = App.create();
const request = require('supertest');
const mocks = require('./tests/mocks');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  App.close();
});

describe('⭐️ ROUTES: HTTP Responses', () => {
  test('should respond with HTTP 200 – /getStuff', async () => {
    await request(app)
      .get('/getStuff')
      .expect(200)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  test('should respond with HTTP 200 – /create', async () => {
    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(mocks.stuff);
      });
  });

  test('should respond with HTTP 204 – /update', async () => {
    let idNumber;

    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => (idNumber = res.body._id));

    await request(app)
      .put(`/update/${idNumber}`)
      .send({
        tags: ['randomVal4353', 'randomVal6313']
      })
      .set('Content-Type', 'application/json')
      .expect(204);
  });

  test('should respond with HTTP 204 – /delete', async () => {
    let idNumber;
    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => res.body._id)
      .then(id => (idNumber = id));

    await request(app)
      .delete(`/delete/${idNumber}`)
      .set('Content-Type', 'application/json')
      .expect(204);
  });

  test('should respond with HTTP 201 – /signUp', async () => {
    await request(app)
      .post('/signUp')
      .send(mocks.user)
      .expect(201);
  });

  test('should respond with HTTP 200 – /signIn', async () => {
    await request(app)
      .post('/signIn')
      .send(mocks.user)
      .expect(200);
  });
});

describe('⭐️ SIGN-UP /signUp', () => {
  test.todo('should ');
});
