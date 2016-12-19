var mongoose = require('mongoose');
var db = require('./db.js');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  username : String,
  pass : String
})

var AdminModel = db.model('Admin',AdminSchema);

var info = {
  username: 'haoweijituan888@163.com';
  pass: 'haoweijituan2008'
}

var admin = new AdminModel(info);

admin.save();



module.exports = AdminModel;
