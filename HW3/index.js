'use strict'

let album = require("./lib/albums.js");
var qs = require("querystring");
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res) {
  let url = req.url.split("?");
  let list = qs.parse(url[1]);
  let path = url[0].toLowerCase();
  
      switch(path) {
        case '/':
        case '/home.html':
        case '/home':
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream("public/home.html").pipe(res);
          break;
        case '/about':
          res.writeHead(200, {'Content-Type': 'text/plain'});
          fs.createReadStream("package.json").pipe(res);
          break;
        case '/get':
            let found = album.get(list.title);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found): "Album not found";
            res.end('Listing results for ' + list.title + "\n" + results); 
            break;
        case '/delete':
            let deleted = album.delete(list.title);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let resultsD = (deleted) ? JSON.stringify(deleted): "Album not found";
            res.end(list.title + ' listing has been removed. ' + resultsD);
            break;
        case '/add':
            let added = album.add(list.title);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let resultsA = (added) ? JSON.stringify(added): "Album not found";
            res.end(resultsA);
            break;
        default:
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('Error 404: page does not exist');
          break;
        }
}).listen(process.env.PORT || 3000);