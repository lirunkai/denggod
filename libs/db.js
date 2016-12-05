var config = require("config-lite")
var mongoose = require('mongoose')
var db = mongoose.connect(config.mongodb)

mongoose.Promise = require('bluebird')
//连接成功
mongoose.connection.on('connected', function () {
  console.log('连接成功')
})
//连接异常
mongoose.connection.on('error', function () {
  console.log('连接异常')
})
//连接断开
mongoose.connection.on('disconnected', function () {
  console.log('链接断开')
})

module.exports = mongoose
