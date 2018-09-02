var config = require('../config/index.js');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
  });

process.on('message', function(hashtag) {
    process.send({
        hashtag  : hashtag
    },
    client.get('search/tweets', {q: hashtag, count:100}, function(error, tweets, response) {
        console.log('[agent.js] Agent com PID', process.pid , 'começou a busca e processamento.');
        for(let i = 0; i < tweets.statuses.length; i++){
            
            console.log(tweets.statuses[i].user.screen_name);
            //console.log(tweets);
        }
       //console.log(tweets);
    }));
    process.disconnect();
});


    