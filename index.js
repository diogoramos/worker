
var config = require('./config/index.js');
var child_process = require('child_process');
var numchild  = require('os').cpus().length;
let done      = 0;

let hashtags = config.hashtags.split(",");

for (var i = 0; i < hashtags.length; i++){
    var worker = child_process.fork('./workers/worker');
    worker.send((i + 1));
    let hashtag = hashtags[i];
    worker.on('message', function(hashtag) {
      console.log('[parent] received message from child:', hashtag);
      done++;
      if (done === numchild) {
        console.log('[parent] received all results');
      }
    });
  }