var VoiceRequest = require("../lib/VoiceRequest");

describe('VoiceRequest', function(){
  it('should return a promise', function(){
    expect(new VoiceRequest()).toEqual(jasmine.any(Promise));
  });

  it('should resolve the promise to return an empty object', function(done){
    new VoiceRequest()
      .then(function(object){
        expect(object).toEqual({});
        done();
      })
  })
});
