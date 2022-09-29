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
    // 냉장고db에서 보유 재료들 가져오기
    db.query(`SELECT ingredient FROM refrigerator`, function(error, ingredients) {
        console.log(ingredients);

        var ingreList = '';
        var i = 0;

        while (i < ingredients.length - 1) {
            ingreList = ingreList + `'${ingredients[i].ingredient}', `;
            i++;
        }
        ingreList = ingreList + `'${ingredients[i].ingredient}'`;   //query문에 넣기 좋게 만듬
        console.log(ingreList);
        db.query(`SELECT food, COUNT(*) AS COUNT FROM recipe WHERE ingredient IN (${ingreList}) GROUP BY food`,
                                                                    function(error2, food_count) {

            console.log(foods);

            response.writeHead(200);
            response.end('success');
        });
    });

    // 보유 재료들로 만들 수 있는 요리 검색


    db.query(`SELECT * FROM recipe`, function(error, recipes) {
        // console.log(recipes);

        response.writeHead(200);
        response.end('success');
    });
});
app.listen(3000);