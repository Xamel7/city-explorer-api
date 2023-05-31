'use strict'

//require library installs
const express = require('express'); // create an object for the express library
const dotenv = require("dotenv");
const cors = require("cors");
const weatherData = require('./weather.js');
const axios = require("axios")

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
app.get('/weatherData', async function (request, response) {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const searchQuery = request.query.searchQuery;
    let cities = ""


    let weatherResponse = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=5a3dadd8b09144089b3e76db33b590d3&city=${searchQuery}`)
    cities = weatherResponse.data
    if (cities === undefined) {
        // Throw an error if the cities data is undefined
        const error = new Error("City not found");
        error.statusCode = 500;
        throw error;
    }

    const forecastArray = cities.data.map((element) => new Forecast(element.datetime, element.weather.description));


    response.send(forecastArray);
});

let headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTk1ZmM0MDY1NWJlMzMxNzM5ZWRlYTgyYWIzYzk0YiIsInN1YiI6IjY0NTEyMGYxZDcxMDdlMDE2YjdlMmRlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YIyiiCYdz96GXPY2WOGQkodkg_wxvKFrkXlZvjVgLdk"
}

class Movie {
    constructor(title, overview) {
        this.title = title;
        this.overview = overview;
        this.description = description;
    }
}
app.get('/movie', async (request, response) =>  {
    let { searchQuery } = request.query;
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`, headers = headers).catch(function(error){
        response.status(500).send(error.message);

    })
    console.log(movieResponse.data)
    response.send(movieResponse.data.results);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
//start app
app.listen(3000, () => console.log(`listening on 3000`));