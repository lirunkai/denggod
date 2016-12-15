var express = require('express');
var router = express.Router();
var Info = require('../model/info.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var phone = req.session.phone;
  console.log('phone--'+phone)
  Info.find({phone:phone},function(err,docs){
    if( err ) {
      console.log(err)
    } else {
      console.log(docs)
      res.render('home',{docs:docs})
    }
  })
});

router.get('/proceed',function(req,res){
  var phone = req.session.phone;
  Info.find({phone:phone,infoState:'进行中'},function(err, docs){
    if( err ) {
      console.log(err)
    } else {
      res.render('proceedinfo',{docs:docs})
    }
  })
})

router.get('/stay',function(req,res){
  var phone = req.session.phone;
  Info.find({phone:phone,infoState:'待还款'},function(err, docs){
    if( err ) {
      console.log(err)
    } else {
      res.render('stayinfo',{docs:docs})
    }
  })
})

router.get('/settle',function(req,res){
  var phone = req.session.phone;
  Info.find({phone:phone,infoState:'已结清'},function(err, docs){
    if( err ) {
      console.log(err)
    } else {
      res.render('settleinfo',{docs:docs})
    }
  })
})

router.get('/lose',function(req,res){
  var phone = req.session.phone;
  Info.find({phone:phone,infoState:'已失效'},function(err, docs){
    if( err ) {
      console.log(err)
    } else {
      res.render('loseinfo',{docs:docs})
    }
  })
})
module.exports = router;
