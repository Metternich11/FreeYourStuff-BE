const App = require('./app');
const app = App.create();
const request = require('supertest');
const mocks = require('./tests/mocks');


afterAll(App.close);

describe('routes: /getStuff', () => {

  test('should respond as expected', () => {
    request(app)
      .get('/getStuff')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        console.log(res);
      })
      // .expect(Array.isArray(response.body)).toBe(true)
    // const response = await request(app).get('/getStuff');
    // expect(response.status).toEqual(200);
    // expect(Array.isArray(response.body)).toBe(true);
  });

  // test('should respond as expected', async () => {
  //   request(app)
  //     .post('/create')
  //     .send(mocks.stuff)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       console.log(res);
  //     })
  //   });
})

// describe('routes: /create', () => {
//   test('should respond as expected', async () => {
//     request(app)
//       .post('/create')
//       .send(mocks.stuff)
//       .expect(200)
//       .end((err, res) => {
//         if (err) throw err;
//         console.log(res);
//       })
      // .expect(response => console.log('🎁: ', response))

      // .expect(res.body).to.be.not.undefined;
      // .end(function(err, res) {
      //
      //     done();
      // })

  // });
// });

// describe('routes: /update/:id', () => {
//   test('should respond as expected', async () => {
//     const response = await request(app).get('/update/5cc31e33abff1a0013d1b7ba');
//     expect(response.status).toEqual(204);
//   });
// });
//
// describe('routes: /delete/:id', () => {
//   test('should respond as expected', async () => {
//     const response = await request(app).get('/delete');
//     expect(response.status).toEqual(204);
//   });
// });
