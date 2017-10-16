var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs=require('fs');
var spotify =new Spotify({
  id: '2a084d9896d64ed6995719f504eb401e',
  secret: 'de52c8cb1ac34c658fdadca1c2357714'
});
var Twitter = new twitter(keys.twitterKeys);
var mult_word=process.argv;
var arg= process.argv[2];
var word = "";
// have a phrase of 3 words
for (var i=3; i<mult_word.length; i++){
  if(i>3 && i<mult_word.length){
    word = word + "+" + mult_word[i];
} else{
    word = word + mult_word[i];
}
}
function main(){
switch(arg)
{
  case 'my-tweets':
  Twitter.get('statuses/user_timeline', function(error, tweets, response) {
   if (!error) {
    for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@Moud: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        console.log("*******************************************");
        //to fill th log.txt
        fs.appendFile('log.txt', "@Moud: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        fs.appendFile('log.txt',"*******************************************");
    }
}});
  break;

  case 'spotify-this-song':
  if (word) {
    Fspotify(word);
}else
{
    Fspotify("The Sign");
}
break;
case 'movie-this':
if (word) {
    movies(word);
}else
{
    movies("Mr. Nobody");
}
break;
case 'do-what-it-says':
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');
    arg=txt[0];
    word=txt[1];
    main();
  });
  break;
}
}
main();
//function that handle spotify api
function Fspotify(x){
   spotify.search({ type: 'track', query: x}, function(error, data){
    if(!error){
        var song= data.tracks.items[0];
        console.log("Artist: " + song.artists[0].name);
        console.log("Song: " + song.name);
        console.log("Preview URL: " + song.preview_url);
        console.log("Album: " + song.album.name);
        console.log("*******************************************");
        //to fill th log.txt
        fs.appendFile('log.txt',"Artist: " + song.artists[0].name);
        fs.appendFile('log.txt',"Song: " + song.name);
        fs.appendFile('log.txt',"Preview URL: " + song.preview_url);
        fs.appendFile('log.txt',"Album: " + song.album.name);
        fs.appendFile('log.txt',"*******************************************");

    }
});
}
// to grab data from omdb 
function movies(x){
  var omdbURL = 'http://www.omdbapi.com/?apikey='+apikey+'&t=' + x + '&plot=short&tomatoes=true';
  request(omdbURL, function (error, response, body){
    if(!error)
    {
      var body = JSON.parse(body);
      console.log("Title of the movie: " + body.Title);
      console.log("Year the movie came out: " + body.Year);
      console.log("IMDB Rating of the movie: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating of the movie: " + body.tomatoRating);
      console.log("Country where the movie was produced: " + body.Country);
      console.log("Language of the movie: " + body.Language);
      console.log("Plot of the movie: " + body.Plot);
      console.log("Actors in the movie: " + body.Actors);
      //to fill th log.txt
      console.log("*******************************************");
      fs.appendFile('log.txt',"Title of the movie: " + body.Title);
      fs.appendFile('log.txt',"Year the movie came out: " + body.Year);
      fs.appendFile('log.txt',"IMDB Rating of the movie: " + body.imdbRating);
      fs.appendFile('log.txt',"Rotten Tomatoes Rating of the movie: " + body.tomatoRating);
      fs.appendFile('log.txt',"Country where the movie was produced: " + body.Country);
      fs.appendFile('log.txt',"Language of the movie: " + body.Language);
      fs.appendFile('log.txt',"Plot of the movie: " + body.Plot);
      fs.appendFile('log.txt',"Actors in the movie: " + body.Actors);
      fs.appendFile('log.txt',"*******************************************");
      

  }
  if(x === "Mr. Nobody"){
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
  }
});
}