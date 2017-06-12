var StateProvider = require("../lib/StateProvider");


describe("StateProvider", function(){
  var alexa  = {};

  beforeEach(function(){
      alexa.attributes = {};
  })
  it("should throw an error if instantiated without alexa object", function(){
    var create = function(){
      var t = new StateProvider();
    }

    expect(create).toThrow(new Error("No alexa object provided"));
  });


  describe("set", function(){

    it("should return a promise", function(){
      var provider = new StateProvider(alexa);
      expect(provider.set('key', 'value')).toEqual(jasmine.any(Promise));
    });

    it("should set an object on an the alexa attributes object", function(){
      var provider = new StateProvider(alexa);

      provider.set("james", "test");
      expect(alexa.attributes.james).toBeDefined();
    })

  });

  describe("get", function(){

    it("should return a promise", function(){
      var provider = new StateProvider(alexa);
      expect(provider.get('key')).toEqual(jasmine.any(Promise));
    });

    it("should return an object from the alexa attributes object", function(done){
      alexa.attributes.test = "result";
      new StateProvider(alexa)
        .get("test")
        .then(function(returnValue){
          expect(returnValue).toEqual("result");
          done();
        });
    });


    it("should return a rejected promise an object that doesn't exist", function(done){
      alexa.attributes.test = "result";
      new StateProvider(alexa)
        .get("noObject")
        .catch(function(returnValue){
          expect(returnValue).toEqual(jasmine.any(Error));
          done();
        });
    });

  });

});
