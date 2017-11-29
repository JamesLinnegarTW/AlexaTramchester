
function ResponseFormatter() {
	this.next = function(response){

    return new Promise(function(resolve, reject){
    		var services = response.journeys;
        if(services.length === 0){
          reject("There are no trams at this time.");
        }

				var service = services[0];

        var departure = ["There is a tram from ",
                        service.begin.name,
                        " to ",
                        service.end.name,
                        " at ",
                        service.firstDepartureTime,
                        ". "].join("");

        var change = [service.summary, ". "].join("");

        var arrival = ["You should arrive at ",
                        service.expectedArrivalTime,
                        "."].join("");

        resolve([departure,change,arrival].join(""));

      });
    }

};

module.exports = ResponseFormatter;
