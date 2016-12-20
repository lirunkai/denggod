var mongoose = require('mongoose');
var db = require('./db.js');

var Schema = mongoose.Schema;

var InfoSchema = new Schema({
  infotype: String,
  infoname: String,
  infocard: Number,
  infocode: String,
  infoloan: Number,
  infofile: String,
  infoHomeType: String,
  infoHomeNumber: String,
  infoDiYa: String,
  infoShopNum: String,
  infoCreateTime: String,
  infoState: String,
  infoReason: String,
  openid: String,
  infoResult: String,
  infoarea: String
})

var InfoModel = db.model('Info',InfoSchema);

module.exports = InfoModel;
