require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require('chalk');

console.log(process.argv)
var whatToDo = process.argv[2];
var liriChoice = process.argv.slice(3).join(" ");




function spotifyThis(input) {
    if (input === undefined) {
        input = "The Sign";
    }
    spotify
        .search({ type: 'track', query: input, limit: 1 })
        .then(function (response) {
            console.log('\x1b[43m%s\x1b[0m', "\n============================================================\n");
            console.log(chalk.yellow("Artist: " + response.tracks.items[0].artists[0].name));
            console.log(chalk.yellow("Song: " + response.tracks.items[0].name));
            console.log(chalk.yellow("URL: " + response.tracks.items[0].external_urls.spotify));
            console.log(chalk.yellow("Album: " + response.tracks.items[0].album.name));
            console.log('\x1b[43m%s\x1b[0m', "\n============================================================\n");
        })
        .catch(function (err) {
            console.log(err);
        });
};

async function concertThis(userInput) {
    try {
        const response = await axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        // console.log(response);
        var jsondata = response.data;
        // console.log(jsondata);


        if (!jsondata.length) {
            console.log("no results found for artist");
            return;
        }
        for (let i = 0; i < jsondata.length; i++) {
            let show = jsondata[i];
            console.log('\x1b[43m%s\x1b[0m', "\n=======================================================================\n");
            console.log(chalk.blue(

                show.venue.city +
                "," +
                (show.venue.region || show.venue.country) + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY")))


        };
    }
    catch (error) {
        console.log(error);
    }

};


async function movieThis(userInput) {
    if (userInput === undefined) {
        userInput = "Mr. Nobody";
    }

    try {
        const response = await axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        console.log('\x1b[43m%s\x1b[0m', "\n=========================================\n");
        console.log(chalk.green(`Title: ${response.data.Title}`));
        console.log(chalk.green(`Year: ${response.data.Year}`));
        console.log(chalk.green(`IMBD Rating: ${response.data.Ratings[0].Value}`));
        console.log(chalk.green(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`));
        console.log(chalk.green(`Country: ${response.data.Country}`));
        console.log(chalk.green(`Language: ${response.data.Language}`));
        console.log(chalk.green(`Plot: ${response.data.Plot}`));
        console.log(chalk.green(`Actors: ${response.data.Actors}`));
        console.log('\x1b[43m%s\x1b[0m', "\n=========================================\n");

       
    }
    catch (error) {
        console.log(error)
    }
};


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error)
            return console.log(error);

        data.split(",").map((thisItem, index, origArr) => {
            if (index % 2 === 0) {
                runner(thisItem.trim(), origArr[index + 1].trim())
            }
            return true;
        });
    });
};

function runner(command, searchFor) {
    switch (command) {
        case "spotify-this-song":
            spotifyThis(searchFor);
            break;

        case "concert-this":
            concertThis(searchFor);

            break;
        case "movie-this":
            movieThis(searchFor);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            break;
    }
}
runner(whatToDo, liriChoice);


// const myChalk = new ChalkNode();

// myChalk.yellowFG("What would you do for a klondike bar?")
// myChalk.yellowBG("What would you do for a klondike bar?")

// function ChalkNode(){
//     this.yellowFG = function(val){
//          console.log('\x1b[33m%s\x1b[0m', val)
//     }
//     this.yellowBG = function(val){
//         console.log('\x1b[43m%s\x1b[0m', val)
//    }
// }