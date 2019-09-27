require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require('chalk');


var whatToDo = process.argv[2];
var userInput = process.argv[3];




function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: input, limit: 5 })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].artist, null, 2)); //response.tracks.items[0].artist.name
        })
        .catch(function (err) {
            console.log(err);
        });
}

async function concertThis(userInput) {
    try {
        const response = await axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        // console.log(response);
        var jsondata = response.data;
        console.log(jsondata);
        

        if (!jsondata.length) {
            console.log("no results found for artist");
            return;
        }
        for (let i = 0; i < jsondata.length; i++) {
            let show = jsondata[i];
            console.log(
                
                show.venue.city +
                "," + 
                (show.venue.region || show.venue.country) + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY"))
                
         
            };
    }
    catch (error) {
        console.log(error);
    }

}

concertThis(userInput);

async function movieThis(userInput) {
    try {
        const response = await axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        console.log(`Title: ${response.data.Title}`);
        console.log(`Year: ${response.data.Year}`);
        console.log(`IMBD Rating: ${response.data.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
        console.log(`Country: ${response.data.Country}`);
        console.log(`Language: ${response.data.Language}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}`);
    }
    catch (error) {
        console.log(error)
    }
}

// movieThis(userInput);

function doWhatItSays() {

}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;

    case "concert-this":
        concertThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        break;
}