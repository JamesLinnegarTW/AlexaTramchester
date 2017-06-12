var StationParser = require("./StationParser");

function DepartureService(stationName){
  this.getDeparture = function(requestObject){
    return new Promise(function(resolve, reject){

      new StationParser(stationName)
      .parse()
      .then(function(station){
        requestObject.departure = station;
        resolve(requestObject);
      }).catch(function(error){
        reject(error)
      });

    });
  }
}

module.exports = DepartureService;
