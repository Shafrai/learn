var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  userName: 'shafray',
  password: 'shafraytest',
  server: 'tank12', // You can use 'localhost\\instance' to connect to named instance
  //domain : 'icscorp',
  
  // If you're on Windows Azure, you will need this:
  options: {
    instanceName:'snickers',
    database: 'ics_ua97',
    //encrypt: true
  }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
  // If no error, then good to go...
  if(err) console.log(err);

  executeStatement();
});

/*connection.on('error', function(err) {
  // If no error, then good to go...
    //executeStatement();
    console.log(err);
});*/

function executeStatement() {
  var hrstart = process.hrtime();
  request = new Request("exec em7_GetEmployeesLookUp", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
      hrend = process.hrtime(hrstart);
        console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
    }
  });
  request.on('columnMetadata', function (columns) {
    console.log(columns);
  });
  request.on('row', function(columns) {
    console.log(columns);
    process.exit();
    /*columns.forEach(function(column) {
      //console.log(column.value);
    });*/
  });
  connection.execSql(request);
}