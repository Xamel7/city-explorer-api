const axios = require('axios');
const Node = require("node-cache")


let cache = new Node();

exports.weatherData = async function (request, response) {

    class Forecast {
        constructor(date, description, lat, lon, city_name) {
            this.date = date;// Represents the date of the forecast
            this.description = description;// Describes the weather conditions
            this.lat = lat;// Latitude of the forecast location
            this.lon = lon; // Longitude of the forecast location
            this.city_name = city_name;
        }
    }

    const { lat, lon, searchQuery } = request.query; 

    try {
        console.log("CACHE MISS")
        let cities = cache.get(searchQuery);// Stores the response data from the weather API
        if( cities === undefined ){
            let weatherResponse = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=5a3dadd8b09144089b3e76db33b590d3&city=${searchQuery}`);
            cities = weatherResponse.data;// Stores the response data from the weather API
            cache.set(searchQuery, cities);

        }else{
            console.log("CACHE HIT")
        }

        const forecastArray = cities.data.map((element) => new Forecast(element.datetime, element.weather.description));
        // Maps the cities data to create an array of forecast objects using the Forecast class

        response.send(forecastArray);// Sends the forecast array as the response
    } catch (error) {
        console.error(error);
        response.status(error.statusCode || 500).send('Error occurred while fetching weather data');
         // Sends an appropriate error status code and message as the response
    }
};