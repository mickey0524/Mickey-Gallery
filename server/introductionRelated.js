var dataManage = require('./databaseManager');

exports.getPersonMes = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else{				
			var selectSQL = "select userName, userBirth, userSex, userMotto, userAvatar, userAttent, userFans from userInfo where userId = '" + req.body.userId + "'" ;
			conn.query(selectSQL, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';
				}
				else {
					httpResult.code = 200;
					httpResult.userMes = results[0];
				}
				res.send(httpResult);
			});						
			conn.release();			
		}
	});	
}

exports.judgeAttention = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else {
			var selectSql = "select * from attention where attentId = '" + req.body.attentId + "' and followedId = '" + req.body.followedId + "'";
			conn.query(selectSql, function(err, results) {
				if(!err) {
					if(results.length == 0) {
						httpResult.result = false;
					}
					else {
						httpResult.result = true;
					}
					httpResult.code = 200;
					res.send(httpResult);
				}
				conn.release();
			});
		}
	});	
}

exports.setAttent = function(req, res) {
	//console.log('setAttent');
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else {
			conn.query("update userinfo set userAttent = userAttent + 1 where userId = '" + req.body.attentId + "'");
			conn.query("update userinfo set userFans = userFans + 1 where userId = '" + req.body.followedId + "'");
			conn.query("insert into attention values ('" + req.body.attentId + "', '" + req.body.followedId + "')");
			conn.query("select userName, userAvatar from userinfo where userId = '" + req.body.attentId + "'", function(err, results) {
				if(!err) {
					var content = results[0].userName + '关注了你~';
					conn.query("insert into messages values ('" + req.body.followedId + "', '" + results[0].userName + "', '" + results[0].userAvatar + "', '" + dataManage.getNowFormatDate() + "', '" + content + "', '" + req.body.attentId + "')", function(messageErr, messageResult) {
						if(!messageErr) {
							conn.release();
						}
					});
				}
			});
		}
	});
}

exports.cutAttent = function(req, res) {
	//console.log('cutAttent');
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else {
			conn.query("update userinfo set userAttent = userAttent - 1 where userId = '" + req.body.attentId + "'");
			conn.query("update userinfo set userFans = userFans - 1 where userId = '" + req.bodyfollowedId + "'");
			conn.query("delete from attention where attentId = '" + req.body.attentId + "' and followedId = '" + req.body.followedId + "'");
			conn.query("select userName, userAvatar from userinfo where userId = '" + req.body.attentId + "'", function(err, results) {
				if(!err) {
					var content = results[0].userName + '取关了你~';
					conn.query("insert into messages values ('" + req.body.followedId + "', '" + results[0].userName + "', '" + results[0].userAvatar + "', '" + dataManage.getNowFormatDate() + "', '" + content + "', '" + req.body.attentId + "')", function(messageErr, messageResult) {
						if(!messageErr) {
							conn.release();
						}
					});
				}
			});
		}
	});	
}

exports.getAttent = function(req, res) {
	//console.log('getAttent');
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else {
			conn.query("select followedId from attention where attentId = '" + req.body.userId + "'", function(err, results) {
				if(!err) {
					var result = [];
					httpResult.code = 200;
					for(var i in results) {
						var selectSql = "select userAvatar, userName, userMotto, userAttent, userFans, userId from userinfo where userId = '" + results[i].followedId + "'";
						conn.query(selectSql, function(selectErr, selectResult) {
							if(!selectErr) {
								result.push(selectResult[0]);
								if(i == results.length - 1) {
									httpResult.attention = result;
									res.send(httpResult);
								}
							}
						})
					}					
				}
			});
			conn.release();
		}
	});
}

exports.getFans = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！';
			res.send(httpResult);
		}
		else {
			conn.query("select attentId from attention where followedId = '" + req.body.userId + "'", function(err, results) {
				if(!err) {
					var result = [];
					httpResult.code = 200;
					for(var i in results) {
						var selectSql = "select userAvatar, userName, userMotto, userAttent, userFans, userId from userinfo where userId = '" + results[i].attentId + "'";
						conn.query(selectSql, function(selectErr, selectResult) {
							if(!selectErr) {
								result.push(selectResult[0]);
								if(i == results.length - 1) {
									httpResult.attention = result;
									res.send(httpResult);
								}
							}
						})
					}					
				}
			});
			conn.release();
		}
	});	
}