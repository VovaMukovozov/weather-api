const Promise = require('bluebird');
const sendGet = require('./services/request');
const writer = require('./services/writer');
const utils = require('./utils');
const cityList = [
    'Jerusalem',
    'New York',
    'Dubai',
    'Lisbon',
    'Oslo',
    'Paris',
    'Berlin',
    'Athens',
    'Seoul',
    'Singapore'
];

const getWeathers = () => {
    Promise.map(cityList, function(city) {
        return sendGet(city).then((response) => {
            return utils.mappingByDate(JSON.parse(response));
        });
    }).then(function(res) {
        let data = utils.getResultMapping(res);
        Object.keys(data).map((date) => {
            writer.writeToFile(data[date], date);
        });
        writer.finish();
    }).catch((err)=>{
        console.log(err);
    });
};

module.exports = getWeathers;