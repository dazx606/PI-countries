const { Country, conn } = require('../../src/db.js');


describe('Country model', () => {
  beforeAll(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        let country={name: 'Argentina',
        img:"a",
        continent:"Americas",
        capital:"Buenos Aires",
       // id:"ARG",
        area:null,
        population:null,
        subregion: null,}
        Country.create(country)
          .then(() => done(new Error('It requires a valid data')))
          .catch(() => done());
      });
      it('should work', (done) => {
        let country={  name: 'Argentina',
        img:"a",
        continent:"Americas",
        capital:"Buenos Aires",
        id:"ARG",
        area:null,
        population:null,
        subregion: null,
      }
        Country.create(country)
          .then(() => done())
          .catch(() => done(new Error('It requires a valid data')));
      });
      

    });
  });
  afterAll( async ()=>{conn.close()}) // >:(
});


