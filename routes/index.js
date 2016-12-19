module.exports = function(app){
  app.use('/',require('./start.js'));
  app.use('/message',require('./message.js'));
  app.use('/callback',require('./callback.js'))
  app.use('/home', require('./home.js'));
  app.use('/infoin', require('./infoin.js'));
  app.use('/showinfo',require('./showinfo.js'));
  app.use('/MP_verify_5HnpAPvqQPxCRBjv.txt',require('./MP_verify_5HnpAPvqQPxCRBjv.js'))
  app.use('/login',require('./login.js'))
};
