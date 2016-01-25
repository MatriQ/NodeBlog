
var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userMapping');

var sqlPool=mysql.createPool(conf.mysql);

var getConn=function() {
  var connPromise=new Promise(function(resolve,reject){
    //console.log('start getConnection');
    sqlPool.getConnection(function(err,conn){
      //console.log('getConnection callback');
      if (err) {
        //console.log(err);
        reject(err);
      }
      else{
        resolve(conn);
      }
    });
  });
  return connPromise;
};

var execQuery=function(conn,sql,paras){
  var queryPromise=new Promise(function(resolve,reject){
    console.log('start connect');
    conn.connect();
    console.log('connect success');
    conn.query(sql,function(err,result){
      if (result) {
        resolve(result);
      }
      else {
        reject(err);
      }
      conn.release();
    });
  });
  return queryPromise;
};



var queryAll=function (callback) {
  getConn().then(
    conn=>execQuery(conn,sql.queryAll,[])
  ).then(
    data=>callback({success:true,data:data})
  ).catch(function(error){
      //console.log(error);
      callback({success:false,error:error})
  });

  /*sqlPool.getConnection(function(err,conn){
    conn.query(sql.queryAll,function(err,result){
      if (result) {
        console.log('query all successed');
        console.log(result);
      }
      else {
        console.log('query all failed');
      }
      conn.release();
    });
  });*/
  };

module.exports={
  queryAll:queryAll
}
