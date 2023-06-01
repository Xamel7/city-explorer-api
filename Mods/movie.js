const axios = require('axios');
const Node = require("node-cache")


let cache = new Node();


exports.movies = async function (request, response) {
    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTk1ZmM0MDY1NWJlMzMxNzM5ZWRlYTgyYWIzYzk0YiIsInN1YiI6IjY0NTEyMGYxZDcxMDdlMDE2YjdlMmRlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YIyiiCYdz96GXPY2WOGQkodkg_wxvKFrkXlZvjVgLdk"
    };

    class Movie {
        constructor(adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count) {
            this.adult = adult
            this.backdrop_path = backdrop_path
            this.genre_ids = genre_ids
            this.id = id
            this.original_language = original_language
            this.original_title = original_title
            this.overview = overview
            this.popularity = popularity
            this.release_date = release_date
            this.title = title
            this.video = video
            this.vote_average = vote_average
            this.vote_count = vote_count
        }
    }
    
    const { searchQuery } = request.query;// Destructures searchQuery from the request query parameters

    // Send a GET request to the movie API to search for movies
    try {
        let movieResponse = cache.get(searchQuery)
        if(movieResponse === undefined){

            movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.MOVIE_API_KEY,// Uses the MOVIE_API_KEY from environment variables
                    query: searchQuery  // Sets the query parameter for the movie search
                },
                headers: headers // Sets the headers for authorization
            });
            cache.set(searchQuery, movieResponse.data)
            movieResponse = movieResponse.data
            console.log("CACHE MISS")
        }else{
            console.log("CACHE HIT")
        }
        response.send(movieResponse.results); // Sends the movie results as the response
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);// Sends an internal server error status code and the error message as the response
    }
};