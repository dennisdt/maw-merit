const express = require('express')
const path = require('path')
const api = require('./routes/api')
const mongo = require('./server/mongo')

mongo.init().then(() => {

  const app = express();

  var logr = function(req, res, next)
  {
    if(req.url.split('/')[1] == 'static')
    {
      next();
    }
    else {
      console.log('[request] url: ' + req.url + ' method: ' + req.method)
      next();
    }
  }

  app.use(logr)
  app.use('/api', api)

  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', function(req, res) {
    console.log('[redirect][index] ' + req.url + ' => index')
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

  app.listen(process.env.PORT || 5000)

})
