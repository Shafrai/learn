var GCM = require('gcm').GCM;

var apiKey = 'AIzaSyCtyRlGS2ltepSCOoeIvqqW_Un4SuOYGlw';
var gcm = new GCM(apiKey);

var message = {
    registration_id: 'APA91bE7I4mDZLfFH4YZJSxBAetAJxor71WzOXbwQSmH7FBPOHqXOKj1pa5lncCTRTYNjTJOnQa8brIszSm4MTHT7CfDPb6lKHbTqNkO6gJcCKfxe34PZdp6sgazruGMOjAg0BcVaPAk', // required
  
    collapse_key: 'uptoyou', 
    priority : "high",
    delay_while_idle:false,
    data:{
      Message: "test from node",
      isAlarmed: false,
      isAlarmChange: false,
      data: {
        isWindowOpen: false,
        isHallSensor: false,
        isWardrobeLightOn:false,
        isKitchenLightOn: false,
        LastUpdate: "2016-02-01 19:31:29",
        isEntranceDoorOpen: false,
        isAlarmOn: false,
        t4: 2.0,
        t5: 12.5,
        t2: 22.0,
        t3: 20.5,
        t1: 22.0,
        isBalconyDoorOpen: false
      }
    }
};

gcm.send(message, function(err, messageId){
    if (err) {
        console.log("Something has gone wrong!", err);
    } else {
        console.log("Sent with message ID: ", messageId);
    }
});