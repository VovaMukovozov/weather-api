const request = require('request');
const Promise = require("bluebird");
const apikey = 'fff9f900987a05902f07d757aba5540f';
const sendGet = (city) => {
    return new Promise((resolve, reject) => {
        request(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`, function (error, response, body) {
            if(error || response && response.statusCode !== 200){
                return reject(error);
            }
            resolve(body);
          });
    });
};

module.exports = sendGet;