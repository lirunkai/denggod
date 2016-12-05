var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var User =  require('../libs/user.js')
var client = new OAuth('wxc16fae24970c7e67', '6c57dc18084f861782264e0e840b61e7');

// 主页,主要是负责OAuth认真
router.get('/', function(req, res) {
  var domain = 'bob.ngrok.cc'
  var url = client.getAuthorizeURL('http://' + domain + '/weixin/callback','','snsapi_userinfo');
  res.redirect(url)
})

/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到手机号验证界面
 * - 如果是老用户，跳转到主页
 */
router.get('/callback', function(req, res) {
  console.log('----weixin callback -----'+req)
  var code = req.query.code;

  client.getAccessToken(code, function (err, result) {
    console.dir(err)
    console.dir(result)
    var accessToken = result.data.access_token;
    var openid = result.data.openid;

    console.log('token=' + accessToken);
    console.log('openid=' + openid);
  });


  res.render('sigup')
});

module.exports = router;
