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
        console.log(ingredients);   // 냉장고 db 안에 있는 재료들 출력

        var ingreList = '';
        var i = 0;
        while (i < ingredients.length - 1) {
            ingreList = ingreList + `'${ingredients[i].ingredient}', `;
            i++;
        }
        ingreList = ingreList + `'${ingredients[i].ingredient}'`;   //query문에 넣기 좋게 만듬
        console.log(ingreList);
        db.query(`SELECT recipe.food, COUNT(*) AS COUNT_Real, ingre_count.COUNT FROM recipe LEFT JOIN ingre_count ON recipe.food_code = ingre_count.food_code
            WHERE ingredient IN (${ingreList}) GROUP BY recipe.food_code HAVING COUNT_Real = ingre_count.COUNT`, function(error2, foods) {  // 보유 재료들로 만들 수 있는 요리만 검색
            
            console.log(foods);

            response.writeHead(200);
            response.end('success');
        })
    });
});
app.listen(3000);