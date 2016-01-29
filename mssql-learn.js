var sql = require('mssql');

var config = {
	user: 'shafray',
	password: 'shafraytest',
	server: 'tank12\\snickers', // You can use 'localhost\\instance' to connect to named instance
	database: 'ics_ua97',
	//domain : "icscorp",
	Encrypt : "true"
}

sql.connect(config, function(err) {
	if (err) {
	  dbError(err);
	}
	var columns;
	var rows=[];
	var hrstart = process.hrtime();

	new sql.Request()
		.query("exec em7_GetEmployeesLookUp")
		.then(function(recordset) {
        hrend = process.hrtime(hrstart);
	    	console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);

        //console.dir(recordset);
    }).catch(dbError);
	/*request = new sql.Request();
	request.stream = true;
	request
	  .query("select  * from emEmployees")
	  .on('error', dbError)
	  .on('recordset', function(columns) {
	    //console.dir(columns);
	    this.columns = columns;
	  })
	  .on('row', function(row) {
	  	//console.log(row);
	  	
	  	rows.push(row);
	  })
	  .on('done', function() {
	    hrend = process.hrtime(hrstart);
	    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
	    //console.log(this.columns);
	    //console.log(this.rows);
	    //process.exit();
	  });
	*/
});

function dbError(err){
  console.log(err);
}