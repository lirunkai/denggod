var express = require('express');
var router = express.Router();
var Info = require('../model/info.js');

router.get('/:shopId', function(req, res, next){
  var infoShopNum = req.params.shopId;
  console.log(infoShopNum);
  Info.find({infoShopNum:infoShopNum},function(err,content){
    if ( err ) {
      console.log(err);
    } else {
      console.log(content[0]);
      var oneCon = content[0];
      var info = {
        infoarea: oneCon.infoarea,
        infotype: oneCon.infotype,
        infoname: oneCon.infoname,
        infocard: oneCon.infocard,
        infocode: oneCon.infocode,
        infoloan: oneCon.infoloan,
        infofile: oneCon.infofile,
        infoHomeType: oneCon.infoHomeType,
        infoHomeNumber: oneCon.infoHomeNumber,
        infoDiYa: oneCon.infoDiYa,
        infoShopNum: oneCon.infoShopNum,
        infoCreateTime: oneCon.infoCreateTime,
        infoState: oneCon.infoState,
        infoReason: oneCon.infoReason,
        phone: oneCon.phone,
        infoResult: oneCon.infoResult
      }
      return res.render('showinfo', info)
    }
  })
})

module.exports = router;
