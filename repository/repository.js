/**
 * Configuration File
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'twitter',
  password : 'twitter',
  database : 'tweets',
  connectionLimit : 50,
  queueLimit : 5000,
  charset: "utf8_general_ci"
});

module.exports = connection;