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

// model definition
var User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

// sync model with db, force: true drops the db if it already exists
sequelize.sync({force: true}).then(function() {
	return User.create({
		username: 'njeri',
		password: 'secret'
	}).then(function() {
		User.find({
			where: {username: 'njeri'}
		}).then(function(njeri) {
			console.log('Hello ' + njeri.username);
		});
	});
});

// handle request and response
app.get('/', function(req, res) {
	res.send({name: 'Hello World'});
});

// initialize a port
app.listen(5000);
