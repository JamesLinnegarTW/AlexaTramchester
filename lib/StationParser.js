var similarity = require("similarity"),
    stations = require("../data/Stations");


function parseStation(inputData) {

    var stationSimilarityArray = stations.map(function (obj) {
        return {"station": obj, "similarity": similarity(obj.name.toLowerCase(), inputData)};
    });


    var mostSimilarStation = stationSimilarityArray.reduce(function(a, b) {
      return (a.similarity > b.similarity) ? a : b; //shitty shitty code
    });

    if (mostSimilarStation.similarity > 0.5) {
        return mostSimilarStation.station;
    } else {
      throw new Error("No Station Found");
    }

}


function StationParser(stationName){

  this.parse = function(){
      return new Promise(function(resolve, reject){
        if(!stationName) reject("I don't have a station");
        try {
            var station = parseStation(stationName)
            resolve(station);
        } catch(e) {
            reject("I'm sorry, I do not recognise that station. I heard " + stationName);
        }
      });
  }

}

module.exports = StationParser;
