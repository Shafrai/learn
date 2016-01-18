var fs=require('fs');
var path = require('path');
module.exports = function(dirName, extension, callback){
  fs.readdir(dirName, function(err, list){
    if (err)
      callback(err);
    list = list.filter(function (file) {
        return path.extname(file) === '.' + extension
    });
    callback(null, list);
  });
}
