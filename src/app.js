'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json'); 

var postsList = Object.keys(posts).map(function(value){
  return posts[value]
});

var app = express();

app.use('/static', express.static(__dirname + "/public"))

app.set('view engine', 'jade');
app.set('views',__dirname + '/templates');

app.set('port', (process.env.PORT || 5000));
;

app.get('/',function(req, res){
  var path = req.path;
  res.locals.path = path;
	res.render('index')
});

app.get('/contact', function(req,res){
  res.render('contact')
});

app.get('/blog/:title?', function(req, res){ 
  var title = req.params.title;
  if (title === undefined) {
    res.status(503);
    res.render('blog', {posts: postsList});
  } else {
    var post = posts[title] || {};
    res.render('post', {post:post});
  }
});

//Get JSON
app.get('/posts', function(req,res){
  if (req.query.raw){
    res.json(posts);
  } else{
    res.json(postsList);
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});












