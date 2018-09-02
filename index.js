
var config = require('./config/index.js');
var child_process = require('child_process');
var done      = 0;

let hashtags = config.hashtags.split(",");

for (var i = 0; i < hashtags.length; i++){
    var worker = child_process.fork('./agents/agent');
    worker.send(hashtags[i]);
    let hashtag = hashtags[i];
    worker.on('message', function(hashtag) {
      console.log('[index.js] ', hashtag.hashtag, 'enviada para busca e processamento.');
    });
  }


