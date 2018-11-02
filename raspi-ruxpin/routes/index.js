var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.query: '+JSON.stringify(req.query));
  let e = req.query.e || 'o';
  let m = req.query.m || 'c';
  let ex = (e==='o') ? 'c' : 'o';
  let mx = (m==='o') ? 'c' : 'o';

  res.render(
    'index',
    {
      title: 'Home',
      e:e,
      m:m,
      ex:ex,
      mx:mx,
      phrases: req.app.config.phrases || {}
    });
});

module.exports = router;
