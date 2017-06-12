var ResponseFormatter = require("../lib/ResponseFormatter");


beforeEach(function(){

});

describe("ResponseFormatter", function(){
  describe("next", function(){

    it("should return a promise", function(){
      let data = {};
      expect(new ResponseFormatter().next(data)).toEqual(jasmine.any(Promise));
    });

    it("should reject the promise if there are no journeys", function(done){
      let data = {};

      new ResponseFormatter()
      .next(data)
      .catch(function(returnValue){
        expect(returnValue).toEqual("There are no trams at this time.");
        done();
      })
    });

    it("should resolve the promise with the first tram there are journeys", function(done){
      let data = {
        "journeys":[
          {
            begin : {name:"begin"},
            end : { name:"end"},
            firstDepartureTime : "12:00",
            summary: "summary",
            expectedArrivalTime : "13:00"
          }
        ]
      };

      new ResponseFormatter()
      .next(data)
      .then(function(returnValue){
        expect(returnValue).toEqual('There is a tram from begin to end at 12:00. summary. You should arrive at 13:00.');
        done();
      });
    });

  });
});
