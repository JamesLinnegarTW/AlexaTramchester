var AWS = require("aws-sdk"),
    iotData = new AWS.IotData({endpoint: process.env.IOT_BROKER_ENDPOINT});


AWS.config.region = process.env.IOT_BROKER_REGION;

function Display(){
    this.show = function(type, message){

      var paramsUpdate = {
          topic:"/"+ process.env.IOT_BROKER_TOPIC,
          payload: JSON.stringify({"type":type, "data":message}),
          qos:0
      };

      return new Promise(function(resolve, reject){
          iotData.publish(paramsUpdate, function(err, data) {
              if (err){
                  console.warn("MQTT Error " + err);
              }
              resolve(message);
          });
      });

    }
}

module.exports = Display;
