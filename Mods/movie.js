const axios = require('axios');

exports.movies = async function (request, response) {
    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTk1ZmM0MDY1NWJlMzMxNzM5ZWRlYTgyYWIzYzk0YiIsInN1YiI6IjY0NTEyMGYxZDcxMDdlMDE2YjdlMmRlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YIyiiCYdz96GXPY2WOGQkodkg_wxvKFrkXlZvjVgLdk"
    };

    class Movie {
        constructor(title, overview, description, release_date) {
            this.title = title;
            this.overview = overview;
            this.description = description;
            this.release_date = release_date;
        }
    }

    const { searchQuery } = request.query;// Destructures searchQuery from the request query parameters

    // Send a GET request to the movie API to search for movies
    try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: process.env.MOVIE_API_KEY,// Uses the MOVIE_API_KEY from environment variables
                query: searchQuery  // Sets the query parameter for the movie search
            },
            headers: headers // Sets the headers for authorization
        });
        console.log(movieResponse.data);
        response.send(movieResponse.data.results); // Sends the movie results as the response
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);// Sends an internal server error status code and the error message as the response
    }
};