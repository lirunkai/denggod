

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util.js')

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
  access_token: prefix+'token?grant_type=client_credential'
}
//生成实例,初始化,票据的获取更新  接口
function Wechat(opts) {
  var that = this
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken
  this.getAccessToken()
    .then(function (data) {
      try {
        data = JSON.parse(data)
      }
      catch (e) {
        return that.updateAccessToken()
      }
      if ( that.isValiaAccessToken(data) ) {
        return Promise.resolve(data)
      }
      else {
        return that.updateAccessToken()
      }
    })
    .then(function (data) {
      that.access_token = data.access_token
      that.expires_in = data.expires_in

      that.saveAccessToken(data)
    })
}

Wechat.prototype.isValiaAccessToken = function (data) {
  if ( !data || !data.access_token || !data.expires_in ) {
    return false
  }

  var access_token = data.access_token
  var expires_in = data.expires_in
  var now = new Date().getTime()

  if ( now < expires_in ){
    return true
  }
  else {
    return false
  }
}

Wechat.prototype.updateAccessToken = function () {
  var appID = this.appID
  var appSecret = this.appSecret
  var url = api.access_token + '&appid='+ appID + '&secret='+ appSecret
  return new Promise(function (resolve, reject) {
    request({ url: url, json: true})
      .then(function(response){
        var data = response.body
        var now = new Date().getTime()
        var expires_in = now + ( data.expires_in - 20 ) * 1000
        data.expires_in = expires_in
        resolve(data)
      })
  })
}

Wechat.prototype.reply = function () {
  var content = this.body //回复的内容
  var message = this.weixin

  var xml = util.tpl(content, message)  //生成需要的xml结构用来回复

  this.status = 200
  this.type = 'application/xml'
  this.body = xml

}

module.exports = Wechat
