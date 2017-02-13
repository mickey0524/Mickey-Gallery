var mysql = require('mysql');

var pool = mysql.createPool({  //连接池
	host : 'localhost',
	user : 'root',
	password : 'baihao0524',
	port : '3306',
	database : 'mickey_gallery'
});

exports.pool = pool;

exports.getNowFormatDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

exports.changeFormat = function(date) {
	for(var i in date) {
		if(date.length == 1) {
			date[i] = '0' + date[i];
		}
	}
	return date;
}
