var pool = require('./databaseManager');

exports.judgeLanding = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else{				
			var selectSQL = "select passWord from userInfo where userId = '" + req.body.userId + "'" ;
			conn.query(selectSQL, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';
					res.send(httpResult);
				}
				else {
					if(results.length == 0) {
						httpResult.code = -1;
						httpResult.description = '用户名不存在!';
						res.send(httpResult);
					}
					else {
						if(results[0].passWord == req.body.passWord) {
							httpResult.code = 200;
						}
						else {
							httpResult.code = -1;
							httpResult.description = '密码错误!';
						}
						res.send(httpResult);
					}
				}
			});						
			conn.release();			
		}
	});	
}

exports.register = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			var userIdSql = "select * from userInfo where userId = '" + req.body.userId + "'" ;
			conn.query(userIdSql, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';
					res.send(httpResult);
				}
				else {
					if(results.length != 0) {
						httpResult.code = -1;
						httpResult.description = '用户名重复!';
						res.send(httpResult);
					}
					else {
						var insertSql = "insert into userInfo value ('" + req.body.userId + "', '" + req.body.passWord + "', '" + req.body.userName + "', '" + req.body.userBirth + "', '" + req.body.userSex + "', '" + req.body.userMotto + "')";
						conn.query(insertSql, function(err, results) {
							if(err) {
								httpResult.code = -1;
								httpResult.description = '数据库操作失败!';							
							}
							else {
								httpResult.code = 200;						
							}
							res.send(httpResult);	
						});
					}
				}
			});
		}
	});
}