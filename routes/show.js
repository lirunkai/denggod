var router = require('express').Router();

//详细页面
router.get('/', function ( req, res, next) {
  res.send( req.flash() )
})

module.exports = router;
