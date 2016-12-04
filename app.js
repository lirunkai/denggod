var koa = require('koa');
var app = koa();
var config = require('./config/config.js')
var wechat = require('./wechat/g.js')

var weixin = require('./weixin.js')

app.use(wechat(config.wechat, weixin.reply))

app.listen(1234)

console.log('listening 1234')
