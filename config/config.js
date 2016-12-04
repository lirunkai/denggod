var path = require('path')
var util = require('../libs/util.js')
var wechat_file = path.join( __dirname, './wechat.txt')
var config = {
  wechat: {
    appID: 'wxf7ead2c0564b363b',
    appSecret: '7d6aea5673973a510b82718227b1797c',
    token: 'lirunkaiaidoudou',
    getAccessToken: function () {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function (data) {
      data = JSON.stringify(data)
      return util.writeFileAsync( wechat_file, data)
    }
  }
}
module.exports = config
