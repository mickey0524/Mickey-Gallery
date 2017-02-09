var mysql = require('mysql');

var pool = mysql.createPool({  //连接池
	host : 'localhost',
	user : 'root',
	password : 'baihao0524',
	port : '3306',
	database : 'mickey_gallery'
});

module.exports = pool;
