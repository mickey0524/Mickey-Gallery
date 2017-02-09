var pool = require('./databaseManager');

exports.getUserAvatar = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else{				
			var selectSQL = "select userAvatar from userInfo where userId = '" + req.body.userId + "'" ;
			conn.query(selectSQL, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';
				}
				else {
					httpResult.code = 200;
					if(results.length != 0) {
						httpResult.avatar = results[0].userAvatar;
					}
				}
				res.send(httpResult);
			});						
			conn.release();			
		}
	});	
}

exports.getPhoto = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			var selectSql = 'select * from photo';
			conn.query(selectSql, function(err, results) {
				if(err) {
					httpResult = -1;
					httpResult.description = '数据库操作失败!';	
				}
				else {
					httpResult.code = 200;
					httpResult.photo = results;
				}
				res.send(httpResult);
			})
		}
	})
}

exports.changeLikeNum = function(req, res) {
	console.log('serve');
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			console.log(req.body.likeNum + ' ' + req.body.id);
			var selectSql = "update photo set photoLike = '" + req.body.likeNum + "' where photoId = '" + req.body.id + "'";
			conn.query(selectSql, function(err, results) {
				if(err) {
					httpResult = -1;
					httpResult.description = '数据库操作失败!';	
				}
				else {
					httpResult.code = 200;
				}
				res.send(httpResult);
			})
		}
	})
}