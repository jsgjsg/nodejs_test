var http = require('http');
var urlm = require('url');

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'example'
});
db.connect();

var app = http.createServer( function(request, response) {
    var url = request.url;
    var queryData = urlm.parse(url, true).query;
    var pathname = urlm.parse(url, true).pathname;
    if (request.url == '/favicon.ico') {
        return response.writeHead(404);
    }
    db.query(`SELECT * FROM recipe`, function(error, recipes) {
        console.log(recipes);

        response.writeHead(200);
        response.end('success');
    });
});
app.listen(3000);