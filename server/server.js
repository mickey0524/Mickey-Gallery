var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var accountRelated = require('./accountRelated');
var galleryRelated = require('./galleryRelated');
var introductionRelated = require('./introductionRelated');
var messageRelated = require('./messageRelated');
var app = express();

// 跨域支持
app.all('*', (req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token,sign');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  next();
});

/**
 * 用户login判断
 */
app.post('/judgeLanding', bodyParser.json(), function(req, res) { 
 	accountRelated.judgeLanding(req, res); 
})

/**
 * 用户注册
 */
app.post('/register', bodyParser.json(), function(req, res) {
	accountRelated.register(req, res);
})

/**
 * 用户获取头像和name
 */
app.post('/getUserAvatar', bodyParser.json(), function(req, res) {
	galleryRelated.getUserAvatar(req, res);
})

/**
 * 获取图片相关信息
 */
app.post('/getPhoto', bodyParser.json(), function(req, res) {
	galleryRelated.getPhoto(req, res);
})

/**
 * 更改图片喜欢数目
 */
app.post('/changeLikeNum', bodyParser.json(), function(req, res) {
	galleryRelated.changeLikeNum(req, res);
})

/**
 * 把对应图片从用户喜欢列表中删除
 */
app.post('/cutLike', bodyParser.json(), function(req, res) {
	galleryRelated.cutLike(req, res);
})

/**
 * 把对应图片添加到用户喜欢列表
 */
app.post('/addLike', bodyParser.json(), function(req, res) {
	galleryRelated.addLike(req, res);
})

/**
 * 得到该id喜欢过的图片
 */
app.post('/getLikePhoto', bodyParser.json(), function(req, res) {
	galleryRelated.getLikePhoto(req, res);
})

/**
 * 访问主页的时候，得到该用户信息
 */
app.post('/getPersonMes', bodyParser.json(), function(req, res) {
	introductionRelated.getPersonMes(req, res);
})

/**
 * 关注
 */
app.post('/setAttent', bodyParser.json(), function(req, res) {
	introductionRelated.setAttent(req, res);
})

/**
 * 取关
 */
app.post('/cutAttent', bodyParser.json(), function(req, res) {
	introductionRelated.cutAttent(req, res);
})

/**
 * 判断是否关注了该用户
 */
app.post('/judgeAttention', bodyParser.json(), function(req, res) {
	introductionRelated.judgeAttention(req, res);
})

/**
 * get某个用户的关注列表
 */
app.post('/getAttent', bodyParser.json(), function(req, res) {
	introductionRelated.getAttent(req, res);
})

/**
 * get某个用户的粉丝列表
 */
app.post('/getFans', bodyParser.json(), function(req, res) {
	introductionRelated.getFans(req, res);
})

/**
 * get某张图片的评论
 */
app.post('/getComments', bodyParser.json(), function(req, res) {
	messageRelated.getComments(req, res);
})

/**
 * 发送评论
 */
app.post('/sendComment', bodyParser.json(), function(req, res) {
	messageRelated.sendComment(req, res);
})

/**
 * 获取消息
 */
app.post('/getMessages', bodyParser.json(), function(req, res) {
	messageRelated.getMessages(req, res);
})

/**
 * 修改用户信息
 */
app.post('/changePerson', bodyParser.json(), function(req, res) {
	accountRelated.changePerson(req, res);
})

app.listen(3000);
console.log('server opening at localhost:3000');