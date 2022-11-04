// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var quoteSearch = {q: "(their OR special OR funny OR believe OR forgiveness OR your OR you're) #quote -filter:retweets -has:media -filter:replies lang:en", count: 1}; 

// This function finds the latest tweet with the #arden hashtag, and retweets it.
function retweetLatest(b) {
	T.get('search/tweets', b, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		var tweetText = data.statuses[0].text;
		var result = tweetText.replace(/their/g, "they're");
		var result = result.replace(/special/g, "specail");
		var result = result.replace(/funny/g, "funky");
		var result = result.replace(/believe/g, "beleive");
		var result = result.replace(/forgiveness/g, "forgeivness");
		var result = result.replace(/your/g, "you're");
		var result = result + " #ardezza";

		// ...and then we tell Twitter we want to retweet it!
		
        let statusObj = {
            status: result,
            //in_reply_to_status_id: data.statuses[0].id_str,
        }

        T.post('statuses/update', statusObj, function(error, response) {

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




// Try to retweet something as soon as we run the program...
retweetLatest(quoteSearch);
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 10);

