const mocks = {
  stuff: {
    time: '2018-08-01T10:49:32.423Z',
    tags: ['motor vehicle', 'moped', 'scooter'],
    updated: 0,
    picture:
      'https://res.cloudinary.com/dh9xnvxbz/image/upload/c_fill,h_480,w_820/v1533120579/zrjn7dcll8t1wqazi71m.jpg',
    location: {
      lat: 41.3968884,
      lng: 2.1989088
    },
    address: 'Carrer de Ramon Turró, 148, 08005 Barcelona, Spain'
  },
  user: {
    username: 'McUsername',
    password: 'Bananarama'
  },
  badUser: {
    username: 'H4xx0r',
    password: 'qwertz'
  },
  fakeToken: 'notReal'
};

module.exports = mocks;
