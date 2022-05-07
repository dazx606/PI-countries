const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios').default;
const countryRoute = require('./src/routes');
const {PORT} = process.env;

server.use('/country', countryRoute);




// Syncing all the models at once.

conn.sync({ force: false }).then(async () => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  //----------------------db push -----------------------------
  axios.get('https://restcountries.com/v3/all')
    .then(function (response) {
      //console.log("me resolvi");
      let country = response.data;

      country.forEach(async (e) => {
        await Country.findOrCreate({
          where: { id: `${e.cca2}A` },
          defaults: {
            name: e.name.common.toLowerCase(),
            img: e.flags[0],
            continent: e.region,
            capital: e.capital ? e.capital[0] : "N/A",
            subregion: e.subregion ? e.subregion: "N/A",
            area: parseInt(e.area) < 0 ? 0 : parseInt(e.area),
            population: parseInt(e.population)
          }

        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
