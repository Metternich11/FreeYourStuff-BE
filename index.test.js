const App = require('./app');
const app = App.create();
const request = require('supertest');
const mocks = require('./tests/mocks');
const mongoose = require('mongoose');

let token = '';

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
      .expect(200)
      .then(res => (token = res.body.token));
  });

  test('should respond with HTTP 404 – /signIn', async () => {
    await request(app)
      .post('/signIn')
      .send(mocks.badUser)
      .expect(404);
  });

  test('should respond with HTTP 200 if the user is authorised – /me', async () => {
    await request(app)
      .get('/me')
      .set('auth', token)
      .expect(200);
  });

  test('should respond with HTTP 401 if the user is unauthorised – /me', async () => {
    await request(app)
      .get('/me')
      .set('auth', mocks.fakeToken)
      .expect(401);
  });
});

describe('⭐️  /signUp', () => {
  test.todo('should ');
});
