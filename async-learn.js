var async = require('async');
var http = require('http');

//console.dir(process.argv);

var body="";
var i = 0;
async.whilst(
    function () {
      return body.trim() != 'meerkat';
    },
    function (cb) {
      i++;
      getHttp(process.argv[2], function(err, data){
        //console.log('getHttp - ' + data);
        body += data;
        cb(null, data);
      });
    },
    function (err, result) {
      if (err){
        console.log(err);
      }
      console.log(i);
      //console.log(result);
    }
);

/*
async.reduce(['one','two','three'], 0, function(memo, item, callback){
    process.nextTick(function(){
      getHttp(process.argv[2]+'?number=' + item, function(err, data){
        if (err){
          console.log(err);
        }
        callback(null, memo + parseInt(data));
      });

    });
}, function(err, result){
    console.log(result);
});
*/


/*
async.series({
      one:function(cb){
        async.times(5, function(n, next){
              postHttp(process.argv[2], process.argv[3], '/users/create', {
                user_id: ++n
              }, next);
        }, function(err, users) {
          cb(null, users);
        });
      },
      two:function(cb){
        getHttp('http://'+process.argv[2]+':'+process.argv[3] + '/users', cb)
      }
    },
    function(err, result){
      if (err){
        console.log(err);
      }
      console.log(result.two);
    });
*/

/*
async.map([process.argv[2], process.argv[3]],
  getHttp.bind(null),
  function(err, result){
    if (err){
      console.log(err);
    }
    console.log(result);
  });*/
/*
async.each([process.argv[2], process.argv[3]],
  getHttp.bind(null),
  function(err){
    console.log(err);
  });
*/
/*
async.series({
    requestOne: getHttp.bind(null, process.argv[2]),
    requestTwo: getHttp.bind(null, process.argv[3])
  },
  function(error, result){
    console.log(result);
  }
);
*/


function postHttp(hostname, port, path, data, cb){
  var postData = JSON.stringify(data);

  var options = {
    hostname: hostname,
    port: port,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res){
    res.setEncoding('utf8');
  }).on('error', function(error){
    cb(error);
  });

  req.write(postData);
  req.end();
  cb(null, data);
}

function getHttp(url, cb){
  http.get(url, function(res){
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(res){
      data += res.toString();
    });
    res.on('end', function(){
      cb(null, data)
    });
  }).on('error', function(error){
    cb(error);
  });
}



/*
var fs = require('fs');
async.waterfall([
  fs.readFile.bind(fs, process.argv[2]),
  function(url, cb){
    getHttp(url.toString(),cb);
  }], function(err, result){
    if (err){
      console.error(err);
    }
    console.log(result);

});
*/
