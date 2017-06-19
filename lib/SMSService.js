

function SMSService(client){

  this.send = function(message){

    return new Promise(function (resolve, reject) {
        client.messages.create({
            to: process.env.TWILIO_TO,
            from: process.env.TWILIO_FROM,
            body: message,
        }, function(err, message) {
            if(err){
                reject("I'm sorry I couldn't send that for you");
            }
            resolve("Ok that's sent");
        });
    });

  }

}

module.exports = SMSService;
