
const session = require('supertest');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
  img:"a",
  continent:"Americas",
  capital:"Buenos Aires",
  id:"ARG"
};

describe('Country routes', () => {

  beforeAll(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
    
    it('prueba country', async() => {
      const response = await agent.get('/countries');
      //console.log(response);
      expect(response.body).toEqual([{  name: 'Argentina',
      img:"a",
      continent:"Americas",
      capital:"Buenos Aires",
      id:"ARG",
      area:null,
      population:null,
      subregion: null,
    }]);
    });

    it('prueba continent', async() => {
      const response = await agent.get('/countries/continents');
      //console.log(response.body);
      expect(response.body).toEqual([{
             "continent": "Americas",
         }]);
    });
    
  });

  afterAll( async ()=>{conn.close()}) // >:(
  
});




