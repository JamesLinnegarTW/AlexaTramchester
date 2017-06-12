"use strict";

function StateProvider(alexa){

  if(!alexa){
    throw new Error("No alexa object provided");
  }

  this.get = function(attributeKey){
    return new Promise(function(resolve, reject){
        if(alexa.attributes[attributeKey]){
          resolve(alexa.attributes[attributeKey]);
        } else {
          reject(new Error("No attribute set"));
        }
    });
  };

  this.set = function(attributeKey, value){
    return new Promise(function(resolve, reject){
        alexa.attributes[attributeKey] = value;
        resolve(value);
    });
  };
}

module.exports = StateProvider;
