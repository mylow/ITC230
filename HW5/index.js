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

app.get('/', (req, res, next) => {
    Album.find((err,albums) => {
        if (err) return next(err); 
        res.render('home', {albums: albums}); 
    });
});

app.get('/about', (req,res) => {
    res.type('text/html'); 
    res.render('about'); 
}); 

app.get('/get', (req,res, next) => {
   Album.findOne ({ title:req.query.title }, (err, album) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('details', {result: album}); 
   });  
});

app.post('/get', (req, res, next) => {
   Album.findOne ({ title:req.body.title }, (err, album) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('details', {result: album}); 
   });  
});

app.get('/delete', (req, res, next) => {
   Album.remove ({title: req.query.title }, (err, result) => {
        if (err) return next (err); 
       let deleted = result.result.n !== 0; 
       Album.count((err, total) => {
            res.type('text/html'); 
            res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, total: total} );
       });
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