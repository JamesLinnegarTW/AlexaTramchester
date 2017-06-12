
function ResponseFormatter() {
	this.next = function(response){
    var services = response.journeys;

    return new Promise(function(resolve, reject){
        var service = services[0];

        if(!service){
            reject("There are no trams at this time.");
        }

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
