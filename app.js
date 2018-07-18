const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDJsLBq_gRyVWbnI2NMoBd_iGm57FX6_KA&address=Salzburg',
  json: true
}, (error, response, body) => {
  console.log(body);
})
