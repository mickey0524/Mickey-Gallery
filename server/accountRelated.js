var dataManage = require('./databaseManager');
var fs = require('fs');
var multiparty = require('multiparty');

exports.judgeLanding = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
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
	dataManage.pool.getConnection(function(err, conn) {
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
						console.log(req.body.userAvatar);
						var insertSql = "insert into userInfo values ('" + req.body.userId + "', '" + req.body.passWord + "', '" + req.body.userName + "', '" + req.body.userBirth + "', '" + req.body.userSex + "', '" + req.body.userMotto + "', '" + req.body.userAvatar + "', '0', '0')";
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
			conn.release();
		}
	});
}

exports.changePerson = function(req, res) {
	var httpResult = {};
	dataManage.pool.getConnection(function(err, conn) {
		if(!err) {
			conn.query("update userinfo set userName = '" + req.body.userName + "', userMotto = '" + req.body.userMotto + "', userSex = '" + req.body.userSex + "', userBirth = '" + req.body.userBirth + "' where userId = '" + req.body.userId + "'");
			conn.release();
		}
	});
	if(fs.existsSync('../src/assets/zanshi' + req.body.userId + '.jpg')) {
		//console.log(req.body.userAvatar);
		fs.unlink('../src/assets/avatar' + req.body.userAvatar + '.jpg');
		fs.rename('../src/assets/zanshi' + req.body.userId + '.jpg', '../src/assets/avatar' + req.body.userAvatar + '.jpg');
	}
}

exports.changePhoto = function(req, res) {
	var httpResult = {};
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
        //将前台传来的base64数据去掉前缀
        var imgData = req.body.photoBase.replace(/^data:image\/\w+;base64,/, '');

        var dataBuffer = new Buffer(imgData, 'base64');
        //写入文件
        if(req.body.variety == 'zanshi') {
        	dataManage.pool.getConnection(function(err, conn) { 
        		if(!err) {
        			conn.query("select userAvatar from userinfo where userId = '" + req.body.userId + "'", function(err, results) {
        				if(!err) {
					        fs.writeFile('../src/assets/avatar' + results[0].userAvatar +'.jpg', dataBuffer, function(err){
					            if(err) {
					                res.send(err);
					            }
					            else {
					            	httpResult.code = 200;
					            	res.send(httpResult);
					            }
					        });
        				}
        			});
        			conn.release();
        		}
        	})
        	
        }
        else {
	        dataManage.pool.getConnection(function(err, conn) {
	        	if(!err) {
	        		conn.query("select max(userAvatar) as userAvatar from userinfo", function(err, results) {
	        			if(!err) {
	        				var name = Number(results[0].userAvatar) + 1;
					        fs.writeFile('../src/assets/avatar' + name + '.jpg', dataBuffer, function(err){
					            if(err) {
					                res.send(err);
					            }
					            else {
					            	httpResult.code = 200;
					            	httpResult.imgAddress = name;
					                res.send(httpResult);
					            }
					        });
	        			}
	        		});
	        		conn.release();
	        	}
	        });       	
        }
    });
}

exports.deleteZanshi = function(req, res) {
	if(fs.existsSync('../src/assets/zanshi' + req.body.userId + '.jpg')) {
		fs.unlink('../src/assets/zanshi' + req.body.userId + '.jpg');
	}
}