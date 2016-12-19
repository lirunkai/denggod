var express = require('express');
var router = express.Router();
var User = require('../model/user')
var OAuth = require('wechat-oauth');

var client = new OAuth('wx60aeb0c0c8970d98','1fcf6b499cd23fc65bb881a410799afa');

// router.get('/', function(req, res){
//   res.redirect('/callback');
// })

router.get('/', function(req, res){
  var url = client.getAuthorizeURL('http://d.zhongpinhappy.cn/callback','','snsapi_userinfo');
  res.redirect(url)
})

module.exports = router;
