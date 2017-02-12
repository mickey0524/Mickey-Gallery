var pool = require('./databaseManager');

exports.getComments = function(req, res) {

	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else{				
			//console.log(req.body.photoId);
			var selectSQL = "select userName, commentTime, commentContent, userAvatar from comments where photoId = '" + req.body.photoId + "'" ;
			conn.query(selectSQL, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';
				}
				else {
					httpResult.code = 200;
					httpResult.photoComment = results;
					//console.log(results);
				}
				res.send(httpResult);
			});						
			conn.release();			
		}
	});	
}

exports.sendComment = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(!err) {
			conn.query("update photo set photoComment = photoComment + 1 where photoId = '" + req.body.photoId + "'");
			conn.query("select userAvatar, userName from userinfo where userId = '" + req.body.userId + "'", function(selectErr, selectResult) {
				if(!selectErr) {
					var insertSql = "insert into comments values ('" + req.body.photoId + "', '" + selectResult[0].userName + "', '" + req.body.commentContent + "', '" + selectResult[0].userAvatar + "', '" + req.body.commentTime + "')";
					conn.query(insertSql, function(insertErr, results) {
						httpResult.code = 200;
						res.send(httpResult);
						conn.release();
					});
				}
			});
		}
	});
}