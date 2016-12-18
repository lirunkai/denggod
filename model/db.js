var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
//var db = mongoose.connect('mongodb://localhost:27017/okcoin');
 var db = mongoose.connect('mongodb://root:Kongxi521@dds-2ze41b282c55fcc41.mongodb.rds.aliyuncs.com:3717,dds-2ze41b282c55fcc42.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-2482227');
module.exports = db;
