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
            console.log("\n============================================================\n");
            console.log(chalk.yellow("Artist: " + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2)));
            console.log(chalk.yellow("Song: " + JSON.stringify(response.tracks.items[0].name, null, 2)));
            console.log(chalk.yellow("URL: " + JSON.stringify(response.tracks.items[0].external_urls.spotify, null, 2)));
            console.log(chalk.yellow("Album: " + JSON.stringify(response.tracks.items[0].album.name, null, 2)));
            console.log("\n============================================================\n");
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
        for (let i = 2; i < jsondata.length; i++) {
            let show = jsondata[i];
            console.log("\n=======================================================================\n");
            console.log(chalk.blue(
                
                show.venue.city +
                "," + 
                (show.venue.region || show.venue.country) + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY")))
                
         
            };
    }
    catch (error) {
        console.log(error);
    }

}


async function movieThis(userInput) {
    try {
        const response = await axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        console.log("\n=========================================\n");
        console.log(chalk.green(`Title: ${response.data.Title}`));
        console.log(chalk.green(`Year: ${response.data.Year}`));
        console.log(chalk.green(`IMBD Rating: ${response.data.Ratings[0].Value}`));
        console.log(chalk.green(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`));
        console.log(chalk.green(`Country: ${response.data.Country}`));
        console.log(chalk.green(`Language: ${response.data.Language}`));
        console.log(chalk.green(`Plot: ${response.data.Plot}`));
        console.log(chalk.green(`Actors: ${response.data.Actors}`));
        console.log("\n=========================================\n");
    }
    catch (error) {
        console.log(error)
    }
}


function doWhatItSays() {
    
}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;

    case "concert-this":
        concertThis(userInput);
        if(userInput === undefined){

            console.log();
            
        }
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