var StationParser = require("./StationParser");

function DestinationService(stationName){
  this.getDestination = function(requestObject){
    return new Promise(function(resolve, reject){

      new StationParser(stationName)
        .parse()
        .then(function(station){
          requestObject.destination = station;
          resolve(requestObject);
        })
        .catch(function(error){
          reject(error)
        });

    });
  }
}


module.exports = DestinationService;
