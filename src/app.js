'use strict';

var express = require('express'),
	posts = require('./mock/posts.json'); 

var app = express();

var port = 3000;

app.get('/',function(req, res){
	res.send("I am in love with treehouse");
});

app.get('/blog/:title?', function(req,res){
	
	var title = req.params.title;
	if(title === undefined){
		res.status(503);node
		res.send("This page is under contruction")
	} else {
			var post = posts[title];
			res.send(post);
		}
});

app.listen(port, function(){
	console.log('Running on localhost:' + port);
});