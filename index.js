/* eslint-disable no-console */

// get dependencies
var app = require('express')();
var Sequelize = require('sequelize');

// sequelize initialization
var sequelize = new Sequelize('postgres://njerikieha:njerikieha@localhost:5432/passwordtracker');

// check db connection
sequelize
.authenticate()
.then(function() {
	console.log('Connection has been established successfully.');
})
.catch(function(err) {
	console.log('Unable to connect to database:', err);
});

// handle request and response
app.get('/', function(req, res) {
	res.send({name: 'Hello World'});
});

// initialize a port
app.listen(5000);
