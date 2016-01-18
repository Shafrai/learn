/*var mf=require('./moduleFunction');
mf(process.argv[2], process.argv[3], function(err, files){
  if (err)
    return console.error('There was an error:', err)
  files.forEach(function(file){
    console.log(file);
  });
});
*/

var http = require('http');
var map = require('through2-map');
var url = require('url');
var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type':'application/json'});
  var urlP = url.parse(req.url, true);
  var date = new Date(urlP.query.iso);
  var result = {};
  if (urlP.pathname == '/api/parsetime'){
     result = {
      "hour" : date.getHours(),
      "minute" : date.getMinutes(),
      "second" : date.getSeconds()
    }
    res.end(JSON.stringify(result));
  } else if (urlP.pathname == '/api/unixtime'){
    result = {
      "unixtime" : date.getTime()
    }
  }
  res.end(JSON.stringify(result));
});
server.listen(process.argv[2]);

/*
var http = require('http');

var listUrl = [process.argv[2], process.argv[3], process.argv[4]]
var i=0;
httpGet(listUrl[i]);

function httpGet(url){
  http.get(url, function(res){
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(d) {
      data+=d;
    });
    res.on('end', function(){
      console.log(data);
      i++;
      if (i <= 2)
        httpGet(listUrl[i]);
    });
    res.on('error', console.error);
  }).on('error', console.error);
}
*/
/*var net = require('net');
var server = net.createServer(function(socket){
  var date = new Date();
  socket.end(date.getFullYear()+'-'+('0' + (date.getMonth() + 1)).slice(-2)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+"\n");
});
server.listen(process.argv[2]);
*/
