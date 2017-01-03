var mongoose = require('mongoose');
var db = require('./db.js');

var Schema = mongoose.Schema;

var InfoSchema = new Schema({
  infotype: String,
  infoname: String,
  infocard: Number,
  infocode: String,
  infoloan: Number,
  infofile: Array,
  infoHomeType: String,
  infoHomeNumber: String,
  infoDiYa: String,
  infoShopNum: String,
  infoCreateTime: String,
  infoState: String,
  infoReason: String,
  openid: String,
  infoResult: String,
  infoarea: String,
  infophone: String
})

var InfoModel = db.model('Info',InfoSchema);

module.exports = InfoModel;
