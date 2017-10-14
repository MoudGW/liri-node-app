var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');

var Twitter = new twit(keys);

var arg=proccess.argv[2];

switch(arg)
{
	case 'my-tweets':
	case 'spotify-this-song':
	case 'movie-this':
	case 'do-what-it-says':
}