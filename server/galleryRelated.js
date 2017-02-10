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
		conn.release();	
	})
}

exports.changeLikeNum = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
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
		conn.release();	
	})
}

exports.cutLike = function(req, res) {
	//console.log('cut ' + req.body.photoId + ' ' + req.body.userId);
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
			//console.log('cut');
		}
		else {
			//console.log('cut~');
			var deleteSql = "delete from photolike where photoId = '" + req.body.photoId + "' and userId = '" + req.body.userId + "'";
			conn.query(deleteSql, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';					
				}
				else {
					httpResult.code = 200;
				}
				res.send(httpResult);
			})
		}
		conn.release();	
	})
}

exports.addLike = function(req, res) {
	//console.log('add ' + req.body.photoId + ' ' + req.body.userId);
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			//console.log('add');
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			//console.log('add~');
			var insertSql = "insert into photolike values('" + req.body.photoId + "', '" + req.body.userId + "')";
			conn.query(insertSql, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';					
				}
				else {
					httpResult.code = 200;
				}
				res.send(httpResult);
			})
		}
		conn.release();	
	})
}

exports.getLikePhoto = function(req, res) {
	var httpResult = {};
	pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			var selectSql = "select photoId from photolike where userId = '" + req.body.userId + "'";
			conn.query(selectSql, function(err, results) {
				if(err) {
					httpResult.code = -1;
					httpResult.description = '数据库操作失败!';		
					res.send(httpResult);			
				}
				else {
					httpResult.code = 200;
					var array = [];
					for(var i in results) {
						array.push(results[i].photoId);
					}
					httpResult.photo = array;
					res.send(httpResult);
				}		
			})		
		}
		conn.release();	
	})
}