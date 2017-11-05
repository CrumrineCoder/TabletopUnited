'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
  mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://' + process.env.HOST + '/' + process.env.NAME, function (err, db) {

	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		console.log('MongoDB successfully connected on port 27017.');
	}

	//app.use('/public', express.static(process.cwd() + '/public'));
	//app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

	routes(app, db);

	app.listen(3000, function () {
		console.log('Listening on port 3000...');
	});

});

'use strict';
 
const yelp = require('yelp-fusion');
 
const token = yelp.accessToken(process.env.clientId, process.env.clientSecret).then(response => {
  console.log(response.jsonBody.access_token);
}).catch(e => {
  console.log(e);
});
 

 
const client = yelp.client(token);
 
client.search({
  term:'Tabletop Games',
  location: 'NYC'
}).then(response => {
  console.log("hi"); 
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log("yo");
  console.log(e);
}); 