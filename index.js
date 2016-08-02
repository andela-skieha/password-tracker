/* eslint-disable no-console */

// get dependencies
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

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

// model definition
var User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

var createUser = function(req, res) {
	var newUser = {
		username: req.body.username,
		password: req.body.password
	};
	User.create(newUser).then(function() {
		res.sendStatus(200);
	});
};

var getUser = function(req, res) {
	User.findAll().then(function(users) {
		res.send(users);
	});
};

// sync model with db
sequelize.sync().then(function() {
	app.get('/users', getUser);
	app.post('/users', createUser);
	// initialize a port
	app.listen(5000);
});
