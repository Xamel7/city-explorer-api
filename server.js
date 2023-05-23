'use strict'

//require library installs
const express = require('express'); // create an object for the express library
const dotenv = require("dotenv");
const cors = require("cors");
const weatherData = require('./data/weather.json')

dotenv.config()
//initialize app
const app = express();
app.use(cors())


class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    };
}
//configure routes
app.get('/weatherData', function (request, response) {
    // response.send(`Hello`);
    const lat = request.query.lat;
    const lon = request.query.lon;
    const searchQuery = request.query.searchQuery;
    let cities = ""


    cities = weatherData.find((i) => {
        if (searchQuery === i.city_name || i.lat === lat || i.lon === lon) {
            return true;
        } else {
            return false;
        }
    });
    if (cities === undefined) {
        response.send("error")
    }
    const forecastArray = cities.data.map((element) => new Forecast(element.datetime, element.weather.description));


    response.send(forecastArray);
});
//start app
app.listen(3000, () => console.log(`listening on 3000`));