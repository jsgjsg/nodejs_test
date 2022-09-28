var http = require('http');
var urlm = require('url');

var app = http.createServer( function(request, response) {

    console.log("github test");
    console.log("pc github test2");

    response.writeHead(200);
    response.end('success');
});

app.listen(3000);