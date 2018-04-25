'use strict'

let album = require("./lib/albums.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
})

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
app.get('/delete', function(req,res){
    let result = album.delete(req.query.title); // delete book object
    res.render('delete', {title: req.query.title, result: result});
});

// handle POST
app.post('/get', function(req,res){
    console.log(req.body)
    var found = album.get(req.body.title);
    res.render("details", {title: req.body.title, result: found});
});

// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});