var config = require('../config/index.js');
var connection = require('../repository/repository.js');
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
        console.log('[agent.js] Agent com PID', process.pid , 'começou a busca e processamento da hashtag:', hashtag);
        connection.connect();
        for(let i = 0; i < tweets.statuses.length; i++){
            let arr = tweets.statuses[i].user.location.split(",").map(function (val) {
                return val;
              });
              
              connection.query('INSERT INTO twitter_user SET ?', {
                id: tweets.statuses[i].user.id,
                name: '',//tweets.statuses[i].user.name,
                screen_name: tweets.statuses[i].user.screen_name,
                city: arr[0],
                country: arr[1],
                followers: tweets.statuses[i].user.followers_count,
                lang: tweets.statuses[i].user.lang
            }, 
            function (error, results, fields) {
                if (error) throw error;
                console.log(results);
              });
        }
        connection.end();        
    }));
    process.disconnect();
});


    