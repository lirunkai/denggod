var mongoose = require('mongoose');
var db = require('./db.js');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  phone: String
  openid: String
})

var UserModel = db.model('User',UserSchema);



module.exports = UserModel
