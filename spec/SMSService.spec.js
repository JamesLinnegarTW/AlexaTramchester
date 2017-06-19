var SMSService = require("../lib/SMSService");

describe("SMSService", function(){

  beforeEach(function(){

  });

  describe("Send", function(){
    it("should return a promise", function(){
      expect(new SMSService().send()).toEqual(jasmine.any(Promise));
    });

    it("should create a text message", function(){
      var mock = {
        messages:{
          create: function(){}
        }
      };

      spyOn(mock.messages, 'create');
      var service = new SMSService(mock);

      service.send("test message");
      expect(mock.messages.create).toHaveBeenCalled();
    });
  });
});
