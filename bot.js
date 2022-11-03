// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var mediaArtsSearch = {q: "#mediaarts", count: 10, result_type: "recent"}; 

// This is the URL of a search for the latest tweet on the #arden hashtag.
var ardenSearch = {q: "#arden", count: 10, result_type: "recent"}; 


var worldSearch = {q: "from:W0rldPlaces -filter:retweets -filter:replies until:2022-11-01", count: 1}; 

// This function finds the latest tweet with the #arden hashtag, and retweets it.
function retweetLatest(b) {
	T.get('search/tweets', b, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

//This function tells the weather in toronto
//variable to fetch the date
//

//use this url
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//this is @w0rldplaces 's ID
// 1494381135098527744

//this function holds all the weather data in the data variable.
function weatherBalloon( ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=63588ea7e9daeb06402e7624198c6fe7')  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
	  drawWeather(data);
	})
	.catch(function() {
	  // catch any errors
	});
  }

function drawWeather( d ) {
	var fahrenheit = (Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32)) + '&deg;';
	var weatherStatus = {
		status: 'Today, the weather in ' + d.name + ' is ' + temperature + ' and ' + d.weather[0].description
		//status: 'Today, the weather is ' + temperature + ' and ' + sunny
	}
	T.post('statuses/update', weatherStatus, function (error, response) {
		if (response) {
			console.log('Success! Check your bot, it should have retweeted something.')
		}
		// If there was an error with our Twitter call, we print it out here.
		if (error) {
			console.log('There was an error with Twitter:', error);
		}

	})
}

//weatherBalloon();
 


// Try to retweet something as soon as we run the program...
retweetLatest(worldSearch);
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(retweetLatest, 1000 * 60 * 60);

