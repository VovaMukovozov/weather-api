const fs = require('fs');
const csvWriter = require('csv-write-stream');
const getMaxMinRainCites = require('../utils').getMaxMinRainCites;

const writer = csvWriter({sendHeaders: false});
writer.pipe(fs.createWriteStream('out.csv', {flag:'w'}));
const writeToFile = (data, date) => {
    const aggregatedData = getMaxMinRainCites(data);
    let writeData = {
        date: date,
        tempMax: aggregatedData.max.city,
        tempMin: aggregatedData.min.city,
        rainCities: (aggregatedData.rain.length > 0) ? aggregatedData.rain.join(',') : ''
    };
    writer.write(writeData);
};

const finish = () => {
    writer.end();
};

module.exports = {
    writeToFile,
    finish
};