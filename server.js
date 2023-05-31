'use strict'

//require library installs
const express = require('express'); // create an object for the express library
const dotenv = require("dotenv");
const cors = require("cors");
const weatherData = require('./Mods/weather.js');
const movies = require("./Mods/movie.js");
const axios = require("axios")

dotenv.config()
//initialize app
const app = express();
app.use(cors())

//configure routes
app.get('./Mods/weatherData', weatherData.weatherData)
app.get('./Mods/movie', movies.movies)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
//start app
app.listen(3000, () => console.log(`listening on 3000`));