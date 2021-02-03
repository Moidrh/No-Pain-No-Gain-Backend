/**
 * TODO connections
 */
require('dotenv').config();

let connection;
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PSW,
  database : process.env.DB_DB,
});

//Initialize the connection
//dbConnection.connect();

module.exports = {
  dbConnection
}