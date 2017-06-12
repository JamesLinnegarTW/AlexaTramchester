var moment = require("moment-timezone");

moment.tz.setDefault("Europe/London");

function parseTime(time){
    // night NI , morning: MO, afternoon: AF, evening: EV. some of the intent craziness
  switch(time){
      case 'NI':
          return moment("22:00:00", "HH:mm:ss");
          break;
      case 'MO':
          return moment("08:00:00", "HH:mm:ss");
          break;
      case 'AF':
          return moment("16:00:00", "HH:mm:ss");
          break;
      case 'EV':
          return moment("19:00:00", "HH:mm:ss");
          break;
      default:
          return moment(time, "HH:mm:ss");
  }
}


function TimeAndDateService(time, date){
  this.parse = function(object) {
    return new Promise(function(resolve, reject){
      if(!date){
        date = moment().tz('Europe/London');
      } else {
        date = moment(date, 'YYYY-MM-DD');
      }
      if(!time){
          time = moment();
      } else {
          time = parseTime(time);
      }

      object.time = time.format('HH:mm:ss');
      object.date = date.format('YYYY-MM-DD');

      resolve(object);
    });
  }
}

module.exports = TimeAndDateService;
