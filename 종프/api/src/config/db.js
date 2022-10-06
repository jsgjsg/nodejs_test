var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'gachon-project9.captxogmqyz8.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'gus009964',
    database: 'gachon_projcet9_test'
});
db.connect();

module.exports = db;