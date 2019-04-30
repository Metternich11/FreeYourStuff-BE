const App = require('./app')
const app = App.create()
const request = require('supertest')
const mocks = require('./tests/mocks')
const mongoose = require('mongoose')

afterAll(async () => {
  // This has been temporarily commented out because
  // performing a GET request to /getStuff inside the /update test was
  // returning an empty array.
  await mongoose.connection.db.dropDatabase()
  App.close()
})

describe('⭐️ ROUTES: HTTP Responses', () => {
  test('should respond with HTTP 200 – /getStuff', async () => {
    await request(app)
      .get('/getStuff')
      .expect(200)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true)
      })
  })

  test('should respond with HTTP 200 – /create', async () => {
    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(mocks.stuff)
      })
  })

  test('should respond with HTTP 204 – /update', async () => {
    let idNumber

    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => (idNumber = res.body._id))

    await request(app)
      .put(`/update/${idNumber}`)
      .send({
        tags: ['randomVal4353', 'randomVal6313']
      })
      .set('Content-Type', 'application/json')
      .expect(204)
  })

  test('should respond with HTTP 204 – /delete', async () => {
    let idNumber

    await request(app)
      .post('/create')
      .send(mocks.stuff)
      .expect(200)
      .then(res => res.body._id)
      .then(id => (idNumber = id))

    await request(app)
      .delete(`/delete/${idNumber}`)
      .set('Content-Type', 'application/json')
      .expect(204)
  })
})

describe('⭐️ GET: Edge cases – /getStuff', () => {
  test('should only get data based upon current user permissions', async () => {
    // USER SHOULD ONLY BE ABLE TO ACCESS DATA BELONGING TO THEM
    expect(1).toBe(2)
  })

  test("should 404 if a user tries to access another user's data", async () => {
    // NO INFORMATION SHOULD BE SUPPLIED TO THE USER INFORMING THEM ABOUT THE
    // EXISTENCE OF ANOTHER USER'S DATA.
    expect(1).toBe(2)
  })
})

describe('⭐️ CREATE: Edge cases – /create', () => {
  test('should only create data for the current user', async () => {
    // USER SHOULD ONLY BE ABLE TO CREATE DATA RETRIEVABLE BY THEMSELVES
    expect(1).toBe(2)
  })
})

describe('⭐️ UPDATE: Edge cases – /update/:id', () => {
  test('should update data in a way that honours the schema', async () => {
    await request(app)
      .get('/getStuff')
      .expect(200)
      .then(res => {
        let lastUpdated = res.body[res.body.length - 1]
        expect(lastUpdated['tags']).toEqual(['randomVal4353', 'randomVal6313'])
      })
  })

  test('should only update an item if the user permissions are correct', async () => {
    // USER SHOULD ONLY BE ABLE TO UPDATE AN ITEM BELONGING TO THEM
    expect(1).toBe(2)
  })
})

describe('⭐️ DELETE: Edge cases – /delete/:id', () => {
  test('should delete data as the user intended', async () => {
    // WHEN A DELETE REQUEST IS MADE, IT SHOULD SUCCESSFULLY DELETE THE ITEM
    expect(1).toBe(2)
  })

  test('should only delete an item if the user permissions are correct', async () => {
    // USER SHOULD ONLY BE ABLE TO UPDATE AN ITEM BELONGING TO THEM
    expect(1).toBe(2)
  })
})
