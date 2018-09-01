
var config = require('./config/index.js');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});


client.get('search/tweets', {q: 'microservices', count:100}, function(error, tweets, response) {
    for(let i = 0; i < tweets.statuses.length; i++){
        console.log(tweets.statuses[i].user.name);
    }
   //console.log(tweets);
});