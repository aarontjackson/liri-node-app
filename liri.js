require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var whatToDo = process.argv[2];
var userInput = process.argv[3];

const queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: input, limit: 5 })
        .then(function (response) {
            console.log(JSON.stringify(response, null, 2)); //response.tracks.items[0].artist.name
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concertThis() {

}

async function movieThis() {
    try {
        const response = await axios.get(queryURL)
            console.log(response.data);
    }
    catch (error){
        console.log(error)
    }
}

movieThis();

function doWhatItSays() {

}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        break;
}