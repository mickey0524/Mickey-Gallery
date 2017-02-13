var dataManage = require('./databaseManager');

exports.getComments = function(req, res) {

	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else{				
			//console.log(req.body.photoId);
			var selectSQL = "select userName, commentTime, commentContent, userAvatar, userId from comments where photoId = '" + req.body.photoId + "'" ;
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
	dataManage.pool.getConnection(function(err, conn) {
		if(!err) {
			conn.query("select userId from comments where photoId = '" + req.body.photoId + "'", function(err, results) {
				if(!err) {
					conn.query("select userName, userAvatar from userinfo where userId = '" + req.body.userId + "'", function(userErr, userResults) {
						if(!userErr) {
							var newResult = [];
							var json = {};
							for(var i in results) {
								if(!json[results[i]]) {
									newResult.push(results[i]);
									json[results[i]] = 1;
								}
							}
							for(var i in newResult) {
								var content = userResults[0].userName + '评论了您评论过的图片~';
								conn.query("insert into messages values ('" + newResult[i].userId + "', '" + userResults[0].userName + "', '" + userResults[0].userAvatar + "', '" + dataManage.getNowFormatDate() + "', '" + content + "', '" + req.body.userId + "')");							
							}							
						}
					});
				}
			});
			conn.query("update photo set photoComment = photoComment + 1 where photoId = '" + req.body.photoId + "'");
			conn.query("select userAvatar, userName from userinfo where userId = '" + req.body.userId + "'", function(selectErr, selectResult) {
				if(!selectErr) {
					var insertSql = "insert into comments values ('" + req.body.photoId + "', '" + selectResult[0].userName + "', '" + req.body.commentContent + "', '" + selectResult[0].userAvatar + "', '" + req.body.commentTime + "', '" + req.body.userId + "')";
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

exports.getMessages = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(!err) {
			conn.query("select messageName, messageAvatar, messageTime, messageContent, messageId from messages where userId = '" + req.body.userId + "'", function(err, results) {
				if(!err) {
					httpResult.code = 200;
					if(req.body.lastPull == '') {
						httpResult.message = results;
						res.send(httpResult);
					}
					else {
						var lastPull = req.body.lastPull.split(' ');
						lastPull = Number(dataManage.changeFormat(lastPull[1].split(':')).join(''));
						var message = [];
						var i;
						for(i = 0; i < results.length; i++) {
							var resultTime = results[i].messageTime.split(' ');
							resultTime =  Number(dataManage.changeFormat(resultTime[1].split(':')).join(''));
							//console.log(resultTime + ' ' + lastPull);
							if(resultTime > lastPull) {
								break;
							}
						}
						if(i < results.length) {
							for(var j = i; j < results.length; j++) {
								message.push(results[j]);
								if(j == results.length - 1) {
									httpResult.message = message;
									res.send(httpResult);
								}
							}
						}
						else {
							httpResult.message = message;
							res.send(httpResult);
						}							
					}
				}
			});
			conn.release(); 
		}
	});
}