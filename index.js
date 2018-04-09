var http = require("http");
var fs = require("fs");
http.createServer(function(req,res) {
  var path = req.url.toLowerCase();
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
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error 404: page does not exist');
      break;
    }
}).listen(process.env.PORT || 3000);