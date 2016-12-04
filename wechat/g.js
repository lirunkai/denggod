//中间件   验证允许接入

var sha1 = require('sha1')
var Wechat = require('./wechat.js')
var getRawBody = require('raw-body')    //拼装原生的req对象,生成一个buffer的xml
var util = require('./util.js')


module.exports = function (opts, handler) {
  var wechat = new Wechat(opts)
  return function *(next){  //验证允许接入  返回信息
    var that = this
    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    if ( this.method === 'GET' ) {  //验证接入
      if ( sha === signature ) {
        this.body = echostr
      }
      else {
        this.body = '不是微信提交的'
      }
    }
    else if ( this.method === 'POST' ) {  //其他接口事件
      if ( sha !== signature ){
        console.log('不是微信')
        this.body = '不是微信'
        return false
      }
      //  异步请求的数据 data...是xml
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      })
      var content = yield util.parseXMLAsync(data)  //解析成JSON对象

      var message = util.formatMessage( content.xml ) //进一步处理JSON对象
      console.log(message)  //message是请求过来时的数据

      this.weixin = message

      yield handler.call(this, next)

      //回复
      wechat.reply.call(this)
    }
  }
}
