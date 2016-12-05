var mongoose = require('./db.js')

var Schema = mongoose.Schema;


var UserSchema =  new Schema({
  username: String,
  phone: Number,
  openid: String
})

var UserModel = mongoose.model('User', UserSchema)

UserSchema.methods.find_by_openid = function(cb){
  return this.model('User').find({openid: this.openid}, cb)
}


module.exports = UserModel
