var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data.toString().trim());
  });
  setTimeout(function z(){
    serialPort.write("=node.heap()\n"/*, function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    }*/);
    setTimeout(z, 1000);
  }, 1000);
});