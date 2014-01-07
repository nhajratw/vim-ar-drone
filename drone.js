var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

require('ar-drone-png-stream')(client, { port: 6000 });

client
  .after(1000, function() {
    this.up(0.5);
  })
  .after(5000, function() {
    this.stop();
    this.clockwise(0.5);
  })
  .after(5000, function() {
    //this.animate('flipLeft', 15);
  })
  .after(10000, function() {
    this.stop();
    this.land();
  });
