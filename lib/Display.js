var AWS = require("aws-sdk");

AWS.config.region = process.env.IOT_BROKER_REGION;
var iotData = new AWS.IotData({endpoint: process.env.IOT_BROKER_ENDPOINT});

function Display(){



    this.text = function(message){
      var paramsUpdate = {
          topic:"/alexa",
          payload: JSON.stringify({"type":"text", "data":message}),
          qos:0
      };

      return new Promise(function(resolve, reject){
          iotData.publish(paramsUpdate, function(err, data) {
              if (err){
                  console.warn("MQTT Error " + err);
                  reject("display error");
              }
              resolve(message);
          });
      });

    };

    this.journey = function(tramdata){


        var services = tramdata.journeys;

        if(!services){
            resolve(tramdata);
        }

        var paramsUpdate = {
            topic:"/alexa",
            payload: JSON.stringify({"type":"journey", "data":services[0]}),
            qos:0
        };

        return new Promise(function(resolve, reject){
            iotData.publish(paramsUpdate, function(err, data) {
                if (err){
                    console.log("MQTT Error " + err);
                }
                resolve(tramdata);
            });
        });
    };

    this.station =function(stationData){
        var paramsUpdate = {
            topic:"/alexa",
            payload: JSON.stringify({"type":"station", "data":stationData}),
            qos:0
        };

        return new Promise(function(resolve, reject){
            iotData.publish(paramsUpdate, function(err, data) {
                if (err){
                    console.log("MQTT Error " + err);
                }
                resolve(stationData);
            });
        });
    };

}

module.exports = Display;
