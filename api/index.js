const server = require('./src/app.js');
const { conn, Activity, Country } = require('./src/db.js');
const axios = require('axios').default;                                              

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  // const jane = await Activity.create({ name: "Jane" });

  axios.get('https://restcountries.com/v3/all')
  .then(function (response) {
  console.log("me resolvi");
  let country = response.data;
  
  country.forEach(  async(e) => {
    //console.log(e.cca2) 
    let newCoun = await Country.create({ 
        name: e.name.common, 
        id: `${e.cca2}A`, 
        img: e.flags[0], 
        continent: e.region,       
        capital: e.capital? e.capital[0] :"N/A",
        sebregion: e.subregion,
        area: e.area,
        population: e.population
      });
  });
  })
  .catch(function (error) {
  console.log(error);
  });

});
