module.exports = function (app) {
  app.use('/', require('./weixin.js'))
}
