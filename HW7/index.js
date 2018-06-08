'use strict'

var express = require("express");
var app = express();
var Album = require("./models/albums.js");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', (req, res, next) => {
    Album.find((err,albums) => {
        if (err) return next(err); 
        res.render('home', {albums: albums}); 
    });
});

app.get('/home', (req, res, next) => {
    Album.find((err,albums) => {
        if (err) return next(err); 
        res.render('home', {albums: albums}); 
    });
});

app.get('/about', (req,res) => {
    res.type('text/html'); 
    res.render('about'); 
}); 

app.get('/api/v1/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Album.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/books', (req,res, next) => {
    Album.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    Album.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - page not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});