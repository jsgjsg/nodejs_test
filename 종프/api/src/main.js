const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const db = require('./config/db');

app.get('/', function(request, response) {

    db.query(`SELECT * FROM FOOD_TB WHERE INGREDIENTS_NAME = '호박'`, function(err, value) {
        console.log(value);
    });
    response.writeHead(200);
    response.end('main');
});
app.post('/ingredients', function(request, response) {
    // 1. 프론트에서 사진 받기 --> flask에 사진 보내기
    response.writeHead(200);
    response.end('post ingredients');
});
app.get('/ingredients', function(request, response) {
    // 2. flask에서 재료명 받기 --> 프론트에 재료명 보내기 / DB에 재료명 넣기  -- db.query(`INSERT INTO refrigerator VALUE (5, 'ingre5')`);
    response.writeHead(200);
    response.end('get ingredients');
});
app.get('/recipes', function(request, response) {
    // 3. 보유 재료로 만들 수 있는 요리 프론트에 보내기
    // 3-1. 냉장고db에서 보유 재료들 가져오기
    db.query(`SELECT INGREDIENTS_NAME FROM MY_INGREDIENTS_TB`, function(error, ingredients) {
        console.log(ingredients);   // 냉장고 db 안에 있는 재료들 출력
        var ingreList = '';
        var i = 0;
        while (i < ingredients.length - 1) {
            ingreList = ingreList + `'${ingredients[i].INGREDIENTS_NAME}', `;
            i++;
        }
        ingreList = ingreList + `'${ingredients[i].INGREDIENTS_NAME}'`;   //query문에 넣기 좋게 만듬
        console.log(ingreList);
        db.query(`SELECT FOOD_TB.FOOD_NAME, COUNT(*) AS COUNT_REAL, INGRE_COUNT.COUNT FROM FOOD_TB LEFT JOIN INGRE_COUNT ON FOOD_TB.FOOD_ID = INGRE_COUNT.FOOD_ID
            WHERE INGREDIENTS_NAME IN (${ingreList}) GROUP BY FOOD_TB.FOOD_ID HAVING COUNT_REAL = INGRE_COUNT.COUNT`, function(error2, recipes) {  // 3-2. 보유 재료들로 만들 수 있는 요리만 검색
            
            console.log(recipes);
            response.writeHead(200);
            response.end('get recipes');
        });
    });
});
app.get('/recipes/:recipeId', function(request, response) {
    // + 레시피 과정
    response.writeHead(200);
    response.end('get recipes/:recipeId');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});