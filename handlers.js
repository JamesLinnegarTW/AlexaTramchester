var VoiceRequest = require("./lib/VoiceRequest"),
    TimeAndDateService = require("./lib/TimeAndDateService"),
    DepartureService = require("./lib/DepartureService"),
    DestinationService = require("./lib/DestinationService"),
    StationParser = require("./lib/StationParser"),
    TramchesterService = require("./lib/TramchesterService"),
    ResponseFormatter = require("./lib/ResponseFormatter"),
    SMSService = require('./lib/SMSService'),
    StateProvider = require('./lib/StateProvider'),
    IntentFailure = require("./lib/IntentFailure"),
    Display = require("./lib/Display"),
    TwilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);


var handlers = {
    // register custom intent handlers
    "TramToIntent":  function () {
      var response = this,
          slots = response.event.request.intent.slots,
          departureDate = slots.DepartureDate.value,
          departureTime = slots.DepartureTime.value,
          toStation   = slots.Station.value;

      new VoiceRequest()
        .then(new TimeAndDateService(departureTime, departureDate).parse)
        .then(new DestinationService(toStation).getDestination)
        .then(function(requestObject){
          return new Promise(function(resolve, reject){

            new StateProvider(response)
              .get('homeStation')
              .then(function(station){
                requestObject.departure = station;
                resolve(requestObject);
              }).catch(function(error){
                console.log(error);
                reject("You do not have a home station set");
              });

          });
        })
        .then(new TramchesterService().getTrams)
        .then(new ResponseFormatter().next)
        .then(function(output){
           response.emit(':tell', output);
        })
        .catch(new IntentFailure(response).retry);
    },

    "TramFromIntent":  function () {

      var response = this,
          slots = response.event.request.intent.slots,
          departureDate = slots.DepartureDate.value,
          departureTime = slots.DepartureTime.value,
          fromStation   = slots.Station.value;

      new VoiceRequest()
        .then(new TimeAndDateService(departureTime, departureDate).parse)
        .then(new DepartureService(fromStation).getDeparture)
        .then(function(requestObject){
          return new Promise(function(resolve, reject){

            new StateProvider(response)
              .get('homeStation')
              .then(function(station){
                requestObject.destination = station;
                resolve(requestObject);
              }).catch(function(error){
                console.log(error);
                reject("You do not have a home station set");
              });

          });
        })
        .then(new TramchesterService().getTrams)
        .then(new ResponseFormatter().next)
        .then(function(output){
           response.emit(':tell', output);
        })
        .catch(new IntentFailure(response).retry);

    },

    "TramRouteIntent":  function () {
      var response = this,
          slots = response.event.request.intent.slots,
          departureDate = slots.DepartureDate.value,
          departureTime = slots.DepartureTime.value,
          toStation     = slots.ToStation.value,
          fromStation   = slots.FromStation.value;

      new VoiceRequest()
        .then(new TimeAndDateService(departureTime, departureDate).parse)
        .then(new DepartureService(fromStation).getDeparture)
        .then(new DestinationService(toStation).getDestination)
        .then(new TramchesterService().getTrams)
        .then(new ResponseFormatter().next)
        .then(function(output){
           response.emit(':tell', output);
        })
        .catch(new IntentFailure(response).retry);

    },

    "StationDetailsIntent":  function () {
      var response = this;
      var station = response.event.request.intent.slots.Station.value;

      new VoiceRequest()
        .then(new StationParser(station).parse)
        .then(function(stationData){
          var imageURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + stationData.latLong.lat + "," + stationData.latLong.lon + "&scale=2&markers=" + stationData.latLong.lat + "," + stationData.latLong.lon + "&zoom=16&size=400x400&maptype=roadmap&key=" + "AIzaSyBeZoKsacLdCyU9nSbbUBusUAW03SGb1BI";
          response.emit(':tellWithCard', 'Here is ' + stationData.name, stationData.name, "", imageURL);
        })
        .catch(new IntentFailure(response).retry);
    },

    "SaveHomeStationIntent":  function () {
      var response = this;
      var station = response.event.request.intent.slots.Station.value;

      new VoiceRequest()
        .then(new StationParser(station).parse)
        .then(function(stationData){
          return new StateProvider(response).set('homeStation', stationData);
        })
        .then(function(stationData){
          response.emit(':tell', 'setting your home station to ' + stationData.name);
        })
        .catch(new IntentFailure(response).retry);
    },

    "RetrieveHomeStationIntent":  function () {
      var response = this;
      new StateProvider(this)
        .get('homeStation')
        .then(function(station){
          response.emit(':tell', "Your home station is set to " + station.name);
        })
        .catch(new IntentFailure(response).retry);
    },

    "SMSIntent":  function () {
      var alexa = this;
      new SMSIntent(TwilioClient)
        .send("Sample message")
        .then(function(response){
          alexa.emit(':tell', response);
        })
        .catch(new IntentFailure(alexa).retry);
    },

    "LaunchRequest": function () {
      var alexa = this;
      new Display()
        .show("text", "Welcome to Tramchester")
        .then(function(){
          alexa.emit(':ask', 'Welcome to tramchester', 'You can ask for tram times to and from stations, set your home station and ask for next trams.');
        })
        .catch(new IntentFailure(alexa).retry);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
      this.emit(':tell',
        "You can ask for tram times to and from stations, set your home station and ask for next trams.",
        "For example, You can ask 'when is the next tram from Chorlton to Eccles'");
    },

    "AMAZON.CancelIntent": function(intent, session, response){
      this.emit(':tell', "goodbye");
    },

    "AMAZON.StopIntent": function(intent, session, response){
      this.emit(':tell', "goodbye");
    },

    'Unhandled': function() {
      this.emit(':ask', "I'm sorry I don't know how to proceed");
    }
  };

module.exports = handlers;
