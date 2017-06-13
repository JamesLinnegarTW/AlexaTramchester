var IntentFailure = require("../lib/IntentFailure.js");


describe("IntentFailure", function(){
  it("should throw an error if instantiated without alexa object", function(){
    var create = function(){
      var t = new IntentFailure();
    }
    expect(create).toThrow(new Error("No alexa object provided"));
  });

  it("should emit and ask event with failure", function(){
    var mockAlexa = {
      emit: function(){}
    };
    spyOn(mockAlexa, 'emit');

    new IntentFailure(mockAlexa).retry("Test input");

    expect(mockAlexa.emit).toHaveBeenCalledWith(":ask", "Test input");
  });

});
