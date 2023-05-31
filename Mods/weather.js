const axios = require('axios');

exports.weatherData = async function (request, response) {

    class Forecast {
        constructor(date, description, lat, lon) {
            this.date = date;// Represents the date of the forecast
            this.description = description;// Describes the weather conditions
            this.lat = lat;// Latitude of the forecast location
            this.lon = lon; // Longitude of the forecast location
        }
    }

    const { lat, lon, searchQuery } = request.query; // Destructures lat, lon, and searchQuery from the request query parameters

    try {
        const weatherResponse = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=5a3dadd8b09144089b3e76db33b590d3&city=${searchQuery}`);
        const cities = weatherResponse.data;// Stores the response data from the weather API

        if (cities === undefined) {
            // Throw an error if the cities data is undefined
            const error = new Error('City not found');
            error.statusCode = 500;
            throw error;
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