const config = require('../config/index.js');
const connection = require('../repository/repository.js');
const Twitter = require('twitter');
const Promise = require('promise');

const client = new Twitter({
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

        for(let i = 0; i < tweets.statuses.length; i++){
            let arr = tweets.statuses[i].user.location.split(",").map(function (val) {
                return val;
              });
              
              let userParams = [tweets.statuses[i].user.id, tweets.statuses[i].user.name, tweets.statuses[i].user.screen_name, arr[0], arr[1], tweets.statuses[i].user.followers_count, tweets.statuses[i].user.lang, '', tweets.statuses[i].user.screen_name, arr[0], arr[1], tweets.statuses[i].user.followers_count, tweets.statuses[i].user.lang];

              connection.query('INSERT INTO twitter_user SET ID= ?, NAME= ?, SCREEN_NAME= ?, CITY= ?, COUNTRY= ?, FOLLOWERS= ?, LANG= ? ON DUPLICATE KEY UPDATE NAME= ?, SCREEN_NAME= ?, CITY= ?, COUNTRY= ?, FOLLOWERS= ?, LANG= ?',userParams, function(err,res){              
                if(err) throw err;
                console.log('Inserted user!');
               });

               let tweetParams = [tweets.statuses[i].id, tweets.statuses[i].create_at, tweets.statuses[i].text, tweets.statuses[i].lang, tweets.statuses[i].favorited, tweets.statuses[i].user.id , tweets.statuses[i].create_at, tweets.statuses[i].text, tweets.statuses[i].lang, tweets.statuses[i].favorited];

               connection.query('INSERT INTO twitter_tweet SET ID= ?, CREATED_AT= ?, TEXT= ?, LANG= ?, FAVORITED= ?, TWITTER_USER_ID= ? ON DUPLICATE KEY UPDATE CREATED_AT= ?, TEXT= ?, LANG= ?, FAVORITED= ?',tweetParams, function(err,res){              
                 if(err) throw err;
                 console.log('Inserted tweet!');
                });
               
        }
    }));
    process.disconnect();
});


    