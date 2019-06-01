var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var url=req.query['url'];
  console.log(url);
  res.render('index', { title: 'Express' });
});

module.exports = router;
