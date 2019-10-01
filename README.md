# **liri-node-app**

LIRI ia a **Langauge Interpretation and Recongintion Interface** made for Node. LIRI takes in parameters and gives you the data that you requested back.

LIRI will proovide data if the following command lines, with a valid search parameter, are enter into the user's terminal:

    * node liri.js spotify-this-song search parameter 
    * node liri.js concert-this search parameter
    * node liri.js movie-this search parameter
    * node liri.js do-what-it-says search parameter

Each command ulitized its own function to extract the data. Various node package managers (NPMS) were used to find the requested data. The following provides a description of each command line that LIRI uses.

### **spotify-this-song**
-----------------------
Sends the search parameter request to the node-spotify-api. Console.logs the following information:

    * Artist(s)
    * The song's name
    * A preview link to the song from Spotify
    * The album that the song is from

A snippet of the code used is provided below:

```javascript
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
```
### **concert-this**
----------------
Sends the search parameter request to Axios, which uses the Bands In Town API to display the data. Moment.js is used to provide a formatted date (Month/Day/Year). Console.logs the following information:

    * Name of the venue
    * Venue location
    * Date of the Event ("MM/DD/YYYY")

    A snippet of the code used is provided below:

```javascript
async function concertThis(userInput) {
    try {
        const response = await axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
       
        var jsondata = response.data;
        


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
```
### **movie-this**
----------------
Sends the search parameter request to Axios, which uses the IMDB API to display the data. Console.logs the following information:

    * Title of the movie
    * Year the movie came out
    * IMDB rating of the movie
    * Rotten Tomatoes rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the moive
    * Actors in the movie

 A snippet of the code used is provided below:

```javascript
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
```
### **do-what-it-says**
----------------
With use of the fs.reafile Node package, LIRI takes the text inside of random.txt and calls one of its commands.

A snippet of the code used is provided below:

```javascript
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
```
A **switch statement** was used to capture the user input, which assists LIRI in identifying the appropriate command line to invoke. 

A snippet of the code used is provided below:

```javascript
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
```
## **NPMs**
----------------
LIRI required the use of multiple npm packages. Additional package called Chalk was used to give all command lines a unique color.

    * spotify-this-song (yellow)
    * concert-this (blue)
    * movie-this (green)

```javascript
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require('chalk');
```
## **Trial**
----------------
A link to LIRI in action is provided below:

https://drive.google.com/file/d/1EFN8vRqkAvMtJwxU_DsN0jEmTO_rQgxP/view