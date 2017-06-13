var TimeAndDateService = require("../lib/TimeAndDateService.js");


describe("TimeAndDateService", function(){


  it("should parse Amazon time inputs", function(){
    var dummyObject = {};
    new TimeAndDateService("NI").parse(dummyObject);
    expect(dummyObject.time).toEqual("22:00:00");

    new TimeAndDateService("MO").parse(dummyObject);
    expect(dummyObject.time).toEqual("08:00:00");

    new TimeAndDateService("AF").parse(dummyObject);
    expect(dummyObject.time).toEqual("16:00:00");

    new TimeAndDateService("EV").parse(dummyObject);
    expect(dummyObject.time).toEqual("19:00:00");


  });



});
