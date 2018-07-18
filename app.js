const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDJsLBq_gRyVWbnI2NMoBd_iGm57FX6_KA&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status == 'ZERO_RESULTS') {
    throw new Error('Unable to find taht address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/b533d468271a591a7d7dede2a7a1f916/${lat},${lng}?units=si`;
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var summary = response.data.currently.summary;
  console.log(`It's currently ${summary} with ${temperature}°C`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server');
  } else {
    console.log(e.message);
  }
});
