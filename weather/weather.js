const request = require('request');

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/b533d468271a591a7d7dede2a7a1f916/${lat},${lng}?units=si`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to darksky.net servers.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.currently.summary
      });
    }
  });
}
