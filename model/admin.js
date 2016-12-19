var mongoose = require('mongoose');
var db = require('./db.js');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  username : String,
  pass : String
})

var AdminModel = db.model('Admin',AdminSchema);



module.exports = AdminModel;
