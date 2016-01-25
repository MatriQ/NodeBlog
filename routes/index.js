var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  userDao.queryAll(function(data){
    //console.log('get callback in index');
    console.log(data);
    res.render('index', { title: 'Express' });
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
