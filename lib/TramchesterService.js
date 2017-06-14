var request = require("request");

function TramchesterService() {

  function parseURL(options){
    var url = ['https://www.tramchester.com/api/journey',
      '?departureDate=',
      options.date,
      '&departureTime=',
      options.time,
      '&end=',
      options.destination.id,
      '&start=',
      options.departure.id
    ].join("");
    return url;
  }

  this.getTrams = function(options) {

    return new Promise(function(resolve, reject) {
      try {

        if(options.destination.id == options.departure.id){
          reject("You can't travel to and from the same station");
        }

        parseURL(options);

        console.log(url);

        request.get(url, function(error, response, body) {
          if (!error && response.statusCode === 200 && body) {
            resolve(JSON.parse(body));
          } else {
            console.error(error, response, body);
            reject("I'm sorry the Tramchester service is unavailable");
          }
        });
      } catch (e) {
        console.log(e, options);
        reject("Not all parameters are correct");
      }
    });
  }
}

module.exports = TramchesterService;
