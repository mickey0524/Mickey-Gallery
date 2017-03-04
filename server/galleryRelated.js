var dataManage = require('./databaseManager');
var fs = require('fs');
var multiparty = require('multiparty');

exports.getUserAvatar = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
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
	dataManage.pool.getConnection(function(err, conn) {
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
					res.send(httpResult);
				}
				else {
					httpResult.code = 200;
					for(var i in results) {
						results[i].like = false;
					}
					if(req.body.userId == '') {
						httpResult.photo = results;
						res.send(httpResult);
					}
					else {
						conn.query("select photoId from photolike where userId = '" + req.body.userId + "'", function(errLike, resultsLike) {
							if(!errLike) {
								var arr = [];
								for(var i in resultsLike) {
									arr.push(resultsLike[i].photoId);
								}
								for(var i = 0; i < results.length; i++) {
									if(arr.indexOf(results[i].photoId) == -1) {
										results.splice(i, 1);
										i -= 1;
									}
								}
								httpResult.photo = results;
								res.send(httpResult);
							}
						})
					}
					
				}
			});
			conn.release();			
		}
		
	});
}

exports.changeLikeNum = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
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
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
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
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(err) {
			httpResult.code = -1;
			httpResult.description = '数据库操作失败!';
			res.send(httpResult);
		}
		else {
			conn.query("select userId from photolike where photoId = '" + req.body.photoId + "'", function(err, results) {
				if(!err) {
					conn.query("select userName, userAvatar from userinfo where userId = '" + req.body.userId + "'", function(userErr, userResults) {
						if(!userErr) {
							for(var i in results) {
								var content = userResults[0].userName + '喜欢了和您一样的图片~';
								conn.query("insert into messages values ('" + results[i].userId + "', '" + userResults[0].userName + "', '" + userResults[0].userAvatar + "', '" + dataManage.getNowFormatDate() + "', '" + content + "', '" + req.body.userId + "')");							
							}							
						}
					});
				}
			});
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
	dataManage.pool.getConnection(function(err, conn) {
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

exports.uploadPhoto = function(req, res) {
	var httpResult = {};
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        //将前台传来的base64数据去掉前缀
        var imgData = req.body.photoBase.replace(/^data:image\/\w+;base64,/, '');
        var dataBuffer = new Buffer(imgData, 'base64');
        dataManage.pool.getConnection(function(err, conn) {
        	if(!err) {
        		conn.query("select max(photoId) as photoId from photo", function(err, results) {
        			if(!err) {
        				var id = Number(results[0].photoId) + 1;
        				console.log(id);
				        fs.writeFile('../src/assets/port' + id +'.jpg', dataBuffer, function(err){
				            if(err) {
				                res.send(err);
				            }
				            else {
				            	conn.query("insert into photo values ('" + id + "', '0', '0')");
				            	httpResult.code = 200;
				            	res.send(httpResult);
				            }
				        });       				
        			}
        		});
        		conn.release();
        	}
        });	
    });
}