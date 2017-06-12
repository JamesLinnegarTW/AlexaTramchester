"use strict";

function IntentFailure(alexa){
  this.retry = function(failure){
    console.warn(failure);
    alexa.emit(':ask', failure);
  }
}

module.exports = IntentFailure;
