"use strict";

function IntentFailure(alexa){

  if(!alexa){
    throw new Error("No alexa object provided");
  }

  
  this.retry = function(failure){
    console.warn(failure);
    alexa.emit(':ask', failure);
  }
}

module.exports = IntentFailure;
