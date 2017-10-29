const moment = require('moment');

const mappingByDate = (weathersData) => {
    let map = {};
    if(weathersData.list){
        weathersData.list.map((item) => {
            let date = moment(item.dt_txt).format('YYYY MM DD');
            if(!map[date]){
                map[date] =  {
                    city: weathersData.city.name,
                    tempMax: 0,
                    tempMin: weathersData.list[0].main.temp_min
                };
            }
            if(item.main.temp_max > map[date].tempMax) {
                map[date].tempMax = item.main.temp_max;
            }
            if(item.main.temp_min < map[date].tempMin) {
                map[date].tempMin = item.main.temp_min;
            }
            if(item.rain && !map[date].rain) {
                map[date].rain = true;
            }
        });
    }
    return map;
};

const getResultMapping = (arr) => {
    let data = {};
    arr.map((item) => {
        Object.keys(item).map((date) => {
            if(!data[date]){
                data[date] = []
            }
            data[date].push(item[date])
        })
    });
    return data;
};

const getMaxMinRainCites = (data) => {
    let result = {
        max: {
            city: data[0].city,
            temp: data[0].tempMax
        },
        min: {
            city: data[0].city,
            temp: data[0].tempMin
        },
        rain:[]
    };
    data.map((item) => {
        if(result.max.temp < item.tempMax) {
            result.max.temp = item.tempMax;
            result.max.city = item.city;
        }
        if(result.min.temp  > item.tempMin) {
            result.min.temp = item.tempMin;
            result.min.city = item.city;
        }
        if(item.rain){
            result.rain.push(item.city);
        }
    });
    return result;
};

module.exports = {
    mappingByDate,
    getResultMapping,
    getMaxMinRainCites
};